#!/usr/bin/env python3
"""
voyager-jira-sync.py — Agente autónomo Voyager ↔ Jira
Reads JIRA_SYNC.md, executes pending actions, marks them complete.

Usage:
  python3 scripts/voyager-jira-sync.py           # execute pending actions
  python3 scripts/voyager-jira-sync.py --dry-run # show what would run
  python3 scripts/voyager-jira-sync.py --status  # show board summary
"""

import sys
import os
import re

# Force UTF-8 output on Windows (avoids cp1252 UnicodeEncodeError)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
import json
import base64
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SYNC_FILE = PROJECT_ROOT / "JIRA_SYNC.md"
ENV_FILE = PROJECT_ROOT / ".env.local"

def load_env():
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env

ENV = load_env()
JIRA_BASE = ENV.get("JIRA_BASE_URL", "https://subastop.atlassian.net")
JIRA_EMAIL = ENV.get("JIRA_EMAIL", "")
JIRA_TOKEN = ENV.get("JIRA_API_TOKEN", "")
JIRA_PROJECT = ENV.get("JIRA_PROJECT_KEY", "VD")

AUTH = base64.b64encode(f"{JIRA_EMAIL}:{JIRA_TOKEN}".encode()).decode()
HEADERS = {
    "Authorization": f"Basic {AUTH}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

DRY_RUN = "--dry-run" in sys.argv
STATUS_ONLY = "--status" in sys.argv

# ── Jira API ──────────────────────────────────────────────────────────────────

def jira_get(path):
    url = f"{JIRA_BASE}/rest/api/3{path}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())

def jira_post(path, payload):
    url = f"{JIRA_BASE}/rest/api/3{path}"
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, timeout=15) as r:
        content = r.read()
        return json.loads(content) if content else {}

def jira_put(path, payload):
    url = f"{JIRA_BASE}/rest/api/3{path}"
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method="PUT")
    with urllib.request.urlopen(req, timeout=15) as r:
        content = r.read()
        return json.loads(content) if content else {}

def get_issue(key):
    return jira_get(f"/issue/{key}?fields=summary,status,priority,issuetype,comment")

def get_transitions(key):
    return jira_get(f"/issue/{key}/transitions")

def transition_issue(key, target_status_name):
    """Transition issue to target status by name."""
    ts = get_transitions(key)
    for t in ts.get("transitions", []):
        if t["to"]["name"].lower() == target_status_name.lower():
            jira_post(f"/issue/{key}/transitions", {"transition": {"id": t["id"]}})
            return True
    # Try partial match
    for t in ts.get("transitions", []):
        if target_status_name.lower() in t["to"]["name"].lower():
            jira_post(f"/issue/{key}/transitions", {"transition": {"id": t["id"]}})
            return True
    return False

def add_comment(key, text):
    jira_post(f"/issue/{key}/comment", {
        "body": {
            "type": "doc", "version": 1,
            "content": [{"type": "paragraph", "content": [{"type": "text", "text": text}]}]
        }
    })

def create_issue(summary, description, parent_key=None, issuetype_id="10376"):
    fields = {
        "project": {"key": JIRA_PROJECT},
        "summary": summary,
        "issuetype": {"id": issuetype_id},
        "description": {
            "type": "doc", "version": 1,
            "content": [{"type": "paragraph", "content": [{"type": "text", "text": description}]}]
        }
    }
    if parent_key:
        fields["parent"] = {"key": parent_key}
    result = jira_post("/issue", {"fields": fields})
    return result.get("key")

def set_priority(key, priority_name):
    jira_put(f"/issue/{key}", {"fields": {"priority": {"name": priority_name}}})

def create_link(inward_key, outward_key, link_type="Blocks"):
    """Create issue link. Returns True on success (API returns 201 empty body)."""
    url = f"{JIRA_BASE}/rest/api/3/issueLink"
    payload = {
        "type": {"name": link_type},
        "inwardIssue": {"key": inward_key},
        "outwardIssue": {"key": outward_key},
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, timeout=15) as r:
        r.read()  # 201 empty body — just consume
    return True

# ── JIRA_SYNC.md parser ───────────────────────────────────────────────────────

def read_sync_file():
    if not SYNC_FILE.exists():
        return [], []
    content = SYNC_FILE.read_text(encoding="utf-8")
    pending = []
    completed = []
    in_pending = False
    for i, line in enumerate(content.splitlines()):
        if "## Acciones pendientes" in line:
            in_pending = True
            continue
        if "## Completado" in line:
            in_pending = False
            continue
        if in_pending:
            m = re.match(r"^- \[([ x!])\] (.+)$", line)
            if m:
                state, action = m.group(1), m.group(2)
                pending.append({"line": i, "state": state, "raw": action})
    return pending

def parse_action(raw):
    """Parse action string into structured command."""
    # Remove inline comment (— reason)
    action = re.sub(r"\s+—\s+.*$", "", raw).strip()

    # Normalize arrow variants (→ and ->) to a space for easier parsing
    action_norm = re.sub(r"\s*[\u2192\-]>\s*", " TO ", action)

    # MOVE TICKET TO STATUS
    m = re.match(r"^MOVE\s+([\w-]+)\s+TO\s+\"?(.+?)\"?$", action_norm, re.I)
    if m:
        return {"cmd": "MOVE", "key": m.group(1), "status": m.group(2)}

    # COMMENT TICKET "text"
    m = re.match(r'^COMMENT\s+([\w-]+)\s+"(.+)"$', action, re.I)
    if m:
        return {"cmd": "COMMENT", "key": m.group(1), "text": m.group(2)}

    # CREATE SUBTASK PARENT "summary" "description"
    m = re.match(r'^CREATE\s+SUBTASK\s+([\w-]+)\s+"([^"]+)"(?:\s+"([^"]+)")?$', action, re.I)
    if m:
        return {"cmd": "CREATE_SUBTASK", "parent": m.group(1), "summary": m.group(2), "description": m.group(3) or m.group(2)}

    # CREATE TICKET "summary" "description"
    m = re.match(r'^CREATE\s+TICKET\s+"([^"]+)"(?:\s+"([^"]+)")?$', action, re.I)
    if m:
        return {"cmd": "CREATE_TICKET", "summary": m.group(1), "description": m.group(2) or m.group(1)}

    # CREATE TASK "summary" EPIC PARENT — alias de CREATE TICKET con parent
    m = re.match(r'^CREATE\s+TASK\s+"([^"]+)"\s+EPIC\s+([\w-]+)$', action, re.I)
    if m:
        return {"cmd": "CREATE_SUBTASK", "parent": m.group(2), "summary": m.group(1), "description": m.group(1)}

    # PRIORITY TICKET TO LEVEL
    m = re.match(r"^PRIORITY\s+([\w-]+)\s+TO\s+(\w+)$", action_norm, re.I)
    if m:
        return {"cmd": "PRIORITY", "key": m.group(1), "priority": m.group(2)}

    # LINK TICKET1 TICKET2 TYPE
    m = re.match(r"^LINK\s+([\w-]+)\s+([\w-]+)\s+(\w+)$", action, re.I)
    if m:
        return {"cmd": "LINK", "from": m.group(1), "to": m.group(2), "type": m.group(3)}

    return {"cmd": "UNKNOWN", "raw": action}

def mark_action(line_num, new_state, note=""):
    """Mark action in JIRA_SYNC.md as done [x] or failed [!]."""
    content = SYNC_FILE.read_text(encoding="utf-8")
    lines = content.splitlines()
    if 0 <= line_num < len(lines):
        lines[line_num] = re.sub(r"^(- )\[ \]", f"- [{new_state}]", lines[line_num])
    # Append to Completado section
    ts = datetime.now().strftime("%Y-%m-%d %H:%M")
    completed_line = f"- [{new_state}] {ts} {lines[line_num][5:] if line_num < len(lines) else note}"

    # Find Completado section and append
    new_lines = []
    added = False
    for l in lines:
        new_lines.append(l)
        if "## Completado" in l and not added:
            new_lines.append(f"- [{new_state}] {ts} {note}")
            added = True

    SYNC_FILE.write_text("\n".join(new_lines), encoding="utf-8")

# ── Execute actions ───────────────────────────────────────────────────────────

def execute_action(entry):
    parsed = parse_action(entry["raw"])
    cmd = parsed["cmd"]

    if cmd == "UNKNOWN":
        print(f"  [?] Cannot parse: {entry['raw'][:60]}")
        return False

    print(f"  [{cmd}] {entry['raw'][:70]}")

    if DRY_RUN:
        return True

    try:
        if cmd == "MOVE":
            ok = transition_issue(parsed["key"], parsed["status"])
            if not ok:
                print(f"       Warn: no transition found to '{parsed['status']}'")

        elif cmd == "COMMENT":
            add_comment(parsed["key"], parsed["text"])

        elif cmd == "CREATE_SUBTASK":
            # Use Tarea (10376) under the epic — Subtarea (10377) requires a Story parent
            key = create_issue(parsed["summary"], parsed["description"], parent_key=parsed["parent"], issuetype_id="10376")
            print(f"       Created: {key}")

        elif cmd == "CREATE_TICKET":
            key = create_issue(parsed["summary"], parsed["description"])
            print(f"       Created: {key}")

        elif cmd == "PRIORITY":
            set_priority(parsed["key"], parsed["priority"].capitalize())

        elif cmd == "LINK":
            link_type = parsed["type"].capitalize()
            create_link(parsed["from"], parsed["to"], link_type)

        return True

    except Exception as e:
        print(f"       ERROR: {e}")
        return False

# ── Status display ────────────────────────────────────────────────────────────

def show_status():
    print(f"\nVoyager Jira Board — {JIRA_PROJECT}")
    print(f"Base: {JIRA_BASE}\n")

    # Show our known tickets
    known_keys = [f"VD-{i}" for i in range(30, 44)]
    for key in known_keys:
        try:
            issue = get_issue(key)
            f = issue["fields"]
            summary = f["summary"].encode("ascii", "replace").decode()[:50]
            status = f["status"]["name"]
            itype = f["issuetype"]["name"][:6]
            print(f"  [{key}] [{itype}] [{status[:14]}] {summary}")
        except Exception:
            pass
    print()

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if STATUS_ONLY:
        show_status()
        return

    print(f"\nVoyager Jira Sync Agent")
    print(f"{'DRY RUN — ' if DRY_RUN else ''}Reading: {SYNC_FILE}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    if not SYNC_FILE.exists():
        print("JIRA_SYNC.md not found. Nothing to do.")
        return

    actions = read_sync_file()
    pending = [a for a in actions if a["state"] == " "]

    if not pending:
        print("No pending actions.")
        return

    print(f"Pending actions: {len(pending)}\n")

    success = 0
    failed = 0

    for entry in pending:
        ok = execute_action(entry)
        if not DRY_RUN:
            ts_note = entry["raw"][:80]
            mark_action(entry["line"], "x" if ok else "!", ts_note)
        if ok:
            success += 1
        else:
            failed += 1

    print(f"\nDone: {success} executed, {failed} failed")
    if DRY_RUN:
        print("(dry-run — no changes applied)")

if __name__ == "__main__":
    main()

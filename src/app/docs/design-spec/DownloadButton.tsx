"use client";

interface DownloadButtonProps {
  content: string;
  filename?: string;
  label?: string;
}

export default function DownloadButton({ content, filename = "DESIGN.md", label = "DESIGN.md" }: DownloadButtonProps) {
  function handleDownload(): void {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="text-xs font-semibold px-3 py-1.5 rounded transition-colors"
      style={{
        background: "transparent",
        border: "1px solid var(--vmc-color-vault, #22005C)",
        color: "var(--vmc-color-vault, #22005C)",
        fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
        cursor: "pointer",
      }}
    >
      ↓ {label}
    </button>
  );
}

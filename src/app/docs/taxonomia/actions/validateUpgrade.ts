"use server";

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { unstable_noStore as noStore } from "next/cache";

const VALIDATIONS_PATH = resolve(
  process.cwd(),
  "src/app/docs/taxonomia/_data/upgrade-validations.json",
);

interface ValidationEntry {
  validatedAt: string;
}

function readValidations(): Record<string, ValidationEntry> {
  const raw = readFileSync(VALIDATIONS_PATH, "utf-8");
  return JSON.parse(raw) as Record<string, ValidationEntry>;
}

function writeValidations(data: Record<string, ValidationEntry>): void {
  writeFileSync(VALIDATIONS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function setUpgradeValidation(
  componentId: string,
  validated: boolean,
): Promise<void> {
  const data = readValidations();
  if (validated) {
    data[componentId] = { validatedAt: new Date().toISOString() };
  } else {
    delete data[componentId];
  }
  writeValidations(data);
}

export async function getUpgradeValidations(): Promise<
  Record<string, ValidationEntry>
> {
  noStore();
  return readValidations();
}

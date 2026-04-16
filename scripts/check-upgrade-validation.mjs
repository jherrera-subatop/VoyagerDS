import { readFileSync } from "fs";
import { resolve } from "path";

const componentId = process.argv[2];

if (!componentId) {
  console.log("Usage: node scripts/check-upgrade-validation.mjs <componentId>");
  process.exit(1);
}

const validationsPath = resolve(
  process.cwd(),
  "src/app/docs/taxonomia/_data/upgrade-validations.json",
);

const raw = readFileSync(validationsPath, "utf-8");
const validations = JSON.parse(raw);

if (validations[componentId]) {
  console.log(
    `✓ Component "${componentId}" upgrade is validated (validatedAt: ${validations[componentId].validatedAt}). Pipeline enabled.`,
  );
  process.exit(0);
} else {
  console.error(
    `✗ Component "${componentId}" upgrade is NOT validated. Pipeline blocked. Run the validation gate in /docs/taxonomia/inventario.`,
  );
  process.exit(1);
}

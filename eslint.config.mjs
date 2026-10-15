import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  { ignores: [".cache/**"] },
  {
    extends: [...nextCoreWebVitals],
  },
  {
    // Keep the downloaded Aceternity image/layout markup unchanged.
    files: ["src/components/vendor/aceternity/expandable-cards.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
]);

import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import { DATA } from "../src/data/resume";
import { replaceDatabaseEmbeddings } from "../src/lib/ai/vector-store";

test("homepage has four full-stack and four research projects, excluding MEN2", () => {
  const featured = DATA.projects.filter((project) => project.featured);
  assert.equal(featured.length, 8);
  for (const category of ["Full stack", "Research"]) {
    assert.equal(
      featured.filter((project) => project.category === category).length,
      4,
    );
  }
  assert.ok(
    !featured
      .map((project) => String(project.title))
      .includes("MEN2 Predictor"),
  );
  for (const title of ["candlestick", "HYDRA-ccRCC", "MINTS", "PSYCON"]) {
    assert.equal(
      DATA.projects.filter((project) => project.title === title).length,
      1,
    );
  }
});

test("certificate adapter preserves the downloaded Aceternity render function", () => {
  const base = "src/components/vendor/aceternity/";
  const upstream = fs.readFileSync(
    `${base}expandable-card-grid.upstream.txt`,
    "utf8",
  );
  const adapted = fs.readFileSync(`${base}expandable-cards.tsx`, "utf8");
  const render = (source: string) =>
    source
      .slice(
        source.indexOf("function ExpandableCardDemo()"),
        source.indexOf("const CloseIcon"),
      )
      .replace(/export\s*$/, "")
      .trim();
  assert.equal(render(adapted), render(upstream));
});

test("an empty knowledge corpus cannot erase database embeddings", async () => {
  await assert.rejects(replaceDatabaseEmbeddings([]), /empty knowledge base/);
});

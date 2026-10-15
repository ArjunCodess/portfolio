export type ProjectOrder = "name-asc" | "name-desc" | "date-desc" | "date-asc";

type Project = { title: string; dates: string; image?: string };

export function arrangeProjectRows<T extends Project>(
  projects: readonly T[],
  order: ProjectOrder,
) {
  const sorted = [...projects].sort((a, b) => {
    const name = a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    const year = (value: string) => Number(value.match(/\d{4}/)?.[0] || 0);
    if (order === "name-asc") return name;
    if (order === "name-desc") return -name;
    const date = year(a.dates) - year(b.dates);
    return (order === "date-asc" ? date : -date) || name;
  });
  const pending = new Map<boolean, { project: T; position: number }>();
  const rows: { projects: T[]; position: number }[] = [];
  sorted.forEach((project, position) => {
    const image = Boolean(project.image);
    const first = pending.get(image);
    if (first) {
      rows.push({
        projects: [first.project, project],
        position: first.position,
      });
      pending.delete(image);
    } else {
      pending.set(image, { project, position });
    }
  });
  rows.sort((a, b) => a.position - b.position);
  // Keep complete image/no-image rows in sorted order, then put any unpaired
  // cards at the end rather than leaving a half-empty row in the middle.
  return [
    ...rows.map((row) => row.projects),
    ...[...pending.values()]
      .sort((a, b) => a.position - b.position)
      .map(({ project }) => [project]),
  ];
}

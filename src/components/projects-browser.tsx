"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { arrangeProjectRows, type ProjectOrder } from "@/lib/project-order";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export function ProjectsBrowser({
  featuredOnly = false,
}: {
  featuredOnly?: boolean;
}) {
  const projects = featuredOnly
    ? DATA.projects.filter((p) => p.featured)
    : DATA.projects;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [order, setOrder] = useState<ProjectOrder>("name-asc");

  const categories = featuredOnly
    ? ["Full stack", "Research"]
    : ["Full stack", "Research", "Others"];

  const hasFilters = selectedCategory !== null;

  const visibleProjects = hasFilters
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;
  const rows = arrangeProjectRows(visibleProjects, order);

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      {!featuredOnly && (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">Categories</h2>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  Order
                  <select
                    aria-label="Sort projects"
                    value={order}
                    onChange={(event) =>
                      setOrder(event.target.value as ProjectOrder)
                    }
                    className="h-8 cursor-pointer rounded-md border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <option value="name-asc">Ascending (A–Z)</option>
                    <option value="name-desc">Descending (Z–A)</option>
                    <option value="date-desc">Newest first</option>
                    <option value="date-asc">Oldest first</option>
                  </select>
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((category) => {
                  const selected = selectedCategory === category;
                  return (
                    <Button
                      key={category}
                      aria-pressed={selected}
                      type="button"
                      size="sm"
                      variant="outline"
                      className={cn(
                        "h-7 rounded-md border px-2 text-xs shadow-none transition-colors",
                        selected
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                          : "bg-background",
                      )}
                      onClick={() =>
                        setSelectedCategory((current) =>
                          current === category ? null : category,
                        )
                      }
                    >
                      {category}
                    </Button>
                  );
                })}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 px-2 text-xs",
                    hasFilters ? "" : "invisible pointer-events-none",
                  )}
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {visibleProjects.length} of {projects.length} projects
          </p>
        </>
      )}

      {visibleProjects.length > 0 ? (
        <div className="space-y-3">
          {rows.map((rowProjects, rowIndex) => {
            const hasImage = Boolean(
              "image" in rowProjects[0] && rowProjects[0].image,
            );
            return (
              <div
                key={rowProjects.map((project) => project.title).join("/")}
                data-project-images={String(hasImage)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {rowProjects.map((project, id) => {
                  const isLastOdd = rowProjects.length === 1;

                  return (
                    <BlurFade
                      key={project.title}
                      delay={BLUR_FADE_DELAY * 2 + (rowIndex * 2 + id) * 0.03}
                      className={
                        isLastOdd
                          ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%_-_0.375rem)]"
                          : ""
                      }
                    >
                      <ProjectCard
                        href={project.href}
                        title={project.title}
                        description={project.description}
                        dates={project.dates}
                        tags={project.technologies}
                        image={"image" in project ? project.image : undefined}
                        links={project.links}
                      />
                    </BlurFade>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          No projects match the selected filters.
        </div>
      )}
    </div>
  );
}

"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

function toggleSelection(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function ProjectsBrowser({
  featuredOnly = false,
}: {
  featuredOnly?: boolean;
}) {
  const projects = featuredOnly
    ? DATA.projects.filter((p) => p.featured)
    : DATA.projects;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = featuredOnly
    ? ["Full stack", "Research"]
    : ["Full stack", "Research", "Others"];

  const hasFilters = selectedCategories.length > 0;

  const visibleProjects = hasFilters
    ? projects.filter((project) =>
        selectedCategories.includes(project.category),
      )
    : projects;

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Categories</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 text-xs",
                hasFilters ? "" : "invisible pointer-events-none",
              )}
              onClick={() => setSelectedCategories([])}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
              const selected = selectedCategories.includes(category);

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
                    setSelectedCategories((current) =>
                      toggleSelection(current, category),
                    )
                  }
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>

      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleProjects.map((project, id) => {
            const isLastOdd =
              visibleProjects.length % 2 === 1 &&
              id === visibleProjects.length - 1;

            return (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
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
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          No projects match the selected filters.
        </div>
      )}
    </div>
  );
}

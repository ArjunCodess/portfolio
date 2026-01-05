import CertificateImage from "@/components/certificate-image";
import { CustomCard } from "@/components/custom-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Float from "@/components/fancy/blocks/float";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { SectionHeader } from "@/components/section-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] z-10 space-y-10">
      <BlurFade delay={BLUR_FADE_DELAY * 0.5}>
        <div className="w-full overflow-hidden rounded-xl mb-4">
          <Image
            src="/banner.jpg"
            alt="Banner"
            width={1200}
            height={400}
            className="w-full h-auto min-h-[140px] object-cover"
            priority
          />
        </div>
      </BlurFade>
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}. 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Float>
                <Avatar className="size-28 border">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </Float>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown
            className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-400 underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="resume">
        <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Resume</h2>
            <Button asChild size="sm" variant="outline">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        </BlurFade>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="projects">
        <div className="space-y-8 w-full py-8">
          <SectionHeader
            badge="My Projects"
            title="Check out my latest work"
            description="I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites."
            delay={BLUR_FADE_DELAY * 11}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="certifications">
        <div className="space-y-8 w-full py-8">
          <SectionHeader
            badge="Certifications"
            title="Self-Directed Learning"
            description="I believe in continuous learning. Here are certifications and challenge completions from Harvard CS50 (including Puzzle Day and Ready Player 50) and freeCodeCamp."
            delay={BLUR_FADE_DELAY * 9}
          />
          <div className="space-y-8">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 10}>
                <h3 className="text-xl font-bold">
                  Harvard CS50 Certifications
                </h3>
              </BlurFade>
              <div className="grid grid-cols-2 gap-4">
                {DATA.cs50_images.map((imageUrl, idx) => {
                  const isLastElement =
                    DATA.cs50_images.length % 2 === 1 &&
                    idx === DATA.cs50_images.length - 1;

                  return (
                    <BlurFade
                      key={imageUrl}
                      delay={BLUR_FADE_DELAY * 11 + idx * 0.05}
                      inView
                      className={
                        isLastElement ? "col-span-2 flex justify-center" : ""
                      }
                    >
                      <div className={isLastElement ? "w-1/2" : ""}>
                        <CertificateImage
                          className="size-full object-contain hover:cursor-pointer py-2"
                          src={imageUrl}
                          alt={`CS50 Certificate ${idx + 1}`}
                        />
                      </div>
                    </BlurFade>
                  );
                })}
              </div>
            </div>
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 10}>
                <h3 className="text-xl font-bold">
                  freeCodeCamp Professional Certifications
                </h3>
              </BlurFade>
              <div className="gap-4 columns-2">
                {DATA.fcc_images.map((imageUrl, idx) => {
                  const isLastElement =
                    DATA.fcc_images.length % 2 === 1 &&
                    idx === DATA.fcc_images.length - 1;

                  return (
                    <BlurFade
                      key={imageUrl}
                      delay={BLUR_FADE_DELAY * 11 + idx * 0.05}
                      inView
                    >
                      <div
                        className={`${isLastElement ? "transform -translate-x-1/2" : ""}`}
                      >
                        <CertificateImage
                          className="size-full object-contain hover:cursor-pointer py-2"
                          src={imageUrl}
                          alt={`freeCodeCamp Professional Certificate ${idx + 1}`}
                        />
                      </div>
                    </BlurFade>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="personalAchievements">
        <div className="space-y-8 w-full py-8">
          <SectionHeader
            badge="Personal Achievements"
            title="My Biggest Achievements"
            description="Throughout my journey, I've completed many personal feats. These achievements taught me the importance of dedication and creativity."
            delay={BLUR_FADE_DELAY * 13}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l pr-2">
              {DATA.personalAchievements.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <CustomCard
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="hobbiesInterests">
        <div className="space-y-8 w-full py-8">
          <SectionHeader
            badge="Hobbies & Interests"
            title="What I Enjoy"
            description="I enjoy reading, coding, writing, exploring music and creating it. These activities help me learn, create, and grow."
            delay={BLUR_FADE_DELAY * 13}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l pr-2">
              {DATA.hobbiesInterests.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <CustomCard
                    title={project.title}
                    description={project.description}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-8">
          <SectionHeader
            badge="Contact"
            title="Get in Touch"
            description="Have a project in mind or just want to say hi? I'm always open to discussing new opportunities."
            delay={BLUR_FADE_DELAY * 16}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <p className="text-muted-foreground text-sm md:text-base">
              Feel free to{" "}
              <Link
                href={DATA.contact.social.X.url}
                className="font-semibold text-blue-600 dark:text-blue-400 underline"
              >
                reach out via Twitter
              </Link>
              .
            </p>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}

import {
  ExpandableImage,
  type ExpandableImageProps,
} from "@/components/expandable-image";

export const CERTIFICATE_GROUPS: {
  title: string;
  cards: ExpandableImageProps[];
}[] = [
  {
    title: "Programs and awards",
    cards: [
      {
        src: "/certificates/fxb-2026.png",
        title: "FXB Climate Advocates",
        description: "Summer 2026",
        content:
          "I attended the Summer 2026 FXB Climate Advocates Program. This certificate records my participation in the climate advocacy programme.",
      },
      {
        src: "/certificates/iyna-2026.png",
        title: "IYNA Neuroscience I Capstone",
        description: "Completed in 2026",
        content:
          "I completed the International Youth Neuroscience Association's 2026 Neuroscience I Capstone Track. This certificate recognizes my completion of the track's curriculum.",
      },
      {
        src: "/certificates/hidden-prompt-2026.png",
        title: "AI Vulnerability Challenge",
        description: "First prize, Xavier University, 2026",
        content:
          "I won first prize at Xavier University's AI Vulnerability Challenge with Saksham Yadav. The award was an 11-inch iPad with the A16 chip and 128GB of storage.",
      },
    ],
  },
  {
    title: "Harvard CS50 certifications",
    cards: [
      {
        src: "/certificates/cs50/CS50T.png",
        title: "CS50T",
        description: "Introduction to technology",
        content:
          "I completed Harvard's introduction to technology. The course explores how computers, networks, and the internet work.",
      },
      {
        src: "/certificates/cs50/CS50x.png",
        title: "CS50x",
        description: "Introduction to computer science",
        content:
          "I completed Harvard's introduction to computer science. The course covers programming fundamentals, algorithms, and problem-solving.",
      },
      {
        src: "/certificates/cs50/CS50xPuzzleDay2024.png",
        title: "CS50x Puzzle Day 2024",
        description: "Gold certificate",
        content:
          "I earned a gold certificate in CS50x Puzzle Day 2024. I solved all the problems in the challenge.",
      },
      {
        src: "/certificates/cs50/CS50xPuzzleDay2025.png",
        title: "CS50x Puzzle Day 2025",
        description: "Gold certificate",
        content:
          "I earned a gold certificate in CS50x Puzzle Day 2025. I solved all the problems in the challenge.",
      },
      {
        src: "/certificates/cs50/ReadyPlayer50.png",
        title: "Ready Player 50",
        description: "Prompt injection challenge",
        content:
          "I completed Harvard's Ready Player 50 challenge in 2023. The challenge explores prompt injection through a series of levels.",
      },
    ],
  },
  {
    title: "freeCodeCamp professional certifications",
    cards: [
      {
        src: "/certificates/fcc/FrontendDevelopmentLibraries.png",
        title: "Front End Development Libraries",
        description: "freeCodeCamp",
        content:
          "I completed freeCodeCamp's Front End Development Libraries certification. The curriculum includes React, jQuery, and Bootstrap.",
      },
      {
        src: "/certificates/fcc/CollegeAlgebraWithPython.png",
        title: "College Algebra with Python",
        description: "freeCodeCamp",
        content:
          "I completed freeCodeCamp's College Algebra with Python certification. The course connects algebra concepts with Python programming.",
      },
      {
        src: "/certificates/fcc/ResponsiveWebDesign.png",
        title: "Responsive Web Design",
        description: "freeCodeCamp",
        content:
          "I completed freeCodeCamp's Responsive Web Design certification. The coursework covers HTML, CSS, and building layouts for different screen sizes.",
      },
    ],
  },
];

export function CertificateGallery() {
  return (
    <div className="flex flex-col gap-8">
      {CERTIFICATE_GROUPS.map((group) => (
        <div
          key={group.title}
          className="flex flex-col gap-3"
          data-certificate-group={group.title}
        >
          <h3 className="text-lg font-semibold">{group.title}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.cards.map((card, index) => (
              <div
                key={card.src}
                className={
                  group.cards.length % 2 === 1 &&
                  index === group.cards.length - 1
                    ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%_-_0.375rem)]"
                    : ""
                }
              >
                <ExpandableImage {...card} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

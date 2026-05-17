export type ProjectSection =
  | { type: "text"; content: string }
  | { type: "bullets"; intro?: string; items: { bold?: string; text: string }[] }
  | { type: "image"; src: string; alt: string }
  | { type: "subsection"; title: string; content: string };

export type ProjectBlock = {
  heading: string;
  sections: ProjectSection[];
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  industry: string;
  featureTypes: string[];
  summary: string;
  heroImage?: string;
  blocks: ProjectBlock[];
};

export const projects: Project[] = [
  {
    slug: "online-checkout",
    name: "Online Checkout",
    year: "2024",
    industry: "B2B Lending Platform",
    featureTypes: ["From Scratch", "Optimization"],
    summary:
      "A configurable checkout flow built into the Borrower Platform — giving lenders a single place to define and manage the closing process, and borrowers a single place to complete it.",
    blocks: [
      {
        heading: "Outcome",
        sections: [
          {
            type: "text",
            content: "The closing process moved inside the product for the first time.",
          },
          {
            type: "bullets",
            items: [
              { bold: "42%", text: " faster time-to-fund" },
              { bold: "30%", text: " higher offer acceptance rate" },
              { bold: "25%", text: " fewer support tickets" },
              { bold: "50%+", text: " reduction in steps that previously required manual intervention from the ops team" },
              { text: "Fewer errors, revisions, and missing documents" },
              { text: "Ops teams gained real-time visibility into checkout progress per deal" },
            ],
          },
        ],
      },
      {
        heading: "The problem",
        sections: [
          {
            type: "text",
            content:
              "After accepting a loan offer, borrowers had no unified place to complete the closing process. Lenders managed it through email threads, external links, and manual follow-ups. Nothing was trackable inside the product. The most critical stage of the deal was invisible.",
          },
        ],
      },
      {
        heading: "Discovery",
        sections: [
          {
            type: "text",
            content: "I joined after the problem had been scoped. Before starting design, I focused on two things.",
          },
          {
            type: "subsection",
            title: "Client interviews (existing notes).",
            content:
              "Checkout flows varied significantly between lenders — some needed 3 steps, others 8+. Signing requirements differed: some had all owners sign, others just one. The process was highly configurable by nature.",
          },
          {
            type: "subsection",
            title: "Internal ops audit.",
            content:
              "I mapped every manual step the ops team performed per deal. Many were triggered by missing info or unclear borrower instructions — problems a well-designed flow could eliminate.",
          },
        ],
      },
      {
        heading: "What I designed",
        sections: [
          {
            type: "subsection",
            title: "Checkout Builder —",
            content:
              "a lender-facing configuration tool. Lenders compose a template from 8 step types, write custom copy, set signing requirements, and preview the borrower-facing result in real time.",
          },
          {
            type: "subsection",
            title: "Borrower Platform (web + mobile) —",
            content:
              "the applicant-facing flow. After accepting an offer, borrowers work through the defined steps to close their deal. Steps can be completed in any order. Offer details stay visible throughout.",
          },
          {
            type: "subsection",
            title: "Ops view —",
            content:
              "a deal-level panel for funding advisors. Shows checkout progress step by step, with the content of each step — documents, signatures, collected data — visible on click.",
          },
        ],
      },
      {
        heading: "Key decisions",
        sections: [
          {
            type: "subsection",
            title: "Live preview panel.",
            content:
              "As lenders build their template, the right half of the screen shows the borrower-facing output in real time. Every change is immediately visible — no separate preview mode, no guesswork about how the configuration translates to the borrower experience.",
          },
          {
            type: "subsection",
            title: "Collapse / expand steps.",
            content:
              "Each step in the Builder is collapsed by default; clicking expands the detail. This keeps the overall structure visible at a glance while allowing focused editing of individual steps.",
          },
          {
            type: "subsection",
            title: "Any-order completion.",
            content:
              "Borrowers can complete steps in any sequence. This reduced drop-off when a required document wasn't immediately available — borrowers could move forward on other steps instead of abandoning.",
          },
        ],
      },
      {
        heading: "Reflection",
        sections: [
          {
            type: "text",
            content:
              "This was the most complex flow I had designed up to that point — two user types, a highly configurable system, and a live preview connecting both sides in real time. The hardest part wasn't the UI, it was understanding enough about lending operations to know what flexibility was genuinely needed versus what was edge-case noise.",
          },
          {
            type: "text",
            content:
              "If I were to revisit it, I'd spend more time on the empty state for new lenders — the Builder assumes you know what steps you need, but first-time users don't. A guided setup or a template library would have reduced onboarding friction significantly.",
          },
        ],
      },
    ],
  },
  {
    slug: "project-two",
    name: "Project Two",
    year: "2024",
    industry: "SaaS",
    featureTypes: ["UX Research", "Design System"],
    summary: "Brief description of the project, the problem it solved, and your role in shaping the design.",
    blocks: [],
  },
  {
    slug: "project-three",
    name: "Project Three",
    year: "2023",
    industry: "Mobile",
    featureTypes: ["Mobile", "iOS"],
    summary: "Brief description of the project, the problem it solved, and your role in shaping the design.",
    blocks: [],
  },
  {
    slug: "project-four",
    name: "Project Four",
    year: "2023",
    industry: "Enterprise",
    featureTypes: ["Web", "B2B"],
    summary: "Brief description of the project, the problem it solved, and your role in shaping the design.",
    blocks: [],
  },
];

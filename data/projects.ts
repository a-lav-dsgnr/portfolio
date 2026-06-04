export type ProjectSection =
  | { type: "text"; content: string }
  | { type: "bullets"; intro?: string; items: { bold?: string; text: string }[] }
  | { type: "image"; src: string; alt: string }
  | { type: "subsection"; title: string; content: string | string[] };

export type ProjectBlock = {
  heading: string;
  sections: ProjectSection[];
};

export type Project = {
  slug: string;
  name: string;
  industry: string;
  featureTypes: string[];
  year: string;
  summary: string;
  heroImage?: string;
  blocks: ProjectBlock[];
};

export const projects: Project[] = [
  {
    slug: "command-bar",
    name: "Command Panel",
    industry: "B2B Lending • Fintech",
    featureTypes: ["From Scratch", "Optimization"],
    year: "2025",
    heroImage: "/Command Panel.jpg",
    summary:
      "A keyboard-first command interface that lets lending teams find deals and run AI agents without leaving their current screen.",
    blocks: [
      {
        heading: "",
        sections: [
          {
            type: "text",
            content:
              "Command panel has become the single point of access for managing deals and has laid the foundation for an agent-centric product development strategy.",
          },
          {
            type: "text",
            content:
              "Search has become faster and more flexible, as searching for a deal no longer requires an exact string match. Instead, a query by company name, email, or phone number finds the desired deal anywhere on the platform. AI agents now also operate within the product, so automated processes that were previously performed in external tools are launched with a command, without changing context or leaving the current screen.",
          },
        ],
      },
      {
        heading: "Problem",
        sections: [
          {
            type: "text",
            content:
              "Funding advisors and underwriters spent their days context-switching between deals and running repetitive manual processes — collecting documents, submitting files to lenders, triggering compliance checks.",
          },
          {
            type: "text",
            content:
              "Finding a specific deal required navigating through multiple screens. Starting an automated process meant leaving the platform entirely. The most routine parts of the job were also the most indirect, and that overhead added up across a full workday.",
          },
        ],
      },
      {
        heading: "What I designed",
        sections: [
          {
            type: "text",
            content:
              "My goal was to bring these actions into a single surface — so advisors could complete routine tasks without navigating across screens, leaving the platform, or interrupting their current work.",
          },
          {
            type: "subsection",
            title: "Semantic deal search.",
            content:
              "A user opens the bar and types a query — business name, email, phone number. Results are ranked by relevance and capped so the list stays scannable. Typing / explicitly primes search mode, with a clear visual shift so the user knows what the bar will do next. Selecting a result navigates straight to the deal.",
          },
          {
            type: "subsection",
            title: "Triggering AI agents",
            content: [
              "Users call up agents inline by typing @, which surfaces the full list of available agents. Continuing to type filters that list in real time. Once an agent is selected, any text entered on the same line is captured as a free-text instruction—letting users specify intent in a single, uninterrupted action.",
              "On a deal page, the bar adapts to context, suggesting agents relevant to that specific deal. The agent replies as a chat thread inside the same panel, keeping users in flow with no new screen or redirect.",
            ],
          },
          {
            type: "subsection",
            title: "Session history sidebar.",
            content:
              "A persistent, collapsible sidebar lists past sessions in chronological order, so users can resume or reference earlier work without losing their current train of thought. It collapses to give the conversation full focus, and adapts to narrow viewports. I designed every state — loading, empty for new users, error when history fails to load, and the populated list with active and hover states.",
          },
        ],
      },
      {
        heading: "Key decisions",
        sections: [
          {
            type: "subsection",
            title: "One bar, two modes.",
            content:
              "Search and automation share a single interface instead of living as two separate tools. The bar reads intent from what the user types and shifts mode accordingly. One entry point means one thing to learn and one place to go — the user doesn't decide which tool before they decide what they need.",
          },
          {
            type: "subsection",
            title: "/ and @ as mode triggers.",
            content:
              "I borrowed the symbol-trigger pattern from messaging tools — / for search, @ for agents. Lending teams already use these symbols daily in Slack, so the interaction needed no explanation. The familiarity did the onboarding work for free.",
          },
          {
            type: "subsection",
            title: "Free-text parameters on one line.",
            content:
              "After an agent is named, the rest of the line is captured as a plain-language instruction — @Ted Placer submit deal to lender [link]. I chose this over a structured form because it matches how people already write commands in chat: one continuous line, no fields to tab through, no modal to fill in.",
          },
          {
            type: "subsection",
            title: "Contextual agent suggestions.",
            content:
              "When the bar is opened on a deal page, it suggests agents relevant to that deal before the user types anything. The user's current context is a strong signal of intent — surfacing the likely next action removes a search step entirely.",
          },
          {
            type: "subsection",
            title: "Transient states for agent processing.",
            content:
              "Agents take time to respond, so the bar needed an honest in-between state. A transient message — \"Contacting the agent…\" — holds the moment, stays visible if processing runs long, and is replaced by the response when it arrives. Without it, a working bar would look like a frozen one.",
          },
        ],
      },
      {
        heading: "Reflection",
        sections: [
          {
            type: "text",
            content:
              "The most useful lesson from this project: a command interface succeeds on familiarity, not on features. The strongest decisions weren't new inventions — they were patterns users already knew from Slack and modern AI tools, brought into a context where they hadn't existed before. Designing from scratch meant I could have built something clever; what worked was building something the user could already use without being taught.",
          },
        ],
      },
    ],
  },
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

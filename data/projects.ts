export type ProjectSection =
  | { type: "text"; content: string }
  | { type: "bullets"; intro?: string; items: { bold?: string; text: string }[] }
  | { type: "image"; src: string; alt: string }
  | { type: "carousel"; images: { src: string; alt: string }[] }
  | { type: "video"; src: string; alt: string; poster?: string; scale?: number; caption?: string }
  | {
      type: "beforeAfter";
      before: { src: string; alt: string };
      after: { src: string; alt: string };
    }
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
  /** Thumbnail for the project card on the homepage. Falls back to heroImage. */
  cardImage?: string;
  blocks: ProjectBlock[];
};

export const projects: Project[] = [
  {
    slug: "command-bar",
    name: "Command Panel",
    industry: "B2B Lending • Fintech",
    featureTypes: ["From Scratch", "Optimization"],
    year: "2025",
    heroImage: "/Command-Panel.jpg?v=2",
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
        ],
      },
      {
        heading: "Outcome",
        sections: [
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
            type: "image",
            src: "/Semantic-deal-search.jpg?v=2",
            alt: "Semantic deal search",
          },
          {
            type: "subsection",
            title: "Semantic deal search.",
            content:
              "A user opens the bar and types a query — business name, email, phone number. Results are ranked by relevance and capped so the list stays scannable. Typing / explicitly primes search mode, with a clear visual shift so the user knows what the bar will do next. Selecting a result navigates straight to the deal.",
          },
          {
            type: "image",
            src: "/triggering-ai-agents.jpg?v=2",
            alt: "Triggering AI agents",
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
            type: "image",
            src: "/saved-commands.jpg",
            alt: "Saved commands",
          },
          {
            type: "subsection",
            title: "Saved commands",
            content:
              "Users often send the same instruction to the same agent over and over, like collecting missing documents for a new deal or routing a file to a specific lender. Retyping the full natural-language request each time turned a fast interaction slow again. I designed a way to save any typed command as a named shortcut from the place where it's written, so a recurring action collapses into a single step.",
          },
          {
            type: "image",
            src: "/session-history-sidebar.jpg",
            alt: "Session history sidebar",
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
            type: "image",
            src: "/key-decisions-1.jpg",
            alt: "/ and @ as mode triggers",
          },
          {
            type: "subsection",
            title: "/ and @ as mode triggers.",
            content:
              "I borrowed the symbol-trigger pattern from messaging tools — / for search, @ for agents. Lending teams already use these symbols daily in Slack, so the interaction needed no explanation. The familiarity did the onboarding work for free.",
          },
          {
            type: "image",
            src: "/key-decisions-2.jpg?v=3",
            alt: "Contextual suggestions",
          },
          {
            type: "subsection",
            title: "Contextual suggestions",
            content:
              "When the panel is opened on a deal page, the user usually already knows roughly what they want to do, but they shouldn't have to remember the exact agent name or retype a command they've used a dozen times. The panel surfaces both relevant agents and saved commands for the current context before the user types anything, so the likely next action is one keystroke away instead of a search away.",
          },
          {
            type: "video",
            src: "/transient-states.mov",
            alt: "Transient states for agent processing",
            scale: 1.2,
            caption: "A prototype built with Cursor to show engineers how the chat feature should work.",
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
              "The most useful lesson from this project was that a command interface succeeds on familiarity rather than on features. The strongest decisions weren't new inventions but patterns users already knew from Slack and modern AI tools, brought into a context where they hadn't existed before. Designing from scratch meant I could have built something clever, yet what actually worked was building something the user could already use without being taught.",
          },
        ],
      },
    ],
  },
  {
    slug: "data-orchestration",
    name: "Data Orchestration Outcome",
    year: "2026",
    industry: "B2B Lending • Fintech",
    featureTypes: ["Redesign"],
    cardImage: "/Data Orchestration - Fail.png",
    summary:
      "Data Orchestration Outcome now shows underwriters what failed, where, and why — instead of leaving them to verify it manually.",
    blocks: [
      {
        heading: "",
        sections: [
          {
            type: "beforeAfter",
            before: { src: "/Before - DO.png", alt: "Data Orchestration outcome before redesign" },
            after: { src: "/Data Orchestration - Fail.png", alt: "Data Orchestration outcome after redesign" },
          },
          {
            type: "text",
            content:
              "Data Orchestration Outcome now shows underwriters what failed, where, and why — instead of leaving them to verify it manually.",
          },
        ],
      },
      {
        heading: "Outcome",
        sections: [
          {
            type: "text",
            content:
              "Underwriters and funding advisors now open a deal and know within seconds whether it can move forward, which category is blocking it, and where to look next. What used to be the most time-consuming part of the underwriting review — parsing dense orchestration data to decide whether a deal is workable — became a moment of clarity at the top of the screen. The redesign is grounded in four interviews with funding advisors and underwriters, where the same reading pattern surfaced across every conversation: failure first, source by source, most of the data hidden until requested. The new design mirrors that pattern instead of fighting it.",
          },
        ],
      },
      {
        heading: "Problem",
        sections: [
          {
            type: "text",
            content:
              "The Data Orchestration Outcome block sat at the top of the underwriting stage and displayed every condition by default, regardless of status. Funding advisors and underwriters reviewed the same information on every deal even when most conditions had passed, and the density of the block made it slower to read than the manual verification it was meant to replace.",
          },
          {
            type: "text",
            content:
              "I conducted four interviews with funding advisors and underwriters to understand how the block fit into their workflow and where it was costing time. Four findings were consistent across every conversation. Failure reasons were unreadable because they were shown as internal attribute codes rather than in plain language. The block obscured the data providers users relied on for verification (Equifax, MoneyThumb, and others), so most participants bypassed orchestration and verified each source manually. Every participant described the same reading order: bottom to top, failed conditions first, passed conditions skipped. And once a failure was identified, reaching the relevant attribute or supporting document required several navigation steps across unrelated screens.",
          },
        ],
      },
      {
        heading: "What I designed",
        sections: [
          {
            type: "text",
            content:
              "I redesigned Data Orchestration Outcome as part of the underwriting deal view. The surface was rebuilt around failure-first reading — the outcome now aligns with the other data providers, failures are called out above with direct links to affected attributes, and the full check log is organized by category with filtering and search.",
          },
          {
            type: "carousel",
            images: [
              {
                src: "/Compact data-provider layout-before.jpg",
                alt: "Data provider layout before the redesign",
              },
              {
                src: "/Compact data-provider layout-after.jpg",
                alt: "Data provider layout after the redesign",
              },
            ],
          },
          {
            type: "subsection",
            title: "Compact data-provider layout.",
            content:
              "Compact data-provider layout. The orchestration outcome is no longer a vertical block dominating the screen. It sits as one card in a horizontal row alongside KYB, Bank Data, Personal Credit, Match, and CFA — the same data providers users were already navigating to verify failures manually. The full check log is laid out below, with every category collapsed to a single row until it actually needs to be expanded.",
          },
          {
            type: "subsection",
            title: "Failure banner with linked attributes.",
            content:
              "When a check fails, a banner names the failed category and lists the specific attributes within it. Each attribute is a direct link to the relevant block within the deal — the exact field behind the failure, with expected and returned values.",
          },
          {
            type: "subsection",
            title: "Filtering and search.",
            content:
              "The old design had no filtering or search, so participants used their browser's find function to locate a specific attribute on the page. A search field now finds an attribute by name directly within the view, and a status filter narrows the list to Pass, Fail, or Manual Review.",
          },
        ],
      },
      {
        heading: "Reflection",
        sections: [
          {
            type: "text",
            content:
              "The hardest part of this project wasn't redesigning Data Orchestration Outcome — it was figuring out what it was actually for. Understanding the real value of the feature meant identifying the actual problems users had, which information mattered to them and in what order, and how they used it in their process. Once the hierarchy was right, the individual screen decisions followed from it.",
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

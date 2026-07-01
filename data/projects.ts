export type ProjectSection =
  | { type: "text"; content: string }
  | { type: "bullets"; intro?: string; items: { bold?: string; text: string }[] }
  | { type: "image"; src: string; alt: string }
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
              "Funding advisors and underwriters opened a deal and were met with a wall of orchestration data they mostly couldn't use. The block sat at the top of the underwriting stage and showed every condition by default, even when most of them had clearly passed. Reading the screen took effort that didn't translate into faster decisions, and explaining it to a new team member took longer than the actual review.",
          },
          {
            type: "text",
            content:
              "To understand what specifically was costing time, I ran interviews with four users across the two main roles. Four patterns held across every conversation. No one could tell what had failed or why, because internal attribute codes like LNK_B_012 carried no meaning outside the engineering team. The heavy block hid the data providers users actually trusted, like Equifax and MoneyThumb, so most users skipped orchestration and verified manually. The same reading instinct came up four times — bottom-up, fail-first, skip the passes. And even when a failure was identified, getting to the relevant attribute or document took several extra clicks through unrelated screens.",
          },
          {
            type: "text",
            content:
              "The screen wasn't broken in a single visible way. It was misaligned with how the work actually happens.",
          },
        ],
      },
      {
        heading: "What I designed",
        sections: [
          {
            type: "text",
            content:
              "I redesigned the Data Orchestration surface as part of the underwriting deal view, aligning it with how the rest of the verification data is presented and rebuilding the information hierarchy around failure-first reading.",
          },
          {
            type: "subsection",
            title: "Compact data-provider layout.",
            content:
              "The orchestration outcome is no longer a vertical block dominating the screen. It sits as one card in a horizontal row alongside KYB, Bank Data, Personal Credit, Match, and CFA — the same data providers users were already navigating to verify failures manually. The full check log is one click away when needed and invisible when not.",
          },
          {
            type: "subsection",
            title: "Failure banner with linked attributes.",
            content:
              "When a check fails, a banner names the failed category and lists the specific attributes that triggered it, with each attribute as a direct link to its row in the section below. The user starts with the answer and one click takes them to the evidence — date, time, expected value, returned value.",
          },
          {
            type: "subsection",
            title: "Filter chips and search.",
            content:
              "A row of source-based filter chips sits above the category list, alongside a search field for finding a specific attribute by name. Users moving between sources can narrow the view in one click without changing tabs or screens.",
          },
          {
            type: "subsection",
            title: "Minimal pass state.",
            content:
              "When orchestration completes without failures, the surface goes quiet. Cards show their statuses, categories collapse to a single row each, the banner disappears. The screen confirms the work was done but stops asking for attention it doesn't need.",
          },
        ],
      },
      {
        heading: "Key decisions",
        sections: [
          {
            type: "subsection",
            title: "Heavy block to compact provider cards.",
            content:
              "The original orchestration outcome lived as a tall, dense vertical block at the top of the underwriting stage — the first thing every user saw on every deal, even when nothing about it was actionable. Three of the four interview participants independently said they scrolled past it most of the time. I broke the block into a horizontal row of compact cards aligned with the other data providers, so orchestration is now visually peer to KYB, Bank Data, and the rest rather than gating them. This single change does most of the work, because it removes the screen's biggest signal — that something here demands your attention — except when there is.",
          },
          {
            type: "subsection",
            title: "A banner that names the failure.",
            content:
              "When a category fails, the banner at the top names which category, lists the specific failed attributes, and surfaces additional attributes in an expandable list when there are more than two. The user starts at the answer instead of hunting for it across collapsed categories. This decision came directly from how Sebastian and Christian described their workflow — they always wanted to know what failed before they cared about anything else, and the old design buried that answer under everything that had passed.",
          },
          {
            type: "subsection",
            title: "Direct links from the failure to the source.",
            content:
              "Each attribute name in the failure banner is a link straight to its detail row in the section below — full evidence in one click, no scrolling, no searching across collapsed blocks. This was James's most concrete complaint about the old design. He described hunting through multiple documents to find which one triggered a fraud failure, and the redesign collapses that into a single jump.",
          },
          {
            type: "subsection",
            title: "Per-source filter chips.",
            content:
              "Each data source — Application Data, Custom Attributes, Personal Credit, Bank Data, Match — gets its own chip in a row above the category list. Selecting a chip narrows the view to that source without changing screens or losing context. The chips reflect a real pattern from the interviews, where users investigating a failure tend to think in terms of \"what does Equifax say about this\" rather than \"what does the orchestration say.\" The filter restores that mental model.",
          },
          {
            type: "subsection",
            title: "Minimal pass state.",
            content:
              "When orchestration completes without failures, the entire surface goes quiet — no banner, no expanded blocks, no urgency. The old design treated pass and fail with the same visual weight, but the interviews made it clear that users skip the screen entirely when a deal is passing. The new design honors that and frees attention for the deal stages where it actually belongs.",
          },
        ],
      },
      {
        heading: "Reflection",
        sections: [
          {
            type: "text",
            content:
              "The hardest part of this project wasn't designing the new layout — it was figuring out what the layout was actually for. The old screen showed everything because no one had ever asked which parts of \"everything\" users needed and in what order. Four interviews across funding advisors and underwriters made it obvious that the answer was almost the opposite of what the screen was doing — failure-first, source by source, most of the data hidden until requested.",
          },
          {
            type: "text",
            content:
              "The lesson I'm taking forward is that information-dense interfaces don't usually fail at the visual level. They fail at the hierarchy level. The fix isn't to make the same content prettier but to ask which content matters in which moment, and then design the surface to mirror that.",
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

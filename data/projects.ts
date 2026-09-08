export type ProjectSection =
  | { type: "text"; content: string }
  | { type: "bullets"; intro?: string; items: { bold?: string; text: string }[] }
  | { type: "banner"; text: string }
  | { type: "image"; src: string; alt: string; bare?: boolean }
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
  /** Thumbnail shown inside the card plate: grayscale by default, colored on hover. */
  cardThumb?: { src: string; hover: string; width: number; height: number };
  blocks: ProjectBlock[];
};

export const projects: Project[] = [
  {
    slug: "command-bar",
    name: "Building the Command Panel",
    industry: "B2B Lending • Fintech",
    featureTypes: ["From Scratch"],
    year: "2025",
    heroImage: "/Command-Panel.jpg?v=2",
    cardThumb: {
      src: "/thumbnail2.1.png",
      hover: "/thumbnail2.1-1.png",
      width: 320,
      height: 232,
    },
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
    name: "Redesigning the Data Orchestration Outcome",
    year: "2026",
    industry: "B2B Lending • Fintech",
    featureTypes: ["Redesign"],
    cardImage: "/Data Orchestration - Fail.png",
    cardThumb: {
      src: "/thumbnail1.1.png",
      hover: "/thumbnail1.2.png",
      width: 500,
      height: 307,
    },
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
              "The Data Orchestration Outcome block sat at the top of the underwriting stage and showed every term by default, whatever its status. Funding advisors and underwriters read through the same information on every deal, even when most checks had passed. The block was so dense that reading it took longer than the manual review it was meant to replace. External clients could not follow the table even after a funding advisor walked them through it.",
          },
        ],
      },
      {
        heading: "Design Process",
        sections: [
          {
            type: "image",
            src: "/design-process-doo-1.svg?v=3",
            alt: "Early design exploration streamlining the Data Orchestration Outcome table",
            bare: true,
          },
          {
            type: "text",
            content:
              "I started with the obvious and streamlined the table itself. At the design review with the CEO, product managers, and engineers I picked up more context on the task, and clear feedback: the new version was too close to the current one.",
          },
          {
            type: "subsection",
            title: "Interviews instead of assumptions.",
            content:
              "I interviewed funding advisors and underwriters to see how they actually work with this block. Only two things turned out to matter. What went wrong, and where in the deal it went wrong. The rest of the data is rarely needed and gets requested case by case.",
          },
          {
            type: "bullets",
            intro: "The interviews surfaced other problems.",
            items: [
              {
                text: "Error causes were shown as internal attribute codes, not plain language.",
              },
              {
                text: "The module overrode the data sources people relied on for verification, so most participants skipped the orchestration and checked each source by hand.",
              },
              {
                text: "Everyone read in the same order, bottom to top. They looked at failed conditions first and skipped the ones that passed.",
              },
              {
                text: "Once someone found an error, they had to move through several unrelated screens to reach the relevant attribute or document.",
              },
            ],
          },
          {
            type: "image",
            src: "/meme-doo.jpg",
            alt: "The Matrix red pill / blue pill choice",
            bare: true,
          },
          {
            type: "subsection",
            title: "Communication with developers.",
            content:
              "At the last design review we split the feature into two parts. In my design, each attribute linked directly to its field in the agreement. The engineers said that would take longer to build, so the first version links to the page where the error occurred, and highlighting the specific element moved to the next release. That kept implementation on schedule.",
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
                src: "/Compact data-provider layout-after.jpg?v=2",
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
            type: "carousel",
            images: [
              {
                src: "/Failure banner with linked attributes-1.jpg",
                alt: "Failure banner naming the failed category with the list of failed attributes",
              },
              {
                src: "/Failure banner with linked attributes-2.jpg",
                alt: "Failed attributes listed on a check log row, each linking to the relevant block",
              },
            ],
          },
          {
            type: "subsection",
            title: "Failure banner with linked attributes.",
            content:
              "When a check fails, a banner names the failed category and lists the specific attributes within it. Each attribute is a direct link to the relevant block within the deal — the exact field behind the failure, with expected and returned values.",
          },
          {
            type: "carousel",
            images: [
              {
                src: "/Filtering..jpg",
                alt: "Status filter narrowing the check log to Pass, Fail, or Manual Review",
              },
              {
                src: "/Search.jpg",
                alt: "Search field finding an attribute by name within the check log",
              },
            ],
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
    // TODO: fill in the remaining sections — placeholder content marked below.
    slug: "offer-stage",
    name: "Evolving the Offer Stage",
    year: "2026",
    industry: "B2B Lending • Fintech",
    featureTypes: ["Feature Evolution"],
    // Card image shown on the homepage grid. Falls back to heroImage if omitted.
    cardImage: "/offer-stage-thumbnail-color2.png",
    // Grayscale-by-default thumbnail inside the card plate, colored on hover.
    cardThumb: {
      src: "/offer-stage-thumbnail-bw2.png",
      hover: "/offer-stage-thumbnail-color2.png",
      width: 500,
      height: 298,
    },
    summary:
      "Offer stage is where funding advisors review offers from multiple lenders on a deal and decide what to present to a borrower. A single flat list meant endless scrolling to compare offers.",
    blocks: [
      {
        heading: "",
        sections: [
          {
            type: "banner",
            text:
              "Under NDA, real lender names can't be shown. Throughout this project they appear as “Lender Name.”",
          },
          {
            type: "beforeAfter",
            before: { src: "/Offer Stage-before3.png", alt: "Offer stage before the redesign" },
            after: { src: "/Offer Stage-after3.png", alt: "Offer stage after the redesign" },
          },
          {
            type: "text",
            content:
              "Offer stage is where funding advisors review offers from multiple lenders on a deal and decide what to present to a borrower. A single flat list meant endless scrolling to compare offers.",
          },
        ],
      },
      {
        heading: "Outcome",
        sections: [
          {
            type: "text",
            content:
              "Users can now choose which lenders' offers to expand and which to leave collapsed, instead of scrolling through everything at once. The collapsed view now shows the maximum amount, term, and commission, so there's often no need to expand at all. Bulk actions replace setting a decline reason on each offer one by one, and presorting by amount and commission removes the pagination bug that hid offers past the first page.",
          },
        ],
      },
      {
        heading: "Problem",
        sections: [
          {
            type: "text",
            content:
              "Some lenders return dozens of offers per submission, and resubmissions double that. A single deal could carry 100+ offers, all listed flat with nothing to collapse. Advisors scrolled through walls of data to compare offers or find the one they needed. Commission and pricing weren't included at the offer stage, so advisors calculated them manually or left the platform to check the lender's portal. Declining or retracting offers for reporting meant setting a reason on each one individually.",
          },
        ],
      },
      {
        heading: "What I designed",
        sections: [
          {
            type: "text",
            content:
              "I redesigned the offer stage around two ways of browsing the same data, plus a way to act on offers at scale. The direction came from an initial round of interviews with funding advisors. They walked through how they actually work through offers on a deal, what they check first, what they'd normally leave the platform to verify. A second round tested the redesign directly and shaped the details from there.",
          },
          {
            type: "image",
            src: "/Grouped-by-lender.jpg",
            alt: "Offers grouped into a collapsed card per lender",
          },
          {
            type: "subsection",
            title: "Grouped by lender.",
            content:
              "Offers are organized into a card per lender, collapsed by default. Interviews showed advisors scan for the maximum amount and term first, so the collapsed state shows those numbers instead of ranges. Commission was the most requested addition. Advisors were calculating it manually or checking the lender's portal just to see it, so it's now surfaced in the summary and as a column in the full table. Offers inside each card are presorted by amount and commission, highest first, since that's what advisors look for, instead of adding pagination.",
          },
          {
            type: "video",
            src: "/slider-view.mp4",
            alt: "Advisor browsing offers with sliders for amount, term, and commission points, with commission shown alongside",
            caption: "A prototype built with Cursor to show engineers how the chat feature should work.",
          },
          {
            type: "subsection",
            title: "Interactive slider view.",
            content:
              "A second view lets advisors browse offers using sliders for amount, term, and commission points, instead of scanning a table. Advisors already used similar sliders on lender portals, so the interaction needed no explanation. With commission now visible alongside the sliders, advisors can do this work inside the platform instead of switching over to a lender's portal to check.",
          },
          {
            type: "video",
            src: "/bulk-action2.mov",
            alt: "Selecting offers across lender groups and declining them in bulk with a single decline-reason modal",
            caption: "A prototype built with Cursor to show engineers how the chat feature should work.",
          },
          {
            type: "subsection",
            title: "Bulk actions.",
            content:
              "Selection works across lender groups, not just within one. This is driven by reporting needs, since declined or retracted offers are tracked differently in advisors' KPIs than offers that simply expired without a status change. Declining offers in bulk opens a single modal with one decline-reason field, applied to the whole selection at once, replacing a one-by-one update. Advisors can also hide a batch of offers from view the same way.",
          },
        ],
      },
      {
        heading: "Reflection",
        sections: [
          {
            type: "text",
            content:
              "The hardest part was understanding how advisors actually decide what to show a borrower. Not just what they click on, but what they'd normally leave the platform to go check instead. That only got clear once I sat down with advisors directly, instead of guessing from the data model.",
          },
          {
            type: "text",
            content:
              "Giving advisors two ways to browse the same offers ended up mattering more than I expected going in. They don't all compare offers the same way, and neither view alone would have covered how differently they actually work.",
          },
        ],
      },
    ],
  },
];

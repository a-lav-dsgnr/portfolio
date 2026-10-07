/** Inline text: plain strings, or links rendered inside a paragraph. */
export type InlinePart = string | { text: string; href: string };

export type ArticleBlock =
  | { type: "paragraph"; content: InlinePart[] }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-10-07". */
  date: string;
  readingTime: string;
  blocks: ArticleBlock[];
};

const img = (n: number, ext = "png") => `/writing/ai-prototyping/${n}.${ext}`;

export const writing: Article[] = [
  {
    slug: "ai-prototyping-in-the-design-process",
    title: "AI Prototyping in the Design Process",
    description:
      "Which task to pick for your first AI prototype, and how to gradually make it part of your work.",
    date: "2026-10-07",
    readingTime: "4 min read",
    blocks: [
      {
        type: "paragraph",
        content: [
          "When AI was just starting to handle prototypes and produce more or less decent UI, someone on my team dropped a link to Cursor in the chat. That’s how my interest in AI prototyping started. I began watching videos about how big companies like Intercom ",
          { text: "use AI in their design process", href: "https://youtu.be/_9OdGDjFrCw?si=N53C1qg7QQfEvEW7" },
          ", and I got even more into it. What really excited me was the idea of an environment where the UI I design in Figma, down to the small details, would match what actually gets built.",
        ],
      },
      { type: "image", src: img(1), alt: "" },

      { type: "heading", text: "From the first prototype to a client call" },
      {
        type: "paragraph",
        content: [
          "I started with an interface that didn’t have a lot of detail. It was a command panel where I needed to show interactions, and I built it just to present at an internal review and share the experience. Then, for the first time, I showed that prototype on a call with a client. The Product Manager was surprised by the level of detail, because his own attempts had always ended up with really poor design. The more AI prototyping evolved, the more complex the interfaces I wanted to try.",
        ],
      },
      { type: "image", src: img(2, "gif"), alt: "Command panel prototype" },

      { type: "heading", text: "Some plans were put on hold" },
      {
        type: "paragraph",
        content: [
          "After that I spent a lot of time on our design system, and a new idea came up. I wanted to build a Sandbox where we could make different prototypes, keep extending them, and eventually end up with a demo product. Alongside it, I planned a separate repository of components for the Sandbox to use. Then the team was cut, the work was paused, and I had to focus only on product and marketing tasks.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "I didn’t give up on prototypes, though. They worked too well in design reviews. Clients made decisions faster because we could walk through the whole flow live. And while building them, I’d notice edge cases that are hard to catch on static Figma screens.",
        ],
      },
      { type: "image", src: img(3), alt: "" },

      { type: "heading", text: "How I work now" },
      {
        type: "paragraph",
        content: [
          "Right now I mostly use prototyping during ideation, especially on complex tasks. I ask Claude to suggest a few different ways to solve the problem, usually with the skill ",
          { text: "emil-prototype", href: "https://github.com/emilkowalski/skills/tree/main/skills/prototype" },
          ". You can just describe the task, but it works much better if you set up a project with a description, a PRD and so on. The results are a lot stronger, and sometimes they show me an approach I wouldn’t have thought of.",
        ],
      },
      { type: "image", src: img(4), alt: "" },

      { type: "heading", text: "An automation that failed the first time" },
      {
        type: "paragraph",
        content: [
          "One of my recent projects was an automation for the marketing team. For a year I’d been making illustrations for our LinkedIn posts, which took me 7 to 12 hours a month depending on how many there were. I’d started to feel the style needed a refresh. On a call with the marketing team, one of the marketers said the same thing: maybe it was time to try something new.",
        ],
      },
      {
        type: "paragraph",
        content: [
          "We’d already tried to automate this with ChatGPT before, and it didn’t work because the results were too inconsistent. This time I collected references and kept trying until it worked. I set up a project, asked ChatGPT to write documentation describing the new style, added the references, and tested it. When we presented it to the marketing team, they approved it right away. They now use it for the website blog and for LinkedIn.",
        ],
      },
      {
        type: "image",
        src: img(5),
        alt: "Previous illustration style",
        caption: "The previous illustration style, which had been in use for over a year",
      },
      {
        type: "image",
        src: img(6),
        alt: "New illustration style",
        caption: "A new illustration style that is now being used and created through automation",
      },
      {
        type: "paragraph",
        content: [
          "My most useful AI automation this year started as a failure. My whole path with prototypes started with one link in a chat and a few simple designs. So start really small, with the thought “I’ll do this just for fun and see what happens.”",
        ],
      },
    ],
  },
];

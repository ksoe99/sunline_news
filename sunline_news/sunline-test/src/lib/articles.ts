import type { BrandKey } from "./branding";

export interface Article {
  id: string;
  title: string;
  summary: string;
  brands: BrandKey[]; // which brands this article should appear on
}

export const articles: Article[] = [
  // 🌍 Shared across all brands
  {
    id: "ai-breakthroughs",
    title: "AI Breakthroughs: From Language Models to Reasoning Systems",
    summary:
      "A look at how artificial intelligence is evolving beyond text and into reasoning, planning, and creativity.",
    brands: ["sunline", "atlas", "skyline", "echo", "sovereign"],
  },
  {
    id: "future-of-search",
    title: "The Future of Search Engines in the Age of AI",
    summary:
      "With AI assistants reshaping how we find information, what happens to traditional search engines?",
    brands: ["sunline", "atlas", "echo"],
  },
  {
    id: "chip-race",
    title: "The Global Race for AI Chips",
    summary:
      "NVIDIA, AMD, and new startups are battling to provide the hardware backbone of artificial intelligence.",
    brands: ["atlas", "sovereign", "skyline"],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics: Who Controls the Future?",
    summary:
      "As AI systems become more powerful, questions of bias, transparency, and accountability grow louder.",
    brands: ["sunline", "sovereign", "echo"],
  },
  {
    id: "robotics-frontier",
    title: "Robotics on the Frontier of AI",
    summary:
      "From humanoid robots to warehouse automation, AI-driven robotics are moving from labs to real life.",
    brands: ["skyline", "atlas", "sunline"],
  },

  // 📰 Brand exclusives
  {
    id: "sunline-tabloid-ai",
    title: "AI Celebrity Deepfakes Rock the Media World",
    summary:
      "Shocking rise in AI-generated celebrity videos sparks debates over privacy, consent, and digital hoaxes.",
    brands: ["sunline"], // only Sunline News
  },
  {
    id: "atlas-space-ai",
    title: "Atlas Explores AI in Space Exploration",
    summary:
      "From Mars rovers to orbital simulations, AI is transforming humanity’s ambitions beyond Earth.",
    brands: ["atlas"], // only AtlasLive
  },
  {
    id: "sovereign-geopolitics-ai",
    title: "AI and Geopolitics: Who Owns the Future?",
    summary:
      "Governments are racing to regulate AI while leveraging it for defense, diplomacy, and surveillance.",
    brands: ["sovereign"], // only Sovereign Wire
  },
  {
    id: "skyline-smartcities",
    title: "Skyline Special: Smart Cities Powered by AI",
    summary:
      "Urban planning meets AI: from traffic optimization to energy grids, cities are getting smarter.",
    brands: ["skyline"], // only Skyline News
  },
  {
    id: "echo-culture-ai",
    title: "EchoLive: How AI is Reshaping Music and Culture",
    summary:
      "From AI-generated tracks to virtual pop stars, artificial intelligence is redefining entertainment.",
    brands: ["echo"], // only EchoLive
  },
];


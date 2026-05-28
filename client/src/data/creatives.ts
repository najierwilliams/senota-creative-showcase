// SENOTA Creative Showcase — Placeholder Creative Data
// Replace names, roles, bios, and images with real creatives when ready.
// Design: Contemporary Art Archive / Gallery Catalogue
// Colors: White ground, near-black type, SENOTA red (#CC0000) accents

export type Creative = {
  id: string;
  name: string;
  role: string;
  category: CategoryKey;
  location: string;
  since: string; // Year joined SENOTA
  bio: string;
  quote: string;
  tags: string[];
  credits: { title: string; type: string; year: string }[];
  social: { platform: string; handle: string }[];
  image: string;
  coverImage?: string;
};

export type CategoryKey =
  | "PERFORMANCE"
  | "PHOTOGRAPHY"
  | "SOUND"
  | "VISUALS"
  | "WRITING"
  | "MODELING"
  | "DIRECTION"
  | "BRANDING";

export type Category = {
  key: CategoryKey;
  label: string;
  description: string;
  code: string;
};

export const CATEGORIES: Category[] = [
  {
    key: "BRANDING",
    label: "Branding",
    description: "Identity designers, art directors, and brand strategists.",
    code: "BR",
  },
  {
    key: "DIRECTION",
    label: "Direction",
    description: "Creative directors, film directors, and show producers.",
    code: "DR",
  },
  {
    key: "MODELING",
    label: "Modeling",
    description: "Models, runway talent, and editorial faces.",
    code: "MD",
  },
  {
    key: "PERFORMANCE",
    label: "Performance",
    description: "Performers, dancers, actors, and spoken word artists.",
    code: "PF",
  },
  {
    key: "PHOTOGRAPHY",
    label: "Photography",
    description: "Photographers, cinematographers, and visual documentarians.",
    code: "PH",
  },
  {
    key: "SOUND",
    label: "Sound",
    description: "Musicians, producers, sound designers, and composers.",
    code: "SN",
  },
  {
    key: "VISUALS",
    label: "Visuals",
    description: "Visual artists, illustrators, motion designers, and painters.",
    code: "VS",
  },
  {
    key: "WRITING",
    label: "Writing",
    description: "Writers, poets, journalists, and editorial contributors.",
    code: "WR",
  },
];

const IMG1 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-profile-placeholder-1-5vc94AESCsQKLXQNjqs3pu.webp";
const IMG2 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-profile-placeholder-2-29JKC9TnS3Nq6VmqBH86Ea.webp";
const IMG3 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-profile-placeholder-3-MYVfRWX7BK9bLBJmWS2D48.webp";
const IMG4 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-profile-placeholder-4-Tw6pKCGGNxbR7J23ijZT7d.webp";

// Cycle through the 4 placeholder images
const IMGS = [IMG1, IMG2, IMG3, IMG4];
const img = (i: number) => IMGS[i % 4];

export const CREATIVES: Creative[] = [
  // ── BRANDING ──────────────────────────────────────────────────────────────
  {
    id: "amara-cole",
    name: "Amara Cole",
    role: "Brand Strategist",
    category: "BRANDING",
    location: "Atlanta, GA",
    since: "2026",
    bio: "Amara Cole is a brand strategist and visual identity designer whose work sits at the intersection of culture and commerce. She has developed brand systems for emerging fashion labels, music collectives, and independent publications. Her approach is rooted in narrative — every mark she creates tells a story before a single word is read.",
    quote: "A brand is not a logo. It is a promise made visible.",
    tags: ["Identity", "Strategy", "Typography", "Art Direction"],
    credits: [
      { title: "SENOTA Vol. 1 — Visual Identity", type: "Branding", year: "2026" },
      { title: "Noir Collective — Brand System", type: "Branding", year: "2025" },
      { title: "SENOTA Launch Campaign", type: "Art Direction", year: "2026" },
    ],
    social: [
      { platform: "Instagram", handle: "@amaracole.studio" },
      { platform: "Behance", handle: "amaracole" },
    ],
    image: img(0),
  },
  {
    id: "blake-osei",
    name: "Blake Osei",
    role: "Art Director",
    category: "BRANDING",
    location: "New York, NY",
    since: "2026",
    bio: "Blake Osei brings a bold, editorial sensibility to every brand he touches. Trained in graphic design and self-taught in motion, he bridges static identity and living systems — logos that breathe, palettes that shift, type that moves. His work has appeared in independent magazines across the East Coast.",
    quote: "Design is the first language people learn without knowing it.",
    tags: ["Motion", "Editorial", "Systems", "Typography"],
    credits: [
      { title: "SENOTA Magazine — Cover Direction", type: "Art Direction", year: "2026" },
      { title: "Pulse Records — Brand Refresh", type: "Branding", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@blakeosei.art" },
    ],
    image: img(1),
  },

  // ── DIRECTION ─────────────────────────────────────────────────────────────
  {
    id: "cassandra-veil",
    name: "Cassandra Veil",
    role: "Creative Director",
    category: "DIRECTION",
    location: "Los Angeles, CA",
    since: "2026",
    bio: "Cassandra Veil is a creative director known for her cinematic approach to editorial storytelling. She has directed campaigns, short films, and live shows that blur the line between fashion and fine art. Her work for SENOTA set the visual tone for the brand's inaugural season.",
    quote: "Every frame is a decision. Make it count.",
    tags: ["Film", "Editorial", "Fashion", "Concept"],
    credits: [
      { title: "SENOTA Vol. 1 — Creative Direction", type: "Direction", year: "2026" },
      { title: "Meridian Fashion Show", type: "Show Direction", year: "2025" },
      { title: "Void Magazine — Issue 12", type: "Creative Direction", year: "2024" },
    ],
    social: [
      { platform: "Instagram", handle: "@cassandraveil" },
      { platform: "Vimeo", handle: "cassandraveil" },
    ],
    image: img(2),
  },
  {
    id: "darius-stone",
    name: "Darius Stone",
    role: "Film Director",
    category: "DIRECTION",
    location: "Chicago, IL",
    since: "2026",
    bio: "Darius Stone directs short films, music videos, and documentary content that center Black creative culture. His visual language is intimate and unflinching — close frames, natural light, and subjects who feel entirely themselves. He joined SENOTA to document the brand's first year in real time.",
    quote: "I point the camera at truth and let it speak.",
    tags: ["Documentary", "Music Video", "Short Film", "Narrative"],
    credits: [
      { title: "SENOTA — Behind the Brand (Documentary)", type: "Direction", year: "2026" },
      { title: "Echoes — Short Film", type: "Direction", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@dariusstone.film" },
    ],
    image: img(3),
  },

  // ── MODELING ──────────────────────────────────────────────────────────────
  {
    id: "elena-marsh",
    name: "Elena Marsh",
    role: "Editorial Model",
    category: "MODELING",
    location: "Miami, FL",
    since: "2026",
    bio: "Elena Marsh is an editorial and commercial model whose presence commands attention without demanding it. She has walked for independent designers and appeared in regional publications before joining SENOTA's roster. Her work is defined by stillness — the ability to hold a frame and fill it completely.",
    quote: "Modeling is listening with your whole body.",
    tags: ["Editorial", "Commercial", "Runway", "Print"],
    credits: [
      { title: "SENOTA Vol. 1 — Cover", type: "Modeling", year: "2026" },
      { title: "Lumen Studio — Campaign", type: "Commercial", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@elenamarsh.model" },
    ],
    image: img(0),
  },
  {
    id: "felix-addo",
    name: "Felix Addo",
    role: "Runway Model",
    category: "MODELING",
    location: "Houston, TX",
    since: "2026",
    bio: "Felix Addo is a runway and editorial model with a background in dance that gives his movement an uncommon fluidity. He has worked with emerging designers across the South and is one of SENOTA's founding model roster members.",
    quote: "The runway is a stage. Every step is choreography.",
    tags: ["Runway", "Editorial", "Movement", "Fashion"],
    credits: [
      { title: "SENOTA Fashion Showcase — Spring 2026", type: "Runway", year: "2026" },
      { title: "Axis Collective — Show", type: "Runway", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@felixaddo" },
    ],
    image: img(1),
  },

  // ── PERFORMANCE ───────────────────────────────────────────────────────────
  {
    id: "grace-okafor",
    name: "Grace Okafor",
    role: "Spoken Word Artist",
    category: "PERFORMANCE",
    location: "Atlanta, GA",
    since: "2026",
    bio: "Grace Okafor is a poet and spoken word artist whose performances have moved audiences at venues from small Atlanta stages to national slam competitions. Her work explores identity, diaspora, and the body as archive. She performed at SENOTA's inaugural event and has since become one of the brand's most visible voices.",
    quote: "Every poem is a door. I just hold it open.",
    tags: ["Poetry", "Spoken Word", "Performance", "Slam"],
    credits: [
      { title: "SENOTA Launch Event — Live Performance", type: "Performance", year: "2026" },
      { title: "National Slam Circuit — Finalist", type: "Competition", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@graceokafor.words" },
    ],
    image: img(2),
  },
  {
    id: "hiro-tanaka",
    name: "Hiro Tanaka",
    role: "Dancer / Choreographer",
    category: "PERFORMANCE",
    location: "New York, NY",
    since: "2026",
    bio: "Hiro Tanaka is a contemporary dancer and choreographer whose work fuses street dance vocabularies with concert dance forms. He has choreographed for music videos, live shows, and gallery installations. His collaboration with SENOTA produced the movement direction for the brand's first fashion showcase.",
    quote: "Movement is the oldest language. I am still learning it.",
    tags: ["Contemporary", "Choreography", "Street Dance", "Installation"],
    credits: [
      { title: "SENOTA Fashion Showcase — Movement Direction", type: "Choreography", year: "2026" },
      { title: "Frequency Festival — Solo Performance", type: "Performance", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@hirotanaka.moves" },
    ],
    image: img(3),
  },

  // ── PHOTOGRAPHY ───────────────────────────────────────────────────────────
  {
    id: "imani-cross",
    name: "Imani Cross",
    role: "Photographer",
    category: "PHOTOGRAPHY",
    location: "Atlanta, GA",
    since: "2026",
    bio: "Imani Cross is a portrait and editorial photographer based in Atlanta. Her images are intimate and unhurried — she photographs people the way they want to be remembered. She has shot for independent publications and brands across the Southeast and is SENOTA's primary portrait photographer.",
    quote: "I don't take pictures. I make space for people to be seen.",
    tags: ["Portrait", "Editorial", "Documentary", "Fashion"],
    credits: [
      { title: "SENOTA Vol. 1 — Photography", type: "Photography", year: "2026" },
      { title: "Roots Magazine — Issue 4", type: "Editorial Photography", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@imanicross.photo" },
    ],
    image: img(0),
  },
  {
    id: "julian-reyes",
    name: "Julian Reyes",
    role: "Cinematographer",
    category: "PHOTOGRAPHY",
    location: "Miami, FL",
    since: "2026",
    bio: "Julian Reyes is a cinematographer and still photographer whose work spans music videos, short films, and editorial campaigns. He shoots on both digital and film, and his aesthetic — warm tones, deep shadows, and an eye for found light — is immediately recognizable.",
    quote: "Light is the subject. Everything else is context.",
    tags: ["Cinematography", "Film", "Music Video", "Editorial"],
    credits: [
      { title: "SENOTA — Brand Film", type: "Cinematography", year: "2026" },
      { title: "Meridian Records — Music Video Series", type: "Cinematography", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@julianreyes.lens" },
    ],
    image: img(1),
  },

  // ── SOUND ─────────────────────────────────────────────────────────────────
  {
    id: "kai-morrison",
    name: "Kai Morrison",
    role: "Music Producer",
    category: "SOUND",
    location: "Atlanta, GA",
    since: "2026",
    bio: "Kai Morrison is a producer, multi-instrumentalist, and sound designer whose catalog spans R&B, experimental hip-hop, and ambient electronic music. He produced the original score for SENOTA's launch event and has worked with independent artists across the country.",
    quote: "Sound is the architecture of feeling.",
    tags: ["Production", "R&B", "Experimental", "Score"],
    credits: [
      { title: "SENOTA Launch Event — Original Score", type: "Sound Design", year: "2026" },
      { title: "Various Artists — Produced 14 tracks", type: "Production", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@kaimorrison.sound" },
      { platform: "SoundCloud", handle: "kaimorrison" },
    ],
    image: img(2),
  },
  {
    id: "lena-voss",
    name: "Lena Voss",
    role: "Sound Designer",
    category: "SOUND",
    location: "New York, NY",
    since: "2026",
    bio: "Lena Voss creates immersive soundscapes for fashion shows, gallery installations, and film. Her work is textural and spatial — she thinks about sound the way an architect thinks about a room. She designed the audio environment for SENOTA's inaugural showcase.",
    quote: "Silence is a sound. I use it as much as anything else.",
    tags: ["Soundscape", "Installation", "Fashion Show", "Film"],
    credits: [
      { title: "SENOTA Fashion Showcase — Sound Design", type: "Sound Design", year: "2026" },
      { title: "Gallery 44 — Installation Sound", type: "Installation", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@lenavoss.sound" },
    ],
    image: img(3),
  },

  // ── VISUALS ───────────────────────────────────────────────────────────────
  {
    id: "marcus-bell",
    name: "Marcus Bell",
    role: "Visual Artist",
    category: "VISUALS",
    location: "Chicago, IL",
    since: "2026",
    bio: "Marcus Bell is a visual artist working across painting, digital illustration, and motion graphics. His work is rooted in Black American visual culture — bold color, symbolic imagery, and a graphic sensibility that bridges street art and fine art. He created the visual identity illustrations for SENOTA's first issue.",
    quote: "Every image I make is a conversation with the past.",
    tags: ["Illustration", "Painting", "Motion", "Identity"],
    credits: [
      { title: "SENOTA Vol. 1 — Illustrations", type: "Illustration", year: "2026" },
      { title: "Frequency Festival — Visual Identity", type: "Art Direction", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@marcusbell.art" },
    ],
    image: img(0),
  },
  {
    id: "nina-obi",
    name: "Nina Obi",
    role: "Motion Designer",
    category: "VISUALS",
    location: "Los Angeles, CA",
    since: "2026",
    bio: "Nina Obi is a motion designer and visual artist whose work lives on screens — social media, projection mapping, and digital installations. She brings a kinetic energy to static brands, making them feel alive. Her motion work for SENOTA's social channels helped define the brand's digital presence.",
    quote: "Still images dream. Motion is when they wake up.",
    tags: ["Motion Graphics", "Projection", "Social Media", "Digital"],
    credits: [
      { title: "SENOTA — Social Motion Package", type: "Motion Design", year: "2026" },
      { title: "Neon Collective — Projection Installation", type: "Installation", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@ninaobi.motion" },
    ],
    image: img(1),
  },

  // ── WRITING ───────────────────────────────────────────────────────────────
  {
    id: "omar-hayes",
    name: "Omar Hayes",
    role: "Editor-at-Large",
    category: "WRITING",
    location: "Atlanta, GA",
    since: "2026",
    bio: "Omar Hayes is a writer, editor, and cultural critic whose work has appeared in independent publications across the country. He joined SENOTA as Editor-at-Large for the inaugural issue, shaping the editorial voice of the magazine from its first page. His writing is sharp, generous, and always in service of the story.",
    quote: "Editing is the most invisible form of authorship.",
    tags: ["Editing", "Cultural Criticism", "Feature Writing", "Essay"],
    credits: [
      { title: "SENOTA Vol. 1 — Editor-at-Large", type: "Editorial", year: "2026" },
      { title: "The Current — Feature Writer", type: "Writing", year: "2024–2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@omarhayes.writes" },
      { platform: "Substack", handle: "omarhayes" },
    ],
    image: img(2),
  },
  {
    id: "priya-sen",
    name: "Priya Sen",
    role: "Poet & Essayist",
    category: "WRITING",
    location: "New York, NY",
    since: "2026",
    bio: "Priya Sen is a poet and essayist whose work explores the intersections of femininity, diaspora, and creative labor. Her essays have been published in literary journals and independent magazines, and her debut poetry collection is forthcoming. She contributed the centerpiece essay to SENOTA's first issue.",
    quote: "I write to find out what I already know.",
    tags: ["Poetry", "Essay", "Literary", "Diaspora"],
    credits: [
      { title: "SENOTA Vol. 1 — Centerpiece Essay", type: "Writing", year: "2026" },
      { title: "Meridian Literary Review — Poetry Feature", type: "Poetry", year: "2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@priyasen.writes" },
    ],
    image: img(3),
  },
  {
    id: "quinn-abara",
    name: "Quinn Abara",
    role: "Journalist",
    category: "WRITING",
    location: "Houston, TX",
    since: "2026",
    bio: "Quinn Abara is an independent journalist and culture writer covering music, fashion, and the creative economy. Their reporting is grounded in community — they write about artists from the inside, not the outside. Quinn's profile series for SENOTA introduced readers to ten emerging creatives in the brand's first year.",
    quote: "Every story I write is a record. I take that seriously.",
    tags: ["Journalism", "Profile Writing", "Music", "Culture"],
    credits: [
      { title: "SENOTA — Emerging Creatives Profile Series", type: "Journalism", year: "2026" },
      { title: "Frequency Magazine — Staff Writer", type: "Writing", year: "2024–2025" },
    ],
    social: [
      { platform: "Instagram", handle: "@quinnabara" },
      { platform: "Twitter/X", handle: "@quinnabara" },
    ],
    image: img(0),
  },
];

// Group creatives by category, sorted alphabetically within each group
export function getCreativesByCategory(): Record<CategoryKey, Creative[]> {
  const result = {} as Record<CategoryKey, Creative[]>;
  for (const cat of CATEGORIES) {
    result[cat.key] = CREATIVES.filter((c) => c.category === cat.key).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
  return result;
}

export function getCategoryInfo(key: CategoryKey): Category {
  return CATEGORIES.find((c) => c.key === key)!;
}

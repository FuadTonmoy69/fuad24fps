// ---- Work portfolio ----
export type WorkCat = "all" | "reels" | "motion" | "talking";

export interface WorkCard {
  videoId: string;
  title: string;
  desc: string;
  cat: Exclude<WorkCat, "all">;
  label: string;
  ariaLabel: string;
}

export const workCards: WorkCard[] = [
  // ---- Talking Head ----
  {
    videoId: "gpblMH_0vus",
    title: "AI website-builder reaction cut",
    desc: "Screen recording of an AI site builder paired with a facecam reaction — arrow-annotated callout text walks the viewer through the moment beat by beat.",
    cat: "talking",
    label: "Talking Head",
    ariaLabel: "Play AI website-builder reaction video",
  },
  {
    videoId: "GzvNAPVz_TM",
    title: "Client-win hook: \"It's easy\"",
    desc: "Bold hook-text opener paired with a payment-notification graphic and facecam reaction, built to sell a quick, believable win in the first frame.",
    cat: "talking",
    label: "Talking Head",
    ariaLabel: "Play client-win hook video",
  },
  {
    videoId: "C9JdTh_8BmI",
    title: "Direct-to-camera talking head",
    desc: "Solo piece-to-camera edit tightened with jump cuts and cutaways so pacing never sags.",
    cat: "talking",
    label: "Talking Head",
    ariaLabel: "Play talking-head edit",
  },
  {
    videoId: "vqH_t4U9ph4",
    title: "Talking-head Q&A cut",
    desc: "Conversational Q&A edit trimmed for pacing, with clean audio and subtle b-roll to break up the frame.",
    cat: "talking",
    label: "Talking Head",
    ariaLabel: "Play talking-head Q&A edit",
  },
  {
    videoId: "EDnR-RmiibU",
    title: "Podcast episode edit",
    desc: "Full-episode edit — trimmed dead air, leveled audio and multi-speaker pacing so the conversation carries itself.",
    cat: "talking",
    label: "Podcast Edit",
    ariaLabel: "Play podcast edit",
  },

  // ---- Reels ----
  {
    videoId: "188SpeIwJzc",
    title: "Podcast clip pulled for shorts",
    desc: "A moment lifted from a longer podcast recording, captioned and re-paced for vertical, sound-off scrolling.",
    cat: "reels",
    label: "Podcast/Reel",
    ariaLabel: "Play podcast reel clip",
  },
  {
    videoId: "8DM31A7l8VQ",
    title: "Reel with animated overlays",
    desc: "Vertical cut built for the first three seconds, with motion-graphic text and accents layered over the footage.",
    cat: "reels",
    label: "Reel/Motion",
    ariaLabel: "Play reel with motion graphics",
  },
  {
    videoId: "jWsBFFD6JL8",
    title: "Short-form reel with kinetic text",
    desc: "Hook-first vertical edit with animated captions and accent graphics tuned for scroll-stopping pacing.",
    cat: "reels",
    label: "Reel/Motion",
    ariaLabel: "Play reel with kinetic text",
  },
  {
    videoId: "Iy1zy9LX91s",
    title: "Podcast clip",
    desc: "A moment lifted from a longer podcast recording, captioned and re-paced for vertical, sound-off scrolling.",
    cat: "reels",
    label: "Podcast/Reel",
    ariaLabel: "Play podcast clip",
  },
  {
    videoId: "ksDzYT9Difk",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play reel",
  },
  {
    videoId: "z16pA7xrwqw",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play reel",
  },
  {
    videoId: "gDa_zR-sH_g",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play reel",
  },
  {
    videoId: "w7Llcn20bsA",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play reel",
  },
  {
    videoId: "Ry3uKwh0bCQ",
    title: "Bymexize-style reel",
    desc: "Vertical cut in the Bymexize style, paced for scroll-stopping shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play Bymexize style reel",
  },
  {
    videoId: "PXXBDroKML8",
    title: "Bymexize-style reel",
    desc: "Vertical cut in the Bymexize style, paced for scroll-stopping shorts.",
    cat: "reels",
    label: "Reels",
    ariaLabel: "Play Bymexize style reel",
  },

  // ---- Motion / SaaS ----
  {
    videoId: "pqrinfNFXzM",
    title: "Product feature walkthrough",
    desc: "Screen recording rebuilt with animated callouts and lower-thirds so a short feature tour reads at a glance.",
    cat: "motion",
    label: "SaaS Animation",
    ariaLabel: "Play SaaS animation",
  },
  {
    videoId: "lXs5zkOHFd4",
    title: "Landing-page explainer animation",
    desc: "Static product messaging turned into an animated explainer sequence built for a landing-page hero.",
    cat: "motion",
    label: "SaaS Animation",
    ariaLabel: "Play SaaS animation",
  },
];

// ---- Testimonials ----
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonialsRow1: Testimonial[] = [
  {
    quote: "Every long-form video comes back tighter than I expect — the pacing keeps people watching well past where I'd usually lose them.",
    name: "Amara Khalid",
    role: "YouTuber, Tech Channel",
    initials: "AK",
  },
  {
    quote: "Turnaround was faster than I expected and the pacing on the shorts actually held retention — best editor I've worked with.",
    name: "Jordan Mercer",
    role: "Podcast Host",
    initials: "JM",
  },
  {
    quote: "Sent over a rough product demo and got back something that actually looked like a launch video. Saved me a full day of editing.",
    name: "Riya Sharma",
    role: "Founder, SaaS Startup",
    initials: "RS",
  },
  {
    quote: "Handed over raw podcast audio and got back a full clip pack — captions, hooks, everything ready to post.",
    name: "Tom Lindqvist",
    role: "Content Creator",
    initials: "TL",
  },
];

export const testimonialsRow2: Testimonial[] = [
  {
    quote: "Our webinar recordings used to just sit there afterward. Now they get cut into a highlight reel that people actually watch.",
    name: "Priya Nair",
    role: "Marketing Lead",
    initials: "PN",
  },
  {
    quote: "Communication was easy even across time zones — async updates meant I never had to wait around for a call.",
    name: "Diego Vega",
    role: "Course Creator",
    initials: "DV",
  },
  {
    quote: "The captions and pacing on my shorts finally match how I actually talk on camera. Feels like my own voice, just tighter.",
    name: "Sarah Huang",
    role: "Newsletter Writer & Podcaster",
    initials: "SH",
  },
  {
    quote: "The AI talking-head edits looked cleaner than footage I've paid full production crews for.",
    name: "Marcus Chen",
    role: "Founder, AI Startup",
    initials: "MC",
  },
];

// ---- FAQ ----
export interface FaqItem {
  q: string;
  a: string;
  defaultOpen?: boolean;
}

export const faqs: FaqItem[] = [
  {
    q: "How fast do I get my videos back?",
    a: "Most single edits come back within 24–72 hours depending on length and package. Ongoing clients get a set delivery cadence agreed upfront.",
    defaultOpen: true,
  },
  {
    q: "How do I send you footage?",
    a: "A shared Google Drive folder works fine — raw files, screen recordings, whatever you've got. No re-encoding needed on your end.",
  },
  {
    q: "What if I don't like the first cut?",
    a: "Revisions are unlimited until you're happy. Notes come back as timestamped comments on a private review link.",
  },
  {
    q: "Can I build a custom package?",
    a: "Yes — book a call and we'll scope something around your actual posting schedule instead of forcing you into a fixed tier.",
  },
  {
    q: "Do you sign an NDA?",
    a: "Happy to, especially for unreleased product or brand work — just say so when we start.",
  },
];
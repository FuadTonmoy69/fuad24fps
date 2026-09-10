export type WorkCat = "talking" | "reels" | "motion";

export interface WorkCard {
  videoId: string;
  title: string;
  desc: string;
  cat: WorkCat;
  label: string;
}

export const workCards: WorkCard[] = [
  {
    videoId: "gpblMH_0vus",
    title: "AI website-builder reaction cut",
    desc: "Screen recording paired with a facecam reaction — arrow-annotated callout text walks the viewer through the moment beat by beat.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "GzvNAPVz_TM",
    title: "Client-win hook: \u201cIt\u2019s easy\u201d",
    desc: "Bold hook-text opener with a payment-notification graphic and facecam reaction, built to sell a quick win in the first frame.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "ZxuLQMvwgR8",
    title: "Your product needs better editing",
    desc: "Punchy pitch cut aimed at founders sitting on product footage they haven\u2019t used yet.",
    cat: "motion",
    label: "SaaS Animation",
  },
  {
    videoId: "OPAlriVzrYI",
    title: "Solaris AI SaaS video",
    desc: "AI SaaS product video built to elevate the brand \u2014 motion graphics over screen capture, graded to match.",
    cat: "motion",
    label: "SaaS Animation",
  },
  {
    videoId: "X067mvArEC0",
    title: "Podcast motion intro",
    desc: "A motion podcast intro built to grab attention before the first word lands.",
    cat: "motion",
    label: "Motion / Podcast",
  },
  {
    videoId: "UHhrMLhC35A",
    title: "UGC content",
    desc: "Script-to-screen UGC with no shoot hassle \u2014 you write the script, the rest is handled.",
    cat: "talking",
    label: "UGC / Talking Head",
  },
  {
    videoId: "fwsyE_xdavQ",
    title: "High-ticket sales breakdown",
    desc: "Clean hook and high-engagement pacing that carries viewers through the whole video.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "C9JdTh_8BmI",
    title: "Direct-to-camera talking head",
    desc: "Solo piece-to-camera edit tightened with jump cuts and cutaways so pacing never sags.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "vqH_t4U9ph4",
    title: "Talking-head Q&A cut",
    desc: "Conversational Q&A trimmed for pacing, with clean audio and subtle b-roll to break up the frame.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "EDnR-RmiibU",
    title: "Podcast episode edit",
    desc: "Full-episode edit \u2014 trimmed dead air, levelled audio and multi-speaker pacing.",
    cat: "talking",
    label: "Podcast Edit",
  },
  {
    videoId: "OZEze3QNTq4",
    title: "Money management",
    desc: "Talking-head cut with kinetic text and annotations layered to hold attention through a dense topic.",
    cat: "talking",
    label: "Talking Head",
  },
  {
    videoId: "188SpeIwJzc",
    title: "Podcast clip pulled for Shorts",
    desc: "A moment lifted from a longer podcast, captioned and re-paced for vertical, sound-off scrolling.",
    cat: "reels",
    label: "Podcast / Reel",
  },
  {
    videoId: "8DM31A7l8VQ",
    title: "Reel with animated overlays",
    desc: "Vertical cut with motion-graphic text and accents layered over the footage.",
    cat: "reels",
    label: "Reel / Motion",
  },
  {
    videoId: "jWsBFFD6JL8",
    title: "Short-form reel with kinetic text",
    desc: "Hook-first vertical edit with animated captions tuned for scroll-stopping pacing.",
    cat: "reels",
    label: "Reel / Motion",
  },
  {
    videoId: "Iy1zy9LX91s",
    title: "Podcast clip",
    desc: "A podcast moment captioned and re-paced for vertical, sound-off scrolling.",
    cat: "reels",
    label: "Podcast / Reel",
  },
  {
    videoId: "ksDzYT9Difk",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "z16pA7xrwqw",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "gDa_zR-sH_g",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "w7Llcn20bsA",
    title: "Short-form reel",
    desc: "Vertical cut built for the first three seconds, paced for the scroll on Shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "Ry3uKwh0bCQ",
    title: "Bymexize-style reel",
    desc: "Vertical cut in the Bymexize style, paced for scroll-stopping shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "PXXBDroKML8",
    title: "Bymexize-style reel",
    desc: "Vertical cut in the Bymexize style, paced for scroll-stopping shorts.",
    cat: "reels",
    label: "Reels",
  },
  {
    videoId: "pqrinfNFXzM",
    title: "Product feature walkthrough",
    desc: "Screen recording rebuilt with animated callouts so a short feature tour reads at a glance.",
    cat: "motion",
    label: "SaaS Animation",
  },
  {
    videoId: "lXs5zkOHFd4",
    title: "Landing-page explainer animation",
    desc: "Static product messaging turned into an animated explainer built for a landing-page hero.",
    cat: "motion",
    label: "SaaS Animation",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonialsRow1: Testimonial[] = [
  {
    quote:
      "Every long-form video comes back tighter than I expect \u2014 the pacing keeps people watching well past where I\u2019d usually lose them.",
    name: "Amara Khalid",
    role: "YouTuber, Tech Channel",
    initials: "AK",
  },
  {
    quote:
      "Turnaround was faster than I expected and the pacing on the shorts actually held retention \u2014 best editor I\u2019ve worked with.",
    name: "Jordan Mercer",
    role: "Podcast Host",
    initials: "JM",
  },
  {
    quote:
      "Sent over a rough product demo and got back something that actually looked like a launch video. Saved me a full day of editing.",
    name: "Riya Sharma",
    role: "Founder, SaaS Startup",
    initials: "RS",
  },
  {
    quote:
      "Handed over raw podcast audio and got back a full clip pack \u2014 captions, hooks, everything ready to post.",
    name: "Tom Lindqvist",
    role: "Content Creator",
    initials: "TL",
  },
];

export const testimonialsRow2: Testimonial[] = [
  {
    quote:
      "Our webinar recordings used to just sit there afterward. Now they get cut into a highlight reel that people actually watch.",
    name: "Priya Nair",
    role: "Marketing Lead",
    initials: "PN",
  },
  {
    quote:
      "Communication was easy even across time zones \u2014 async updates meant I never had to wait around for a call.",
    name: "Diego Vega",
    role: "Course Creator",
    initials: "DV",
  },
  {
    quote:
      "The captions and pacing on my shorts finally match how I actually talk on camera. Feels like my own voice, just tighter.",
    name: "Sarah Huang",
    role: "Newsletter Writer & Podcaster",
    initials: "SH",
  },
  {
    quote:
      "The AI talking-head edits looked cleaner than footage I\u2019ve paid full production crews for.",
    name: "Marcus Chen",
    role: "Founder, AI Startup",
    initials: "MC",
  },
];

export interface FaqItem {
  q: string;
  a: string;
  defaultOpen?: boolean;
}

export const faqs: FaqItem[] = [
  {
    q: "How fast do I get my videos back?",
    a: "Most single edits come back within 24\u201372 hours depending on length and package. Ongoing clients get a set delivery cadence agreed upfront.",
    defaultOpen: true,
  },
  {
    q: "How do I send you footage?",
    a: "A shared Google Drive folder works fine \u2014 raw files, screen recordings, whatever you\u2019ve got. No re-encoding needed on your end.",
  },
  {
    q: "What if I don\u2019t like the first cut?",
    a: "Revisions are unlimited until you\u2019re happy. Notes come back as timestamped comments on a private review link.",
  },
  {
    q: "Can I build a custom package?",
    a: "Yes \u2014 book a call and we\u2019ll scope something around your actual posting schedule instead of forcing you into a fixed tier.",
  },
  {
    q: "Do you sign an NDA?",
    a: "Happy to, especially for unreleased product or brand work \u2014 just say so when we start.",
  },
];

export const SITE = {
  name: "FUAD24FPS",
  handle: "fuad24fps",
  email: "Fuadhasan24fps@gmail.com",
  url: "",
} as const;

import type { TrustResult } from "../types";

/** Simple deterministic string hash (FNV-1a variant). */
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Seeded pseudo-random number generator (mulberry32). Deterministic per seed. */
function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clampScore = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

interface Tier {
  min: number;
  max: number;
  label: string;
  emoji: string;
  colorClass: string;
  ringClass: string;
  descriptions: Array<(name: string) => string>;
}

const TIERS: Tier[] = [
  {
    min: 90,
    max: 100,
    label: "Certified Real Friend",
    emoji: "🏆",
    colorClass: "from-emerald-400 to-teal-500",
    ringClass: "text-emerald-500",
    descriptions: [
      (n) => `Looks like ${n} is probably the friend who actually shows up when you need them.`,
      (n) => `${n} would 100% help you move apartments. No excuses, no ghosting.`,
      (n) => `Rare species detected: ${n} replies to texts AND remembers your birthday.`,
    ],
  },
  {
    min: 75,
    max: 89,
    label: "Pretty Trustworthy",
    emoji: "😎",
    colorClass: "from-sky-400 to-indigo-500",
    ringClass: "text-sky-500",
    descriptions: [
      (n) => `${n} is solid. A few mysterious disappearances, but mostly dependable.`,
      (n) => `You can trust ${n} with your secrets, maybe not with your last fries.`,
      (n) => `${n} shows up 9 times out of 10. That's basically best-friend territory.`,
    ],
  },
  {
    min: 60,
    max: 74,
    label: "Friendship Under Review",
    emoji: "👀",
    colorClass: "from-amber-300 to-yellow-500",
    ringClass: "text-amber-500",
    descriptions: [
      (n) => `${n} is... fine? The council is still deliberating on this one.`,
      (n) => `Jury's still out on ${n}. Could go either way, honestly.`,
      (n) => `${n} double-texts only when they need something. Suspicious, yet forgivable.`,
    ],
  },
  {
    min: 40,
    max: 59,
    label: "Proceed With Caution",
    emoji: "⚠️",
    colorClass: "from-orange-400 to-amber-600",
    ringClass: "text-orange-500",
    descriptions: [
      (n) => `${n} left you on read for three days, then acted totally normal. Hmm.`,
      (n) => `${n} might be a "we'll see" kind of friend. Keep your snacks hidden.`,
      (n) => `There are red flags with ${n} here. Not a bonfire yet, but definitely red flags.`,
    ],
  },
  {
    min: 20,
    max: 39,
    label: "Something Feels Suspicious",
    emoji: "😭",
    colorClass: "from-rose-400 to-pink-600",
    ringClass: "text-rose-500",
    descriptions: [
      (n) => `${n} only shows up in your group chats, never in real life. Curious.`,
      (n) => `Something feels off about ${n} lately. Trust your gut on this one.`,
      (n) => `${n} is giving "seen at 2:14pm, no reply" energy. Not great.`,
    ],
  },
  {
    min: 0,
    max: 19,
    label: "RUN.",
    emoji: "🚨",
    colorClass: "from-red-500 to-rose-700",
    ringClass: "text-red-500",
    descriptions: [
      (n) => `${n} is giving major "borrowed your charger and vanished" energy.`,
      (n) => `Abort mission. ${n} is not friendship material today.`,
      (n) => `${n} would absolutely let you walk into the glass door. RUN.`,
    ],
  },
];

function pickTier(score: number): Tier {
  return TIERS.find((tier) => score >= tier.min && score <= tier.max) ?? TIERS[2];
}

/**
 * Generates a fully deterministic, entertainment-only "trust result" for a given name.
 * The same name will always produce the same score and message.
 */
export function generateTrustResult(rawName: string): TrustResult {
  const name = rawName.trim().replace(/\s+/g, " ");
  const seed = hashString(name.toLowerCase());
  const random = mulberry32(seed);

  const score = clampScore(random() * 100);
  const loyalty = clampScore(score + (random() * 30 - 15));
  const trust = clampScore(score + (random() * 24 - 12));
  const replySpeed = clampScore(score * 0.6 + random() * 40);
  const dramaLevel = clampScore(100 - score + (random() * 30 - 15));

  const tier = pickTier(score);
  const descIndex = Math.floor(random() * tier.descriptions.length);
  const description = tier.descriptions[descIndex](name);

  return {
    name,
    score,
    trustLevel: `${tier.label} ${tier.emoji}`,
    emoji: tier.emoji,
    colorClass: tier.colorClass,
    description,
    indicators: [
      { label: "Loyalty", value: loyalty },
      { label: "Trust", value: trust },
      { label: "Reply Speed", value: replySpeed },
      { label: "Drama Level", value: dramaLevel },
    ],
    timestamp: Date.now(),
  };
}

export function getRingClass(score: number): string {
  return pickTier(score).ringClass;
}

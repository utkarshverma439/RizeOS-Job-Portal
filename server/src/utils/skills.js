export const KNOWN_SKILLS = [
  "react","node","express","mongodb","postgresql","python","javascript",
  "typescript","tailwind","docker","kubernetes","aws","gcp","azure",
  "solidity","rust","ethers","web3","nlp","pytorch","tensorflow","nextjs",
  "redux","vite","hardhat","mocha","chai"
];

export function extractSkills(text = "") {
  const bag = new Set();
  const lower = text.toLowerCase();
  for (const s of KNOWN_SKILLS) {
    const re = new RegExp(`\\b${s}\\b`, "i");
    if (re.test(lower)) bag.add(s);
  }
  return Array.from(bag);
}

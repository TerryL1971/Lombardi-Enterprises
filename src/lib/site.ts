// Single source of truth for site identity — meta tags, JSON-LD, and the
// footer all read from here so they never disagree.

export const site = {
  name: 'Lombardi Enterprises',
  shortName: 'Lombardi',
  founder: 'Terry Lombardi',
  domain: 'terrell-lombardi.de',
  url: 'https://terrell-lombardi.de',
  email: 'hello@terrell-lombardi.de',
  tagline: 'Websites and apps for businesses serving people far from home.',
  description:
    'Lombardi Enterprises is the studio of Terry Lombardi — a developer and 20-year business operator building fast, modern websites and apps, with a focus on expat-, relocation-, and U.S. military-facing businesses in Germany.',
  location: 'Stuttgart region, Germany',
  socials: {
    github: 'https://github.com/TerryL1971',
    linkedin: 'https://www.linkedin.com/in/terry-c-lombardi/',
  },
};

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

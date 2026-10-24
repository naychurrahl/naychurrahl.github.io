// About page content. Edit freely: the page lays itself out from this file.
// DRAFT: written from what's already on the site; check every line.

export const hero = {
  title: 'We build the online side of real businesses.',
  intro: 'Naychur Rahl LTD is a remote team building websites, online stores and custom software for startups, retailers and NGOs in Abuja, Lagos and worldwide.',
};

export const story = {
  heading: 'Built for businesses that need more than a template.',
  paragraphs: [
    'We started Naychur Rahl to give growing businesses technology that actually fits the way they work. Instead of squeezing every client into the same template, we build websites, online stores and systems around real workflows, with security considered from the very first line of code.',
    "We don't just build commerce, we run it. Our own marketplace at store.naychurrahl.com.ng is built and operated by the same team, so we know first-hand what it takes to keep products, payments, orders and customers running smoothly every day.",
    'Working remotely lets us serve clients wherever they are, from Abuja and Lagos to businesses abroad, with the same clear process, written scope and ongoing support.',
  ],
  mission: 'Our mission: make reliable, well-built technology accessible to growing businesses.',
};

export const values = [
  { title: 'Custom-built', text: 'Your technology follows your process, not someone else\'s template, with room to add features as you grow.' },
  { title: 'Security-minded', text: 'Authentication, permissions, patching and data protection are considered from the start, not bolted on later.' },
  { title: 'Business-focused', text: 'Every feature has to earn its place: help you sell, operate or serve customers better.' },
  { title: 'Remote-first', text: 'A distributed team that works with clients across Nigeria and worldwide, with clear communication throughout.' },
  { title: 'Clear pricing', text: 'Published packages and 3- or 4-installment payment plans, so you know what you\'re paying for.' },
  { title: 'Scope, then support', text: 'A written scope within 2 business days before we build, and maintenance plans once you\'re live.' },
];

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string; // full image URL; initials are shown when missing
  link?: string; // e.g. LinkedIn or GitHub profile
}

// The Team section stays hidden until at least one person is added.
export const team: TeamMember[] = [
  {
    name: 'Full Name',
    role: 'Founder & Lead Developer',
    bio: 'One or two sentences about this person.',
    photo: 'https://…/photo.jpg',
    link: 'https://www.linkedin.com/in/…',
  },
];

// Shown in the proof strip next to the live project count from the CMS.
export const facts = [
  { value: 'Abuja · Lagos', label: 'and clients worldwide' },
  { value: '3–5 weeks', label: 'typical store delivery' },
  { value: '3–4', label: 'installment payment plans' },
];

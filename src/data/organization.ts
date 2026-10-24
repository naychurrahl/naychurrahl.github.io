// Organization structured data, shared by Home and About.
export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Naychur Rahl LTD',
  url: 'https://naychurrahl.com.ng/',
  image: 'https://naychurrahl.com.ng/og-image.png',
  description: 'Business websites, online stores and custom software for startups, retailers and NGOs.',
  email: 'support@naychurrahl.com.ng',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+2348111384392',
    email: 'support@naychurrahl.com.ng',
  },
  areaServed: [
    { '@type': 'City', name: 'Abuja' },
    { '@type': 'City', name: 'Lagos' },
    { '@type': 'Country', name: 'Nigeria' },
    'Worldwide',
  ],
  sameAs: ['https://github.com/naychurrahl'],
};

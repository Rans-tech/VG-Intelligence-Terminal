export interface VariantMeta {
  title: string;
  description: string;
  keywords: string;
  url: string;
  siteName: string;
  shortName: string;
  subject: string;
  classification: string;
  categories: string[];
  features: string[];
}

export const VARIANT_META: { full: VariantMeta; [k: string]: VariantMeta } = {
  full: {
    title: 'Veritas Global Intelligence Terminal',
    description: 'Real-time global intelligence terminal with live incident monitoring, risk analysis, and strategic intelligence for LATAM, MENA, and Sub-Saharan Africa.',
    keywords: 'global intelligence, risk intelligence, geopolitical dashboard, threat monitoring, OSINT, conflict tracking, maritime intelligence, strategic risk, LATAM, MENA, Sub-Saharan Africa, Veritas Global',
    url: 'https://intel.veritasglobal.co/',
    siteName: 'Veritas Global Intelligence Terminal',
    shortName: 'Veritas Intel',
    subject: 'Real-Time Global Risk Intelligence and Situation Awareness',
    classification: 'Intelligence Terminal, Risk Analysis, OSINT Platform',
    categories: ['news', 'security', 'intelligence'],
    features: [
      'Real-time global incident monitoring',
      'Veritas risk analysis and escalation indicators',
      'Strategic theater views for LATAM, MENA, and Sub-Saharan Africa',
      'Operational impact assessments and decision guidance',
      'Armed conflict and protest tracking (ACLED)',
      'Maritime vessel tracking and chokepoint monitoring',
      'Military flight monitoring',
      'Satellite fire detection',
      'Infrastructure and cyber incident monitoring',
      'AI-powered intelligence synthesis',
      'Global Risk Index scoring',
      'Strategic chokepoint analysis',
    ],
  },
};

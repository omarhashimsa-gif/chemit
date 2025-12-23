
export interface ElementData {
  number: number;
  symbol: string;
  name: { en: string; ar: string };
  weight: string;
  category: string;
  discoverer: { en: string; ar: string };
  danger: { en: string; ar: string };
  electronConfiguration: string;
  shells: number[];
  summary: { en: string; ar: string };
  xpos: number;
  ypos: number;
  // New scientific properties
  phase: { en: string; ar: string };
  meltingPoint: string;
  boilingPoint: string;
  electronegativity: string;
  year: string;
  density: string;
}

export type Language = 'en' | 'ar';

export interface Translation {
  title: string;
  subtitle: string;
  atomicNumber: string;
  atomicWeight: string;
  discoverer: string;
  danger: string;
  electronConfig: string;
  shells: string;
  category: string;
  description: string;
  close: string;
  designedBy: string;
  rakiz: string;
  chemist: string;
  // New labels
  phase: string;
  meltingPoint: string;
  boilingPoint: string;
  electronegativity: string;
  year: string;
  density: string;
}

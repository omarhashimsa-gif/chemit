
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
  phase: { en: string; ar: string };
  meltingPoint: string;
  boilingPoint: string;
  electronegativity: string;
  year: string;
  density: string;
}

export type Language = 'en' | 'ar';
export type ViewState = 'table' | 'balancer' | 'forum' | 'dashboard' | 'auth' | 'lab';

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
  reaction: string;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
  avatar?: string;
}

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
  phase: string;
  meltingPoint: string;
  boilingPoint: string;
  electronegativity: string;
  year: string;
  density: string;
  balancer: string;
  forum: string;
  balanceBtn: string;
  placeholderEquation: string;
  rakizForum: string;
  community: string;
  login: string;
  logout: string;
  comments: string;
  addComment: string;
  opinion: string;
  dashboard: string;
  labMode: string;
  performReaction: string;
  selectChemicals: string;
  observation: string;
}

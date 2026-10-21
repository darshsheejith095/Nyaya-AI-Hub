export type TabId = 'home' | 'courts' | 'deJargonizer' | 'rights' | 'codex';

export interface CourtNode {
  id: string;
  name: string;
  level: number;
  jurisdiction: string[];
  caseTypes: string[];
  description: string;
  appealFlow: { step: number; title: string; detail: string }[];
  children: CourtNode[];
}

export interface LegalTerm {
  id: number;
  term: string;
  root: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  explanation: string;
  analogy: string;
  example: string;
}

export interface RightEntry {
  id: string;
  article: string;
  title: string;
  category: 'Fundamental Rights' | 'Fundamental Duties' | 'Writs & Remedies' | 'Arrest & Bail';
  plainEnglish: string;
  whenToInvoke: string;
}

export interface LandmarkCase {
  id: string;
  name: string;
  year: string;
  summary: string;
  topic: string;
}

export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  text: string;
}

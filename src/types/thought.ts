
export interface Thought {
  id: string;
  content: string;
  timestamp: number;
  resonanceLevel?: number;
  semanticFields?: string[];
  connections?: string[];
}

export interface ResonancePattern {
  ebene: string;
  ton: string;
  tiefe: number;
}

export interface LexikonItem {
  begriff: string;
  bedeutung: string;
  domänen: string[];
  verwandte: string[];
  metaschicht: string;
}

export interface ZielgruppeEntity {
  name: string;
  kognitiv: number;
  intentional: number;
  resonant: number;
  zugang: string;
}

export interface TransformedSyntax {
  original: string;
  transformed: string;
  zielsyntax: string;
  confidence: number;
}

export interface MetaInterfaceSystem {
  name: string;
  modus: string;
  vertrauen: number;
  inputfilter: string;
  sicherheit: string;
}

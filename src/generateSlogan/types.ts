export type WordType =
  | "noun"
  | "verb"
  | "adjective"

export type Gender = 'masculine' | 'feminine' | 'neuter';

export type Count = 'singular' | 'plural';

export type CountMap = {
  singular: string;
  plural: string;
};

export type Case =
  | "nominative"
  | "genitive"
  | "dative"
  | "accusative"
  | "locative"
  | "instrumental"

export type CaseMap = Record<Case, CountMap>;

export interface Noun {
  word: string;
  type: "noun",
  gender: Gender;
  pluralAdjGender?: Gender;
  model?: string;
  cases: CaseMap;
}

export type Tense = 'present' | 'future';

export type Person =
  | "firstPerson"
  | "secondPerson"
  | "thirdPerson"

export interface Verb {
  word: string;
  type: "verb",
  pronoun?: 'sa' | 'si',
  nounCase?: Case,
  objectCase?: Case,
  subjectCase?: Case,
  present: {
    firstPerson: CountMap;
    secondPerson: CountMap;
    thirdPerson: CountMap;
  };
  future: {
    firstPerson: CountMap;
    secondPerson: CountMap;
    thirdPerson: CountMap;
  };
}

export interface Adjective {
  word: string;
  type: "adjective",
  masculine: CaseMap;
  feminine: CaseMap;
  neuter: CaseMap;
}

export type WordDefinition = Noun | Verb | Adjective;

export interface FormattingConfig {
  gender?: Gender;
  caseKey?: Case;
  personKey?: Person;
  countKey?: Count;
}

export interface FormattedWord extends FormattingConfig {
  value: string;
  word: WordDefinition;
}

export type TemplateWordType = 
  | "subject"
  | "object"
  | "verb"
  | "custom"

export interface TemplateDef {
  types: TemplateWordType[];
  cases?: Case[];
  preferVerbCaseOverride?: boolean;
  persons?: Person[][];
  counts?: (Count | null)[];
  customWords?: (string | WordDefinition)[][];
}

export interface Template {
  types: TemplateWordType[];
  cases: Case[];
  persons: Person[][];
  counts: (Count | null)[];
  customWords: (string | WordDefinition)[][];
}
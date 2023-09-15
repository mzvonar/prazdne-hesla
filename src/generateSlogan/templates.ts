import { TemplateDef } from './types.ts';

const specials: string[] = [
  'do každej rodiny',
  'každému',
];

const modifiers: string[] = [
  'ani',
  'len',
  'iba',
];

const templates: TemplateDef[] = [
  {
    types: ["subject", "object"],
    cases: ["nominative", "dative"],
  },
  {
    types: ["object", "subject"],
    cases: ["dative", "nominative"],
  },
  {
    types: ["verb", "subject"],
    persons: [['firstPerson']],
  },
  {
    types: ["subject", "verb"],
    persons: [['firstPerson']],
  },
  {
    types: ["object", "verb", "subject"],
    cases: ["dative", "accusative"],
    preferVerbCaseOverride: true,
    persons: [['firstPerson']],
  },
  {
    types: ["verb", "object", "subject"],
    cases: ["dative", "accusative"],
    persons: [['firstPerson']],
  },
  {
    types: ["custom", "subject"],
    cases: ["nominative"],
    customWords: [specials],
  },
  {
    types: ["subject", "custom"],
    cases: ["nominative"],
    customWords: [specials],
  },
  {
    types: ["subject"],
    cases: ["nominative"],
  },
  {
    types: ["object", "custom", "subject"],
    cases: ["dative", "accusative"],
    counts: [null, null, 'singular'],
    customWords: [modifiers],
  },
  {
    types: ["subject", "custom"],
    cases: ["nominative"],
    customWords: [['!', '?', '...']],
    removeLastSpace: true,
  },
  {
    types: ["object", "custom", "subject"],
    cases: ["dative", "accusative"],
    counts: [null, 'singular'],
    customWords: [modifiers],
  },
];

export default templates;
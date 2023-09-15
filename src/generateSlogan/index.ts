// @ts-nocheck TODO: Fix types
import debugFactory from 'debug';
import {
  WordDefinition,
  Noun,
  Verb,
  Adjective,
  WordType,
  Template,
  TemplateWordType,
  FormattingConfig,
  FormattedWord, TemplateDef,
} from './types';
import nouns from './nouns';
import verbs from './verbs';
import adjectives from './adjectives';
import { applyModel } from './models';
import templates from './templates.ts';

const debug = debugFactory('app:generateSlogan');
const ADJECTIVE_CHANCE = 0.5;

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function templateToWordType(value: TemplateWordType): WordType {
  switch (value) {
    case "subject":
    case "object":
      return "noun"
    default:
      return value;
  }
}

function getRandomBool(chance = 0.5) {
  if (chance < 0) {
    throw new Error('Chance must be greater or equal to zero');
  }

  if (chance > 1) {
    throw new Error('Chance must be lower or equal to 1');
  }

  return Math.random() < chance;
}

function getRandomItem<T>(arr: T[], overrideIndex?: number): T {
  const randomIndex = overrideIndex || Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  if (!item) {
    throw new Error(`Couldn't get random item at index ${randomIndex}`);
  }

  return item;
}

function getRandomTemplate(overrideIndex?: number): Template {
  const template = getRandomItem(templates, overrideIndex);

  return {
    ...template,
    cases: template.cases || [],
    persons: template.persons || [],
    counts: template.counts || [],
    customWords: template.customWords || [],
  }
}

function getRandomNoun(nouns: Noun[]): Noun {
  return getRandomItem(nouns);
}

function getRandomVerb(verbs: Verb[]): Verb {
  return getRandomItem(verbs);
}

function getRandomAdjective(adjectives: Adjective[]): Adjective {
  return getRandomItem(adjectives);
}

function formatNoun(noun: Noun, adjectives: Adjective[], { caseKey, countKey }: FormattingConfig): FormattedWord {
  const words = [];
  const _caseKey: Case = caseKey || "nominative";
  const _countKey: Count = countKey || getRandomItem(["singular", "plural"]);

  debug('==getNoun==');
  debug("noun word: ", noun.word);
  debug("gender: ", noun.gender);
  debug("model: ", noun.model);
  debug("caseKey: ", _caseKey);
  debug("customCaseKey: ", caseKey);
  debug("countKey: ", _countKey);
  debug("customCountKey: ", countKey);

  const cases = noun.cases;
  const word = cases[_caseKey][_countKey];
  debug("word: ", word);


  // Get adjective
  if (getRandomBool(ADJECTIVE_CHANCE)) {
    const gender = _countKey === 'plural' ? (noun.pluralAdjGender || noun.gender) : noun.gender
    const adjective = getAdjective(adjectives, noun.model, { gender, caseKey: _caseKey, countKey: _countKey });
    words.push(adjective.value);
  }

  words.push(word);

  return {
    word: noun,
    value: words.join(" "),
    gender: noun.gender,
    caseKey: _caseKey,
    countKey: _countKey,
  }
}

function formatVerb(verb: Verb, { personKey, countKey }: FormattingConfig, isFirst = true): FormattedWord {
  const tenseKey: Tense = getRandomItem(["present", "future"]);
  const _personKey: Person = personKey || getRandomItem(["firstPerson", "secondPerson", "thirdPerson"]);
  const _countKey: Count = countKey || getRandomItem(["singular", "plural"]);

  debug('==getVerb==');
  debug("verb word: ", verb.word);
  debug("tenseKey: ", tenseKey);
  debug("personKey: ", _personKey);
  debug("customPersonKey: ", personKey);
  debug("countKey: ", _countKey);
  debug("customCountKey: ", countKey);

  const word = verb[tenseKey][_personKey][_countKey];
  debug("word: ", word);

  let value = word;

  if (verb.pronoun) {
    if (isFirst) {
      value += ' ' + verb.pronoun;
    } else {
      value = verb.pronoun + ' ' + value;
    }
  }

  return {
    word: verb,
    value,
    personKey: _personKey,
    countKey: _countKey,
  }
}

function formatAdjective(adjective: Adjective, { gender, caseKey, countKey }: FormattingConfig): FormattedWord {
  debug('==getAdjective==');
  debug("adjective word: ", adjective.word);
  debug("gender: ", gender);
  debug("caseKey: ", caseKey);
  debug("countKey: ", countKey);

  const word = adjective[gender][caseKey][countKey];

  debug("word: ", word);

  return {
    word: adjective,
    value: word,
    gender,
    countKey,
  };
}

function formatWord(word: WordDefinition, adjectives, formattingConfig: FormattingConfig, isFirst: boolean) {
  switch (word.type) {
    case 'noun':
      return formatNoun(word, adjectives, formattingConfig);
    case 'verb':
      return formatVerb(word, formattingConfig, isFirst);
    case 'adjective':
      return formatAdjective(word, formattingConfig);
    default:
      throw new Error(`Can't get random word of type ${type}`);
  }
}

function getNoun(nouns: Noun[], adjectives: Adjective[], formattingConfig: FormattingConfig): FormattedWord {
  const noun = getRandomNoun(nouns);

  return formatNoun(noun, adjectives, formattingConfig);
}

function getVerb(verbs: Verb[], formattingConfig: FormattingConfig, isFirst = true): FormattedWord {
  const verb = getRandomVerb(verbs);

  return formatVerb(verb, formattingConfig, isFirst);
}

function getAdjective(adjectives: Adjective[], modelType: string | undefined, formattingConfig: FormattingConfig): FormattedWord {
  const adjective = getRandomAdjective(adjectives);
  const updatedAdjective = applyModel(modelType, adjective);

  return formatAdjective(updatedAdjective, formattingConfig);
}

function makeGetRandomWord(nouns: Noun[], verbs: Verb[], adjectives: Adjective[]) {
  return (type: WordType) => {
    switch (type) {
      case 'noun':
        return getRandomItem(nouns);
      case 'verb':
        return getRandomItem(verbs);
      case 'adjective':
        return getRandomItem(adjectives);
      default:
        throw new Error(`Can't get random word of type ${type}`);
    }
  }
}

const getTemplateId = (template: TemplateDef | Template): string => {
  return template.types.join('-');
}

const removeLastSpace = (str: string): string => {
  const words = str.split(' ');

  return [
    ...words.slice(0, -2),
    words.slice(-2).join('')
  ].join(' ');
}

function generateSentenceFromTemplate(getRandomWord: () => WordDefinition, template: Template) {
  debug('============');
  debug('==template: ', template.types.join('-'), '==');

  const customWords = template.customWords.slice();
  const wordDefinitions: (WordDefinition & { templateWordType: TemplateWordType })[] = template.types.map((templateWordType) => {
    if(templateWordType === 'custom') {
      const words = customWords.pop();

      if(!words) {
        throw new Error(`No custom words defined for template ${getTemplateId(template)}`);
      }

      const value = getRandomItem(words);

      const word = typeof value === 'string' ? { type: 'custom', value } : value;

      return {
        ...word,
        templateWordType,
      };
    }
    else {
      const wordType = templateToWordType(templateWordType);

      const word = getRandomWord(wordType);

      return {
        ...word,
        templateWordType,
      };
    }
  });

  const words: FormattedWord & { templateWordType: TemplateWordType }[] = [];
  const cases = template.cases.slice();
  const counts = template.counts.slice();
  const persons = template.persons.slice();

  for (const [indexStr, wordDef] of Object.entries(wordDefinitions)) {
    const templateWordType = wordDef.templateWordType;

    const templateCountKey = counts.shift();

    if (wordDef.type === 'custom') {
      words.push({
        ...wordDef,
        templateWordType,
      });

      continue;
    }

    const index = parseInt(indexStr, 10);
    const wordType = wordDef.type;
    const previousWordDef = wordDefinitions[index - 1];
    const nextWordDef = wordDefinitions[index + 1];
    const previousWord = words[words.length - 1];
    const templateCaseKey = wordType === 'noun' ? cases.shift() : undefined;
    const templatePersonKeys = wordType === 'verb' ? persons.shift() : undefined;

    debug(`==Word: ${templateWordType}==`);
    debug('templateCaseKey', templateCaseKey);
    debug('templatePersonKeys', templatePersonKeys)


    const getCaseKey = () => {
      const connectedVerb = nextWordDef?.type === 'verb' ? nextWordDef : (previousWordDef?.type === 'verb' ? previousWordDef : undefined);
      debug('connectedVerb', connectedVerb?.word)

      if (templateWordType === 'subject' && connectedVerb?.nounCase && !templateCaseKey) {
        if (connectedVerb) {
          return connectedVerb.nounCase;
        }
      }

      if (templateWordType === 'object' && (!templateCaseKey || template.preferVerbCaseOverride)) {
        if (connectedVerb?.objectCase) {
          return connectedVerb.objectCase;
        }
      }

      if (templateWordType === 'subject' && (!templateCaseKey || template.preferVerbCaseOverride)) {
        if (connectedVerb?.subjectCase) {
          return connectedVerb.subjectCase;
        }
      }

      return wordType === 'noun' ? templateCaseKey : undefined;
    }

    const caseKey = getCaseKey();
    const formattingConfig: FormattingConfig = { caseKey };

    if (previousWord?.templateWordType === 'object' && templateWordType === 'verb') {
      formattingConfig.countKey = previousWord.countKey;
    }

    if (wordType === 'verb' && templatePersonKeys) {
      const personKey = getRandomItem(templatePersonKeys);
      formattingConfig.personKey = personKey;
    }

    if(templateCountKey) {
      formattingConfig.countKey = templateCountKey;
    }

    const isFirst = !previousWordDef;
    const word = formatWord(wordDef, adjectives, formattingConfig, isFirst);

    words.push({
      ...word,
      templateWordType,
    });
  }

  const sentence = words
    .map((word) => word.value)
    .join(' ');

  const capitalized =  capitalize(sentence);

  return template.removeLastSpace ? removeLastSpace(capitalized) : capitalized;
}

function generateSentence(
  nouns: Noun[],
  verbs: Verb[],
  adjectives: Adjective[],
  maxTries = 3
): string {
  try {
    const getRandomWord = makeGetRandomWord(nouns, verbs, adjectives);
    const template = getRandomTemplate();

    return generateSentenceFromTemplate(getRandomWord, template);
  } catch (error) {
    if (maxTries <= 1) {
      throw error
    } else {
      //console.error(`Error on step ${tries}: ${error.message}`);
      throw error;
      // return generateSentence(nouns, verbs, adjectives, maxTries - 1);
    }
  }
}

export default () => {
  return generateSentence(nouns, verbs, adjectives);
};

// try {
//   const sentence = generateSentence(nouns, verbs, adjectives);
//   console.log(`Generated Sentence: ${sentence}`);
// } catch (error) {
//   // console.error(error.message);
//   throw error;
// }
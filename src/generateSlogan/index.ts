import {
  WordDefinition,
  Noun,
  Verb,
  Adjective,
  WordType,
  TemplateDef,
  Template,
  TemplateWordType,
  FormattingConfig,
  FormattedWord,
} from './types';
import nouns from './nouns';
import verbs from './verbs';
import adjectives from './adjectives';
import { applyModel } from './models';

const ADJECTIVE_CHANCE = 0.5;

const modifiers: string[] = [
  'ani',
  'len',
  'iba',
];

const specials: string[] = [
  'do každej rodiny',
  'každému',
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
    persons: [['firstPerson']],
  },
  {
    types: ["verb", "object", "subject"],
    cases: ["dative", "accusative"],
    persons: [['firstPerson']],
  },
  {
    types: ["special", "subject"],
    cases: ["nominative"],
  },
  {
    types: ["subject", "special"],
    cases: ["nominative"],
  },
  {
    types: ["subject"],
    cases: ["nominative"],
  },
  
  // {
  //   types: ["modifier", "subject", "verb"],
  //   cases: ["nominative"],
  //   persons: [['firstPerson']],
  // },
];

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
  if(chance < 0) {
    throw new Error('Chance must be greater or equal to zero');
  }

  if(chance > 1) {
    throw new Error('Chance must be lower or equal to 1');
  }
  
  return Math.random() < chance;
}

function getRandomItem<T>(arr: T[], overrideIndex?: number): T {
  const randomIndex = overrideIndex || Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  if(!item) {
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

  console.log('==getNoun==');
  console.log("noun word: ", noun.word);
  console.log("gender: ", noun.gender);
  console.log("model: ", noun.model);
  console.log("caseKey: ", _caseKey);
  console.log("customCaseKey: ", caseKey);
  console.log("countKey: ", _countKey);
  console.log("customCountKey: ", countKey);

  const cases = noun.cases;
  const word = cases[_caseKey][_countKey];
  console.log("word: ", word);


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
  const _personKey: Person = personKey || getRandomItem(["firstPerson", "secondPerson", "thirdPerson"]);;
  const _countKey: Count = countKey || getRandomItem(["singular", "plural"]);

  console.log('==getVerb==');
  console.log("verb word: ", verb.word);
  console.log("tenseKey: ", tenseKey);
  console.log("personKey: ", _personKey);
  console.log("customPersonKey: ", personKey);
  console.log("countKey: ", _countKey);
  console.log("customCountKey: ", countKey);

  const word = verb[tenseKey][_personKey][_countKey];
  console.log("word: ", word);

  let value = word;

  if(verb.pronoun) {
    if(isFirst) {
      value += ' ' + verb.pronoun;
    }
    else {
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
    console.log('==getAdjective==');
    console.log("adjective word: ", adjective.word);
    console.log("gender: ", gender);
    console.log("caseKey: ", caseKey);
    console.log("countKey: ", countKey);

    const word = adjective[gender][caseKey][countKey];

    console.log("word: ", word);

    return {
      word: adjective,
      value: word,
      gender,
      countKey,
    };
  }

function formatWord(word: WordDefinition, adjectives, formattingConfig: FormattingConfig, isFirst: boolean) {
  switch(word.type) {
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
  const words = [];
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
    switch(type) {
      case 'noun':
        return getRandomItem(nouns);
      case 'verb':
        return getRandomItem(verbs);
      case 'adjective':
        return getRandomItem(adjectives);
      case 'modifier': {
        const value = getRandomItem(modifiers);
        return { type: 'modifier', value };
      }
      case 'special': {
        const value = getRandomItem(specials);
        return { type: 'special', value };
      }
      default:
        throw new Error(`Can't get random word of type ${type}`);
    }
  }
}

function makeGetRandomFormattedWord(nouns: Noun[], verbs: Verb[], adjectives: Adjective[]): FormattedWord {
  return (type: WordType, formattingConfig: FormattingConfig) => {
    switch(type) {
      case 'noun':
        return getNoun(nouns, adjectives, formattingConfig);
      case 'verb':
        return getVerb(verbs, formattingConfig);
      case 'adjective':
        return getAdjective(adjectives, formattingConfig);
      default:
        throw new Error(`Can't get random word of type ${type}`);
    }
  }
}

function generateSentenceFromTemplate(getRandomWord: () => WordDefinition, template: Template) {
  console.log('==template: ', template.types.join('-'), '==');
  
  const wordDefinitions: (WordDefinition & { templateWordType: TemplateWordType })[] = template.types.map((templateWordType) => {
      const wordType = templateToWordType(templateWordType);
      
      const word = getRandomWord(wordType);
      
      return {
        ...word,
        templateWordType,
      };
    });
    
    const words: FormattedWord & { templateWordType: TemplateWordType }[] = [];
    const cases = template.cases.slice();
    const persons = template.persons.slice();

    for(const [indexStr, wordDef] of Object.entries(wordDefinitions)) {
      const templateWordType = wordDef.templateWordType;

      if(['modifier', 'special'].includes(wordDef.type)) {
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

      console.log(`==Word: ${templateWordType}==`);
      console.log('templateCaseKey', templateCaseKey);
      console.log('templatePersonKeys', templatePersonKeys)
      
      
      
      const getCaseKey = () => {
        const connectedVerb = nextWordDef?.type === 'verb' ? nextWordDef : (previousWordDef?.type === 'verb' ? previousWordDef : undefined);
          console.log('connectedVerb', connectedVerb?.word)
        
        if(templateWordType === 'subject' && connectedVerb?.nounCase && !templateCaseKey) {
          if(connectedVerb) {
            return connectedVerb.nounCase;
          }
        }

        if(templateWordType === 'object' && !templateCaseKey) {
          if(connectedVerb?.objectCase) {
            return connectedVerb.objectCase;
          }
        }

        if(templateWordType === 'subject' && !templateCaseKey) {
          if(connectedVerb?.subjectCase) {
            return connectedVerb.subjectCase;
          }
        }

        return wordType === 'noun' ? templateCaseKey : undefined;
      }
      
      const caseKey = getCaseKey();
      const formattingConfig: FormattingConfig = { caseKey };
      
      if(previousWord?.templateWordType === 'object' && templateWordType === 'verb') {
        formattingConfig.countKey = previousWord.countKey;
      }

      if(wordType === 'verb' && templatePersonKeys) {
        const personKey = getRandomItem(templatePersonKeys);
        formattingConfig.personKey = personKey;
      }

      const isFirst = !Boolean(previousWordDef);
      const word = formatWord(wordDef, adjectives, formattingConfig, isFirst);

      words.push({
        ...word,
        templateWordType,
      });
    }

    const sentence = words
      .map((word) => word.value)
      .join(' ');

  return capitalize(sentence);
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
  }
  catch (error) {
      if (maxTries <= 1) {
        throw error
      }
      else {
        //console.error(`Error on step ${tries}: ${error.message}`);
        throw error;
        return generateSentence(nouns, verbs, adjectives, maxTries - 1);
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
//  // console.error(error.message);
//   throw error;
// }
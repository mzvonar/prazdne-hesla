import { Adjective, Case, Count, Gender } from './types.ts';

interface ModelCountMap {
  singular?: Gender | [Gender] | [Gender, Case];
  plural?: Gender | [Gender] | [Gender, Case];
}

interface Model {
  type: string;
  gender: Gender;
  nominative?: ModelCountMap;
  genitive?: ModelCountMap;
  dative?: ModelCountMap;
  accusative?: ModelCountMap;
  locative?: ModelCountMap;
  instrumental?: ModelCountMap;
}

const dubModel: Model = {
  type: 'dub',
  gender: 'masculine',
  nominative: {
    plural: 'feminine',
  },
  accusative: {
    singular: ['masculine', 'nominative'],
    plural: 'neuter'
  }
};

const strojModel: Model = {
  type: 'stroj',
  gender: 'masculine',
  nominative: {
    plural: 'feminine',
  },
  accusative: {
    singular: ['masculine', 'nominative'],
    plural: 'neuter'
  }
}

export const models: Model[] = [
  dubModel,
  strojModel,
];

const allCases: Case[] = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "locative",
  "instrumental",
];

const allCounts: Count[] = ['singular', 'plural'];

export const applyModel = (modelType: string | undefined, adjective: Adjective): Adjective => {
  if(!modelType) {
    return adjective;
  }

  const model = models.find((model) => model.type === modelType);
  if(!model) {

    return adjective;
  }

  const modelGender = model.gender;

  console.log(`Applying ${model.type} to ${adjective.word}`);

  const adjectiveCopy = {
    ...adjective,
  };

  allCases.forEach((caseKey) => {
    allCounts.forEach((countKey) => {
      const overrideRaw = model[caseKey]?.[countKey];
      const override: [Gender] | [Gender, Case] | undefined = overrideRaw && (Array.isArray(overrideRaw) ? overrideRaw : [overrideRaw]);

      if(override) {
        const [genderOverride, caseOverride] = override;

        console.log(`Override ${modelGender}.${caseKey}.${countKey} to ${genderOverride}.${caseOverride || caseKey}.${countKey}`);

        const newValue = adjective[genderOverride][caseOverride || caseKey][countKey];

        adjectiveCopy[modelGender] = {
          ...adjectiveCopy[modelGender],
          [caseKey]: {
            ...adjectiveCopy[modelGender][caseKey],
            [countKey]: newValue,
          },
        };      
      }
    })
  });

  return adjectiveCopy;
}
// @ts-nocheck TODO: Fix types
import { Adjective, Case, Count } from './types.ts';

const dubModel = {
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

const strojModel = {
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

export const models = [
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
      const override = overrideRaw && (Array.isArray(overrideRaw) ? overrideRaw : [overrideRaw]);

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
import { Case, Count } from './types';

// chlap hrdina dub stroj
// zena ulica dlan kost
// mesto srdce vysvedcenie dievca

/*
* chlap

nominativ
krasny chlap
krasni chlapi

genitiv
z krasneho chlapa
z krasnych chlapov

dativ
krasnemu chlapovi
krasnym chlapom

akuzativ
krasneho chlapa
krasnych chlapov

lokal
o krasnom chlapovi
o krasnych chlapoch

inst
s krasnym chlapom
s krasnymi chlapmi

* hrdina

nominativ
krasny hrdinoa
krasni hrdinovia

genitiv
z krasneho hrdinu
z krasnych hrdinov

dativ
krasnemu hrdinovi
krasnym hrdinom

akuzativ
krasneho hrdinu
krasnych hrdinov

lokal
o krasnom hrdinovi
o krasnych hrdinoch

inst
s krasnym hrdinom
s krasnymi hrdinami


* dub

nominativ
krasny dub
krasne duby

genitiv
z krasneho duba
z krasnych dubov

dativ
krasnemu dubu
krasnym dubom

akuzativ
krasny dub
krasne duby

lokal
o krasnom dube
o krasnych duboch

inst
s krasnym dubom
s krasnymi dubmi


* stroj

nominativ
krasny stroj
krasne stroje

genitiv
z krasneho stroja
z krasnych strojov

dativ
krasnemu stroju
krasnym strojom

akuzativ
krasny stroj
krasne stroje

lokal
o krasnom stroji
o krasnych strojoch

inst
s krasnym strojom
s krasnymi strojmi


* zena

nominativ
krasna zena
krasne zeny

genitiv
z krasnej zeny
z krasnych zien

dativ
krasnej zene
krasnym zenam

akuzativ
krasnu zenu
krasne zeny

lokal
o krasnej zene
o krasnych zenach

inst
s krasnou zenou
s krasnymi zenami

* ulica

nominativ
krasna ulica
krasne ulice

genitiv
z krasnej ulice
z krasnych ulic

dativ
krasnej ulici
krasnym uliciam

akuzativ
krasnu ulicu
krasne ulice

lokal
o krasnej ulici
o krasnych uliciach

inst
s krasnou ulicou
s krasnymi ulicami

* dlan

nominativ
krasna dlan
krasne dlane

genitiv
z krasnej dlane
z krasnych dlani

dativ
krasnej dlani
krasnym dlaniam

akuzativ
krasnu dlan
krasne dlane

lokal
o krasnej dlani
o krasnych dlaniach

inst
s krasnou dlanou
s krasnymi dlanami

* kost

nominativ
krasna kost
krasne kosti

genitiv
z krasnej kosti
z krasnych kostiach

dativ
krasnej kosti
krasnym kostiam

akuzativ
krasnu kost
krasne kosti

lokal
o krasnej kosti
o krasnych kostiach

inst
s krasnou dlanou
s krasnymi dlanami


* mesto

nominativ
krasne mesto
krasne mesta

genitiv
z krasneho mesta
z krasnych miest

dativ
krasnemu mestu
krasnym mestam

akuzativ
krasne mesto
krasne mesta

lokal
o krasnom meste
o krasnych mestach

inst
s krasnym mestom
s krasnymi mestami


* srdce

nominativ
krasne srdce
krasne srdcia

genitiv
z krasneho srdca
z krasnych srdci

dativ
krasnemu srdcu
krasnym srdciam

akuzativ
krasne srdce
krasne srdcia

lokal
o krasnom srdci
o krasnych srdciach

inst
s krasnym srdcom
s krasnymi srdciami


* vysvedcenie

nominativ
krasne vysvedcenie
krasne vysvedcenia

genitiv
z krasneho vysvedcenia
z krasnych vysvedceni

dativ
krasnemu vysvedceniu
krasnym vysvedceniam

akuzativ
krasne vysvedcenie
krasne vysvedcenia

lokal
o krasnom vysvedceni
o krasnych vysvedceniach

inst
s krasnym vysvedcenim
s krasnymi vysvedceniami

* dievca

nominativ
krasne dievca
krasne dievcata

genitiv
z krasneho dievcata
z krasnych dievcat

dativ
krasnemu dievcaty
krasnym dievcatam

akuzativ
krasne dievca
krasne dievcata

lokal
o krasnom dievcati
o krasnych dievcatach

inst
s krasnym dievcatom
s krasnymi dievcatami
*/


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

const allCases = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "locative",
  "instrumental",
];

const allCounts = ['singular', 'plural'];

export const applyModel = (modelType: string | undefined, adjective: Adjective): Adjective => {
  if(!modelType) {
    return adjective;
  }

  const model = models.find((model) => model.type === modelType);
  const modelGender = model.gender;

  if(!model) {
    return adjective;
  }

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
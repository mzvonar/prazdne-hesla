import { Noun } from './types';

const stromNoun: Noun = {
  word: "strom",
  type: "noun",
  gender: "masculine",
  pluralAdjGender: 'feminine',
  model: 'dub',
  cases: {
    nominative: { singular: "strom", plural: "stromy" },
    genitive: { singular: "strom", plural: "stromy" },
    dative: { singular: "stromu", plural: "stromom" },
    accusative: { singular: "strom", plural: "stromy" },
    locative: { singular: "strome", plural: "stromoch" },
    instrumental: { singular: "stromom", plural: "stromami" },
  },
};

const kaviarenNoun: Noun = {
  word: "kaviareň",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: { singular: "kaviareň", plural: "kaviarne" },
    genitive: { singular: "kaviarne", plural: "kaviarní" },
    dative: { singular: "kaviarni", plural: "kaviarniam" },
    accusative: { singular: "kaviareň", plural: "kaviarne" },
    locative: { singular: "kaviarni", plural: "kaviarniach" },
    instrumental: { singular: "kaviarňou", plural: "kaviarňami" },
  },
};

const platNoun: Noun = {
  word: "plat",
  type: "noun",
  gender: "masculine",
  model: "dub",
  cases: {
    nominative: { singular: "plat", plural: "platy" },
    genitive: { singular: "platu", plural: "platov" },
    dative: { singular: "platu", plural: "platom" },
    accusative: { singular: "plat", plural: "platy" },
    locative: { singular: "plate", plural: "platoch" },
    instrumental: { singular: "platom", plural: "platmi" },
  },
};

const sportNoun: Noun = {
  word: "šport",
  type: "noun",
  gender: "masculine",
  model: 'dub',
  cases: {
    nominative: { singular: "šport", plural: "športy" },
    genitive: { singular: "športu", plural: "športov" },
    dative: { singular: "športu", plural: "športom" },
    accusative: { singular: "šport", plural: "športy" },
    locative: { singular: "športe", plural: "športoch" },
    instrumental: { singular: "športom", plural: "športmi" },
  },
};

const dochodcaNoun: Noun = {
  word: "dôchodca",
  type: "noun",
  gender: "masculine",
  cases: {
    nominative: { singular: "dôchodca", plural: "dôchodcovia" },
    genitive: { singular: "dôchodcu", plural: "dôchodcov" },
    dative: { singular: "dôchodcovi", plural: "dôchodcom" },
    accusative: { singular: "dôchodcu", plural: "dôchodcov" },
    locative: { singular: "dôchodcovi", plural: "dôchodcoch" },
    instrumental: { singular: "dôchodcom", plural: "dôchodcami" },
  },
};


const oxymoronNoun: Noun = {
  word: "oxymoron",
  type: "noun",
  gender: "masculine",
  model: 'dub',
  cases: {
    nominative: { singular: "oxymoron", plural: "oxymorony" },
    genitive: { singular: "oxymoronu", plural: "oxymoronov" },
    dative: { singular: "oxymoronu", plural: "oxymoronom" },
    accusative: { singular: "oxymoron", plural: "oxymorony" },
    locative: { singular: "oxymorone", plural: "oxymoronoch" },
    instrumental: { singular: "oxymoronon", plural: "oxymoronmi" },
  },
};

const urovenNoun: Noun = {
  word: "úroveň",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: {
      singular: "úroveň",
      plural: "úrovne",
    },
    genitive: {
      singular: "úrovne",
      plural: "úrovní",
    },
    dative: {
      singular: "úrovni",
      plural: "úrovňiam",
    },
    accusative: {
      singular: "úroveň",
      plural: "úrovne",
    },
    locative: {
      singular: "úrovni",
      plural: "úrovniach",
    },
    instrumental: {
      singular: "úrovňou",
      plural: "úrovňami",
    },
  },
};

const pliagaNoun: Noun = {
  word: "pliaga",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: { singular: "pliaga", plural: "pliagy" },
    genitive: { singular: "pliagy", plural: "pliag" },
    dative: { singular: "pliage", plural: "pliagam" },
    accusative: { singular: "pliagu", plural: "pliagy" },
    locative: { singular: "pliage", plural: "pliagach" },
    instrumental: { singular: "pliagov", plural: "pliagami" },
  },
};

const sorosNoun: Noun = {
  word: "Soroš",
  type: "noun",
  gender: "masculine",
  cases: {
    nominative: { singular: "Soroš", plural: "Sorošovia" },
    genitive: { singular: "Soroša", plural: "Sorošov" },
    dative: { singular: "Sorošovi", plural: "Sorošom" },
    accusative: { singular: "Soroša", plural: "Sorošov" },
    locative: { singular: "Sorošovi", plural: "Sorošoch" },
    instrumental: { singular: "Sorošom", plural: "Sorošami" },
  },
};

const mimovladkaNoun: Noun = {
  word: "mimovládka",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: { singular: "mimovládka", plural: "mimovládky" },
    genitive: { singular: "mimovládky", plural: "mimovládok" },
    dative: { singular: "mimovládke", plural: "mimovládkam" },
    accusative: { singular: "mimovládku", plural: "mimovládky" },
    locative: { singular: "mimovládke", plural: "mimovládkach" },
    instrumental: { singular: "mimovládkou", plural: "mimovládkami" },
  },
};

const narodNoun: Noun = {
  word: "národ",
  type: "noun",
  gender: "masculine",
  model: "dub",
  cases: {
    nominative: {
      singular: "národ",
      plural: "národy",
    },
    genitive: {
      singular: "národu",
      plural: "národov",
    },
    dative: {
      singular: "národu",
      plural: "národom",
    },
    accusative: {
      singular: "národ",
      plural: "národy",
    },
    locative: {
      singular: "národe",
      plural: "národoch",
    },
    instrumental: {
      singular: "národom",
      plural: "národmi",
    },
  },
};

const dievcaNoun: Noun = {
  word: "dievča",
  type: "noun",
  gender: "neuter",
  cases: {
    nominative: {
      singular: "dievča",
      plural: "dievčatá",
    },
    genitive: {
      singular: "dievčaťa",
      plural: "dievčiat",
    },
    dative: {
      singular: "dievčaťu",
      plural: "dievčatám",
    },
    accusative: {
      singular: "dievča",
      plural: "dievčatá",
    },
    locative: {
      singular: "dievčati",
      plural: "dievčatách",
    },
    instrumental: {
      singular: "dievčaťom",
      plural: "dievčatami",
    },
  },
};

const robotnikNoun: Noun = {
  word: "robotník",
  type: "noun",
  gender: "masculine",
  cases: {
    nominative: {
      singular: "robotník",
      plural: "robotníci",
    },
    genitive: {
      singular: "robotníka",
      plural: "robotníkov",
    },
    dative: {
      singular: "robotníkovi",
      plural: "robotníkom",
    },
    accusative: {
      singular: "robotníka",
      plural: "robotníkov",
    },
    locative: {
      singular: "robotníkovi",
      plural: "robotníkoch",
    },
    instrumental: {
      singular: "robotníkom",
      plural: "robotníkmi",
    },
  },
};

const intelektualNoun: Noun = {
  word: "intelektuál",
  type: "noun",
  gender: "masculine",
  cases: {
    nominative: {
      singular: "intelektuál",
      plural: "intelektuáli",
    },
    genitive: {
      singular: "intelektuála",
      plural: "intelektuálov",
    },
    dative: {
      singular: "intelektuálovi",
      plural: "intelektuálom",
    },
    accusative: {
      singular: "intelektuála",
      plural: "intelektuálov",
    },
    locative: {
      singular: "intelektuálovi",
      plural: "intelektuáloch",
    },
    instrumental: {
      singular: "intelektuálom",
      plural: "intelektuálmi",
    },
  },
};

const centNoun: Noun = {
  word: "cent",
  type: "noun",
  gender: "masculine",
  model: 'dub',
  cases: {
    nominative: {
      singular: "cent",
      plural: "centy",
    },
    genitive: {
      singular: "centu",
      plural: "centov",
    },
    dative: {
      singular: "centu",
      plural: "centom",
    },
    accusative: {
      singular: "cent",
      plural: "centy",
    },
    locative: {
      singular: "cente",
      plural: "centoch",
    },
    instrumental: {
      singular: "centom",
      plural: "centami",
    },
  },
};

const termenNoun: Noun = {
  word: "termeň",
  type: "noun",
  gender: "masculine",
  model: 'stroj',
  cases: {
    nominative: {
      singular: "termeň",
      plural: "termeňe",
    },
    genitive: {
      singular: "termeňa",
      plural: "termeňov",
    },
    dative: {
      singular: "termeňu",
      plural: "termeňom",
    },
    accusative: {
      singular: "termeň",
      plural: "termeňe",
    },
    locative: {
      singular: "termeňi",
      plural: "termeňoch",
    },
    instrumental: {
      singular: "termeňom",
      plural: "termeňmi",
    },
  },
};

const presstitutkaNoun: Noun = {
  word: "presstitútka",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: {
      singular: "presstitútka",
      plural: "presstitútky",
    },
    genitive: {
      singular: "presstitútky",
      plural: "presstitútkok",
    },
    dative: {
      singular: "presstitútke",
      plural: "presstitútkam",
    },
    accusative: {
      singular: "presstitútku",
      plural: "presstitútky",
    },
    locative: {
      singular: "presstitútke",
      plural: "presstitútkach",
    },
    instrumental: {
      singular: "presstitútkou",
      plural: "presstitútkami",
    },
  },
};

const konfucianizmusNoun: Noun = {
  word: "konfucianizmus",
  type: "noun",
  gender: "masculine",
  model: 'dub',
  cases: {
    nominative: {
      singular: "konfucianizmus",
      plural: "konfucianizmy",
    },
    genitive: {
      singular: "konfucianizmu",
      plural: "konfucianizmov",
    },
    dative: {
      singular: "konfucianizmu",
      plural: "konfucianizmom",
    },
    accusative: {
      singular: "konfucianizmus",
      plural: "konfucianizmy",
    },
    locative: {
      singular: "konfucianizme",
      plural: "konfucianizmoch",
    },
    instrumental: {
      singular: "konfucianizmom",
      plural: "konfucianizmami",
    },
  },
};

const piskotaNoun: Noun = {
  word: "piškóta",
  type: "noun",
  gender: "feminine",
  cases: {
    nominative: {
      singular: "piškóta",
      plural: "piškóty",
    },
    genitive: {
      singular: "piškóty",
      plural: "piškót",
    },
    dative: {
      singular: "piškóte",
      plural: "piškótam",
    },
    accusative: {
      singular: "piškótu",
      plural: "piškóty",
    },
    locative: {
      singular: "piškóte",
      plural: "piškótach",
    },
    instrumental: {
      singular: "piškótou",
      plural: "piškótami",
    },
  },
};

const clovekNoun: Noun = {
  word: "človek",
  type: "noun",
  gender: "masculine",
  cases: {
    nominative: {
      singular: "človek",
      plural: "ľudia",
    },
    genitive: {
      singular: "človeka",
      plural: "ľudí",
    },
    dative: {
      singular: "človeku",
      plural: "ľuďom",
    },
    accusative: {
      singular: "človeka",
      plural: "ľudí",
    },
    locative: {
      singular: "človeku",
      plural: "ľuďoch",
    },
    instrumental: {
      singular: "človekom",
      plural: "ľuďmi",
    },
  },
};

const spalovaciMotorNoun: Noun = {
  word: "spaľovací motor",
  type: "noun",
  gender: "masculine",
  model: 'dub',
  cases: {
    nominative: {
      singular: "spaľovací motor",
      plural: "spaľovacie motory",
    },
    genitive: {
      singular: "spaľovacieho motora",
      plural: "spaľovacích motorov",
    },
    dative: {
      singular: "spaľovaciemu motoru",
      plural: "spaľovacým motorom",
    },
    accusative: {
      singular: "spaľovací motor",
      plural: "spaľovacie motory",
    },
    locative: {
      singular: "spaľovacom motore",
      plural: "spaľovacých motoroch",
    },
    instrumental: {
      singular: "spaľovacým motorom",
      plural: "spaľovacými motormi",
    },
  },
};

const bordelNoun: Noun = {
  word: 'bordel',
  type: 'noun',
  gender: 'masculine',
  model: 'stroj',
  cases: {
    nominative: {
      singular: 'bordel',
      plural: 'bordely',
    },
    genitive: {
      singular: 'bordelu',
      plural: 'bordelov',
    },
    dative: {
      singular: 'bordelu',
      plural: 'bordelom',
    },
    accusative: {
      singular: 'bordel',
      plural: 'bordely',
    },
    locative: {
      singular: 'bordeli',
      plural: 'bordeloch',
    },
    instrumental: {
      singular: 'bordelom',
      plural: 'bordelmi',
    },
  },
};


const nouns: Noun[] = [
  stromNoun,
  kaviarenNoun,
  platNoun,
  sportNoun,
  dochodcaNoun,
  oxymoronNoun,
  urovenNoun,
  pliagaNoun,
  sorosNoun,
  mimovladkaNoun,
  narodNoun,
  dievcaNoun,
  robotnikNoun,
  intelektualNoun,
  centNoun,
  termenNoun,
  presstitutkaNoun,
  konfucianizmusNoun,
  piskotaNoun,
  clovekNoun,
  spalovaciMotorNoun,
  bordelNoun,
];

export default nouns;
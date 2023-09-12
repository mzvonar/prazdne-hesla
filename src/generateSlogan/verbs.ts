import { Verb } from './types';



const zabranitVerb: Verb = {
  word: "zabrániť",
  type: "verb",
  // nounCase: "dative",
  subjectCase: 'dative',
  present: {
    firstPerson: { singular: "zabránim", plural: "zabránime" },
    secondPerson: { singular: "zabrániš", plural: "zabránište" },
    thirdPerson: { singular: "zabráni", plural: "zabránia" },
  },
  future: {
    firstPerson: { singular: "zabránim", plural: "zabránime" },
    secondPerson: { singular: "zabránis", plural: "zabránite" },
    thirdPerson: { singular: "zabrání", plural: "zabránia" },
  },
};

const zastavitVerb: Verb = {
  word: "zastaviť",
  type: "verb",
  // nounCase: "nominative",
  subjectCase: 'accusative',
  present: {
    firstPerson: { singular: "zastavím", plural: "zastavíme" },
    secondPerson: { singular: "zastavíš", plural: "zastavíte" },
    thirdPerson: { singular: "zastaví", plural: "zastavia" },
  },
  future: {
    firstPerson: { singular: "zastavím", plural: "zastavíme" },
    secondPerson: { singular: "zastavíš", plural: "zastavíte" },
    thirdPerson: { singular: "zastaví", plural: "zastavia" },
  },
};

const stopVerb: Verb = {
  word: "stop",
  type: "verb",
  nounCase: "dative",
  present: {
    firstPerson: { singular: "stop", plural: "stop" },
    secondPerson: { singular: "stop", plural: "stop" },
    thirdPerson: { singular: "stop", plural: "stop" },
  },
  future: {
    firstPerson: { singular: "stop", plural: "stop" },
    secondPerson: { singular: "stop", plural: "stop" },
    thirdPerson: { singular: "stop", plural: "stop" },
  },
};

const zvysitVerb: Verb = {
  word: "zvýšiť",
  type: "verb",
  present: {
    firstPerson: {
      singular: "zvýšim",
      plural: "zvýšime",
    },
    secondPerson: {
      singular: "zvýšiš",
      plural: "zvýšíte",
    },
    thirdPerson: {
      singular: "zvýši",
      plural: "zvýšia",
    },
  },
  future: {
    firstPerson: {
      singular: "zvýšim",
      plural: "zvýšíme",
    },
    secondPerson: {
      singular: "zvýšiš",
      plural: "zvýšíte",
    },
    thirdPerson: {
      singular: "zvýši",
      plural: "zvýšia",
    },
  },
};

const znizitVerb: Verb = {
  word: "znížiť",
  type: "verb",
  subjectCase: "accusative",
  present: {
    firstPerson: {
      singular: "znížim",
      plural: "znížime",
    },
    secondPerson: {
      singular: "znížiš",
      plural: "znížite",
    },
    thirdPerson: {
      singular: "zníži",
      plural: "znížia",
    },
  },
  future: {
    firstPerson: {
      singular: "znížim",
      plural: "znížime",
    },
    secondPerson: {
      singular: "znížiš",
      plural: "znížite",
    },
    thirdPerson: {
      singular: "zníži",
      plural: "znížia",
    },
  },
};

const zasluzitVerb: Verb = {
  word: "zaslúžiť",
  type: "verb",
  pronoun: "si",
  nounCase: "accusative",
  objectCase: "instrumental",
  subjectCase: "accusative",
  present: {
    firstPerson: {
      singular: "zaslúžim",
      plural: "zaslúžime",
    },
    secondPerson: {
      singular: "zaslúžiš",
      plural: "zaslúžite",
    },
    thirdPerson: {
      singular: "zaslúži",
      plural: "zaslúžia",
    },
  },
  future: {
    firstPerson: {
      singular: "zaslúžim",
      plural: "zaslúžime",
    },
    secondPerson: {
      singular: "zaslúžiš",
      plural: "zaslúžite",
    },
    thirdPerson: {
      singular: "zaslúži",
      plural: "zaslúžia",
    },
  },
};

const otupjievatVerb: Verb = {
  word: "otupjievať",
  type: "verb",
  // nounCase: "accusative",
  objectCase: "dative",
  subjectCase: "accusative",
  present: {
    firstPerson: {
      singular: "otupjievam",
      plural: "otupjievame",
    },
    secondPerson: {
      singular: "otupjievaš",
      plural: "otupjievate",
    },
    thirdPerson: {
      singular: "otupjieva",
      plural: "otupjievjajú",
    },
  },
  future: {
    firstPerson: {
      singular: "otupjiem",
      plural: "otupjieme",
    },
    secondPerson: {
      singular: "otupjieš",
      plural: "otupjiete",
    },
    thirdPerson: {
      singular: "otupjie",
      plural: "otupjiejú",
    },
  },
};

const upratatVerb: Verb = {
  word: 'upratať',
  type: 'verb',
  present: {
    firstPerson: {
      singular: 'upratujem',
      plural: 'upratujeme',
    },
    secondPerson: {
      singular: 'upratuješ',
      plural: 'upratujete',
    },
    thirdPerson: {
      singular: 'upratuje',
      plural: 'upratujú',
    },
  },
  future: {
    firstPerson: {
      singular: 'upracem',
      plural: 'upraceme',
    },
    secondPerson: {
      singular: 'upraceš',
      plural: 'upracete',
    },
    thirdPerson: {
      singular: 'uprace',
      plural: 'upracú',
    },
  },
};

const rozkradnutVerb: Verb = {
  word: 'rozkradnúť',
  type: 'verb',
  present: {
    firstPerson: {
      singular: 'rozkrádam',
      plural: 'rozkrádame',
    },
    secondPerson: {
      singular: 'rozkrádaš',
      plural: 'rozkrádate',
    },
    thirdPerson: {
      singular: 'rozkráda',
      plural: 'rozkrádajú',
    },
  },
  future: {
    firstPerson: {
      singular: 'rozkradnem',
      plural: 'rozkradneme',
    },
    secondPerson: {
      singular: 'rozkradneš',
      plural: 'rozkradnete',
    },
    thirdPerson: {
      singular: 'rozkradne',
      plural: 'rozkradnú',
    },
  },
};

const nepredatVerb: Verb = {
  word: 'nepredať',
  type: 'verb',
  subjectCase: 'accusative',
  present: {
    firstPerson: {
      singular: 'nepredám',
      plural: 'nepredáme',
    },
    secondPerson: {
      singular: 'nepredáš',
      plural: 'nepredáte',
    },
    thirdPerson: {
      singular: 'nepredá',
      plural: 'nepredajú',
    },
  },
  future: {
    firstPerson: {
      singular: 'nepredám',
      plural: 'nepredáme',
    },
    secondPerson: {
      singular: 'nepredáš',
      plural: 'nepredáte',
    },
    thirdPerson: {
      singular: 'nepredá',
      plural: 'nepredajú',
    },
  },
};

const verbs: Verb[] = [
  zabranitVerb,
  zastavitVerb,
  stopVerb,
  zvysitVerb,
  znizitVerb,
  zasluzitVerb,
  otupjievatVerb,
  upratatVerb,
  rozkradnutVerb,
  nepredatVerb,
];

export default verbs;
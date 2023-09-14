export const getRandomBool = (chance = 0.5) => {
  if (chance < 0) {
    throw new Error('Chance must be greater or equal to zero');
  }

  if (chance > 1) {
    throw new Error('Chance must be lower or equal to 1');
  }

  return Math.random() < chance;
};

export const pickRandom = <T>(arr: T[], overrideIndex?: number): T => {
  const randomIndex = overrideIndex || Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  if (typeof item === 'undefined') {
    throw new Error(`Couldn't get random item at index ${randomIndex}`);
  }

  return item;
};
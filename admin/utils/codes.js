import uniqueRandom from 'unique-random'

const random = uniqueRandom(0, 9);

export const randomNumbers = (length) => {
  let id = '';

  for (var i = 0; i < length; i++) {
    id += random();
  }

  return id;
};

export const randomCharacters = (length) => {
  let id = '';

  for (var i = 0; i < length; i++) {
    if (i % 2 == 0) {
      id += 'abcdefghijklmnopqrstuvwxyz'.split('')[
        Math.floor(Math.random() * 25)
      ];
    } else {
      id += random();
    }
  }

  return id;
};

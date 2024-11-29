export const PLAYFIELD_COLUMNS = 10;
export const PLAYFIELD_ROWS = 20;
export const TETRAMINO_NAMES = ["i", "j", "l", "o", "s", "t", "z"];
export const TETRAMINOES = {
  i: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  j: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  l: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  o: [
    [1, 1],
    [1, 1],
  ],
  s: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  t: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

export function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function convertPositionToCellIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

export function rotateMatrix(matrix) {
  const N = matrix.length;
  const rotatedMatrix = [];
  for (let i = 0; i < N; i++) {
    rotatedMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      rotatedMatrix[i][j] = matrix[N - j - 1][i];
    }
  }
  return rotatedMatrix;
}

export const SAD = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
];

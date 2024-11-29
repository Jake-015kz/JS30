import { Tetris } from "./tetris.js";
import {
  convertPositionToCellIndex,
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  SAD,
  rotateMatrix,
} from "./utilities.js";

let hammer;
let timeOutId;
let requestId;
const tetris = new Tetris();
const cells = document.querySelectorAll(".grid div");

initKeyDown();
initTouch();
moveDown();

function initKeyDown() {
  document.addEventListener("keydown", onKeyDown);
}

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      rotate();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case " ":
      dropDown();
      break;
    default:
      break;
  }
}

function initTouch() {
  document.addEventListener("dbclick", (event) => {
    event.preventDefault();
  });
  hammer = new Hammer(document.querySelector("body"));
  hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

  const threshold = 30;
  let deltaX = 0;
  let deltaY = 0;

  hammer.on("panstart", () => {
    deltaX = 0;
    deltaY = 0;
  });
  hammer.on("panleft", (event) => {
    if (Math.abs(event.deltaX - deltaX) > threshold) {
      moveLeft();
      deltaX = event.deltaX;
      deltaY = event.deltaY;
    }
  });
  hammer.on("panright", (event) => {
    if (Math.abs(event.deltaX - deltaX) > threshold) {
      moveRight();
      deltaX = event.deltaX;
      deltaY = event.deltaY;
    }
  });
  hammer.on("pandown", (event) => {
    if (Math.abs(event.deltaY - deltaY) > threshold) {
      moveDown();
      deltaX = event.deltaX;
      deltaY = event.deltaY;
    }
  });
  hammer.on("swipedown", (event) => {
    dropDown();
  });
  hammer.on("tap", () => {
    rotate();
  });
}

function moveDown() {
  tetris.moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (tetris.isGameOver) {
    gameOver();
  }
}

function moveLeft() {
  tetris.moveTetrominoLeft();
  draw();
}

function moveRight() {
  tetris.moveTetrominoRight();
  draw();
}

function rotate() {
  tetris.rotateTetromino();
  draw();
}

function dropDown() {
  tetris.dropTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (tetris.isGameOver) {
    gameOver();
  }
}
function startLoop() {
  timeOutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700
  );
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeOutId);
}
function draw() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
  drawGhostTetromino();
}

function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (!tetris.playfield[row][column]) continue;
      const name = tetris.playfield[row][column];
      const cellIndex = convertPositionToCellIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetris.tetromino.name;
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.row + row < 0) continue;
      const cellIndex = convertPositionToCellIndex(
        tetris.tetromino.row + row,
        tetris.tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawGhostTetromino() {
  const tetrominoMatrixSize = tetris.tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetris.tetromino.matrix[row][column]) continue;
      if (tetris.tetromino.ghostRow + row < 0) continue;
      const cellIndex = convertPositionToCellIndex(
        tetris.tetromino.ghostRow + row,
        tetris.tetromino.ghostColumn + column
      );
      cells[cellIndex].classList.add("ghost");
    }
  }
}
function gameOver() {
  stopLoop();
  document.removeEventListener("keydown", onKeyDown);
  hammer.off("panstart panleft panright pandown tap swipedown");
  gameOverAnimation();
}

function gameOverAnimation() {
  const filledCell = [...cells].filter((cell) => cell.classList.length > 0);

  cells.forEach((cell) => {
    cell.classList.remove("ghost");
  });

  filledCell.forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.add("hide"), i * 10;
    });
    setTimeout(() => {
      cell.classList.remove(cell.classList[0]), i * 10 + 500;
    });
  });
  setTimeout(drawSad, filledCell.length * 10 + 1000);
}

function drawSad() {
  const TOP_OFFSET = 5;

  for (let row = 0; row < SAD.length; row++) {
    for (let column = 0; column < SAD[0].length; column++) {
      if (!SAD[row][column]) continue;
      const cellIndex = convertPositionToCellIndex(TOP_OFFSET + row, column);
      cells[cellIndex].classList.add("sad");
    }
  }
}

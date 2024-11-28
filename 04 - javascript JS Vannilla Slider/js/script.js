let span = document.querySelectorAll("span"); // Лучше использовать querySelectorAll
let product = document.getElementsByClassName("product");
let product_page = Math.ceil(product.length / 4);

let l = 0;
let movePer = 26.34; // Размер перемещения
let maxMove = 203; // Максимальное движение

// mobile version
let notebook_view = window.matchMedia("(max-width: 1439px)");
let tablet_view = window.matchMedia("(max-width: 1024px)");
let mobile_view = window.matchMedia("(max-width: 768px)");
let mobile_view_2 = window.matchMedia("(max-width: 600px)");
let mobile_view_3 = window.matchMedia("(max-width: 480px)");

if (notebook_view.matches) {
  movePer = 31.8;
  maxMove = 203;
}

if (tablet_view.matches) {
  movePer = 44;
  maxMove = 203;
}

if (mobile_view.matches) {
  movePer = 60.5;
  maxMove = 504;
}

if (mobile_view_2.matches) {
  movePer = 81.5;
  maxMove = 504;
}

if (mobile_view_3.matches) {
  movePer = 101;
  maxMove = 504;
}

let right_mover = () => {
  // Увеличиваем позицию
  l = l + movePer;

  // Если l превышает maxMove, откатываемся назад
  if (l > maxMove) {
    l = maxMove;
  }

  // Двигаем все продукты
  for (const i of product) {
    i.style.left = "-" + l + "%"; // Перемещаем продукты
  }
};

let left_mover = () => {
  // Уменьшаем позицию
  l = l - movePer;

  // Если l меньше или равно 0, останавливаем прокрутку
  if (l <= 0) {
    l = 0;
  }

  // Двигаем все продукты
  for (const i of product) {
    i.style.left = "-" + l + "%"; // Перемещаем продукты
  }
};

// Проверяем, существует ли второй элемент span (право)
if (span[1]) {
  span[1].onclick = () => {
    right_mover(); // Вызываем функцию при клике
  };
}

// Проверяем, существует ли первый элемент span (лево)
if (span[0]) {
  span[0].onclick = () => {
    left_mover(); // Вызываем функцию при клике
  };
}

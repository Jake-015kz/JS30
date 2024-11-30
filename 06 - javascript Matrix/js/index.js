const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Устанавливаем размеры canvas под размеры окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Массив символов для отображения
const symbols =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あいうえおカキクケコサシスセソタチツテト";
const fontSize = 16; // Размер шрифта
const columns = canvas.width / fontSize; // Количество колонок
const drops = Array.from(
  { length: columns },
  () => (Math.random() * canvas.height) / fontSize
);
const speed = 0.4; // Скорость падения букв (чем меньше, тем медленнее)

// Функция для отрисовки эффекта
function drawMatrix() {
  // Заливка фона с небольшим затемнением
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Устанавливаем стиль текста
  ctx.fillStyle = "#00FF00";
  ctx.font = `${fontSize}px monospace`;

  // Отрисовываем каждый символ
  for (let i = 0; i < drops.length; i++) {
    const text = symbols[Math.floor(Math.random() * symbols.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    // Сбрасываем каплю к началу, если она уходит за границу
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += speed; // Уменьшение скорости падения
  }

  requestAnimationFrame(drawMatrix);
}

// Запускаем анимацию
drawMatrix();

// Обновление размеров при изменении окна
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Перезапускаем положение капель
  for (let i = 0; i < drops.length; i++) {
    drops[i] = (Math.random() * canvas.height) / fontSize;
  }
});

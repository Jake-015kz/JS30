document.addEventListener("DOMContentLoaded", function () {
  const numbers = document.querySelectorAll(".number");
  const btnSound = document.querySelector(".start-sound");
  const btnStop = document.querySelector(".stop-sound");
  const audio = document.querySelector("audio");

  // Функция для вычисления позиции чисел на циферблате
  function calculateNumberPosition(numberIndex, totalNumbers) {
    const angle = (360 / totalNumbers) * numberIndex;
    const radius = 15; // Радиус для позиционирования чисел
    const centerX = 16; // Центр по оси X
    const centerY = 16; // Центр по оси Y

    // Вычисляем X и Y координаты
    const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

    return { x, y };
  }

  // Позиционируем каждое число на циферблате
  for (const [index, number] of numbers.entries()) {
    const position = calculateNumberPosition(index + 1, numbers.length);
    number.style.left = position.x + "rem";
    number.style.top = position.y + "rem";
  }

  // ---------------------------------------------------------
  function updateClock() {
    const minuteHand = document.querySelector(".min-hand");
    const secondHand = document.querySelector(".second-hand");
    const hourHand = document.querySelector(".hour-hand");

    let currentMinute = new Date().getMinutes();
    let currentSeconds = new Date().getSeconds();
    let currentHour = new Date().getHours();
    currentHour = currentHour % 12 || 12; // Преобразуем в 12-часовой формат

    hourHand.style.transform = `rotate(${
      currentHour * (360 / 12) + currentMinute / 2 + 90
    }deg)`;
    minuteHand.style.transform = `rotate(${
      currentMinute * (360 / 60) + 90
    }deg)`;
    secondHand.style.transform = `rotate(${
      currentSeconds * (360 / 60) + 90
    }deg)`;

    const hourSpan = document.querySelector(".hour");
    const minuteSpan = document.querySelector(".minute");
    const secondSpan = document.querySelector(".second");

    const hours = currentHour.toString().padStart(2, "0");
    const minutes = currentMinute.toString().padStart(2, "0");
    const seconds = currentSeconds.toString().padStart(2, "0");

    hourSpan.textContent = hours;
    minuteSpan.textContent = minutes;
    secondSpan.textContent = seconds;
  }

  // Функция для воспроизведения звука
  function clockSound() {
    if (audio) {
      audio.currentTime = 0; // Сбросить аудио до начала
      audio.play(); // Воспроизвести звук
    }
  }

  // Добавляем обработчик события, чтобы при завершении воспроизведения звук начинался заново
  if (audio) {
    audio.addEventListener("ended", function () {
      clockSound(); // Повторно воспроизвести звук, когда он заканчивается
    });
  }

  // Вызов функции для обновления времени
  updateClock();

  // Обновляем время каждую секунду
  setInterval(updateClock, 1000);

  // Отображение текущей даты
  function displayCurrentDate() {
    const now = new Date();
    const weekdays = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const weekday = now.getDay();

    const dateString = `${weekdays[weekday]}, ${day} ${months[month]} ${year} года`;
    document.getElementById("current-date").textContent = dateString;
  }

  // Вызов функции для отображения даты
  displayCurrentDate();

  // Обработчик для кнопки "Play Sound"
  if (btnSound) {
    btnSound.addEventListener("click", clockSound);
  }

  // Обработчик для кнопки "Stop Sound"
  if (btnStop) {
    btnStop.addEventListener("click", function () {
      if (audio) {
        audio.pause(); // Остановить звук
        audio.currentTime = 0; // Сбросить звук на начало
      }
    });
  }
});

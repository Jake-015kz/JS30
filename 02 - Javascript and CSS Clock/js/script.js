
    const numbers = document.querySelectorAll(".number");

    // Function to calculate the position of numbers around the clock face
    function calculateNumberPosition(numberIndex, totalNumbers) {
        const angle = (360 / totalNumbers) * numberIndex;
        const radius = 15; // Adjust the radius to position the numbers closer or farther from the center
        const centerX = 16; // X-coordinate of the center of the clock
        const centerY = 16; // Y-coordinate of the center of the clock

        // Calculate the X and Y coordinates based on the angle and radius
        const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
        const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

        return { x, y };
    }

    // Position each number around the clock face using trigonometry
    for (const [index, number] of numbers.entries()) {
        const position = calculateNumberPosition(index + 1, numbers.length);
        number.style.left = position.x + "rem";
        number.style.top = position.y + "rem";
    }

    // ---------------------------------------------------------
    function updateClock() {
        // Select the clock hands and elements that display hours, minutes, and seconds
        const minuteHand = document.querySelector(".min-hand");
        const secondHand = document.querySelector(".second-hand");
        const hourHand = document.querySelector(".hour-hand");
        // Get the current time components: minutes, seconds, and hours
        let currentMinute = new Date().getMinutes();
        let currentSeconds = new Date().getSeconds();
        let currentHour = new Date().getHours();
        currentHour = currentHour % 12 || 12; // Convert to 12-hour format

        // Update the position of the hours hand
        hourHand.style.transform = `rotate(${currentHour * (360 / 12) + currentMinute / 2 + 90}deg)`;

        // Update the position of the minute hand
        minuteHand.style.transform = `rotate(${currentMinute * (360 / 60) + 90}deg)`;

        // Update the position of the second hand
        secondHand.style.transform = `rotate(${currentSeconds * (360 / 60) + 90}deg)`;

        // Update the text content of display span
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

    const audio = document.querySelector("audio");

    // Function to play the clock sound
    function clockSound() {
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }

    // Call the clockSound function initially when the window loads
    window.addEventListener("load", function () {
        updateClock();

        // Play sound initially
        clockSound();

        // Play sound again when the audio ends
        audio.addEventListener("ended", clockSound);

        // Update clock every second
        setInterval(updateClock, 1000);
    });

    function displayCurrentDate() {
        // Создаем объект даты
        const now = new Date();

        // Массив с названиями дней недели
        const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        // Массив с названиями месяцев
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        // Извлекаем компоненты текущей даты
        const day = now.getDate();           // День месяца (1-31)
        const month = now.getMonth();       // Месяц (0-11)
        const year = now.getFullYear();     // Год (например, 2024)
        const weekday = now.getDay();       // День недели (0-6)

        // Формируем строку с датой в нужном формате
        const dateString = `${weekdays[weekday]}, ${day} ${months[month]} ${year} года`;

        // Находим элемент на странице по id и вставляем дату
        document.getElementById('current-date').textContent = dateString;
    }

    // Вызов функции для отображения даты
    displayCurrentDate();
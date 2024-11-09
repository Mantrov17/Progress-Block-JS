const progressBar = document.querySelector('.progress-foreground');
const valueInput = document.getElementById('progress-value');
const animateToggle = document.getElementById('animate-toggle');
const hideToggle = document.getElementById('hide-toggle');
const progressContainer = document.querySelector('.container');
const radius = progressBar.getAttribute('r');  // радиус из атрибута <circle>

// Вычисляем длину окружности динамически
const circumference = 2 * Math.PI * radius;  // длина окружности для текущего радиуса

// Устанавливаем значение stroke-dasharray и stroke-dashoffset динамически
progressBar.style.strokeDasharray = circumference;
progressBar.style.strokeDashoffset = circumference;

// Функция для обновления прогресса
const updateProgress = () => {
    const value = Math.min(Math.max(valueInput.value, 0), 100);  // ограничиваем значение от 0 до 100
    const offset = circumference - (circumference * value) / 100;  // вычисляем offset в зависимости от прогресса
    progressBar.style.strokeDashoffset = value === 0 ? circumference : offset;  // для 0 прогресс-бара
};

// Слушатель изменений ввода
valueInput.addEventListener('input', updateProgress);

// Анимация прогресс-бара
animateToggle.addEventListener('change', () => {
    progressBar.classList.toggle('animate', animateToggle.checked);
});

// Скрытие прогресс-бара
hideToggle.addEventListener('change', () => {
    progressContainer.classList.toggle('hidden', hideToggle.checked);
});

// Инициализация прогресса при загрузке страницы
updateProgress();

// API для управления состоянием прогресса
const progressAPI = {
    setProgress(value) {
        valueInput.value = Math.min(Math.max(value, 0), 100);  // Прогресс в диапазоне от 0 до 100
        updateProgress();
    },
    getProgress() {
        return valueInput.value;
    },
    setAnimate(isAnimated) {
        animateToggle.checked = isAnimated;
        progressBar.classList.toggle('animate', isAnimated);
    },
    setVisibility(isVisible) {
        hideToggle.checked = !isVisible;
        progressContainer.classList.toggle('hidden', !isVisible);
    }
};

// Пример использования API
// progressAPI.setProgress(75);       // Установить прогресс на 75%
// progressAPI.setAnimate(true);      // Включить анимацию
// progressAPI.setVisibility(false); // Скрыть прогресс

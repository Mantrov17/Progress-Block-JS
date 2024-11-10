const progressBar = document.querySelector('.progress-foreground');
const valueInput = document.getElementById('progress-value');
const animateToggle = document.getElementById('animate-toggle');
const hideToggle = document.getElementById('hide-toggle');
const progressContainer = document.querySelector('.container');
const radius = progressBar.getAttribute('r');

const circumference = 2 * Math.PI * radius;

progressBar.style.strokeDasharray = circumference;
progressBar.style.strokeDashoffset = circumference;

const updateProgress = () => {
    const value = Math.min(Math.max(valueInput.value, 0), 100);
    const offset = circumference - (circumference * value) / 100;
    progressBar.style.strokeDashoffset = value === 0 ? circumference : offset;
};

valueInput.addEventListener('input', updateProgress);

animateToggle.addEventListener('change', () => {
    progressBar.classList.toggle('animate', animateToggle.checked);
});

hideToggle.addEventListener('change', () => {
    progressContainer.classList.toggle('hidden', hideToggle.checked);
});

updateProgress();

const progressAPI = {
    setProgress(value) {
        valueInput.value = Math.min(Math.max(value, 0), 100);
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

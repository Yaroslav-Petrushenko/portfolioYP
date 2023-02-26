function createScale(canvasId, percent) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (percent / 100) * 2 * Math.PI;

    // Зберігаємо початкові параметри шкали
    const initialAngle = startAngle;
    const initialPercent = 0;
    const initialEndAngle = initialAngle + (initialPercent / 100) * 2 * Math.PI;

    let currentPercent = 0;
    let currentEndAngle = initialEndAngle;
    let currentAngle = initialAngle;

    const animationDuration = 1000; // 1 секунда
    const animationSteps = 60; // 60 кадрів в секунду

    const step = (endPercent) => {
        // Знаходимо приріст відсотків та кута, який потрібно змінити на поточному кроці анімації
        const percentChange = (endPercent - currentPercent) / animationSteps;
        const angleChange = (endAngle - currentEndAngle) / animationSteps;

        // Очищуємо канвас та малюємо шкалу з поточними параметрами
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, initialAngle, currentEndAngle);
        context.strokeStyle = '#ff0000';
        context.lineWidth = 10;
        context.stroke();

        // Оновлюємо текст з відсотками
        const text = currentPercent.toFixed() + '%';
        context.font = '27px Arial';
        const textWidth = context.measureText(text).width;
        context.fillStyle = '#fff';
        context.fillText(text, centerX - textWidth / 2, centerY + 7);

        // Якщо ми досягли кінцевого відсотка, зупиняємо анімацію
        if (currentPercent >= endPercent) {
            return;
        }

        // Оновлюємо параметри шкали та відсотки
        currentEndAngle += angleChange;
        currentPercent += percentChange;
        currentAngle += angleChange;
        
        // Рекурсивно викликаємо функцію наступного кроку анімації через 1/60 секунди
        setTimeout(() => step(endPercent), animationDuration / animationSteps);
    };

    // Запускаємо анімацію
    
    step(percent);
    
}

const canvasEls = document.querySelectorAll('.progress-item canvas');
canvasEls.forEach(adaptCanvas);


function adaptCanvas(canvasEl) {
    const pixelRatio = window.devicePixelRatio || 1;
    const canvasWidth = canvasEl.clientWidth * pixelRatio;
    const canvasHeight = canvasEl.clientHeight * pixelRatio;
    canvasEl.width = canvasWidth;
    canvasEl.height = canvasHeight;
}

let isFunctionExecuted = false;
let sectionCanvas = document.querySelector('.skills');
let targetLocation = sectionCanvas.getBoundingClientRect().top + window.pageYOffset; // положення цілі

function checkIfFunctionShouldBeExecuted() {
    if (!isFunctionExecuted && window.pageYOffset >= targetLocation - 600) {
    isFunctionExecuted = true;
    createScale('front', 80);
    createScale('back', 30);
    createScale('git', 78);
    createScale('ajax', 70);
    createScale('prepro', 80);
    createScale('libery', 70);
    }
}

checkIfFunctionShouldBeExecuted();

window.addEventListener('scroll', checkIfFunctionShouldBeExecuted);

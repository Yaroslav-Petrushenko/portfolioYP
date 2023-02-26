function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// animation
const animItems = document.querySelectorAll(`._anim-start`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        animItems.forEach(element => {
            const animItem = element
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active-anim`)
            } else {
                if (!(animItem.classList.contains(`_anim-no`))) {
                    animItem.classList.remove(`_active-anim`)
                }
            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    setTimeout(() => {
        animOnScroll()
    }, 200)
}

// span animation

const container = document.querySelector(".welcome");
const titleHello = container.querySelector("h1");
const titleName = container.querySelector("h2");
const titleProfession = container.querySelector("p");


function createSpans(element) {
    const text = element.textContent;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        element.appendChild(span);
    }
}

createSpans(titleHello);
createSpans(titleName);
createSpans(titleProfession);

function animSpan() {
    let spans = container.querySelectorAll("span");
    
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        span.style.position = 'absolute'
        span.style.transition = `all ${(rand(0, 10))/10}s ease ${(rand(0, 10))/10}s`;
        span.style.top = `${rand(window.innerHeight, -window.innerHeight)}px`; //hImg*2, window.innerHeight/2
        span.style.left = `${rand(-window.innerHeight, window.innerHeight)}px`;
        span.style.transform = `rotate(${rand(-180, 180)}deg)`;
    
        setInterval(() => {
            let index = 0
            for (let y = 0; y < spans.length; y++) {
                const span = spans[index]
                index++
                span.style.top = 0 + 'px'
                span.style.left = 0 + 'px'
                span.style.position = 'relative'
            }
        }, 100)
    }
}

window.addEventListener('load', animSpan());

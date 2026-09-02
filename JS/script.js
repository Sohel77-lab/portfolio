/* ===== STARTUP / LOADER ANIMATION ===== */
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const text = loader ? loader.querySelector('.loading-text') : null;
    if (!loader || !text) return;

    loader.style.display = 'flex';

    const style = document.createElement('style');
    style.textContent = `
        #loader {
            opacity: 1 !important;
            visibility: visible !important;
            transition: opacity .75s ease, visibility .75s ease;
            perspective: 900px;
        }
        #loader.hide-loader {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none;
        }
        #loader .loading-text {
            width: auto !important;
            max-width: 90vw;
            border-right: 0 !important;
            overflow: visible !important;
            white-space: normal !important;
            display: flex !important;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0;
            font-size: clamp(2rem, 5vw, 5rem) !important;
            line-height: 1.25;
            letter-spacing: .06em;
            text-align: center;
        }
        #loader .startup-letter {
            display: inline-block;
            opacity: 0;
            transform: translateY(42px) rotateX(-90deg) scale(.55);
            filter: blur(7px);
            animation: sohelLetterReveal .7s cubic-bezier(.22,1,.36,1) forwards;
        }
        #loader .startup-letter.name-letter {
            color: #f58013;
            text-shadow: 0 0 22px rgba(245,128,19,.5);
        }
        #loader .startup-space {
            width: .32em;
            flex: 0 0 .32em;
        }
        @keyframes sohelLetterReveal {
            0% { opacity: 0; transform: translateY(42px) rotateX(-90deg) scale(.55); filter: blur(7px); }
            65% { opacity: 1; transform: translateY(-7px) rotateX(8deg) scale(1.06); filter: blur(0); }
            100% { opacity: 1; transform: translateY(0) rotateX(0) scale(1); filter: blur(0); }
        }
        @media (max-width: 600px) {
            #loader .loading-text { padding: 0 1.5rem; font-size: clamp(1.8rem, 8vw, 3rem) !important; letter-spacing: .03em; }
        }
    `;
    document.head.appendChild(style);

    const message = "WELCOME TO SOHEL'S PORTFOLIO";
    text.innerHTML = '';
    const nameStart = message.indexOf('SOHEL');
    const nameEnd = nameStart + 5;

    [...message].forEach((char, index) => {
        if (char === ' ') {
            const space = document.createElement('span');
            space.className = 'startup-space';
            text.appendChild(space);
            return;
        }
        const letter = document.createElement('span');
        letter.className = 'startup-letter';
        if (index >= nameStart && index < nameEnd) letter.classList.add('name-letter');
        letter.textContent = char;
        letter.style.animationDelay = `${index * 55}ms`;
        text.appendChild(letter);
    });

    const revealDuration = message.length * 55 + 750;
    setTimeout(() => loader.classList.add('hide-loader'), revealDuration);
    setTimeout(() => { loader.style.display = 'none'; }, revealDuration + 800);
});


$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTop = document.querySelector('#scroll-top');
        if (scrollTop) {
            scrollTop.classList.toggle('active', window.scrollY > 60);
        }

        $('section').each(function () {
            const height = $(this).height();
            const offset = $(this).offset().top - 200;
            const top = $(window).scrollTop();
            const id = $(this).attr('id');
            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href*="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (!target || target === '#') return;
        const element = $(target);
        if (!element.length) return;
        e.preventDefault();
        $('html, body').animate({ scrollTop: element.offset().top }, 500, 'linear');
    });

    $('#contact-form').submit(function (event) {
        event.preventDefault();
        emailjs.init('user_TTDmetQLYgWCLzHTDgqxm');
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('contact-form').reset();
                alert('Form Submitted Successfully');
            }, function (error) {
                console.log('FAILED...', error);
                alert('Form Submission Failed! Try Again');
            });
    });
});


document.addEventListener('visibilitychange', function () {
    document.title = document.visibilityState === 'visible'
        ? 'Portfolio | Sohel Hussain'
        : 'Come Back To Portfolio';
    $('#favicon').attr('href', './images/favicon.png');
});


/* ===== TYPED TEXT ===== */
if (document.querySelector('.typing-text') && typeof Typed !== 'undefined') {
    new Typed('.typing-text', {
        strings: ['WEB DEVELOPER', 'GRAPHIC DESIGNER'],
        loop: true,
        typeSpeed: 70,
        backSpeed: 25,
        backDelay: 500
    });
}


/* ===== DATA ===== */
async function fetchData(type = 'skills') {
    const url = type === 'skills' ? './skills.json' : './projects/projects.json';
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    return response.json();
}

function showSkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`).join('');
}

function showProjects(projects) {
    const projectsContainer = document.querySelector('#work .box-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projects.slice(0, 10)
        .filter(project => project.category !== 'android')
        .map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>`).join('');

    initTilt();
}

fetchData('skills').then(showSkills).catch(console.error);
fetchData('projects').then(showProjects).catch(console.error);


/* ===== TILT ===== */
function initTilt() {
    if (typeof VanillaTilt === 'undefined') return;
    const elements = document.querySelectorAll('.tilt');
    if (elements.length) VanillaTilt.init(elements, { max: 15 });
}
initTilt();


/* ===== SCROLL REVEAL ===== */
if (typeof ScrollReveal !== 'undefined') {
    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}


/* ===== TAWK.TO ===== */
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();


/* ===== DISABLE DEV SHORTCUTS ===== */
document.onkeydown = function (e) {
    if (e.keyCode === 123) return false;
    if (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) return false;
    if (e.ctrlKey && e.keyCode === 85) return false;
};

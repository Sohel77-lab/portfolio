$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');
            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear')
    });

    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Sohel Hussain";
        $("#favicon").attr("href", "./images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "./images/favicon.png");
    }
});

var typed = new Typed(".typing-text", {
    strings: ["WEB DEVELOPER", "GRAPHIC DESIGNER"],
    loop: true,
    typeSpeed: 70,
    backSpeed: 25,
    backDelay: 500,
});

async function fetchData(type = "skills") {
    let response;
    type === "skills" ? response = await fetch("skills.json") : response = await fetch("./projects/projects.json");
    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `<div class="bar"><div class="info"><img src=${skill.icon} alt="skill" /><span>${skill.name}</span></div></div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `<div class="box tilt"><img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" /><div class="content"><div class="tag"><h3>${project.name}</h3></div><div class="desc"><p>${project.desc}</p><div class="btns"><a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a><a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a></div></div></div></div>`;
    });
    projectsContainer.innerHTML = projectHTML;
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
}

fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

document.onkeydown = function (e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

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

/* ===== HOME PHOTO CURSOR FOLLOW EFFECT ===== */
(function () {
    const photoArea = document.querySelector('.home .image');
    if (!photoArea) return;

    photoArea.style.position = 'relative';
    photoArea.style.isolation = 'isolate';

    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-orb-canvas';
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    photoArea.insertBefore(canvas, photoArea.firstChild);

    const photo = photoArea.querySelector('img');
    if (photo) {
        photo.style.position = 'relative';
        photo.style.zIndex = '2';
    }

    const ctx = canvas.getContext('2d');
    let mouseX = -500, mouseY = -500;
    let currentX = 0, currentY = 0;
    let particles = [];
    let time = 0;

    function resize() {
        const rect = photoArea.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (currentX === 0 && currentY === 0) {
            currentX = rect.width * 0.62;
            currentY = rect.height * 0.5;
        }
    }

    function move(e) {
        const rect = photoArea.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }

    photoArea.addEventListener('mousemove', move);
    photoArea.addEventListener('mouseenter', move);
    photoArea.addEventListener('mouseleave', function () {
        mouseX = -500;
        mouseY = -500;
    });
    window.addEventListener('resize', resize);
    resize();

    function drawGlow(x, y, radius) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, 'rgba(37, 6, 173, 0.70)');
        g.addColorStop(0.22, 'rgba(73, 28, 220, 0.45)');
        g.addColorStop(0.50, 'rgba(245, 128, 19, 0.22)');
        g.addColorStop(0.78, 'rgba(37, 6, 173, 0.08)');
        g.addColorStop(1, 'rgba(37, 6, 173, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        time += 0.018;
        const rect = photoArea.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        const baseX = rect.width * 0.62 + Math.cos(time) * 18;
        const baseY = rect.height * 0.50 + Math.sin(time * 1.3) * 18;

        currentX += ((mouseX > -100 ? mouseX : baseX) - currentX) * 0.09;
        currentY += ((mouseY > -100 ? mouseY : baseY) - currentY) * 0.09;

        // Always-visible animated aura behind the photo.
        drawGlow(baseX, baseY, 185);
        drawGlow(currentX, currentY, 125);

        // Animated orbit rings.
        ctx.save();
        ctx.translate(baseX, baseY);
        ctx.rotate(time * 0.7);
        ctx.strokeStyle = 'rgba(37, 6, 173, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, 150, 55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.rotate(Math.PI / 2);
        ctx.strokeStyle = 'rgba(245, 128, 19, 0.28)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 135, 45, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Small glowing particles following the cursor.
        if (mouseX > -100 && Math.random() > 0.45) {
            particles.push({
                x: currentX,
                y: currentY,
                life: 1,
                size: 2 + Math.random() * 3,
                drift: (Math.random() - 0.5) * 1.5
            });
        }

        particles.forEach((p, i) => {
            p.life -= 0.018;
            p.y -= 0.35;
            p.x += p.drift;
            if (p.life <= 0) {
                particles.splice(i, 1);
                return;
            }
            ctx.beginPath();
            ctx.fillStyle = `rgba(37, 6, 173, ${p.life * 0.85})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(37, 6, 173, 0.8)';
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
})();

/* ===== STARTUP LETTER ANIMATION ===== */
(function () {
    function initStartupAnimation() {
        const loader = document.getElementById('loader');
        const text = loader ? loader.querySelector('.loading-text') : null;
        if (!loader || !text) return;

        const style = document.createElement('style');
        style.textContent = `
            #loader {
                opacity: 1;
                visibility: visible;
                transition: opacity .8s ease, visibility .8s ease;
            }
            #loader.startup-complete {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }
            #loader .loading-text {
                width: auto;
                border-right: 0;
                overflow: visible;
                white-space: normal;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0;
                font-size: clamp(2rem, 5vw, 4.8rem);
                letter-spacing: .08em;
                text-align: center;
            }
            #loader .loading-letter {
                display: inline-block;
                opacity: 0;
                transform: translateY(45px) rotateX(-90deg) scale(.5);
                filter: blur(8px);
                animation: sohelLetterIn .75s cubic-bezier(.22,1,.36,1) forwards;
            }
            #loader .loading-space {
                width: .35em;
            }
            #loader .loading-letter.highlight {
                color: #f58013;
                text-shadow: 0 0 18px rgba(245,128,19,.45);
            }
            @keyframes sohelLetterIn {
                0% { opacity: 0; transform: translateY(45px) rotateX(-90deg) scale(.5); filter: blur(8px); }
                65% { opacity: 1; transform: translateY(-7px) rotateX(8deg) scale(1.05); filter: blur(0); }
                100% { opacity: 1; transform: translateY(0) rotateX(0) scale(1); filter: blur(0); }
            }
            @media (max-width: 600px) {
                #loader .loading-text { padding: 0 2rem; line-height: 1.25; letter-spacing: .04em; }
            }
        `;
        document.head.appendChild(style);

        const message = "WELCOME TO SOHEL'S PORTFOLIO";
        text.textContent = '';

        [...message].forEach((char, index) => {
            if (char === ' ') {
                const space = document.createElement('span');
                space.className = 'loading-space';
                text.appendChild(space);
                return;
            }

            const letter = document.createElement('span');
            letter.className = 'loading-letter';
            if (index >= message.indexOf('SOHEL') && index < message.indexOf('SOHEL') + 5) {
                letter.classList.add('highlight');
            }
            letter.textContent = char;
            letter.style.animationDelay = `${index * 0.055}s`;
            text.appendChild(letter);
        });

        const totalTime = message.length * 55 + 850;
        setTimeout(() => {
            loader.classList.add('startup-complete');
            setTimeout(() => loader.remove(), 900);
        }, totalTime);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStartupAnimation);
    } else {
        initStartupAnimation();
    }
})();

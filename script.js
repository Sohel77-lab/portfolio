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

    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-orb-canvas';
    photoArea.insertBefore(canvas, photoArea.firstChild);

    const ctx = canvas.getContext('2d');
    let mouseX = -100, mouseY = -100;
    let currentX = -100, currentY = -100;
    let particles = [];

    function resize() {
        const rect = photoArea.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function move(e) {
        const rect = photoArea.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            photoArea.classList.add('cursor-orb-active');
        }
    }

    photoArea.addEventListener('mousemove', move);
    photoArea.addEventListener('mouseenter', move);
    photoArea.addEventListener('mouseleave', function () {
        mouseX = -100;
        mouseY = -100;
        photoArea.classList.remove('cursor-orb-active');
    });
    window.addEventListener('resize', resize);
    resize();

    function animate() {
        currentX += (mouseX - currentX) * 0.14;
        currentY += (mouseY - currentY) * 0.14;
        const rect = photoArea.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        if (mouseX > -50) {
            const g = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 150);
            g.addColorStop(0, 'rgba(37,6,173,0.55)');
            g.addColorStop(0.35, 'rgba(37,6,173,0.25)');
            g.addColorStop(0.7, 'rgba(245,128,19,0.10)');
            g.addColorStop(1, 'rgba(37,6,173,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 150, 0, Math.PI * 2);
            ctx.fill();

            if (Math.random() > 0.55) particles.push({ x: currentX, y: currentY, life: 1, size: 1.5 + Math.random() * 3 });
        }

        particles.forEach((p, i) => {
            p.life -= 0.025;
            p.y -= 0.4;
            p.x += (Math.random() - 0.5) * 0.8;
            if (p.life <= 0) particles.splice(i, 1);
            else {
                ctx.beginPath();
                ctx.fillStyle = `rgba(37,6,173,${p.life * 0.55})`;
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

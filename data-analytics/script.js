const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>{loader.classList.add('done');loader.style.opacity='0';loader.style.visibility='hidden'},1100));
const menu=document.getElementById('menu'),nav=document.getElementById('navLinks');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>{document.querySelector('.nav').classList.toggle('scrolled',window.scrollY>40)});

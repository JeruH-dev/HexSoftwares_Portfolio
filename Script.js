// ===== Utiities ===== //
const el = (sel) => document.querySelector(sel);
const els = (sel) => Array.from(document.querySelectorAll(sel));

// ===== Year in foter ===== //
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Typing effect ===== //
(function typing() {
    const node = document.getElementById('typing');
    const phrases = ['HTML5 • CSS3 • JS', 'Responsive Interfaces', 'Performance & Accessibility', 'Small, maintainable code', 'React • Tailwind • Bootstrap • Typscript', 'Node.js • Express • MongoDB'];
    let i = 0, j = 0, forward = true;
    function step() {
        const word = phrases[i];
        node.textContent = word.slice(0, j) + '\u00a0';
        if (forward) {
            j++;
            if (j > word.length) {
                forward = false;
                setTimeout(step, 500 /*1500*/);
                return;
            }
        }
        else {
            j--;
            if (j < 0) {
                forward = true;
                i = (i + 1) % phrases.length;
            }
        };
        setTimeout(step, (forward ? 80 : 30) /* + Math.random()50*/);
    }
    step();
})
    ();

function clearTyping() {
    const node = document.getElementById('typing');
    node.textContent = '';
}
// ===== Alternate typing effect (Inconvenient to use on mobile) ===== //
/*const roles = ["Gideon Efiakedoho", "a Web developer", /*"a Forestry & WIldlife graduate", "an Intern @ Hex Softwares"];
const typingElement = document.getElementById("typing-name");
const phrases = ['Gideon Efiakedoho', 'a Web developer', 'a Forestry & WIldlife graduate'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
function typeCycle() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex -- );
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeCycle, 500);
            return;
        }
    } 
    else {
        typingElement.textContent = currentRole.substring(0, charIndex ++ );
        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeCycle, 1000);
            return;
        }
    }
    setTimeout(typeCycle, isDeleting ? 80 : 50);
}*/
document.addEventListener("DOMContentLoaded", typeCycle);

// ===== Theme toggle ===== //
const themeToggle = el('#theme-toggle');
themeToggle.addEventListener('change', e => {
    document.body.setAttribute('data-theme', e.target.checked ? 'light' : 'dark');
});

// ===== Resume download (simple approach: open resume.pdf in same folder) ===== //
el('#download-resume').addEventListener('click', () => {
    const url = 'G E Resume.pdf';
    window.open(url, '_blank');
});

// ===== Contact quick button ===== //
el('#contact-me').addEventListener('click', () => {
    el('#contact-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ===== Contact form clear button ===== //
el('#clear-form').addEventListener('click', () => {
    el('#contact-form').reset();
});

// ===== Contact form submit handler ===== // /* using Formspree */
/* el('#contact-form').addEventListener('submit', e=>{
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json'); 
    xhr.onreadystatechange = () => {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 200){ 
            form.reset();
            alert('Thank you for your message! I will get back to you soon.');
        }   
        else alert('Oops! There was a problem. Please try again later.');
    }
    xhr.send(data);
}); */

// ===== Project open modal =====//
els('.project').forEach(p => {
    p.addEventListener('click', () => {
        const title = p.querySelector('h4').textContent;
        const desc = p.querySelector('p').textContent;
        const demo = p.getAttribute('data-demo') || '#';
        const src = p.getAttribute('data-source') || '#';
        el('#modal-title').textContent = title;
        el('#modal-desc').textContent = desc;
        el('#modal-demo').href = demo;
        el('#modal-source').href = src;
        el('#project-modal').classList.add('open');
    });
});

// ===== Project close modal =====//
el('#close-modal').addEventListener('click', () => el('#project-modal').classList.remove('open'));
el('#modal').addEventListener('click', e => {
    if (e.target === el('modal')) el('#modal').classList.remove('open');
});

// ===== Project filter buttons ===== //
els('button[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        els('.proj').forEach(p => {
            if (f === 'all') p.style.display = 'flex';
            else p.style.display = (p.dataset.tags.split(' ').includes(f)) ? 'flex' : 'none';
        });
    });
});

// ===== Basic form handler (Progressivr enhancement) ===== //
const form = el('#contact-form');
form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    try {
        const resp = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
            alert('Thank you, message sent! I will get back to you soon.');
            form.reset();
        }
        else alert('Oops! There was a problem. Please try again later.');
    } catch (err) {
        alert('Network error. Please try again later.');
    }
});

// ===== Accessibility: focus outlines for Keyboard/mouse users ===== //
let mouseUser = false;
document.body.addEventListener('mousedown', () => {
    if (!mouseUser) {
        mouseUser = true;
        document.body.classList.add('using-mouse');
    }
});
document.body.addEventListener('keyup', (e) => {
    if (mouseUser && e.key === 'Tab') {
        mouseUser = false;
        document.body.classList.remove('using-mouse');
    }
    document.body.classList.add('show-focus');
});

// ===================== //
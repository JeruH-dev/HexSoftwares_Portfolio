// ===== Utilities ===== //
const el = (sel) => document.querySelector(sel);
const els = (sel) => Array.from(document.querySelectorAll(sel));

// ===== Year in footer ===== //
el('#year').textContent = new Date().getFullYear();

// ===== Typing effect ===== //
(function typing() {
    const node = el('#typing');
    const phrases = [
        'HTML5 • CSS3 • JS',
        'Responsive Interfaces',
        'Performance & Accessibility',
        'Small, maintainable code',
        'React • Tailwind • Bootstrap • Typescript',
        'Node.js • Express • MongoDB'
    ];
    let i = 0, j = 0, forward = true;

    function step() {
        const word = phrases[i];
        node.textContent = word.slice(0, j) + '\u00a0';

        if (forward) {
            j++;
            if (j > word.length) {
                forward = false;
                return setTimeout(step, 500);
            }
        } else {
            j--;
            if (j < 0) {
                forward = true;
                i = (i + 1) % phrases.length;
            }
        }

        setTimeout(step, forward ? 80 : 30);
    }
    step();
})();

function clearTyping() {
    const node = el('#typing');
    node.textContent = '';
}

// ===== Theme toggle ===== //
el('#theme-toggle')?.addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.checked ? 'light' : 'dark');
});

// ===== Resume download ===== //
el('#download-resume')?.addEventListener('click', () => {
    window.open('G E Resume.pdf', '_blank');
});

// ===== Contact quick button ===== //
el('#contact-me')?.addEventListener('click', () => {
    el('#contact-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ===== Contact form clear button ===== //
el('#clear-form')?.addEventListener('click', () => {
    el('#contact-form').reset();
});

// ===== Project Modal ===== //
els('.project').forEach((p) => {
    p.addEventListener('click', () => {
        el('#modal-title').textContent = p.querySelector('h4').textContent;
        el('#modal-desc').textContent = p.querySelector('p').textContent;
        el('#modal-demo').href = p.getAttribute('data-demo') || '#';
        el('#modal-source').href = p.getAttribute('data-source') || '#';
        el('#project-modal').classList.add('open');
    });
});

el('#close-modal')?.addEventListener('click', () => {
    el('#project-modal').classList.remove('open');
});

const modal = el('#modal');
modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});

// ===== Project filtering w/ animation ===== //
const projectCards = els('.proj');
const filterButtons = els('[data-filter]');

filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        projectCards.forEach((card) => {
            const tags = card.dataset.tags.split(' ');
            const show = filter === 'all' || tags.includes(filter);

            card.style.display = show ? 'block' : 'none';
            card.classList.toggle('fade-in', show);
            card.classList.toggle('fade-out', !show);
        });
    });
});

// ===== Contact form submit (fetch + UX) ===== //
const form = el('#contact-form');
const submitBtn = form?.querySelector('button[type="submit"]');

form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const data = new FormData(form);

    try {
        const resp = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
        });

        if (resp.ok) {
            alert('Thank you, message sent! I will get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem. Please try again later.');
        }
    } catch (err) {
        alert('Network error. Please try again later.');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send';
});

// ===== Accessibility focus handling ===== //
let mouseUser = false;
document.body.addEventListener('mousedown', () => {
    if (!mouseUser) {
        mouseUser = true;
        document.body.classList.add('using-mouse');
    }
});

// Show focus when tabbing

document.body.addEventListener('keyup', (e) => {
    if (mouseUser && e.key === 'Tab') {
        mouseUser = false;
        document.body.classList.remove('using-mouse');
    }
    document.body.classList.add('show-focus');
});

// ===== Scroll animations ===== //
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('appear');
        });
    },
    { threshold: 0.3 }
);

projectCards.forEach((card) => observer.observe(card));

// ===== Subtle stagger + hover cruise =====
const cards = document.querySelectorAll('.proj');
cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
});

// smooth hover lift
const style = document.createElement('style');
style.textContent = `
  .proj {
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .proj:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
  .filter-btn.active {
    border-bottom: 2px solid currentColor;
    font-weight: 600;
  }
  .modal.open {
    opacity: 1;
    transform: scale(1);
  }
  .modal {
    opacity: 0;
    transform: scale(.96);
    transition: opacity .25s ease, transform .25s ease;
  }
`;
document.head.appendChild(style);

// ===== Lazy-loading logic =====
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyObserver.unobserve(img);
        }
    });
}, { rootMargin: '100px' });

lazyImages.forEach(img => lazyObserver.observe(img));
// End of Script.js
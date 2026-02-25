// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('show', window.scrollY > 400);

    // Active nav highlight
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
    });
});

// ===================== BACK TO TOP =====================
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===================== HAMBURGER =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ===================== PHOTO LOAD =====================
// Try to load the profile photo from photo.jpg
window.addEventListener('DOMContentLoaded', () => {
    const profilePhoto = document.getElementById('profilePhoto');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const aboutPhoto = document.getElementById('aboutPhoto');
    const aboutPhotoPlaceholder = document.getElementById('aboutPhotoPlaceholder');

    if (profilePhoto) {
        profilePhoto.addEventListener('load', () => {
            profilePhoto.classList.add('loaded');
            if (photoPlaceholder) photoPlaceholder.style.display = 'none';
        });
        profilePhoto.addEventListener('error', () => {
            profilePhoto.style.display = 'none';
            if (photoPlaceholder) photoPlaceholder.style.display = 'flex';
        });
    }
    if (aboutPhoto) {
        aboutPhoto.addEventListener('load', () => {
            aboutPhoto.classList.add('loaded');
            if (aboutPhotoPlaceholder) aboutPhotoPlaceholder.style.display = 'none';
        });
        aboutPhoto.addEventListener('error', () => {
            aboutPhoto.style.display = 'none';
            if (aboutPhotoPlaceholder) aboutPhotoPlaceholder.style.display = 'flex';
        });
    }
});

// ===================== SKILLS TABS =====================
document.querySelectorAll('.stab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('panel-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
    });
});

// ===================== PROJECT FILTER =====================
document.querySelectorAll('.pfbtn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.pfbtn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.pcard').forEach(card => {
            const show = filter === 'all' || card.dataset.cat === filter;
            card.classList.toggle('hidden', !show);
        });
    });
});

// ===================== COUNTER ANIMATION =====================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(timer);
        }, 35);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.snum[data-target]').forEach(el => counterObserver.observe(el));

// ===================== FADE UP ON SCROLL =====================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        fadeObserver.unobserve(entry.target);
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.pcard, .skill-card, .info-item, .ccard, .about-badge, .edu-card, .sec-title, .sec-label'
).forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
});

// ===================== CONTACT FORM =====================
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending... ⏳';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Send Message ✈️';
        btn.disabled = false;
        msg.className = 'fmsg success';
        msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
        document.getElementById('contactForm').reset();
        setTimeout(() => {
            msg.className = 'fmsg';
            msg.textContent = '';
        }, 5000);
    }, 1500);
}

// ===================== SMOOTH NAV CLICK =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 800);
    });

    // ── Theme ──
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleFooter = document.getElementById('themeToggleFooter');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleFooter) themeToggleFooter.addEventListener('click', toggleTheme);

    // ── Language ──
    let currentLang = localStorage.getItem('lang') || 'en';

    function applyLang(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.dataset[lang];
        });
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ru');
        const titleEn = document.documentElement.dataset.titleEn;
        const titleRu = document.documentElement.dataset.titleRu;
        if (titleEn && titleRu) document.title = lang === 'en' ? titleEn : titleRu;
        document.querySelectorAll('.lang-toggle').forEach(btn => {
            btn.textContent = lang === 'en' ? 'RU' : 'EN';
        });
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    applyLang(currentLang);

    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'ru' : 'en'));
    });

    // ── Mobile nav ──
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ── Active nav link ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    console.log('%c NEFORCEO ', 'background: #009688; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Welcome to my website! ', 'background: #455a64; color: white; font-size: 14px; padding: 5px;');
});

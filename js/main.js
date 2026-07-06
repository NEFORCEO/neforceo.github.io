document.addEventListener('DOMContentLoaded', function () {

    var preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('hidden');
                setTimeout(function () { preloader.style.display = 'none'; }, 600);
            }, 800);
        });
    }

    var currentLang = localStorage.getItem('lang') || 'en';

    function applyLang(lang) {
        document.querySelectorAll('[data-en]').forEach(function (el) {
            var text = el.getAttribute('data-' + lang);
            if (text !== null) el.innerHTML = text;
        });
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ru');
        var titleEn = document.documentElement.getAttribute('data-title-en');
        var titleRu = document.documentElement.getAttribute('data-title-ru');
        if (titleEn && titleRu) document.title = lang === 'en' ? titleEn : titleRu;

        document.querySelectorAll('.language-button').forEach(function (btn) {
            btn.classList.remove('en', 'ru');
            btn.classList.add(lang);
            if (lang === 'en') {
                btn.innerHTML = '<strong class="language-button__selected">EN</strong> RU';
            } else {
                btn.innerHTML = 'EN <strong class="language-button__selected">RU</strong>';
            }
        });

        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    applyLang(currentLang);

    document.querySelectorAll('.language-button').forEach(function (btn) {
        btn.addEventListener('click', function () {
            applyLang(currentLang === 'en' ? 'ru' : 'en');
        });
    });

    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            var icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                var icon = navToggle.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            });
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                var icon = navToggle.querySelector('i');
                if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            }
        });
    }

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
        var href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    var swiperInner = document.getElementById('projectsContainer');
    if (swiperInner) {
        var slides = swiperInner.querySelectorAll('.projects__swiper-slide');
        var slideCount = slides.length;
        var currentSlide = 0;
        var arrowLeft = document.getElementById('arrowLeft');
        var arrowRight = document.getElementById('arrowRight');
        var slideButtons = document.querySelectorAll('.projects__slide-button');

        function goToSlide(index) {
            currentSlide = index;

            swiperInner.style.transform = 'translateX(calc(' + (-index) + ' * (100% + 100px)))';

            slideButtons.forEach(function (btn, i) {
                btn.classList.toggle('active', i === index);
            });

            if (arrowLeft)  arrowLeft.classList.toggle('active',  index > 0);
            if (arrowRight) arrowRight.classList.toggle('active', index < slideCount - 1);
        }

        if (arrowLeft) {
            arrowLeft.addEventListener('click', function () {
                if (currentSlide > 0) goToSlide(currentSlide - 1);
            });
        }
        if (arrowRight) {
            arrowRight.addEventListener('click', function () {
                if (currentSlide < slideCount - 1) goToSlide(currentSlide + 1);
            });
        }

        slideButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                goToSlide(parseInt(btn.getAttribute('data-to-index'), 10));
            });
        });

        goToSlide(0);
    }

    var projectData = {
        'fasthttp': {
            title: 'fasthttp-client',
            titleRu: 'fasthttp-client',
            type: 'Python Library',
            typeRu: 'Библиотека Python',
            desc: 'Modern async HTTP client built on httpx. Features decorator-based routing, HTTP/2 support, rate limiting, retry logic, middleware, and beautiful colored request/response logging.',
            descRu: 'Современный async HTTP-клиент на базе httpx. Декораторный роутинг, HTTP/2, rate limiting, retry-логика, middleware и цветной логгинг запросов.',
            skills: 'Python 3.10+, httpx, Async, HTTP/2, Rate Limiting, Middleware',
            links: [
                { text: 'GitHub → ndugram/fasthttp', href: 'https://github.com/ndugram/fasthttp' }
            ]
        },
        'django-pydantic': {
            title: 'django-pydantic-client',
            titleRu: 'django-pydantic-client',
            type: 'Python Library',
            typeRu: 'Библиотека Python',
            desc: 'Instantiate Pydantic v2 models directly from Django HttpRequest — one-line request validation with automatic 422 JSON error responses and zero boilerplate.',
            descRu: 'Создавай Pydantic v2-модели прямо из Django HttpRequest. Валидация в одну строку, автоматические 422 JSON-ответы, ноль boilerplate.',
            skills: 'Python 3.10+, Django, Pydantic v2, Validation, Middleware',
            links: [
                { text: 'GitHub → NEFORCEO/django-pydantic', href: 'https://github.com/NEFORCEO/django-pydantic' }
            ]
        },
        'fastvk': {
            title: 'fastvk',
            titleRu: 'fastvk',
            type: 'Python Library',
            typeRu: 'Библиотека Python',
            desc: 'Async VK bot framework with a FastAPI/aiogram-style decorator API. Built-in FSM with pluggable storage, filters, keyboard builder, auto-retry, auto-pagination, and a real-time monitoring dashboard.',
            descRu: 'Асинхронный фреймворк для VK-ботов с декораторным API в стиле FastAPI/aiogram. Встроенный FSM с подключаемым хранилищем, фильтры, конструктор клавиатур, авто-retry и дашборд мониторинга в реальном времени.',
            skills: 'Python 3.10+, aiohttp, Pydantic v2, FSM, Middleware, Dashboard',
            links: [
                { text: 'GitHub → ndugram/fastvk', href: 'https://github.com/ndugram/fastvk' }
            ]
        },
        'hitmos': {
            title: 'hitmos',
            titleRu: 'hitmos',
            type: 'CLI Tool',
            typeRu: 'CLI-инструмент',
            desc: 'AI terminal assistant powered by OpenRouter. Streams Markdown responses live, switches between DeepSeek/Gemini/Claude/GPT-4o/Llama and more, and automatically injects project context into the system prompt.',
            descRu: 'AI-ассистент для терминала на базе OpenRouter. Потоково выводит ответы в Markdown, переключается между DeepSeek/Gemini/Claude/GPT-4o/Llama и другими, автоматически добавляет контекст проекта в системный промпт.',
            skills: 'Python 3.13+, OpenRouter, SSE Streaming, Typer, Rich',
            links: [
                { text: 'GitHub → ndugram/hitmos', href: 'https://github.com/ndugram/hitmos' }
            ]
        },
        'fastui2': {
            title: 'fastui2',
            titleRu: 'fastui2',
            type: 'Python Library',
            typeRu: 'Библиотека Python',
            desc: 'Server-rendered UI library for Python. Define pages as decorated functions that compile straight to HTML — Pydantic-validated components, typed URL routing, server-side actions, and built-in Swagger UI. Zero JavaScript required.',
            descRu: 'Библиотека серверного рендеринга UI для Python. Страницы описываются декорированными функциями и компилируются прямо в HTML — компоненты с Pydantic-валидацией, типизированный роутинг, серверные действия и встроенный Swagger UI. Без JavaScript.',
            skills: 'Python 3.10+, Pydantic v2, Routing, Zero JS, Swagger UI',
            links: [
                { text: 'GitHub → ndugram/fastui2', href: 'https://github.com/ndugram/fastui2' }
            ]
        },
        'fastgram': {
            title: 'fastgram-cli',
            titleRu: 'fastgram-cli',
            type: 'Python Library',
            typeRu: 'Библиотека Python',
            desc: 'CLI tool for FastAPI developers. Scaffold new projects with a Django-like directory structure, auto-configure middleware, manage SSL certificates, and deploy-ready setups.',
            descRu: 'CLI-инструмент для FastAPI-разработчиков. Инициализируй проекты с Django-подобной структурой, настрой middleware и SSL за секунды.',
            skills: 'Python 3.10+, FastAPI, CLI, SSL, Middleware',
            links: [
                { text: 'GitHub → ndugram/fastgram-cli', href: 'https://github.com/ndugram/fastgram-cli' }
            ]
        },
        'fasthttp-ext': {
            title: 'fasthttp-extension',
            titleRu: 'fasthttp-extension',
            type: 'VS Code Extension',
            typeRu: 'Расширение VS Code',
            desc: 'VS Code extension for the FastHTTP library. Scaffold projects from Command Palette, explore all routes in a sidebar tree view, get CodeLens actions above route decorators, and catch handler errors inline.',
            descRu: 'Расширение VS Code для FastHTTP. Создавай проекты через Command Palette, просматривай маршруты в дереве, получай CodeLens-действия над декораторами и лови ошибки в редакторе.',
            skills: 'TypeScript, VS Code API, Route Explorer, Diagnostics, CodeLens',
            links: [
                { text: 'GitHub → ndugram/fasthttp-extension', href: 'https://github.com/ndugram/fasthttp-extension' }
            ]
        },
        'ndu-dark': {
            title: 'ndu-dark',
            titleRu: 'ndu-dark',
            type: 'VS Code Theme',
            typeRu: 'Тема VS Code',
            desc: 'A dark theme for Visual Studio Code featuring floating glass-like panels, rounded corners, smooth UI animations, and carefully tuned warm syntax highlighting for comfortable long coding sessions.',
            descRu: 'Тёмная тема VS Code с плавающими стеклянными панелями, скруглёнными углами, плавными анимациями и тёплой подсветкой синтаксиса для комфортной работы.',
            skills: 'VS Code Theme, Glass Effect, Floating Panels, Warm Colors',
            links: [
                { text: 'GitHub → ndugram/ndu-dark', href: 'https://github.com/ndugram/ndu-dark' }
            ]
        }
    };

    var popup = document.getElementById('popup');
    var popupClose = document.getElementById('popupClose');
    var popupTitle = document.getElementById('popupTitle');
    var popupType = document.getElementById('popupType');
    var popupDesc = document.getElementById('popupDesc');
    var popupSkills = document.getElementById('popupSkills');
    var popupLinks = document.getElementById('popupLinks');

    function openPopup(key) {
        var data = projectData[key];
        if (!data || !popup) return;

        var lang = currentLang;
        popupTitle.textContent  = lang === 'ru' ? data.titleRu  : data.title;
        popupType.textContent   = lang === 'ru' ? data.typeRu   : data.type;
        popupDesc.textContent   = lang === 'ru' ? data.descRu   : data.desc;
        popupSkills.textContent = data.skills;

        popupLinks.innerHTML = '';
        data.links.forEach(function (link) {
            var li = document.createElement('li');
            var a  = document.createElement('a');
            a.href = link.href;
            a.target = '_blank';
            a.className = 'popup__link-text';
            a.textContent = link.text;
            li.appendChild(a);
            popupLinks.appendChild(li);
        });

        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        if (!popup) return;
        popup.classList.add('hidden');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.project__info-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openPopup(btn.getAttribute('data-open'));
        });
    });

    if (popupClose) popupClose.addEventListener('click', closePopup);

    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === popup) closePopup();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePopup();
    });

    document.querySelectorAll('.skills-form__label').forEach(function (label) {
        label.addEventListener('click', function () {
            label.classList.toggle('selected');
        });
    });

    console.log('%c NEFORCEO ', 'background:#303030;color:white;font-size:20px;padding:10px;');
    console.log('%c Welcome! ', 'background:#707070;color:white;font-size:14px;padding:5px;');
});
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-level');
    // Шкали навичок
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
        const percentElement = bar.closest('.skill-container').querySelector('.skill-percent');
        percentElement.textContent = level + '%';
    });
    // Функціонал перемикача теми
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeButtonText('dark');
    } else {
        updateThemeButtonText('light');
    }
    // Обробник кліку на перемикач теми
    themeToggle.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeButtonText('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeButtonText('dark');
        }
    });
    function updateThemeButtonText(theme) {
        const themeText = themeToggle.querySelector('span');
        const currentLang = localStorage.getItem('language') || 'ua';
        if (theme === 'dark') {
            themeText.setAttribute('data-ua', 'Світлий режим');
            themeText.setAttribute('data-en', 'Light Mode');
            themeText.textContent = currentLang === 'ua' ? 'Світлий режим' : 'Light Mode';
        } else {
            themeText.setAttribute('data-ua', 'Темний режим');
            themeText.setAttribute('data-en', 'Dark Mode');
            themeText.textContent = currentLang === 'ua' ? 'Темний режим' : 'Dark Mode';
        }
    }
    // Функціонал перемикача мов
    const languageToggle = document.getElementById('language-toggle');
    const currentLanguage = localStorage.getItem('language') || 'ua';
    // Початкова мова
    if (currentLanguage === 'en') {
        switchLanguage('en');
        languageToggle.textContent = 'UA';
    } else {
        languageToggle.textContent = 'EN';
    }
    // Обробник кліку на перемикач мов
    languageToggle.addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'ua';
        if (currentLang === 'ua') {
            switchLanguage('en');
            languageToggle.textContent = 'UA';
            localStorage.setItem('language', 'en');
        } else {
            switchLanguage('ua');
            languageToggle.textContent = 'EN';
            localStorage.setItem('language', 'ua');
        }
        const currentTheme = localStorage.getItem('theme') || 'light';
        updateThemeButtonText(currentTheme);
    });
    // Функція для перемикання мови
    function switchLanguage(lang) {
        document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';
        const title = document.querySelector('title');
        title.textContent = title.getAttribute(`data-${lang}`);
        const elements = document.querySelectorAll('[data-ua][data-en]');
        elements.forEach(element => {
            if (element.tagName === 'TITLE') return;
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        const photo = document.querySelector('#hero img');
        if (photo) {
            photo.alt = lang === 'ua' ? 'Моє Фото' : 'My Photo';
        }
        const socialLinks = document.querySelectorAll('.social-icon');
        socialLinks.forEach(link => {
            const platform = link.querySelector('img').alt;
            if (platform === 'LinkedIn' || platform === 'GitHub') {
            }
        });
    }
    // Функціонал бургер-меню для моб
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    // Клік на бургер-меню
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
        // Закриття меню при кліку на посилання
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });
        // Закриття меню при кліку поза ним
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    }
});
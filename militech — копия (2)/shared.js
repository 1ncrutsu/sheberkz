// Translations
const translations = {
    kz: {
        title: "Sheber.kz",
        desc: "Қазақстанға арналған шеберлер алаңы: тапсырыс беруші мен шеберді тез байланыстырамыз.",
        start_btn: "Бастау",
        modal_phone_title: "Кіру",
        modal_phone_desc: "Жалғастыру үшін телефон нөмірін енгізіңіз",
        lbl_phone: "Телефон",
        btn_get_code: "Код алу",
        modal_code_title: "Растау",
        modal_code_desc: "Код жіберілді:",
        lbl_code: "СМС коды",
        btn_confirm: "Растау",
        btn_change_phone: "Нөмірді өзгерту",
        role_title: "Сіз кімсіз?",
        role_client: "Клиент",
        role_client_sub: "Шебер іздеймін",
        role_master: "Шебер",
        role_master_sub: "Клиент іздеймін",
        reg_title: "Тіркелу",
        lbl_name: "Есіміңіз",
        lbl_spec: "Мамандық",
        btn_save: "Дайын",
        menu_profile: "Профиль",
        menu_orders: "Тапсырыстар",
        menu_settings: "Баптаулар",
        menu_help: "Көмек",
        active_order: "Белсенді тапсырыс",
        order_status: "Шебер жолда",
        profile_title: "Профиль",
        unsaved: "Сақталмаған",
        saved: "Сақталды",
        lbl_city: "Қала",
        // Add more as needed
    },
    ru: {
        title: "Sheber.kz",
        desc: "Платформа мастеров Казахстана: Мы быстро связываем заказчика и мастера.",
        start_btn: "Начать",
        modal_phone_title: "Вход",
        modal_phone_desc: "Введите номер телефона для продолжения",
        lbl_phone: "Телефон",
        btn_get_code: "Получить код",
        modal_code_title: "Подтверждение",
        modal_code_desc: "Код отправлен на:",
        lbl_code: "Код из СМС",
        btn_confirm: "Подтвердить",
        btn_change_phone: "Изменить номер",
        role_title: "Кто вы?",
        role_client: "Заказчик",
        role_client_sub: "Ищу мастера",
        role_master: "Мастер",
        role_master_sub: "Ищу заказы",
        reg_title: "Регистрация",
        lbl_name: "Ваше имя",
        lbl_spec: "Специальность",
        btn_save: "Готово",
        menu_profile: "Профиль",
        menu_orders: "Заказы",
        menu_settings: "Настройки",
        menu_help: "Помощь",
        active_order: "Активный заказ",
        order_status: "Мастер в пути",
        profile_title: "Профиль",
        unsaved: "Не сохранено",
        saved: "Сохранено",
        lbl_city: "Город",
        // Add more as needed
    }
};

// State
let currentLang = localStorage.getItem('lang') || 'ru'; // Default to RU for now
let currentTheme = localStorage.getItem('theme') || 'dark';

// Init
function initApp() {
    setTheme(currentTheme);
    setLanguage(currentLang);
    setupThemeToggles();
    setupLanguageSwitchers();
}

// Translations System
function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.innerText = t(key);
        if (el.placeholder) el.placeholder = t(key);
    });

    // Update active state of switchers
    document.querySelectorAll('.lang-option').forEach(opt => {
        if (opt.dataset.lang === lang) opt.classList.add('active');
        else opt.classList.remove('active');
    });

    // Move glider
    document.querySelectorAll('.lang-switcher').forEach(switcher => {
        const activeOption = switcher.querySelector(`.lang-option[data-lang="${lang}"]`);
        const glider = switcher.querySelector('.lang-glider');
        if (activeOption && glider) {
            glider.style.width = `${activeOption.offsetWidth}px`;
            glider.style.transform = `translateX(${activeOption.offsetLeft}px)`;
        }
    });
}

function setupLanguageSwitchers() {
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => setLanguage(opt.dataset.lang));
    });
    // Initial glider position
    setTimeout(() => setLanguage(currentLang), 50); 
}

// Theme System
function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggles
    document.querySelectorAll('.theme-toggle').forEach(chk => {
        chk.checked = (theme === 'dark');
    });
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setupThemeToggles() {
    // Can bind to specific buttons or checkboxes
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => btn.addEventListener('click', toggleTheme));
}

// Toast System
function showToast(message, type = 'info', timeout = 3000) {
    let wrap = document.getElementById('toastWrap');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'toastWrap';
        wrap.className = 'toast-wrap';
        document.body.appendChild(wrap);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <div class="dot"></div>
            <div class="msg">${escapeHtml(message)}</div>
        </div>
        <button class="close">&times;</button>
    `;

    wrap.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    const remove = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.close').addEventListener('click', remove);
    setTimeout(remove, timeout);
}

// Utils
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initApp);

// home.js (Feed Page Logic)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // 2. Sidebar Theme Toggle
    // Sync with current theme
    if (themeToggleSidebar) {
        themeToggleSidebar.checked = (localStorage.getItem('theme') === 'dark');
        themeToggleSidebar.addEventListener('change', () => {
            toggleTheme(); // from shared.js
        });
    }

    // 3. Fake Data Loading
    loadActiveOrder();
});

function loadActiveOrder() {
    const card = document.getElementById('activeOrderCard');

    // Simulate API call
    setTimeout(() => {
        card.classList.remove('loading', 'skeleton');

        // In a real app, we would create elements here. 
        // For now, we just unhide the static content (or we could inject it).
        // Let's inject to be cleaner and verify "dynamic" capability.
        card.innerHTML = `
            <div class="order-info">
                <div class="order-label">${t('active_order')}</div>
                <div class="order-status">Сантехника: ${currentLang === 'ru' ? 'Замена крана' : 'Кран ауыстыру'}</div>
            </div>
            <div class="order-price" style="font-weight:700; color:var(--accent-green)">5 000 ₸</div>
            <div class="order-btn" onclick="showToast('${t('saved')}', 'success')">
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:currentColor;fill:none;"><path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
        `;
    }, 1200);
}

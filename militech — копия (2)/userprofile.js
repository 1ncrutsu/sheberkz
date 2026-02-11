// userprofile.js (Profile Page Logic)

const defaultProfile = {
    name: "Азамат",
    role: "client",
    phone: "+7 (707) 123-45-67",
    city: "Астана",
    spec: "electrician"
};

document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupEventListeners();
    initSaveIndicator();
});

// UX: Save Indicator
let isDirty = false;
let saveTimeout;

function initSaveIndicator() {
    updateSaveStatus(true); // Saved initially
}

function updateSaveStatus(saved) {
    const dot = document.getElementById('saveDot');
    const text = document.getElementById('saveText');
    if (!dot || !text) return;

    if (saved) {
        dot.classList.add('saved');
        text.innerText = t('saved');
        isDirty = false;
    } else {
        dot.classList.remove('saved');
        text.innerText = t('unsaved');
        isDirty = true;
    }
}

function setupEventListeners() {
    // Inputs change -> set dirty
    const inputs = document.querySelectorAll('.input, .select, .textarea');
    inputs.forEach(el => {
        el.addEventListener('input', () => {
            updateSaveStatus(false);

            // Auto-save debounce
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => saveProfile(true), 1500);
        });
    });

    // Save Button
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) saveBtn.addEventListener('click', () => saveProfile(false));

    // Role Switcher logic
    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
        roleSelect.addEventListener('change', (e) => {
            toggleMasterFields(e.target.value === 'master');
        });
    }
}

function toggleMasterFields(isMaster) {
    const block = document.getElementById('masterSpecBlock');
    if (!block) return;
    if (isMaster) block.classList.remove('hidden');
    else block.classList.add('hidden');
}

function loadProfile() {
    const raw = localStorage.getItem('profile');
    const profile = raw ? JSON.parse(raw) : defaultProfile;

    // Fill form
    setVal('nameInput', profile.name);
    setVal('phoneInput', profile.phone);
    setVal('cityInput', profile.city);
    setVal('roleSelect', profile.role);
    setVal('specSelect', profile.spec);
    setVal('aboutInput', profile.about || ''); // Add about to default if missing

    // UI Updates
    document.getElementById('heroName').innerText = profile.name || 'User';
    document.getElementById('heroCity').innerText = profile.city || 'City';
    document.getElementById('avatarLetter').innerText = (profile.name && profile.name[0]) ? profile.name[0].toUpperCase() : 'U';

    const roleBadge = document.getElementById('roleBadge');
    if (roleBadge) {
        roleBadge.innerText = (profile.role === 'master' ? 'Master' : 'Client');
    }

    toggleMasterFields(profile.role === 'master');
}

function saveProfile(silent = false) {
    const profile = {
        name: getVal('nameInput'),
        phone: getVal('phoneInput'),
        city: getVal('cityInput'),
        role: getVal('roleSelect'),
        spec: getVal('specSelect'),
        about: getVal('aboutInput')
    };

    localStorage.setItem('profile', JSON.stringify(profile));

    // Update Hero UI immediately
    document.getElementById('heroName').innerText = profile.name || 'User';
    document.getElementById('heroCity').innerText = profile.city || 'City';
    document.getElementById('avatarLetter').innerText = (profile.name && profile.name[0]) ? profile.name[0].toUpperCase() : 'U';
    const roleBadge = document.getElementById('roleBadge');
    if (roleBadge) {
        roleBadge.innerText = (profile.role === 'master' ? 'Master' : 'Client');
    }

    updateSaveStatus(true);

    if (!silent) {
        showToast(t('saved'), 'success');
    }
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

// Logout
// Exposed globally or attached?
// In HTML we simplified callback to openLogoutModal() 
// But we need to define them.
window.openLogoutModal = () => {
    document.getElementById('logoutModal').classList.add('active');
};
window.closeLogoutModal = () => {
    document.getElementById('logoutModal').classList.remove('active');
};
window.logout = () => {
    localStorage.removeItem('profile'); // or keep it
    // localStorage.removeItem('token');
    window.location.href = 'index.html';
};
window.openLangPicker = () => {
    // Just cycle lang for simplicity like before
    const current = localStorage.getItem('lang') || 'ru';
    const next = current === 'ru' ? 'kz' : 'ru';
    setLanguage(next);
};
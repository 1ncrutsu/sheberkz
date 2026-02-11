// script.js (Landing Page Logic)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language & Theme are auto-handled by shared.js (initApp)

    // 2. Event Listeners
    const startLink = document.getElementById('startLink');
    if (startLink) {
        startLink.addEventListener('click', openAuthModal);
    }

    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('click', () => selectRole(card.dataset.role));
    });

    const finishRegBtn = document.getElementById('finishRegBtn');
    if (finishRegBtn) {
        finishRegBtn.addEventListener('click', finishRegistration);
    }

    // Modal Close is handled by shared.js if using common class? 
    // Actually shared.js doesn't auto-bind close buttons for specific modals unless we use a generic class.
    // Let's bind manually for this specific modal to be safe or ensure shared.js covers it.
    // Shared.js has no generic modal-close binding on load, so we do it here.
    const modal = document.getElementById('authModal');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Check URL params for auto-open (optional)
});

// State
let selectedRole = 'client';

function openAuthModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('authModal');
    modal.classList.add('active');

    // Reset to first step
    showStep('stepRole');
}

function closeModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

function showStep(stepId) {
    document.getElementById('stepRole').style.display = 'none';
    document.getElementById('stepReg').style.display = 'none';
    document.getElementById(stepId).style.display = 'block';
}

function selectRole(role) {
    selectedRole = role;

    // UI Update
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
    document.querySelector(`.role-card[data-role="${role}"]`).classList.add('active');

    // Show correct fields in next step
    if (role === 'master') {
        document.getElementById('masterFields').style.display = 'block';
    } else {
        document.getElementById('masterFields').style.display = 'none';
    }

    // Go to next step
    showStep('stepReg');
}

function finishRegistration() {
    const name = document.getElementById('regName').value.trim();
    if (!name) {
        showToast(t('lbl_name') + ' ' + (currentLang === 'ru' ? 'обязательно' : 'міндетті'), 'warn');
        return;
    }

    // Simulate Registration
    const user = {
        name: name,
        role: selectedRole,
        city: document.getElementById('regCity').value,
        phone: "+7 (777) 000-00-00", // Demo
        spec: document.getElementById('regSpec').value || 'electrician'
    };

    localStorage.setItem('profile', JSON.stringify(user));

    showToast(t('saved'), 'success');

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

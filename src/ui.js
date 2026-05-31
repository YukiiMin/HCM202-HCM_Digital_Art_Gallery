export function setupUI(controls) {
    const startOverlay = document.getElementById('about-overlay');
    const startBtn = document.getElementById('close-about');
    
    // The previous app had a play button inside #menu
    const playMenuBtn = document.getElementById('play_button');
    if (playMenuBtn) {
        playMenuBtn.addEventListener('click', () => {
             const startMenu = document.getElementById('menu');
             if (startMenu) startMenu.style.display = 'none';
             if (startOverlay) startOverlay.style.display = 'block';
        });
    }

    if (startBtn && startOverlay) {
        startBtn.addEventListener('click', () => {
            startOverlay.style.display = 'none';
            controls.lock();
        });
    }

    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            hideModal();
            controls.lock(); // return to game
        });
    }

    // Also lock when clicking body if not interacting. 
    // This maintains pointer lock if accidentally unlocked.
    document.body.addEventListener('click', (e) => {
        // Prevent re-locking if the modal is currently shown (so user can close it)
        const modal = document.getElementById('infoModal');
        const overlayVisible = startOverlay && startOverlay.style.display !== 'none';
        const isMenuVisible = document.getElementById('menu') && document.getElementById('menu').style.display !== 'none';

        if (!overlayVisible && !isMenuVisible && !controls.isLocked && modal && modal.style.display !== 'block') {
            controls.lock();
        }
    });

    // Handle modal ESC to close and unlocking pointer testing
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('infoModal');
            if (modal && modal.style.display === 'block') {
                hideModal();
                // We re-lock pointer since user just closed the modal and probably wants to continue playing
                // Wait, native Escape un-locks pointer too. 
                // So if we hide modal, user might need to click again to re-lock. 
            }
        }
    });

    // Handle when pointer lock is released natively (e.g. user pressed ESC)
    controls.addEventListener('unlock', () => {
        const modal = document.getElementById('infoModal');
        // Only show start overlay if modal is not currently showing and the game actually started
        const isMenuVisible = document.getElementById('menu') && document.getElementById('menu').style.display !== 'none';
        if(modal && modal.style.display !== 'block' && startOverlay && !isMenuVisible) {
            startOverlay.style.display = 'block';
        }
    });
}

export function showModal(text) {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    if (modal && content) {
        content.innerHTML = text;
        modal.style.display = 'block';
        document.exitPointerLock();
    }
}

export function hideModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

export function showHoverInfo(title, description) {
    const infoPanel = document.getElementById('painting-info');
    if (infoPanel) {
        infoPanel.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        infoPanel.classList.add('show');
    }
}

export function hideHoverInfo() {
    const infoPanel = document.getElementById('painting-info');
    if (infoPanel) {
        infoPanel.classList.remove('show');
    }
}

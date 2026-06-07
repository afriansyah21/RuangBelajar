// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Donasi User Page Loaded');
    
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburgerBtn.querySelector('span');
            if (navMenu.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });
    }

    // Salin Rekening Logic
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('3883685635').then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Tersalin!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
        });
    }
});

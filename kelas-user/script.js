// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Kelas User Page Loaded');
    
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

    // Simulasi Loading Indicator (seperti di kode awal jika ada)
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.classList.add('flex');
        
        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
            loadingIndicator.classList.remove('flex');
        }, 1000);
    }
});

// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Kuis User Page Loaded');
    
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

    // Quiz Option Selection Logic
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selection from others
            options.forEach(opt => {
                opt.classList.remove('active');
            });
            // Add selection to clicked
            option.classList.add('active');
        });
    });
});

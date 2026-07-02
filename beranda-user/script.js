// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Beranda User Page Loaded');
    
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

    // Tampilkan nama user di header (jika ada)
    try {
        const currentUserStr = localStorage.getItem('currentUser');
        if (currentUserStr) {
            const currentUser = JSON.parse(currentUserStr);
            const userName = currentUser.full_name || currentUser.name || currentUser.username;
            if (userName) {
                const greetingElement = document.getElementById('user-greeting');
                if (greetingElement) {
                    greetingElement.textContent = `Halo, Selamat Datang ${userName}!`;
                }
            }
        }
    } catch (e) {
        console.error('Gagal memuat nama user untuk greeting:', e);
    }

    // Feedback Form Logic
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const subject = document.getElementById('feedback-subject').value;
            const message = document.getElementById('feedback-message').value;

            // Ambil nama user dari localStorage
            let userName = 'Pengguna';
            try {
                const currentUserStr = localStorage.getItem('currentUser');
                if (currentUserStr) {
                    const currentUser = JSON.parse(currentUserStr);
                    userName = currentUser.full_name || currentUser.name || currentUser.username || 'Pengguna';
                }
            } catch (e) {
                console.error('Gagal mengambil data user:', e);
            }

            try {
                const response = await fetch('http://localhost:3000/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        subject,
                        message,
                        user_name: userName
                    })
                });

                if (response.ok) {
                    alert('Terima kasih! Feedback Anda telah terkirim.');
                    feedbackForm.reset();
                } else {
                    alert('Gagal mengirim feedback. Silakan coba lagi.');
                }
            } catch (error) {
                console.error('Error sending feedback:', error);
                alert('Terjadi kesalahan saat mengirim feedback.');
            }
        });
    }
});

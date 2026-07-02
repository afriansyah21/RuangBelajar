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

    // Load quiz progress
    async function loadQuizProgress(userId) {
        const grid = document.getElementById('progress-kuis-grid');
        if (!grid) return;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/quiz-progress`);
            if (response.ok) {
                const results = await response.json();
                grid.innerHTML = '';
                
                if (results.length > 0) {
                    results.forEach(res => {
                        const score = res.score;
                        const item = document.createElement('div');
                        item.className = 'progress-item';
                        item.innerHTML = `
                            <div class="circular-progress" style="--progress: ${score};">
                                <span>${score}%</span>
                            </div>
                            <h3>${res.quiz_title}</h3>
                            <p>${res.quiz_description || 'Deskripsi belum tersedia'}</p>
                        `;
                        grid.appendChild(item);
                    });
                } else {
                    grid.innerHTML = '<div class="text-slate-500 py-4 w-full text-center" style="grid-column: 1 / -1;">Belum ada kuis yang tersedia.</div>';
                }
            } else {
                grid.innerHTML = '<div class="text-red-500 py-4 w-full text-center" style="grid-column: 1 / -1;">Gagal memuat progress.</div>';
            }
        } catch (error) {
            console.error('Error fetching quiz progress:', error);
            grid.innerHTML = '<div class="text-red-500 py-4 w-full text-center" style="grid-column: 1 / -1;">Terjadi kesalahan sistem.</div>';
        }
    }

    // Load recent quizzes
    async function loadRecentQuizzes(userId) {
        const list = document.getElementById('recent-quizzes-list');
        if (!list) return;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/recent-quizzes`);
            if (response.ok) {
                const results = await response.json();
                list.innerHTML = '';
                
                if (results.length > 0) {
                    results.forEach(res => {
                        const item = document.createElement('div');
                        item.className = 'quiz-status-item';
                        item.innerHTML = `
                            <div class="quiz-icon">
                                <span class="material-symbols-outlined">quiz</span>
                            </div>
                            <div class="quiz-info">
                                <h4>${res.quiz_title}</h4>
                                <p>${res.course_title}</p>
                            </div>
                            <div class="quiz-score">
                                <strong>${res.score}</strong>
                            </div>
                        `;
                        list.appendChild(item);
                    });
                } else {
                    list.innerHTML = '<div class="text-slate-500 py-4 w-full text-center">Belum ada kuis yang dikerjakan.</div>';
                }
            } else {
                list.innerHTML = '<div class="text-red-500 py-4 w-full text-center">Gagal memuat status kuis.</div>';
            }
        } catch (error) {
            console.error('Error fetching recent quizzes:', error);
            list.innerHTML = '<div class="text-red-500 py-4 w-full text-center">Terjadi kesalahan sistem.</div>';
        }
    }

    // Tampilkan nama user di header (jika ada) dan load progress
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
            if (currentUser.id) {
                loadQuizProgress(currentUser.id);
                loadRecentQuizzes(currentUser.id);
            }
        } else {
            const grid = document.getElementById('progress-kuis-grid');
            if (grid) grid.innerHTML = '<div class="text-slate-500 py-4 w-full text-center" style="grid-column: 1 / -1;">Silakan login terlebih dahulu.</div>';
            const list = document.getElementById('recent-quizzes-list');
            if (list) list.innerHTML = '<div class="text-slate-500 py-4 w-full text-center">Silakan login terlebih dahulu.</div>';
        }
    } catch (e) {
        console.error('Gagal memuat data user:', e);
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

// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Detail Kuis User Page Loaded');
    
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

    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    if (quizId) {
        fetchQuizDetails(quizId);
    } else {
        document.getElementById('quiz-list-container').innerHTML = '<p style="color: red;">Kategori kuis tidak ditemukan.</p>';
    }
});

async function fetchQuizDetails(quizId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = null;
    if (currentUser) {
        userId = currentUser.id;
    }

    try {
        const fetchPromises = [fetch(`http://localhost:3000/api/quizzes/${quizId}`)];
        
        if (userId) {
            fetchPromises.push(fetch(`http://localhost:3000/api/users/${userId}/completed-groups`));
        }

        const [quizRes, completedRes] = await Promise.all(fetchPromises);

        if (!quizRes.ok) throw new Error('Failed to fetch quiz details');
        const quiz = await quizRes.json();
        
        let completedGroups = [];
        if (completedRes && completedRes.ok) {
            completedGroups = await completedRes.json();
        }

        // Set Header Title
        const h1 = document.querySelector('.dashboard-title h1');
        if (h1 && quiz.title) {
            h1.textContent = `Kuis: ${quiz.title}`;
        }

        const container = document.getElementById('quiz-list-container');
        container.innerHTML = '';

        if (!quiz.groups || quiz.groups.length === 0) {
            container.innerHTML = '<p>Belum ada kuis tersedia untuk kategori ini.</p>';
            return;
        }

        quiz.groups.forEach((group, index) => {
            const isCompleted = completedGroups.includes(group.id);
            const num = (index + 1).toString().padStart(2, '0');
            const item = document.createElement('div');
            item.className = 'materi-item';
            
            if (isCompleted) {
                item.style.borderLeft = '4px solid #22c55e';
                item.style.backgroundColor = '#f0fdf4';
                item.innerHTML = `
                    <div class="materi-info">
                        <div class="materi-icon" style="color: #22c55e; background-color: rgba(34, 197, 94, 0.1);">
                            <span class="material-symbols-outlined">check_circle</span>
                        </div>
                        <div>
                            <h4 style="color: #166534; font-size: 16px;">${num}. ${group.title}</h4>
                            <p style="color: #15803d; font-size: 14px;">Status: Sudah Dikerjakan</p>
                        </div>
                    </div>
                    <div class="materi-actions">
                        <button class="btn-primary" onclick="window.location.href='../hasil-kuis-user/index.html?groupId=${group.id}&quizId=${quizId}'" style="padding: 8px 16px; font-size: 14px; background-color: #22c55e; color: white;">Lihat Hasil</button>
                    </div>
                `;
            } else {
                item.style.borderLeft = '4px solid #f59e0b';
                item.style.backgroundColor = '#fffbeb';
                item.innerHTML = `
                    <div class="materi-info">
                        <div class="materi-icon" style="color: #f59e0b; background-color: rgba(245, 158, 11, 0.1);">
                            <span class="material-symbols-outlined">quiz</span>
                        </div>
                        <div>
                            <h4 style="color: #b45309; font-size: 16px;">${num}. ${group.title}</h4>
                            <p style="color: #d97706; font-size: 14px;">Status: Belum Dikerjakan</p>
                        </div>
                    </div>
                    <div class="materi-actions">
                        <button class="btn-primary" onclick="window.location.href='../kerjakan-kuis-user/index.html?groupId=${group.id}&quizId=${quizId}'" style="padding: 8px 16px; font-size: 14px; background-color: #f59e0b; color: white;">Kerjakan Kuis</button>
                    </div>
                `;
            }
            
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching quiz groups:', error);
        document.getElementById('quiz-list-container').innerHTML = '<p style="color: red;">Gagal memuat kuis.</p>';
    }
}

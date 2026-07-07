// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Admin Manajemen Kuis Page Loaded');
    
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

    fetchQuizzes();
});

async function fetchQuizzes() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/quizzes`);
        if (!response.ok) throw new Error('Gagal memuat kuis');
        const quizzes = await response.json();

        const container = document.getElementById('course-list-container');
        container.innerHTML = '';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '1rem';

        if (quizzes.length === 0) {
            container.innerHTML = '<p>Belum ada kuis yang tersedia.</p>';
            return;
        }

        quizzes.forEach((quiz, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            const card = document.createElement('a');
            card.href = `../detail-kuis-user/index.html?quizId=${quiz.id}`;
            card.className = 'lesson-card';
            card.style.borderColor = '#cbd5e1';
            card.style.boxShadow = 'none';
            card.style.cursor = 'pointer';
            card.style.textDecoration = 'none';
            card.style.color = 'inherit';
            card.style.display = 'flex';
            card.style.alignItems = 'center';

            card.innerHTML = `
                <div class="lesson-img-wrapper">
                    <img alt="Thumbnail" src="${quiz.thumbnail_url || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=200&auto=format&fit=crop'}" style="width: 100%; height: 100%; object-fit: cover;"/>
                </div>
                <div class="lesson-content">
                    <h4 style="color: #0f172a;">${num}. ${quiz.quiz_title || quiz.title}</h4>
                    <p>${quiz.description || 'Pilih kuis ini untuk melihat materi di dalamnya.'}</p>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching quizzes:', error);
        document.getElementById('course-list-container').innerHTML = '<p style="color: red;">Gagal memuat data kuis.</p>';
    }
}

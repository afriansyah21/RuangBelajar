// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('span');
            icon.textContent = navMenu.classList.contains('active') ? 'close' : 'menu';
        });
    }

    fetchQuizzes();
});

async function fetchQuizzes() {
    const container = document.getElementById('quiz-list-container');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(`${API_BASE_URL}/api/admin/quizzes`, { signal: controller.signal });
        clearTimeout(timeoutId);
        const quizzes = await response.json();
        
        const countHeader = document.getElementById('quiz-count');
        
        if (countHeader) countHeader.textContent = `Daftar Kuis (${quizzes.length})`;
        
        container.innerHTML = '';
        
        quizzes.forEach(quiz => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.style.borderColor = '#cbd5e1';
            card.style.boxShadow = 'none';
            card.style.cursor = 'pointer';
            card.onclick = () => window.location.href = `../detail-kuis-admin/index.html?id=${quiz.id}`;
            
            const thumbnail = quiz.thumbnail_url || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop';
            const desc = quiz.description || 'Tidak ada deskripsi.';
            
            card.innerHTML = `
                <div class="lesson-img-wrapper">
                    <img alt="Thumbnail" src="${thumbnail}"/>
                </div>
                <div class="lesson-content">
                    <h4 style="color: #0f172a;">${quiz.quiz_title}</h4>
                    <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 4px;">Kelas: ${quiz.course_title}</p>
                    <p>${desc}</p>
                </div>
                <button class="btn-edit-class" title="Edit Kuis" onclick="event.stopPropagation(); window.location.href='../edit-kuis-admin/index.html?id=${quiz.id}'">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="btn-delete-class" title="Hapus Kuis" onclick="event.stopPropagation(); deleteQuiz(${quiz.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            `;
            container.appendChild(card);
        });
        
        if (quizzes.length === 0) {
            container.innerHTML = '<p style="color: #64748b; margin-top: 16px;">Belum ada kuis yang ditambahkan.</p>';
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        const isTimeout = error.name === 'AbortError';
        if (container) {
            container.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <p style="color: #ef4444; margin-bottom: 10px;">
                        ${isTimeout ? '⏱️ Server sedang startup, mohon tunggu.' : '❌ Gagal memuat daftar kuis.'}
                    </p>
                    <button onclick="fetchQuizzes()" style="background:#2563eb;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">
                        🔄 Coba Lagi
                    </button>
                </div>`;
        }
    }
}

async function deleteQuiz(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus kuis ini? Semua soal di dalamnya juga akan terhapus.')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/quizzes/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Kuis berhasil dihapus!');
            fetchQuizzes();
        } else {
            alert('Gagal menghapus kuis.');
        }
    } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Terjadi kesalahan pada server.');
    }
}


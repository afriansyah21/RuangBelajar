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

    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');

    if (!quizId) {
        alert('ID Kuis tidak ditemukan.');
        window.location.href = '../manajemen-kuis-admin/index.html';
        return;
    }

    const btnAddQuestion = document.getElementById('btn-add-question-nav');
    if (btnAddQuestion) {
        btnAddQuestion.addEventListener('click', () => {
            window.location.href = `../tambah-pertanyaan-admin/index.html?quizId=${quizId}`;
        });
    }

    loadQuizDetails();
});

async function loadQuizDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/quizzes/${quizId}`);
        if (!response.ok) throw new Error('Gagal memuat detail kuis');
        
        const data = await response.json();
        
        // Update title
        const titleDisplay = document.getElementById('quiz-title-display');
        if (titleDisplay) {
            titleDisplay.textContent = `Daftar Pertanyaan: ${data.title}`;
        }
        
        const questionsContainer = document.getElementById('questions-list-container');
        if (!questionsContainer) return;
        
        questionsContainer.innerHTML = '';
        
        const groups = data.groups || [];
        
        if (groups.length === 0) {
            questionsContainer.innerHTML = '<p style="text-align:center; padding: 20px; color: var(--text-light);">Belum ada pertanyaan. Silakan klik "Tambah Pertanyaan".</p>';
            return;
        }

        groups.forEach((g, index) => {
            const numQuestions = g.questions ? g.questions.length : 0;
            
            const item = document.createElement('div');
            item.className = 'materi-item';
            item.innerHTML = `
                <div class="materi-info">
                    <div class="materi-icon">
                        <span class="material-symbols-outlined">format_list_bulleted</span>
                    </div>
                    <div>
                        <h4>${String(index + 1).padStart(2, '0')}. ${g.title}</h4>
                        <p>Berisi ${numQuestions} Soal</p>
                    </div>
                </div>
                <div class="materi-actions">
                    <button class="btn-icon btn-edit" title="Edit Grup Pertanyaan" onclick="window.location.href='../edit-pertanyaan-admin/index.html?groupId=${g.id}'">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="btn-icon btn-delete" title="Hapus Grup Pertanyaan" onclick="deleteGroup(${g.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `;
            questionsContainer.appendChild(item);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memuat data.');
    }
}

window.deleteGroup = async function(groupId) {
    if (!confirm('Apakah Anda yakin ingin menghapus kelompok soal ini? Semua soal di dalamnya akan ikut terhapus.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/question-groups/${groupId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Kelompok soal berhasil dihapus!');
            loadQuizDetails(); // reload
        } else {
            alert('Gagal menghapus kelompok soal.');
        }
    } catch (error) {
        console.error('Error deleting group:', error);
        alert('Terjadi kesalahan pada server.');
    }
}

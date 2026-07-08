// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
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

    renderResult();
});

async function renderResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('groupId');
    const quizId = urlParams.get('quizId');
    const container = document.getElementById('result-container');

    if (quizId) {
        const backBtn = document.querySelector('.btn-back');
        if (backBtn) {
            backBtn.setAttribute('onclick', `window.location.href='../detail-kuis-user/index.html?quizId=${quizId}'`);
        }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        container.innerHTML = '<p style="color: red;">Anda harus login untuk melihat hasil kuis.</p>';
        return;
    }

    if (!groupId) {
        container.innerHTML = '<p style="color: red;">ID Grup Kuis tidak ditemukan.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/user-quiz-results/${groupId}/${currentUser.id}`);
        if (!response.ok) {
            if (response.status === 404) {
                container.innerHTML = '<p style="color: red;">Tidak ada data hasil kuis ditemukan. Silakan kerjakan kuis terlebih dahulu.</p>';
            } else {
                container.innerHTML = '<p style="color: red;">Gagal memuat hasil kuis.</p>';
            }
            return;
        }

        const data = await response.json();
        
        // Update Title Header
        const h1 = document.querySelector('.dashboard-title h1');
        if (h1) h1.textContent = `Hasil Kuis Anda`;

        // Score Card
        let html = `
            <div class="materi-details-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 32px; text-align: center;">
                <h2 style="font-family: 'Lexend', sans-serif; color: #0f172a; margin-bottom: 8px;">Nilai Akhir Anda</h2>
                <div style="font-size: 48px; font-weight: 700; color: ${data.score >= 70 ? '#22c55e' : '#ef4444'};">${data.score} / 100</div>
                <p style="color: #64748b; margin-top: 8px;">Anda menjawab ${data.correctAnswers} dari ${data.totalQuestions} pertanyaan dengan benar.</p>
            </div>
        `;

        // Questions Details
        if (data.details && data.details.length > 0) {
            data.details.forEach((q, idx) => {
                const isCorrect = q.is_correct;
                const borderColor = isCorrect ? '#22c55e' : '#ef4444';
                const iconName = isCorrect ? 'check_circle' : 'cancel';
                const iconColor = isCorrect ? '#22c55e' : '#ef4444';

                const userAnswerText = q.user_answer_index !== null && q.options[q.user_answer_index] ? q.options[q.user_answer_index] : 'Tidak dijawab';
                const correctAnswerText = q.options[q.correct_answer_index];

                let answerHtml = `
                    <div style="padding: 12px; border: 1px solid ${borderColor}; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fef2f2'};">
                        <span style="color: ${isCorrect ? '#15803d' : '#b91c1c'}; font-weight: 500;">Jawaban Anda:</span> ${userAnswerText}
                        ${!isCorrect ? `<span style="font-size: 12px; color: #ef4444; margin-left: 8px;">(Salah)</span>` : ''}
                    </div>
                `;

                if (!isCorrect) {
                    answerHtml += `
                        <div style="padding: 12px; border: 1px solid #22c55e; border-radius: 8px; background: #f0fdf4; margin-top: 12px;">
                            <span style="color: #15803d; font-weight: 500;">Jawaban Benar:</span> ${correctAnswerText}
                        </div>
                    `;
                }

                html += `
                    <div class="materi-details-card" style="background: white; border: 1px solid ${borderColor}; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 20px;">
                        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px;">
                            <h3 style="font-family: 'Lexend', sans-serif; font-size: 18px; color: #0f172a;">${idx + 1}. ${q.question_text}</h3>
                            <span class="material-symbols-outlined" style="color: ${iconColor}; font-size: 28px;">${iconName}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; margin-bottom: 16px;">
                            ${answerHtml}
                        </div>
                        <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0;">
                            <h4 style="font-size: 14px; color: #3b82f6; margin-bottom: 8px;">Penjelasan:</h4>
                            <p style="font-size: 14px; color: #475569; line-height: 1.5;">${q.explanation || 'Tidak ada penjelasan untuk soal ini.'}</p>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;
    } catch (error) {
        console.error('Error fetching quiz result:', error);
        container.innerHTML = '<p style="color: red;">Gagal terhubung ke server.</p>';
    }
}

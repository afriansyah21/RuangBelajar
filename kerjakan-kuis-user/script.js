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

    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('groupId');
    const quizId = urlParams.get('quizId');
    if (groupId) {
        if (quizId) {
            const backBtn = document.querySelector('.btn-back');
            if (backBtn) {
                backBtn.setAttribute('onclick', `window.location.href='../detail-kuis-user/index.html?quizId=${quizId}'`);
            }
        }
        fetchGroupDetails(groupId);
    } else {
        document.getElementById('quiz-questions-container').innerHTML = '<p style="color: red;">ID kuis tidak ditemukan.</p>';
        document.getElementById('quiz-title').textContent = 'Error';
        document.getElementById('quiz-desc').textContent = '';
    }
});

async function fetchGroupDetails(groupId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/question-groups/${groupId}`);
        if (!response.ok) throw new Error('Gagal memuat kuis');
        const group = await response.json();

        document.getElementById('quiz-title').textContent = `Kuis: ${group.title || `Grup ${groupId}`}`;
        document.getElementById('quiz-desc').textContent = 'Pilih jawaban yang paling tepat.';

        const container = document.getElementById('quiz-questions-container');
        container.innerHTML = '';

        if (!group.questions || group.questions.length === 0) {
            container.innerHTML = '<p>Kuis ini belum memiliki soal.</p>';
            return;
        }

        let qNumber = 1;
        group.questions.forEach(q => {
            const qDiv = document.createElement('div');
            qDiv.className = 'materi-details-card';
            qDiv.style.background = 'white';
            qDiv.style.border = '1px solid #e2e8f0';
            qDiv.style.borderRadius = '12px';
            qDiv.style.padding = '24px';
            qDiv.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
            qDiv.style.marginBottom = '20px';

            let optionsHtml = '';
            if (q.options && Array.isArray(q.options)) {
                q.options.forEach((opt, idx) => {
                    optionsHtml += `
                        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <input type="radio" name="q_${q.id}" value="${idx}" style="width: 18px; height: 18px;">
                            <span style="color: #334155;">${opt}</span>
                        </label>
                    `;
                });
            }

            qDiv.innerHTML = `
                <h3 style="font-family: 'Lexend', sans-serif; font-size: 18px; color: #0f172a; margin-bottom: 16px;">${qNumber}. ${q.question_text}</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${optionsHtml}
                </div>
            `;
            container.appendChild(qDiv);
            qNumber++;
        });

        // Add submit button
        const submitDiv = document.createElement('div');
        submitDiv.style.display = 'flex';
        submitDiv.style.justifyContent = 'flex-end';
        submitDiv.style.marginBottom = '60px';
        submitDiv.innerHTML = `
            <button class="btn-primary" onclick="submitQuiz(${groupId})" style="padding: 12px 24px; font-size: 16px;">Selesai & Kumpulkan Kuis</button>
        `;
        container.appendChild(submitDiv);

    } catch (error) {
        console.error('Error fetching group details:', error);
        document.getElementById('quiz-questions-container').innerHTML = '<p style="color: red;">Terjadi kesalahan saat memuat kuis.</p>';
        document.getElementById('quiz-title').textContent = 'Error';
        document.getElementById('quiz-desc').textContent = '';
    }
}

async function submitQuiz(groupId) {
    const answers = {};
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        const name = radio.name; // e.g. q_15
        const questionId = name.split('_')[1];
        answers[questionId] = parseInt(radio.value);
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk mengerjakan kuis.');
        window.location.href = '../login-user/index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/question-groups/${groupId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                answers: answers
            })
        });

        const urlParams = new URLSearchParams(window.location.search);
        const quizId = urlParams.get('quizId');
        let redirectUrl = `../hasil-kuis-user/index.html?groupId=${groupId}`;
        if (quizId) redirectUrl += `&quizId=${quizId}`;
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        alert('Gagal mengirimkan jawaban kuis. Silakan coba lagi.');
    }
}

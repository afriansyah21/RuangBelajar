document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const btnAddQuestion = document.getElementById('btn-add-question');
    
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id') || urlParams.get('quizId');
    
    if (!quizId) {
        alert('ID Kuis tidak ditemukan. Harap buka halaman ini dari Detail Kuis.');
        window.location.href = '../manajemen-kuis-admin/index.html';
        return;
    }

    let questionCount = 0;

    function createQuestionCard() {
        questionCount++;
        const currentQId = questionCount;
        
        const card = document.createElement('div');
        card.className = 'form-card question-card';
        card.id = `question-card-${currentQId}`;
        
        card.innerHTML = `
            <div class="question-header">
                <h3>Soal ${currentQId}</h3>
                ${currentQId > 1 ? `<button type="button" class="btn-icon btn-delete" onclick="removeQuestion(${currentQId})"><span class="material-symbols-outlined">delete</span></button>` : ''}
            </div>
            
            <div class="form-group">
                <label>Tulis Soal</label>
                <textarea rows="3" class="question-text-input" placeholder="Masukkan pertanyaan di sini..."></textarea>
            </div>
            
            <div class="options-container" id="options-container-${currentQId}">
                <label>Masukkan Jawaban (Pilihan Ganda)</label>
                <div class="option-item">
                    <span class="option-letter">A.</span>
                    <input type="text" placeholder="Pilihan jawaban..." class="option-input" />
                </div>
            </div>
            
            <button type="button" class="btn-outline btn-add-option" onclick="addOption(${currentQId})">
                <span class="material-symbols-outlined">add</span> Tambahkan Jawaban
            </button>
            
            <div class="form-group" style="margin-top: 24px;">
                <label>Input Jawaban yang Benar</label>
                <select class="correct-answer-select" id="correct-answer-${currentQId}">
                    <option value="A">A</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Tambahkan Penjelasan Jawaban</label>
                <textarea rows="3" class="explanation-input" placeholder="Penjelasan mengapa jawaban tersebut benar..."></textarea>
            </div>
        `;
        
        questionsContainer.appendChild(card);
    }
    
    createQuestionCard();
    
    btnAddQuestion.addEventListener('click', () => {
        createQuestionCard();
    });

    const form = document.getElementById('questions-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const groupTitle = document.getElementById('group-title-input').value;
            const cards = document.querySelectorAll('.question-card');
            const questions = [];
            
            for (const card of cards) {
                const text = card.querySelector('.question-text-input').value;
                const explanation = card.querySelector('.explanation-input').value;
                const correctAnswerLetter = card.querySelector('.correct-answer-select').value;
                
                const optionInputs = card.querySelectorAll('.option-input');
                const options = [];
                let correctIndex = 0;
                
                optionInputs.forEach((opt, index) => {
                    options.push(opt.value);
                    const letter = String.fromCharCode(65 + index);
                    if (letter === correctAnswerLetter) {
                        correctIndex = index;
                    }
                });
                
                questions.push({
                    question_text: text,
                    options: options,
                    correct_answer_index: correctIndex,
                    explanation: explanation
                });
            }
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/quizzes/${quizId}/question-groups`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: groupTitle, questions: questions })
                });
                
                if (response.ok) {
                    alert('Kelompok soal berhasil disimpan!');
                    window.location.href = `../detail-kuis-admin/index.html?id=${quizId}`;
                } else {
                    const data = await response.json();
                    alert('Gagal menyimpan: ' + (data.error || 'Terjadi kesalahan'));
                }
            } catch (error) {
                console.error('Error saving questions:', error);
                alert('Terjadi kesalahan pada server.');
            }
        });
    }
});

window.removeQuestion = function(id) {
    const card = document.getElementById(`question-card-${id}`);
    if (card) card.remove();
}

window.addOption = function(qId) {
    const container = document.getElementById(`options-container-${qId}`);
    const select = document.getElementById(`correct-answer-${qId}`);
    
    const currentOptions = container.querySelectorAll('.option-item').length;
    if (currentOptions >= 26) return;
    
    const letter = String.fromCharCode(65 + currentOptions);
    
    const div = document.createElement('div');
    div.className = 'option-item';
    div.innerHTML = `
        <span class="option-letter">${letter}.</span>
        <input type="text" placeholder="Pilihan jawaban..." class="option-input" style="flex: 1;"/>
        <button type="button" class="btn-icon btn-delete" onclick="this.parentElement.remove(); updateCorrectAnswerOptions(${qId})">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
    
    container.appendChild(div);
    updateCorrectAnswerOptions(qId);
}

window.updateCorrectAnswerOptions = function(qId) {
    const container = document.getElementById(`options-container-${qId}`);
    const select = document.getElementById(`correct-answer-${qId}`);
    
    const optionItems = container.querySelectorAll('.option-item');
    const currentValue = select.value;
    
    select.innerHTML = '';
    
    optionItems.forEach((item, index) => {
        const letter = String.fromCharCode(65 + index);
        item.querySelector('.option-letter').innerText = `${letter}.`;
        
        const opt = document.createElement('option');
        opt.value = letter;
        opt.innerText = letter;
        select.appendChild(opt);
    });
    
    if (Array.from(select.options).some(o => o.value === currentValue)) {
        select.value = currentValue;
    }
}

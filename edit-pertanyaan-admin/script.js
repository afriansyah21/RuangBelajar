document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const btnAddQuestion = document.getElementById('btn-add-question');
    
    let questionCount = 0;

    function createQuestionCard() {
        questionCount++;
        const currentQId = questionCount;
        
        const card = document.createElement('div');
        card.className = 'form-card question-card';
        card.id = `question-card-${currentQId}`;
        
        // Base HTML for a question
        card.innerHTML = `
            <div class="question-header">
                <h3>Soal ${currentQId}</h3>
                ${currentQId > 1 ? `<button type="button" class="btn-icon btn-delete" onclick="removeQuestion(${currentQId})"><span class="material-symbols-outlined">delete</span></button>` : ''}
            </div>
            
            <div class="form-group">
                <label>Tulis Soal</label>
                <textarea rows="3" placeholder="Masukkan pertanyaan di sini..."></textarea>
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
                <textarea rows="3" placeholder="Penjelasan mengapa jawaban tersebut benar..."></textarea>
            </div>
        `;
        
        questionsContainer.appendChild(card);
    }
    
    // Initial question
    createQuestionCard();
    
    // Add question button
    btnAddQuestion.addEventListener('click', () => {
        createQuestionCard();
    });
});

window.removeQuestion = function(id) {
    const card = document.getElementById(`question-card-${id}`);
    if (card) card.remove();
}

window.addOption = function(qId) {
    const container = document.getElementById(`options-container-${qId}`);
    const select = document.getElementById(`correct-answer-${qId}`);
    
    const currentOptions = container.querySelectorAll('.option-item').length;
    
    // Limit to Z (26 options)
    if (currentOptions >= 26) return;
    
    const letter = String.fromCharCode(65 + currentOptions); // 65 is 'A'
    
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
    
    select.innerHTML = ''; // Clear options
    
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

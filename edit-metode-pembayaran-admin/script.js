document.addEventListener('DOMContentLoaded', () => {
    const banksContainer = document.getElementById('banks-container');
    const btnAddBank = document.getElementById('btn-add-bank');
    
    let bankCount = 0;

    function createBankCard() {
        bankCount++;
        const currentBId = bankCount;
        
        const card = document.createElement('div');
        card.className = 'form-card bank-card';
        card.id = `bank-card-${currentBId}`;
        card.style.marginBottom = '24px';
        card.style.width = '100%';
        card.style.position = 'relative';
        
        // Base HTML for a bank
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
                <h3 style="font-size: 20px; color: #0f172a; margin: 0;">Rekening Bank ${currentBId}</h3>
                ${currentBId > 1 ? `<button type="button" class="btn-icon btn-delete" onclick="removeBank(${currentBId})"><span class="material-symbols-outlined">delete</span></button>` : ''}
            </div>
            
            <div class="form-group">
                <label>Nama Bank</label>
                <input type="text" placeholder="Contoh: Bank Central Asia (BCA)"/>
            </div>
            
            <div class="form-group">
                <label>Nomor Rekening</label>
                <input type="text" placeholder="Contoh: 882-031-4452"/>
            </div>
        `;
        
        banksContainer.appendChild(card);
    }
    
    // Initial bank
    createBankCard();
    
    // Add bank button
    btnAddBank.addEventListener('click', () => {
        createBankCard();
    });
});

window.removeBank = function(id) {
    const card = document.getElementById(`bank-card-${id}`);
    if (card) card.remove();
}

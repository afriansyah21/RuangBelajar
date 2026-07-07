// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Donasi User Page Loaded');
    
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

    // Fetch Payment Methods
    fetchPaymentMethods();
});

async function fetchPaymentMethods() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/payment-methods`);
        if (!response.ok) throw new Error('Gagal mengambil data metode pembayaran');
        const methods = await response.json();

        const qrisMethod = methods.find(m => m.type === 'qris');
        const bankMethods = methods.filter(m => m.type === 'bank');

        // Update QRIS
        if (qrisMethod && qrisMethod.image_data) {
            const qrisImg = document.querySelector('.qris-image-container img');
            if (qrisImg) {
                qrisImg.src = qrisMethod.image_data;
            }
        }

        // Render multiple bank methods
        const bankInfoColumn = document.querySelector('.bank-info-column');
        const impactCard = document.querySelector('.impact-card');
        
        // Remove existing static bank cards
        const existingBankCards = bankInfoColumn.querySelectorAll('.bank-card');
        existingBankCards.forEach(card => card.remove());

        if (bankMethods && bankMethods.length > 0) {
            bankMethods.forEach((bankMethod, idx) => {
                const copyBtnId = `copy-btn-${idx}`;
                const card = document.createElement('div');
                card.className = 'bank-card';
                card.innerHTML = `
                    <div class="bank-card-bg-icon">
                        <span class="material-symbols-outlined">account_balance</span>
                    </div>
                    <div class="bank-card-content">
                        <span class="bank-card-label">Transfer Bank</span>
                        <h2>${bankMethod.bank_name || 'Transfer Bank'}</h2>
                        
                        <div class="account-box">
                            <div>
                                <p class="account-number-label">Nomor Rekening</p>
                                <p class="account-number">${bankMethod.account_number || '-'}</p>
                            </div>
                            <button class="btn-copy" id="${copyBtnId}">Salin</button>
                        </div>
                        
                        <div class="bank-card-footer">
                            <span class="material-symbols-outlined">person</span>
                            <p>Yayasan Ruang Belajar Indonesia</p>
                        </div>
                    </div>
                `;
                // Insert before impact card
                bankInfoColumn.insertBefore(card, impactCard);

                // Add event listener for the copy button
                if (bankMethod.account_number) {
                    const copyBtn = document.getElementById(copyBtnId);
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(bankMethod.account_number).then(() => {
                            const originalText = copyBtn.textContent;
                            copyBtn.textContent = 'Tersalin!';
                            setTimeout(() => {
                                copyBtn.textContent = originalText;
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error fetching payment methods:', error);
    }
}

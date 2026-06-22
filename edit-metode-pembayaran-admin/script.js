document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('span');
            if (navMenu.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });
    }

    const banksContainer = document.getElementById('banks-container');
    const btnAddBank = document.getElementById('btn-add-bank');
    const form = document.getElementById('payment-form');
    const qrisInput = document.getElementById('gambar-qris');
    const qrisPreview = document.getElementById('preview-qris');
    let qrisBase64 = null;
    let bankCount = 0;

    // Helper: Convert file to Base64
    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // Handle QRIS Image Upload
    qrisInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                qrisBase64 = await toBase64(file);
                qrisPreview.src = qrisBase64;
                qrisPreview.style.display = 'block';
            } catch (err) {
                console.error("Error reading QRIS file", err);
            }
        }
    });

    function createBankCard(bankData = null) {
        bankCount++;
        const currentBId = bankCount;
        
        const card = document.createElement('div');
        card.className = 'form-card bank-card';
        card.id = `bank-card-${currentBId}`;
        card.style.marginBottom = '24px';
        card.style.width = '100%';
        card.style.position = 'relative';
        
        const bankName = bankData ? bankData.bank_name : '';
        const accountNumber = bankData ? bankData.account_number : '';
        const imageData = bankData ? bankData.image_data : '';

        // Base HTML for a bank
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
                <h3 style="font-size: 20px; color: #0f172a; margin: 0;" class="bank-title">Rekening Bank</h3>
                <button type="button" class="btn-icon btn-delete" onclick="removeBank(${currentBId})"><span class="material-symbols-outlined">delete</span></button>
            </div>
            
            <div class="form-group">
                <label>Nama Bank</label>
                <input type="text" class="bank-name-input" placeholder="Contoh: Bank Central Asia (BCA)" value="${bankName}"/>
            </div>
            
            <div class="form-group">
                <label>Nomor Rekening</label>
                <input type="text" class="bank-account-input" placeholder="Contoh: 882-031-4452" value="${accountNumber}"/>
            </div>
        `;
        
        banksContainer.appendChild(card);
    }

    // Load existing payment methods
    async function loadData() {
        try {
            const res = await axios.get('http://localhost:3000/api/admin/payment-methods');
            const methods = res.data;
            let hasQris = false;

            methods.forEach(m => {
                if (m.type === 'qris') {
                    hasQris = true;
                    if (m.image_data) {
                        qrisBase64 = m.image_data;
                        qrisPreview.src = m.image_data;
                        qrisPreview.style.display = 'block';
                    }
                } else if (m.type === 'bank') {
                    createBankCard(m);
                }
            });

            if (banksContainer.children.length === 0) {
                createBankCard(); // empty bank card if none
            }
        } catch (error) {
            console.error('Error loading payment methods:', error);
            // fallback empty bank
            if (banksContainer.children.length === 0) {
                createBankCard();
            }
        }
    }

    loadData();
    
    // Add bank button
    btnAddBank.addEventListener('click', () => {
        createBankCard();
    });

    // Submit form
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const methods = [];

        // QRIS
        if (qrisBase64) {
            methods.push({
                type: 'qris',
                image_data: qrisBase64
            });
        }

        // Banks
        const bankCards = banksContainer.querySelectorAll('.bank-card');
        bankCards.forEach(card => {
            const name = card.querySelector('.bank-name-input').value.trim();
            const account = card.querySelector('.bank-account-input').value.trim();

            if (name || account) {
                methods.push({
                    type: 'bank',
                    bank_name: name,
                    account_number: account,
                    image_data: null
                });
            }
        });

        try {
            await axios.post('http://localhost:3000/api/admin/payment-methods/bulk', { methods });
            alert('Metode pembayaran berhasil disimpan!');
            window.location.href = '../manajemen-donasi-admin/index.html';
        } catch (error) {
            console.error('Error saving payment methods:', error);
            alert('Gagal menyimpan metode pembayaran.');
        }
    });
});

window.removeBank = function(id) {
    const card = document.getElementById(`bank-card-${id}`);
    if (card) {
        // Biarkan satu minimal, tapi bisa dihapus semua kalau mau.
        card.remove();
    }
}

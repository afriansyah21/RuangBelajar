let allDonations = [];
let currentDonationPage = 1;
const donationsPerPage = 10;

// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Admin Manajemen Donasi Page Loaded');
    
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

    loadPaymentMethods();
    loadDonations();

    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentDonationPage > 1) {
                currentDonationPage--;
                renderDonations();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const totalPages = Math.ceil(allDonations.length / donationsPerPage) || 1;
            if (currentDonationPage < totalPages) {
                currentDonationPage++;
                renderDonations();
            }
        });
    }
});

async function loadPaymentMethods() {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/payment-methods`);
        const methods = res.data;
        const container = document.getElementById('payment-methods-container');
        
        container.innerHTML = '';
        
        if (methods.length === 0) {
            container.innerHTML = '<p>Belum ada metode pembayaran yang dikonfigurasi.</p>';
            return;
        }

        methods.forEach(m => {
            if (m.type === 'qris') {
                container.innerHTML += `
                    <div class="qris-container" style="margin-bottom: 24px; text-align: center; background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <img alt="QRIS" src="${m.image_data || ''}" style="max-width: 100%; border-radius: 8px;"/>
                        <p style="margin-top: 16px; font-weight: 500;">Scan QRIS Ruangbelajar</p>
                    </div>
                `;
            } else if (m.type === 'bank') {
                container.innerHTML += `
                    <div class="bank-info" style="display: flex; align-items: center; gap: 16px; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
                        <div style="width: 60px; height: 60px; background: #cbd5e1; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined">account_balance</span></div>
                        <div>
                            <p style="margin: 0; color: #64748b; font-size: 14px;">${m.bank_name}</p>
                            <h4 style="margin: 4px 0 0 0; font-size: 18px; color: #0f172a;">${m.account_number}</h4>
                        </div>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error('Error fetching payment methods:', error);
        document.getElementById('payment-methods-container').innerHTML = '<p style="color: red;">Gagal memuat metode pembayaran.</p>';
    }
}

async function loadDonations() {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/donations`);
        const rawDonations = res.data;
        
        let totalAmount = 0;
        rawDonations.forEach(d => {
            totalAmount += parseFloat(d.amount);
        });
        document.getElementById('total-donasi-terkumpul').textContent = 'Rp ' + totalAmount.toLocaleString('id-ID');

        // Sort by donation_date descending (newest first)
        allDonations = rawDonations.sort((a, b) => new Date(b.donation_date) - new Date(a.donation_date));
        currentDonationPage = 1;
        
        renderDonations();
    } catch (error) {
        console.error('Error fetching donations:', error);
        const tbody = document.getElementById('donations-tbody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat riwayat donasi.</td></tr>';
        }
    }
}

function renderDonations() {
    const tbody = document.getElementById('donations-tbody');
    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');
    const pageIndicator = document.getElementById('page-indicator');
    
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (allDonations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada riwayat donasi.</td></tr>';
        if (btnPrev) btnPrev.disabled = true;
        if (btnNext) btnNext.disabled = true;
        if (pageIndicator) pageIndicator.innerText = 'Halaman 1 dari 1';
        return;
    }

    const totalPages = Math.ceil(allDonations.length / donationsPerPage) || 1;
    
    if (currentDonationPage > totalPages) currentDonationPage = totalPages;
    if (currentDonationPage < 1) currentDonationPage = 1;

    const startIndex = (currentDonationPage - 1) * donationsPerPage;
    const endIndex = startIndex + donationsPerPage;
    const donationsToDisplay = allDonations.slice(startIndex, endIndex);

    donationsToDisplay.forEach(d => {
        const dateStr = new Date(d.donation_date).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
        const amountStr = 'Rp ' + Number(d.amount).toLocaleString('id-ID');

        tbody.innerHTML += `
            <tr>
                <td style="font-weight: 500;">${d.donator_name}</td>
                <td style="color: #64748b;">${d.donation_method}</td>
                <td style="color: #64748b;">${dateStr}</td>
                <td style="font-weight: 700;">${amountStr}</td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-icon btn-edit" title="Edit Donasi" onclick="window.location.href='../edit-donasi-admin/index.html?id=${d.id}'">
                            <span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
                        </button>
                        <button class="btn-icon btn-delete" title="Hapus Donasi" onclick="deleteDonation(${d.id})">
                            <span class="material-symbols-outlined" style="font-size: 20px;">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    if (pageIndicator) pageIndicator.innerText = `Halaman ${currentDonationPage} dari ${totalPages}`;
    if (btnPrev) btnPrev.disabled = currentDonationPage === 1;
    if (btnNext) btnNext.disabled = currentDonationPage === totalPages;
}

async function deleteDonation(id) {
    if (confirm('Yakin ingin menghapus donasi ini?')) {
        try {
            await axios.delete(`${API_BASE_URL}/api/admin/donations/${id}`);
            loadDonations();
        } catch (error) {
            console.error('Error deleting donation:', error);
            alert('Gagal menghapus donasi.');
        }
    }
}
// --- INJECTED HAMBURGER MENU SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    if (hamburgerBtn && navMenu) {
        if(!hamburgerBtn.dataset.hasListener) {
            hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); navMenu.classList.toggle('active'); });
            hamburgerBtn.dataset.hasListener = 'true';
        }
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) { navMenu.classList.remove('active'); }
        });
    }
});

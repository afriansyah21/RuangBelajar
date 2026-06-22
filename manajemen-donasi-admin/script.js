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
});

async function loadPaymentMethods() {
    try {
        const res = await axios.get('http://localhost:3000/api/admin/payment-methods');
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
        const res = await axios.get('http://localhost:3000/api/admin/donations');
        const donations = res.data;
        const tbody = document.getElementById('donations-tbody');
        
        tbody.innerHTML = '';
        
        let totalAmount = 0;

        if (donations.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada riwayat donasi.</td></tr>';
            document.getElementById('total-donasi-terkumpul').textContent = 'Rp 0';
            return;
        }

        donations.forEach(d => {
            totalAmount += parseFloat(d.amount);

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

        document.getElementById('total-donasi-terkumpul').textContent = 'Rp ' + totalAmount.toLocaleString('id-ID');
    } catch (error) {
        console.error('Error fetching donations:', error);
        document.getElementById('donations-tbody').innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat riwayat donasi.</td></tr>';
    }
}

async function deleteDonation(id) {
    if (confirm('Yakin ingin menghapus donasi ini?')) {
        try {
            await axios.delete(`http://localhost:3000/api/admin/donations/${id}`);
            loadDonations();
        } catch (error) {
            console.error('Error deleting donation:', error);
            alert('Gagal menghapus donasi.');
        }
    }
}

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

    const form = document.getElementById('add-donation-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const donator_name = document.getElementById('donator-name').value;
            const donation_method = document.getElementById('donation-method').value;
            const donation_date = document.getElementById('donation-date').value;
            const amount = document.getElementById('donation-amount').value;

            try {
                await axios.post(`${API_BASE_URL}/api/admin/donations`, {
                    donator_name,
                    donation_method,
                    donation_date,
                    amount
                });
                
                alert('Donasi berhasil ditambahkan!');
                window.location.href = '../manajemen-donasi-admin/index.html';
            } catch (error) {
                console.error('Error saving donation:', error);
                alert('Gagal menyimpan donasi.');
            }
        });
    }
});

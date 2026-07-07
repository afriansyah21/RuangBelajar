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

    const urlParams = new URLSearchParams(window.location.search);
    const donationId = urlParams.get('id');

    if (!donationId) {
        alert('ID Donasi tidak ditemukan!');
        window.location.href = '../manajemen-donasi-admin/index.html';
        return;
    }

    const form = document.getElementById('edit-donation-form');

    // Load Data
    async function loadDonation() {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/admin/donations/${donationId}`);
            const data = res.data;

            document.getElementById(`donator-name').value = data.donator_name;
            document.getElementById('donation-method').value = data.donation_method;
            
            // Format date to YYYY-MM-DD for input[type="date"]
            if (data.donation_date) {
                const dateObj = new Date(data.donation_date);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                document.getElementById('donation-date').value = `${year}-${month}-${day}`;
            }

            document.getElementById('donation-amount').value = data.amount;

        } catch (error) {
            console.error('Error loading donation:', error);
            alert('Gagal memuat data donasi.');
            window.location.href = '../manajemen-donasi-admin/index.html';
        }
    }

    loadDonation();

    // Handle Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const donator_name = document.getElementById('donator-name').value;
        const donation_method = document.getElementById('donation-method').value;
        const donation_date = document.getElementById('donation-date').value;
        const amount = document.getElementById('donation-amount').value;

        try {
            await axios.put(`${API_BASE_URL}/api/admin/donations/${donationId}`, {
                donator_name,
                donation_method,
                donation_date,
                amount
            });
            
            alert(`Donasi berhasil diperbarui!');
            window.location.href = '../manajemen-donasi-admin/index.html';
        } catch (error) {
            console.error('Error updating donation:', error);
            alert('Gagal memperbarui donasi.');
        }
    });
});

// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Admin Manajemen Pengguna Page Loaded');
    
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

    // Fetch and display users
    fetchUsers();
});

function calculateAge(birthDateString) {
    if (!birthDateString) return '-';
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/users');
        if (!response.ok) throw new Error('Gagal mengambil data pengguna');
        const users = await response.json();
        
        const tbody = document.getElementById('user-table-body');
        tbody.innerHTML = '';
        
        if (users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-slate-500">Belum ada pengguna</td></tr>`;
            return;
        }

        users.forEach(user => {
            const age = calculateAge(user.birth_date);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="font-bold">${user.full_name || '-'}</td>
                <td class="text-slate-500">${user.email || '-'}</td>
                <td>${age} tahun</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        const tbody = document.getElementById('user-table-body');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-red-500">Gagal memuat data pengguna</td></tr>`;
        }
    }
}

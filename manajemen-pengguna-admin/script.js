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

    // Fetch and display users and feedbacks
    fetchUsers();
    fetchFeedbacks();
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

function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari yang lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam yang lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit yang lalu";
    return Math.floor(seconds) + " detik yang lalu";
}

async function fetchFeedbacks() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/feedbacks');
        if (!response.ok) throw new Error('Gagal mengambil data feedback');
        const feedbacks = await response.json();
        
        const list = document.getElementById('feedback-list');
        if (!list) return;

        list.innerHTML = '';
        
        if (feedbacks.length === 0) {
            list.innerHTML = `<div class="text-center text-slate-500 py-4">Belum ada kritik dan saran.</div>`;
            return;
        }

        feedbacks.forEach(feedback => {
            const timeAgo = timeSince(feedback.created_at);
            const item = document.createElement('div');
            item.className = 'feedback-item';
            item.innerHTML = `
                <div class="feedback-header">
                    <span class="font-bold">${feedback.user_name || 'Pengguna'}</span>
                    <span class="text-slate-500 text-sm">${timeAgo}</span>
                </div>
                <div class="feedback-subject">${feedback.subject}</div>
                <p class="feedback-message">${feedback.message}</p>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        const list = document.getElementById('feedback-list');
        if (list) {
            list.innerHTML = `<div class="text-center text-red-500 py-4">Gagal memuat kritik dan saran.</div>`;
        }
    }
}

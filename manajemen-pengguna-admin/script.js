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

let allUsers = [];
let currentPage = 1;
const usersPerPage = 10;

let allFeedbacks = [];
let currentFeedbackPage = 1;
const feedbacksPerPage = 10;

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/users');
        if (!response.ok) throw new Error('Gagal mengambil data pengguna');
        allUsers = await response.json();
        currentPage = 1;
        renderUsers();
    } catch (error) {
        console.error('Error:', error);
        const tbody = document.getElementById('user-table-body');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="3" class="text-center text-red-500">Gagal memuat data pengguna</td></tr>`;
        }
    }
}

function renderUsers() {
    const tbody = document.getElementById('user-table-body');
    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');
    const pageIndicator = document.getElementById('page-indicator');
    
    tbody.innerHTML = '';
    
    if (allUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center text-slate-500">Belum ada pengguna</td></tr>`;
        btnPrev.disabled = true;
        btnNext.disabled = true;
        pageIndicator.innerText = 'Halaman 1 dari 1';
        return;
    }

    const totalPages = Math.ceil(allUsers.length / usersPerPage) || 1;
    
    // Ensure currentPage is within bounds
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToDisplay = allUsers.slice(startIndex, endIndex);

    usersToDisplay.forEach(user => {
        const age = calculateAge(user.birth_date);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="font-bold">${user.full_name || '-'}</td>
            <td class="text-slate-500">${user.email || '-'}</td>
            <td>${age} tahun</td>
        `;
        tbody.appendChild(row);
    });

    // Update pagination controls
    pageIndicator.innerText = `Halaman ${currentPage} dari ${totalPages}`;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnPrev = document.getElementById('btn-prev-page');
    const btnNext = document.getElementById('btn-next-page');
    
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderUsers();
            }
        });
    }
    
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const totalPages = Math.ceil(allUsers.length / usersPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                renderUsers();
            }
        });
    }

    const btnPrevFeedback = document.getElementById('btn-prev-feedback');
    const btnNextFeedback = document.getElementById('btn-next-feedback');
    
    if (btnPrevFeedback) {
        btnPrevFeedback.addEventListener('click', () => {
            if (currentFeedbackPage > 1) {
                currentFeedbackPage--;
                renderFeedbacks();
            }
        });
    }
    
    if (btnNextFeedback) {
        btnNextFeedback.addEventListener('click', () => {
            const totalPages = Math.ceil(allFeedbacks.length / feedbacksPerPage) || 1;
            if (currentFeedbackPage < totalPages) {
                currentFeedbackPage++;
                renderFeedbacks();
            }
        });
    }
});

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
        const rawFeedbacks = await response.json();
        
        // Sort by created_at descending (newest first)
        allFeedbacks = rawFeedbacks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        currentFeedbackPage = 1;
        renderFeedbacks();
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        const list = document.getElementById('feedback-list');
        if (list) {
            list.innerHTML = `<div class="text-center text-red-500 py-4">Gagal memuat kritik dan saran.</div>`;
        }
    }
}

function renderFeedbacks() {
    const list = document.getElementById('feedback-list');
    const btnPrev = document.getElementById('btn-prev-feedback');
    const btnNext = document.getElementById('btn-next-feedback');
    const pageIndicator = document.getElementById('feedback-page-indicator');
    
    if (!list) return;
    list.innerHTML = '';
    
    if (allFeedbacks.length === 0) {
        list.innerHTML = `<div class="text-center text-slate-500 py-4">Belum ada kritik dan saran.</div>`;
        if(btnPrev) btnPrev.disabled = true;
        if(btnNext) btnNext.disabled = true;
        if(pageIndicator) pageIndicator.innerText = 'Halaman 1 dari 1';
        return;
    }

    const totalPages = Math.ceil(allFeedbacks.length / feedbacksPerPage) || 1;
    
    if (currentFeedbackPage > totalPages) currentFeedbackPage = totalPages;
    if (currentFeedbackPage < 1) currentFeedbackPage = 1;

    const startIndex = (currentFeedbackPage - 1) * feedbacksPerPage;
    const endIndex = startIndex + feedbacksPerPage;
    const feedbacksToDisplay = allFeedbacks.slice(startIndex, endIndex);

    feedbacksToDisplay.forEach(feedback => {
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

    if(pageIndicator) pageIndicator.innerText = `Halaman ${currentFeedbackPage} dari ${totalPages}`;
    if(btnPrev) btnPrev.disabled = currentFeedbackPage === 1;
    if(btnNext) btnNext.disabled = currentFeedbackPage === totalPages;
}

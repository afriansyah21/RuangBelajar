// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar Admin Manajemen Kelas Page Loaded');
    
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

    loadCourses();

    // Warmup backend jika diakses langsung
    if (typeof API_BASE_URL !== 'undefined') {
        fetch(`${API_BASE_URL}/api/warmup`).catch(() => {});
    }
});

async function loadCourses(isRetry = false) {
    const container = document.getElementById('course-list-container');
    if (!container) return;

    try {
        const response = await axios.get(`${API_BASE_URL}/api/courses`, { timeout: 30000 });
        const courses = response.data;
        
        container.innerHTML = '';
        
        if (courses.length === 0) {
            container.innerHTML = '<p>Belum ada kelas yang ditambahkan.</p>';
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.style.borderColor = '#cbd5e1';
            card.style.boxShadow = 'none';
            card.style.cursor = 'pointer';
            card.setAttribute('onclick', `window.location.href='../detail-kelas-admin/index.html?course_id=${course.id}'`);

            card.innerHTML = `
                <div class="lesson-img-wrapper">
                    <img alt="Thumbnail" src="${course.thumbnail_url || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop'}"/>
                </div>
                <div class="lesson-content">
                    <h4 style="color: #0f172a;">${course.title}</h4>
                    <p>${course.description || 'Tidak ada deskripsi'}</p>
                    <small style="color: #64748b; margin-top: 5px; display: block;">Total Materi: ${course.materials_count || 0}</small>
                </div>
                <button class="btn-edit-class" title="Edit Kelas" onclick="event.preventDefault(); event.stopPropagation(); window.location.href='../edit-kelas-admin/index.html?id=${course.id}';">
                    <span class="material-symbols-outlined" style="pointer-events: none;">edit</span>
                </button>
                <button class="btn-delete-class" title="Hapus Kelas" onclick="event.preventDefault(); event.stopPropagation(); if(confirm('Apakah Anda yakin ingin menghapus kelas ini?')){ axios.delete(\`${API_BASE_URL}/api/courses/${course.id}\`).then(() => { alert('Kelas terhapus!'); window.location.reload(); }).catch(e => alert('Gagal menghapus')); }">
                    <span class="material-symbols-outlined" style="pointer-events: none;">delete</span>
                </button>
            `;

            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error fetching courses:', error);
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
        
        if (!isRetry) {
            // Auto-retry sekali setelah 5 detik
            container.innerHTML = '<p style="color: #64748b; text-align:center;">⏳ Server sedang startup, mencoba lagi...</p>';
            setTimeout(() => loadCourses(true), 5000);
        } else {
            container.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <p style="color: #ef4444; margin-bottom: 10px;">
                        ${isTimeout ? '⏱️ Server membutuhkan waktu lebih lama dari biasa.' : '❌ Gagal memuat data kelas dari server.'}
                    </p>
                    <button onclick="loadCourses()" style="background:#2563eb;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">
                        🔄 Coba Lagi
                    </button>
                </div>`;
        }
    }
}

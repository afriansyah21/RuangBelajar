// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
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

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course_id');

    if (courseId) {
        loadCourseDetails(courseId);
        loadCourseMaterials(courseId);
    } else {
        alert('ID Kelas tidak ditemukan!');
        window.location.href = '../kelas-user/index.html';
    }
});

async function loadCourseDetails(courseId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}`);
        const course = response.data;
        document.getElementById(`course-title').textContent = `Materi Kelas: ${course.title}`;
        document.getElementById('course-desc').textContent = course.description || 'Daftar materi dan video pembelajaran untuk kelas ini.';
    } catch (error) {
        console.error('Error fetching course details:', error);
        document.getElementById('course-title').textContent = 'Materi Kelas: Tidak Ditemukan';
    }
}

async function loadCourseMaterials(courseId) {
    const container = document.getElementById('materi-list');
    if (!container) return;

    try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/materials`);
        const materials = response.data;

        container.innerHTML = `';

        if (materials.length === 0) {
            container.innerHTML = '<p>Belum ada materi untuk kelas ini.</p>';
            return;
        }

        materials.forEach((materi, index) => {
            const item = document.createElement('div');
            item.className = 'materi-item';
            
            item.innerHTML = `
                <div class="materi-info">
                    <div class="materi-icon">
                        <span class="material-symbols-outlined">play_circle</span>
                    </div>
                    <div>
                        <h4>${String(index + 1).padStart(2, '0')}. ${materi.title}</h4>
                        <p>${materi.short_description || 'Video Pembelajaran'}</p>
                    </div>
                </div>
                <div class="materi-actions">
                    <button class="btn-primary" onclick="window.location.href='../tonton-materi-user/index.html?material_id=${materi.id}'" style="padding: 6px 12px; font-size: 14px;">Lihat Materi</button>
                </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching materials:', error);
        container.innerHTML = '<p style="color: red;">Gagal memuat materi dari server.</p>';
    }
}

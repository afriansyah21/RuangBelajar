// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    console.log('RuangBelajar User Kelas Page Loaded');
    
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
});

async function loadCourses() {
    const container = document.getElementById('course-list-container');
    if (!container) return;

    try {
        const response = await axios.get(`${API_BASE_URL}/api/courses`);
        const courses = response.data;
        
        // Remove existing items except header
        const header = container.querySelector('.lesson-list-header');
        const countElement = document.getElementById('course-count');
        container.innerHTML = '';
        if (header) {
            if (countElement) {
                countElement.textContent = `Daftar Kelas (${courses.length})`;
            }
            container.appendChild(header);
        }
        
        if (courses.length === 0) {
            container.insertAdjacentHTML('beforeend', '<p style="padding: 1rem;">Belum ada kelas yang tersedia.</p>');
            return;
        }

        courses.forEach((course, index) => {
            const card = document.createElement('a');
            card.href = `../detail-kelas-user/index.html?course_id=${course.id}`;
            card.className = 'lesson-card';
            card.style.borderColor = '#cbd5e1';
            card.style.boxShadow = 'none';
            card.style.cursor = 'pointer';
            card.style.textDecoration = 'none';
            card.style.color = 'inherit';
            card.style.display = 'flex';

            const defaultImg = 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop';
            
            card.innerHTML = `
                <div class="lesson-img-wrapper">
                    <img alt="Thumbnail" src="${course.thumbnail_url || defaultImg}"/>
                </div>
                <div class="lesson-content">
                    <h4 style="color: #0f172a;">${String(index + 1).padStart(2, '0')}. ${course.title}</h4>
                    <p>${course.description || 'Tidak ada deskripsi'}</p>
                </div>
            `;

            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error fetching courses:', error);
        container.insertAdjacentHTML('beforeend', '<p style="color: red; padding: 1rem;">Gagal memuat data kelas dari server.</p>');
    }
}

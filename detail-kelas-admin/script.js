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

    loadCourseAndMaterials();
});

// Ambil ID kelas dari URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('course_id');

async function loadCourseAndMaterials() {
    if (!courseId) {
        alert('ID Kelas tidak ditemukan!');
        window.location.href = '../manajemen-kelas-admin/index.html';
        return;
    }

    // Set href untuk tombol Tambah Materi
    document.getElementById('btn-tambah-materi').onclick = () => {
        window.location.href = `../tambah-materi-admin/index.html?course_id=${courseId}`;
    };

    try {
        // Fetch course details and materials
        const courseRes = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
        document.getElementById('course-title').innerText = `Materi Kelas: ${courseRes.data.title}`;

        const materials = courseRes.data.materials || [];

        const container = document.getElementById('materi-list-container');
        container.innerHTML = '';

        if (materials.length === 0) {
            container.innerHTML = '<p>Belum ada materi untuk kelas ini.</p>';
            return;
        }

        materials.forEach((materi, index) => {
            const div = document.createElement('div');
            div.className = 'materi-item';
            div.style.cursor = 'pointer';
            div.setAttribute('onclick', `window.location.href='../tonton-materi-admin/index.html?id=${materi.id}'`);

            div.innerHTML = `
                <div class="materi-info">
                    <div class="materi-icon">
                        <span class="material-symbols-outlined">play_circle</span>
                    </div>
                    <div>
                        <h4>${String(index + 1).padStart(2, '0')}. ${materi.title}</h4>
                        <p>${materi.short_description ? materi.short_description.substring(0, 50) + '...' : 'Tidak ada deskripsi'}</p>
                    </div>
                </div>
                <div class="materi-actions">
                    <button class="btn-icon btn-edit" title="Edit Materi" onclick="event.preventDefault(); event.stopPropagation(); window.location.href='../edit-materi-admin/index.html?id=${materi.id}';">
                        <span class="material-symbols-outlined" style="pointer-events: none;">edit</span>
                    </button>
                    <button class="btn-icon btn-delete" title="Hapus Materi" onclick="event.preventDefault(); event.stopPropagation(); if(confirm('Apakah Anda yakin ingin menghapus materi ini?')){ axios.delete('http://localhost:3000/api/admin/materials/${materi.id}').then(() => window.location.reload()).catch(e => alert('Gagal menghapus materi')); }">
                        <span class="material-symbols-outlined" style="pointer-events: none;">delete</span>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('materi-list-container').innerHTML = '<p style="color:red;">Gagal memuat data.</p>';
    }
}

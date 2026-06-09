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

    initForm();
});

let courseIdToReturn = '';

async function initForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const materialId = urlParams.get('id');

    if (!materialId) {
        alert('ID Materi tidak ditemukan!');
        window.history.back();
        return;
    }

    try {
        // Load data lama
        const res = await axios.get(`http://localhost:3000/api/materials/${materialId}`);
        const material = res.data;
        courseIdToReturn = material.course_id;

        document.getElementById('video-input').value = material.video_url || '';
        document.getElementById('title-input').value = material.title || '';
        document.getElementById('description-input').value = material.description || '';
        document.getElementById('content-input').value = material.content || '';

        // Set tombol kembali & batal
        const backUrl = `../detail-kelas-admin/index.html?course_id=${courseIdToReturn}`;
        document.getElementById('btn-kembali').onclick = () => window.location.href = backUrl;
        document.getElementById('btn-batal').onclick = () => window.location.href = backUrl;

        // Handle form submit
        const form = document.getElementById('form-edit-materi');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const video_url = document.getElementById('video-input').value;
            const title = document.getElementById('title-input').value;
            const description = document.getElementById('description-input').value;
            const content = document.getElementById('content-input').value;

            try {
                await axios.put(`http://localhost:3000/api/materials/${materialId}`, {
                    title,
                    video_url,
                    description,
                    content
                });
                alert('Materi berhasil diperbarui!');
                window.location.href = backUrl;
            } catch (error) {
                console.error('Error updating material:', error);
                alert('Gagal memperbarui materi. Periksa koneksi backend.');
            }
        });

    } catch (error) {
        console.error('Error loading material:', error);
        alert('Gagal memuat data materi.');
    }
}

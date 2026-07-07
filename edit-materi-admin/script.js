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
        const res = await axios.get(`${API_BASE_URL}/api/admin/materials/${materialId}`);
        const material = res.data;
        courseIdToReturn = material.course_id;

        document.getElementById('video-input').value = material.youtube_link || '';
        document.getElementById('title-input').value = material.title || '';
        document.getElementById('description-input').value = material.short_description || '';
        document.getElementById('content-input').value = material.summary || '';

        // Set tombol kembali & batal
        const backUrl = `../detail-kelas-admin/index.html?course_id=${courseIdToReturn}`;
        document.getElementById('btn-kembali').onclick = () => window.location.href = backUrl;
        document.getElementById('btn-batal').onclick = () => window.location.href = backUrl;

        // Handle form submit
        const form = document.getElementById('form-edit-materi');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const youtube_link = document.getElementById('video-input').value;
            const title = document.getElementById('title-input').value;
            const short_description = document.getElementById('description-input').value;
            const summary = document.getElementById('content-input').value;

            try {
                await axios.put(`${API_BASE_URL}/api/admin/materials/${materialId}`, {
                    title,
                    youtube_link,
                    short_description,
                    summary
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

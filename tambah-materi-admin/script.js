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

function initForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course_id');

    if (!courseId) {
        alert('ID Kelas tidak ditemukan!');
        window.location.href = '../manajemen-kelas-admin/index.html';
        return;
    }

    // Set tombol kembali & batal
    const backUrl = `../detail-kelas-admin/index.html?course_id=${courseId}`;
    document.getElementById('btn-kembali').onclick = () => window.location.href = backUrl;
    document.getElementById('btn-batal').onclick = () => window.location.href = backUrl;

    // Handle form submit
    const form = document.getElementById('form-tambah-materi');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const youtube_link = document.getElementById('video-input').value;
        const title = document.getElementById('title-input').value;
        const short_description = document.getElementById('description-input').value;
        const summary = document.getElementById('content-input').value;

        try {
            await axios.post(`${API_BASE_URL}/api/admin/courses/${courseId}/materials`, {
                title,
                youtube_link,
                short_description,
                summary
            });
            alert(`Materi berhasil ditambahkan!');
            window.location.href = backUrl;
        } catch (error) {
            console.error('Error saving material:', error);
            alert('Gagal menyimpan materi. Periksa koneksi backend.');
        }
    });
}

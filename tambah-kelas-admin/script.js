// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

async function saveCourse() {
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('desc-input').value;
    const fileInput = document.getElementById('gambar-kelas');
    
    if (!title) {
        alert('Nama kelas harus diisi!');
        return;
    }

    let thumbnail_url = 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop';

    try {
        // Jika user memilih file, unggah terlebih dahulu
        if (fileInput && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            
            const uploadRes = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            thumbnail_url = uploadRes.data.url;
        }

        // Simpan data kelas
        await axios.post('http://localhost:3000/api/courses', {
            title,
            description,
            thumbnail_url
        });
        alert('Kelas berhasil ditambahkan!');
        window.location.href = '../manajemen-kelas-admin/index.html';
    } catch (error) {
        console.error('Error saving course:', error);
        alert('Gagal menyimpan kelas. Periksa koneksi backend.');
    }
}

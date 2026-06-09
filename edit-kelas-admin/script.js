// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Ambil ID kelas dari URL: ?id=1
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (courseId) {
        loadCourseData(courseId);
    } else {
        alert('ID Kelas tidak ditemukan!');
        window.location.href = '../manajemen-kelas-admin/index.html';
    }
});

let currentCourseId = null;

async function loadCourseData(id) {
    currentCourseId = id;
    try {
        const response = await axios.get(`http://localhost:3000/api/courses/${id}`);
        const course = response.data;
        
        document.getElementById('title-input').value = course.title;
        document.getElementById('desc-input').value = course.description;
        // Kita juga bisa menset thumbnail img src jika ada elemennya
    } catch (error) {
        console.error('Error fetching course:', error);
        alert('Gagal memuat data kelas.');
        window.location.href = '../manajemen-kelas-admin/index.html';
    }
}

async function updateCourse() {
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('desc-input').value;
    const fileInput = document.getElementById('gambar-kelas');

    if (!title) {
        alert('Nama kelas harus diisi!');
        return;
    }

    try {
        // Ambil data course saat ini untuk mendapatkan thumbnail url yang lama
        const currentCourse = await axios.get(`http://localhost:3000/api/courses/${currentCourseId}`);
        let thumbnail_url = currentCourse.data.thumbnail_url;

        // Jika user memilih file baru, unggah file tersebut
        if (fileInput && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            
            const uploadRes = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            thumbnail_url = uploadRes.data.url;
        }

        await axios.put(`http://localhost:3000/api/courses/${currentCourseId}`, {
            title,
            description,
            thumbnail_url
        });
        alert('Perubahan berhasil disimpan!');
        window.location.href = '../manajemen-kelas-admin/index.html';
    } catch (error) {
        console.error('Error updating course:', error);
        alert('Gagal menyimpan perubahan.');
    }
}

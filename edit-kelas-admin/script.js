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
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
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
        const currentCourse = await axios.get(`${API_BASE_URL}/api/courses/${currentCourseId}`);
        let thumbnail_url = currentCourse.data.thumbnail_url;

        // Jika user memilih file baru, unggah file tersebut
        if (fileInput && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            
            const uploadRes = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            thumbnail_url = uploadRes.data.url;
        }

        await axios.put(`${API_BASE_URL}/api/courses/${currentCourseId}`, {
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

function handleImageSelect(input) {
    const display = document.getElementById('file-name-display');
    const uploadArea = document.getElementById('upload-area');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        display.innerText = file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadArea.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${e.target.result})`;
            uploadArea.style.backgroundSize = 'cover';
            uploadArea.style.backgroundPosition = 'center';
            uploadArea.style.backgroundRepeat = 'no-repeat';
        }
        reader.readAsDataURL(file);
    } else {
        display.innerText = 'Klik atau seret gambar ke sini untuk mengganti';
        uploadArea.style.backgroundImage = 'none';
    }
}
// --- INJECTED HAMBURGER MENU SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    if (hamburgerBtn && navMenu) {
        if(!hamburgerBtn.dataset.hasListener) {
            hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); navMenu.classList.toggle('active'); });
            hamburgerBtn.dataset.hasListener = 'true';
        }
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) { navMenu.classList.remove('active'); }
        });
    }
});

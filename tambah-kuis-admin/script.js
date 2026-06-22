// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('span');
            icon.textContent = navMenu.classList.contains('active') ? 'close' : 'menu';
        });
    }

    loadCourses();

    const form = document.getElementById('form-tambah-kuis');
    if (form) {
        form.addEventListener('submit', createQuiz);
    }
});

async function loadCourses() {
    try {
        const response = await fetch('http://localhost:3000/api/courses');
        const courses = await response.json();
        
        const select = document.getElementById('course-id');
        select.innerHTML = '<option value="" disabled selected>Pilih Kelas</option>';
        
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading courses:', error);
        alert('Gagal memuat daftar kelas.');
    }
}

async function createQuiz(event) {
    event.preventDefault();
    
    const courseId = document.getElementById('course-id').value;
    const title = document.getElementById('quiz-title').value;
    const description = document.getElementById('quiz-description').value;
    const imageInput = document.getElementById('gambar-kuis');
    
    let thumbnailUrl = null;
    
    try {
        // Upload gambar dulu jika ada
        if (imageInput && imageInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', imageInput.files[0]);
            
            const uploadRes = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            });
            
            if (uploadRes.ok) {
                const uploadData = await uploadRes.json();
                thumbnailUrl = uploadData.url;
            } else {
                alert('Gagal mengupload gambar.');
                return;
            }
        }
        
        // Simpan data kuis
        const response = await fetch('http://localhost:3000/api/admin/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                course_id: courseId, 
                title: title,
                description: description,
                thumbnail_url: thumbnailUrl
            })
        });
        
        if (response.ok) {
            alert('Kuis berhasil ditambahkan!');
            window.location.href = '../manajemen-kuis-admin/index.html';
        } else {
            const data = await response.json();
            alert('Gagal menambahkan kuis: ' + (data.error || 'Terjadi kesalahan'));
        }
    } catch (error) {
        console.error('Error creating quiz:', error);
        alert('Terjadi kesalahan pada server.');
    }
}

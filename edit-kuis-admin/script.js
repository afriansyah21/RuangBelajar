let currentQuizId = null;
let existingThumbnailUrl = null;

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

    // Get Quiz ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentQuizId = urlParams.get('id');

    if (!currentQuizId) {
        alert('ID Kuis tidak ditemukan!');
        window.location.href = '../manajemen-kuis-admin/index.html';
        return;
    }

    loadCourses().then(() => {
        loadQuizDetails();
    });

    const form = document.getElementById('form-edit-kuis');
    if (form) {
        form.addEventListener('submit', updateQuiz);
    }
});

async function loadCourses() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/courses`);
        const courses = await response.json();
        
        const select = document.getElementById('course-id');
        select.innerHTML = '<option value="" disabled>Pilih Kelas</option>';
        
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

async function loadQuizDetails() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/quizzes/${currentQuizId}`);
        if (!response.ok) throw new Error(`Quiz not found');
        
        const data = await response.json();
        const quiz = data.quiz; // the API returns { quiz, questions } wait, let me check the endpoint again!
        // No, `SELECT *` was assigned to `quiz` array! Let's handle both possible structures:
        const quizData = data.quiz ? data.quiz : data;
        
        document.getElementById('course-id').value = quizData.course_id;
        document.getElementById('quiz-title').value = quizData.title;
        if(document.getElementById('quiz-description')) {
            document.getElementById('quiz-description').value = quizData.description || '';
        }
        
        existingThumbnailUrl = quizData.thumbnail_url;
        
    } catch (error) {
        console.error('Error loading quiz details:', error);
        alert('Gagal memuat data kuis.');
    }
}

async function updateQuiz(event) {
    event.preventDefault();
    
    const courseId = document.getElementById('course-id').value;
    const title = document.getElementById('quiz-title').value;
    const description = document.getElementById('quiz-description').value;
    const imageInput = document.getElementById('gambar-kuis');
    
    let thumbnailUrl = existingThumbnailUrl;
    
    try {
        // Upload gambar baru jika dipilih
        if (imageInput && imageInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', imageInput.files[0]);
            
            const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
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
        
        const response = await fetch(`${API_BASE_URL}/api/admin/quizzes/${currentQuizId}`, {
            method: `PUT',
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
            alert('Kuis berhasil diperbarui!');
            window.location.href = '../manajemen-kuis-admin/index.html';
        } else {
            const resData = await response.json();
            alert('Gagal memperbarui kuis: ' + (resData.error || 'Terjadi kesalahan'));
        }
    } catch (error) {
        console.error('Error updating quiz:', error);
        alert('Terjadi kesalahan pada server.');
    }
}

function handleImageSelect(input) {
    const display = document.getElementById('file-name-display');
    const uploadArea = document.getElementById('upload-area');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (display) display.innerText = file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadArea.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${e.target.result})`;
            uploadArea.style.backgroundSize = 'cover';
            uploadArea.style.backgroundPosition = 'center';
            uploadArea.style.backgroundRepeat = 'no-repeat';
        }
        reader.readAsDataURL(file);
    } else {
        if (display) display.innerText = 'Klik atau seret gambar baru ke sini';
        uploadArea.style.backgroundImage = 'none';
    }
}

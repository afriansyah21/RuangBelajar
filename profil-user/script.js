// Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const editFotoInput = document.getElementById('edit-foto');
  const previewEl = document.getElementById('edit-foto-preview');
  if (editFotoInput && previewEl) {
    editFotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewEl.src = e.target.result;
          previewEl.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        // Fallback to original user picture if input is cleared
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
          const user = JSON.parse(userJson);
          if (user.profile_picture) {
            previewEl.src = user.profile_picture;
            previewEl.style.display = 'block';
          } else {
            previewEl.style.display = 'none';
            previewEl.src = '';
          }
        } else {
          previewEl.style.display = 'none';
          previewEl.src = '';
        }
      }
    });
  }
});

// Modal Logic
function openEditModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      document.getElementById('edit-nama').value = user.full_name || '';
      
      const previewEl = document.getElementById('edit-foto-preview');
      if (previewEl) {
        if (user.profile_picture) {
          previewEl.src = user.profile_picture;
          previewEl.style.display = 'block';
        } else {
          previewEl.src = '';
          previewEl.style.display = 'none';
        }
      }
      
      if (user.birth_date) {
        const d = new Date(user.birth_date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        document.getElementById('edit-tanggal').value = `${yyyy}-${mm}-${dd}`;
      } else {
        document.getElementById('edit-tanggal').value = '';
      }
      
      document.getElementById('edit-hp').value = user.phone_number || '';
    }
    modal.classList.add('active');
  }
}

function closeEditModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Change Password Modal Logic
function openChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.add('active');
    // Reset state
    document.getElementById('passwordStep1').style.display = 'block';
    document.getElementById('passwordStep2').style.display = 'none';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    
    const errorEl1 = document.getElementById('password-error-1');
    if (errorEl1) errorEl1.style.display = 'none';
    const errorEl2 = document.getElementById('password-error-2');
    if (errorEl2) errorEl2.style.display = 'none';
  }
}

function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

async function nextPasswordStep() {
  const currentPass = document.getElementById('currentPassword').value;
  const errorEl = document.getElementById('password-error-1');
  errorEl.style.display = 'none';

  if (currentPass.trim() === '') {
    errorEl.textContent = 'Harap masukkan password saat ini!';
    errorEl.style.display = 'block';
    return;
  }
  
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return;
  const user = JSON.parse(userJson);

  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${user.id}/verify-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPass })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Password saat ini salah');
    }
    
    // Lanjut ke step 2
    document.getElementById('passwordStep1').style.display = 'none';
    document.getElementById('passwordStep2').style.display = 'block';
  } catch (error) {
    console.error('Error verifying password:', error);
    errorEl.textContent = error.message;
    errorEl.style.display = 'block';
  }
}

async function saveNewPassword() {
  const currentPass = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmNewPassword').value;
  
  const errorEl = document.getElementById('password-error-2');
  errorEl.style.display = 'none';

  if (newPass.trim() === '') {
    errorEl.textContent = 'Harap masukkan password baru!';
    errorEl.style.display = 'block';
    return;
  }

  if (newPass !== confirmPass) {
    errorEl.textContent = 'Konfirmasi password tidak cocok!';
    errorEl.style.display = 'block';
    return;
  }
  
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return;
  const user = JSON.parse(userJson);

  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${user.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Gagal mengubah password');
    }

    alert('Password berhasil diubah!');
    closeChangePasswordModal();
  } catch (error) {
    console.error('Error changing password:', error);
    errorEl.textContent = error.message;
    errorEl.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    const user = JSON.parse(userJson);
    
    const nameHeaderEl = document.getElementById('profile-name-header');
    if (nameHeaderEl) nameHeaderEl.textContent = user.full_name || '-';
    
    const fullnameEl = document.getElementById('profile-fullname');
    if (fullnameEl) fullnameEl.textContent = user.full_name || '-';
    
    const phoneEl = document.getElementById('profile-phone');
    if (phoneEl) phoneEl.textContent = user.phone_number || '-';
    
    const birthdateEl = document.getElementById('profile-birthdate');
    if (birthdateEl && user.birth_date) {
      const dateObj = new Date(user.birth_date);
      const formattedDate = dateObj.toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      birthdateEl.textContent = formattedDate;
    } else if (birthdateEl) {
      birthdateEl.textContent = '-';
    }
    
    const emailEl = document.getElementById('profile-email');
    if (emailEl) emailEl.textContent = user.email || '-';

    const profilePicEl = document.getElementById('profile-picture-display');
    if (profilePicEl) {
      profilePicEl.src = user.profile_picture || 'default-avatar.jpg';
    }

    loadProfileStats(user.id);
    loadUserCourses();

  } else {
    // Redirect to login if no user data
    window.location.href = '../login-user/index.html';
  }
});

async function saveProfile() {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return;
  const user = JSON.parse(userJson);

  const fullName = document.getElementById('edit-nama').value;
  const birthDate = document.getElementById('edit-tanggal').value;
  const phone = document.getElementById('edit-hp').value;
  const fileInput = document.getElementById('edit-foto');
  
  let profilePicture = undefined;

  try {
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      profilePicture = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const payload = {
      full_name: fullName,
      birth_date: birthDate || null,
      phone_number: phone
    };
    if (profilePicture !== undefined) {
      payload.profile_picture = profilePicture;
    }

    const res = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Gagal menyimpan profil');
    
    const updatedUser = await res.json();
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Refresh page to show changes
    window.location.reload();
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Gagal menyimpan profil: ' + error.message);
  }
}

// Fetch and render profile stats
async function loadProfileStats(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/profile-stats`);
    if (!res.ok) return;
    const stats = await res.json();
    
    // Progres Kuis
    const total = stats.total_quizzes || 0;
    const completed = stats.completed_quizzes || 0;
    const quizPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const quizFractionEl = document.getElementById('quiz-fraction');
    const quizPercentageEl = document.getElementById('quiz-percentage');
    const quizProgressBarEl = document.getElementById('quiz-progress-bar');
    if(quizFractionEl) quizFractionEl.textContent = `${completed}/${total}`;
    if(quizPercentageEl) quizPercentageEl.textContent = `${quizPct}%`;
    if(quizProgressBarEl) quizProgressBarEl.style.width = `${quizPct}%`;
    
    // Nilai Rata-rata
    const avg = parseFloat(stats.average_score) || 0;
    let grade = 'E';
    if (avg >= 81) grade = 'A';
    else if (avg >= 61) grade = 'B';
    else if (avg >= 41) grade = 'C';
    else if (avg >= 21) grade = 'D';
    else grade = 'E';
    
    const avgScoreEl = document.getElementById('avg-score');
    const avgGradeEl = document.getElementById('avg-grade');
    const avgProgressBarEl = document.getElementById('avg-progress-bar');
    if(avgScoreEl) avgScoreEl.textContent = avg.toFixed(1);
    if(avgGradeEl) avgGradeEl.textContent = `Grade ${grade}`;
    if(avgProgressBarEl) avgProgressBarEl.style.width = `${avg}%`;
  } catch (err) {
    console.error('Error fetching profile stats:', err);
  }
}

// Fetch and render user courses
async function loadUserCourses() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses`);
    if (!res.ok) return;
    const courses = await res.json();
    
    const listEl = document.getElementById('user-course-list');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    if (courses.length > 0) {
      const colors = ['blue-icon', 'yellow-icon', 'red-icon', 'green-icon'];
      const icons = ['functions', 'language', 'science', 'computer'];
      
      courses.forEach((course, index) => {
        const item = document.createElement('a');
        item.href = `../detail-kelas-user/index.html?course_id=${course.id}`;
        item.className = 'course-item';
        item.style.textDecoration = 'none';
        item.style.color = 'inherit';
        
        const thumbnailHtml = course.thumbnail_url 
            ? `<img src="${course.thumbnail_url}" alt="${course.title}" style="width: 48px; height: 48px; border-radius: 12px; object-fit: cover; flex-shrink: 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">` 
            : `<div class="course-icon blue-icon" style="flex-shrink: 0;"><span class="material-symbols-outlined">menu_book</span></div>`;

        item.innerHTML = `
          ${thumbnailHtml}
          <div class="course-content">
            <h4>${course.title}</h4>
            <p>${course.description || 'Kelas RuangBelajar'}</p>
          </div>
          <span class="material-symbols-outlined arrow">arrow_forward</span>
        `;
        
        listEl.appendChild(item);
      });
    } else {
      listEl.innerHTML = '<div class="text-slate-500 py-4 w-full text-center">Belum ada kelas yang tersedia.</div>';
    }
  } catch (err) {
    console.error('Error fetching courses:', err);
    const listEl = document.getElementById('user-course-list');
    if (listEl) listEl.innerHTML = '<div class="text-red-500 py-4 w-full text-center">Gagal memuat kelas.</div>';
  }
}


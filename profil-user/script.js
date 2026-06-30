// Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Modal Logic
function openEditModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      document.getElementById('edit-nama').value = user.full_name || '';
      
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
  }
}

function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function nextPasswordStep() {
  const currentPass = document.getElementById('currentPassword').value;
  if (currentPass.trim() === '') {
    alert('Harap masukkan password saat ini!');
    return;
  }
  
  // Lanjut ke step 2
  document.getElementById('passwordStep1').style.display = 'none';
  document.getElementById('passwordStep2').style.display = 'block';
}

function saveNewPassword() {
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmNewPassword').value;
  
  if (newPass.trim() === '') {
    alert('Harap masukkan password baru!');
    return;
  }

  if (newPass !== confirmPass) {
    alert('Konfirmasi password tidak cocok!');
    return;
  }
  
  alert('Password berhasil diubah!');
  closeChangePasswordModal();
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

    const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
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

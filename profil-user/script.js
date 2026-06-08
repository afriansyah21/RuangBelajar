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

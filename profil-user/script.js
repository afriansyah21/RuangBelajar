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

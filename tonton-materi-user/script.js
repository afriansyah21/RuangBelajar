// Hamburger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
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

    const urlParams = new URLSearchParams(window.location.search);
    const materialId = urlParams.get('material_id');

    if (materialId) {
        loadMaterial(materialId);
    } else {
        alert('ID Materi tidak ditemukan!');
        window.history.back();
    }
});

// Helper function to convert standard YouTube URL to embed URL
function getEmbedUrl(url) {
    if (!url) return '';
    try {
        let videoId = '';
        if (url.includes('youtube.com/watch')) {
            const params = new URLSearchParams(new URL(url).search);
            videoId = params.get('v');
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/embed/')) {
            return url;
        }
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    } catch (e) {
        return url;
    }
}

async function loadMaterial(id) {
    try {
        const response = await axios.get(`http://localhost:3000/api/materials/${id}`);
        const materi = response.data;
        
        document.getElementById('materi-title').textContent = materi.title;
        document.getElementById('materi-desc').textContent = materi.description || '';
        
        const contentContainer = document.getElementById('materi-content');
        if (materi.content) {
            contentContainer.innerHTML = `<p style="font-size: 15px; color: #475569; line-height: 1.6;">${materi.content.replace(/\n/g, '<br>')}</p>`;
        } else {
            contentContainer.innerHTML = '<p>Tidak ada konten ringkasan.</p>';
        }

        const videoIframe = document.getElementById('materi-video');
        if (materi.video_url) {
            videoIframe.src = getEmbedUrl(materi.video_url);
            videoIframe.parentElement.style.display = 'block';
        } else {
            videoIframe.parentElement.style.display = 'none';
        }

        // Update back button to go back to the correct course
        const backBtn = document.getElementById('btn-back-course');
        if (backBtn && materi.course_id) {
            backBtn.onclick = () => {
                window.location.href = `../detail-kelas-user/index.html?course_id=${materi.course_id}`;
            };
        }

    } catch (error) {
        console.error('Error fetching material:', error);
        alert('Gagal memuat data materi dari server.');
    }
}

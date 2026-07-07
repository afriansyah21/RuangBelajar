document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
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

    loadMaterial();
});

// Helper function to format YouTube URLs for embedding
function getEmbedUrl(url) {
    if (!url) return '';
    let embedUrl = url;
    
    try {
        if (url.includes('watch?v=')) {
            const videoId = url.split('watch?v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtube.com/embed/')) {
            embedUrl = url; // Sudah format embed
        } else {
            // Bukan format youtube yang dikenal, biarkan URL apa adanya
            console.warn('URL video mungkin bukan YouTube:', url);
        }
    } catch(e) {
        console.error('Error parsing video URL:', e);
    }
    
    return embedUrl;
}

async function loadMaterial() {
    const urlParams = new URLSearchParams(window.location.search);
    const materialId = urlParams.get('id');
    
    // Set default fallback back button
    document.getElementById('btn-kembali').onclick = () => window.history.back();

    if (!materialId) {
        alert('ID Materi tidak ditemukan!');
        return;
    }

    try {
        // Ambil data materi dari backend
        const res = await axios.get(`${API_BASE_URL}/api/admin/materials/${materialId}`);
        const material = res.data;

        // Set tombol kembali agar kembali ke detail kelas (lebih spesifik)
        document.getElementById(`btn-kembali').onclick = () => {
            window.location.href = `../detail-kelas-admin/index.html?course_id=${material.course_id}`;
        };

        // Render data ke dalam HTML
        document.getElementById('materi-title').innerText = material.title || 'Materi Tanpa Judul';
        document.getElementById('materi-desc').innerText = material.short_description || 'Tidak ada deskripsi.';
        document.getElementById('materi-content').innerText = material.summary || 'Tidak ada rangkuman.';
        
        // Render iframe YouTube
        const iframe = document.getElementById('video-iframe');
        const embedUrl = getEmbedUrl(material.youtube_link);
        
        console.log('Video URL Asli:', material.youtube_link);
        console.log('Video Embed URL:', embedUrl);
        
        if (embedUrl) {
            iframe.src = embedUrl;
        } else {
            // Jika tidak ada URL, sembunyikan iframe atau tampilkan pesan
            iframe.parentElement.innerHTML = '<div style="color: white; text-align: center; padding-top: 25%;">Video tidak tersedia. Harap tambahkan link YouTube.</div>';
        }

    } catch (error) {
        console.error('Error fetching material:', error);
        alert('Gagal memuat materi.');
    }
}

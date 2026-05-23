import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, Star, Loader2, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function LandingPageUser() {
  const [featured, setFeatured] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder to simulate featured content/articles
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setFeatured(response.data);
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-16 animate-[fadeUp_0.7s_ease] pb-10">
      
      {/* HERO SECTION */}
      <section className="glass-card p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-10 mt-8 relative overflow-hidden">
        <div className="flex-1 z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-lexend)] text-[var(--color-primary)] leading-tight mb-6">
            Cara Baru Belajar Secara <span className="text-[var(--color-blue)]">Interaktif</span> & Menyenangkan
          </h1>
          <p className="text-lg text-[var(--color-secondary)] mb-8 max-w-xl">
            Tingkatkan keterampilan Anda dengan kurikulum terstruktur, materi yang mudah dipahami, dan mentor yang ahli di bidangnya.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/sign-up" className="primary-btn !w-auto px-8 !mt-0 inline-flex items-center gap-2">
              Mulai Sekarang <ArrowRight size={18} />
            </Link>
            <Link to="/kelas-user" className="secondary-btn !w-auto px-8 !mt-0 inline-flex items-center gap-2 bg-white">
              <PlayCircle size={18} /> Lihat Kelas
            </Link>
          </div>
        </div>
        
        {/* Hero Graphic / Decoration */}
        <div className="hidden md:flex flex-1 justify-center relative z-10">
          <div className="w-[300px] h-[300px] bg-gradient-to-br from-blue-400 to-sky-300 rounded-full flex items-center justify-center shadow-2xl relative">
            <Star size={100} className="text-white opacity-80" />
            
            {/* Floating Element */}
            <div className="absolute -left-10 top-10 glass-card px-4 py-2 flex items-center gap-2 text-sm font-bold">
              <span className="w-3 h-3 rounded-full bg-green-500"></span> 500+ Kelas Aktif
            </div>
            
            {/* Floating Element */}
            <div className="absolute -right-10 bottom-10 glass-card px-4 py-2 flex items-center gap-2 text-sm font-bold">
              <Star size={16} className="text-amber-500 fill-amber-500" /> 4.9/5 Rating
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES / CONTENT FROM API */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Artikel & Update Terbaru</h2>
          <p className="text-[var(--color-secondary)]">Jangan lewatkan informasi seputar dunia pendidikan dan teknologi.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={48} />
            <p className="text-[var(--color-secondary)] font-medium">Memuat artikel terbaru...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post) => (
              <article key={post.id} className="glass-card p-6 flex flex-col group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-full h-40 bg-blue-100 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                    Edukasi
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 capitalize group-hover:text-[var(--color-blue)] transition-colors">{post.title}</h3>
                <p className="text-[var(--color-secondary)] text-sm line-clamp-3 mb-6 flex-1">
                  {post.body}
                </p>
                <div className="mt-auto border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
                  <span className="text-xs text-[var(--color-secondary)]">Oleh RuangBelajar</span>
                  <button className="text-[var(--color-blue)] font-semibold text-sm hover:underline">Baca Selengkapnya</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

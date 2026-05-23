import { BookOpen, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BerandaUser() {
  return (
    <div className="flex flex-col gap-8 animate-[fadeUp_0.7s_ease]">
      
      {/* HEADER SECTION */}
      <section className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="z-10 max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">
            Selamat Datang, Aditya!
          </h1>
          <p className="text-lg text-[var(--color-secondary)] mb-8">
            Siap untuk melanjutkan petualangan belajarmu hari ini? 
            Kamu memiliki 2 kelas yang belum diselesaikan.
          </p>
          <button className="primary-btn !mt-0 !w-auto px-8">
            Lanjutkan Belajar
          </button>
        </div>
        <div className="w-[200px] h-[200px] bg-blue-100 rounded-full flex items-center justify-center relative z-10">
          <BookOpen size={80} className="text-blue-500" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          
          {/* TERBARU SECTION */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">Kelas Terbaru</h2>
              <Link to="/kelas-user" className="text-[var(--color-blue)] hover:underline font-medium text-sm flex items-center">
                Lihat Semua <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="glass-card p-6 flex flex-col group cursor-pointer hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Pemrograman Web Lanjut</h3>
                  <p className="text-[var(--color-secondary)] text-sm mb-4 line-clamp-2">
                    Pelajari framework modern seperti React, Vue, dan cara mengintegrasikan API.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--color-blue)]">Rp 150.000</span>
                    <button className="secondary-btn !mt-0 !w-auto px-4 !h-10 text-sm">
                      Daftar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-8">
          
          {/* MINI STATS */}
          <section className="glass-card p-6 flex flex-col gap-6">
            <h3 className="font-bold text-lg border-b border-[var(--color-border)] pb-4">Statistik Ringkas</h3>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Star size={24} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-secondary)]">Total XP</p>
                <p className="font-bold text-xl">2,450</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-[var(--color-secondary)]">Peringkat</p>
                <p className="font-bold text-xl">Top 15%</p>
              </div>
            </div>
            
          </section>

        </div>

      </div>

    </div>
  );
}

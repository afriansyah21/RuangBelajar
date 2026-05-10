import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPageUser: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-blue-100 selection:text-blue-700">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <nav className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">RuangBelajar</div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-full active:scale-95 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <Link to="/login" className="px-6 py-2 text-blue-700 hover:text-blue-800 rounded-xl font-bold transition-all active:scale-95">Masuk</Link>
            <Link to="/signup" className="bg-blue-700 px-6 py-2 text-white rounded-xl font-bold hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-700/20">Daftar</Link>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">#PilihanProgrammerMasaKini</span>
              <h1 className="text-6xl font-black text-slate-900 font-lexend leading-tight tracking-tight">Belajar Cerdas,<br/><span className="text-blue-700">Masa Depan</span> Cerah</h1>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Belajar pemrograman secara mudah dimanapun anda berada. Akses puluhan materi berkualitas gratis dengan mentor profesional.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/signup" className="bg-blue-700 text-white hover:bg-blue-800 px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-700/20 transition-all active:scale-95 flex items-center justify-center">Daftar Sekarang</Link>
                <button className="bg-slate-50 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95 border border-slate-200">Lihat Kursus</button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <img 
                  alt="Hero" 
                  className="w-full aspect-square object-cover rounded-[2rem]" 
                  src="hero2.jpg" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-12 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
              {[
                { label: 'Siswa Aktif', value: '250K+' },
                { label: 'Materi Kursus', value: '1.2K+' },
                { label: 'Mentor Ahli', value: '50+' },
                { label: 'Rating Kepuasan', value: '4.9/5' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-blue-800 font-lexend mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-lexend">Alasan Mengapa Harus Belajar di RuangBelajar</h2>
              <p className="text-slate-500">Kami memberikan pengalaman belajar yang dirancang khusus untuk membantu Anda meraih skill pemrograman secara efektif.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Kurikulum Terupdate', desc: 'Materi disusun berdasarkan standar industri terkini untuk menjamin relevansi.', icon: 'auto_awesome' },
                { title: 'Komunitas Belajar', desc: 'Bergabung dengan ribuan pelajar lainnya untuk bertukar ilmu dan kolaborasi.', icon: 'groups' },
                { title: 'Sertifikat Resmi', desc: 'Dapatkan sertifikat penyelesaian yang diakui secara luas oleh mitra perusahaan.', icon: 'verified_user' },
              ].map((feature, i) => (
                <div key={i} className="p-10 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-700/20 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <div className="text-2xl font-bold font-lexend">RuangBelajar</div>
              <p className="text-slate-400 leading-relaxed text-sm">
                Platform edukasi pemrograman terpercaya untuk meningkatkan skill masa depan Anda dengan metode belajar yang menyenangkan.
              </p>
            </div>
            <div className="space-y-6">
              <h6 className="text-xs font-black uppercase tracking-widest text-blue-400">Kontak</h6>
              <p className="text-slate-400 text-sm leading-relaxed">Jl. Perumnas 208, Condongcatur, Sleman, Yogyakarta</p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-lg">phone</span>
                (+62) 895-2823-6913
              </div>
            </div>
            {/* ... more footer columns ... */}
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-500 font-medium">© 2026 RuangBelajar. All rights reserved.</p>
            <div className="flex gap-8">
              {['Tentang Kami', 'Kontak', 'Privasi', 'Syarat'].map(link => (
                <a key={link} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors" href="#">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageUser;

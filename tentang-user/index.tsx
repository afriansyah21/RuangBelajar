import React from 'react';

const TentangUser: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto h-20 px-8 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-700 font-lexend tracking-tight">RuangBelajar</div>
          <div className="hidden lg:flex items-center gap-12 font-bold text-sm text-slate-500 uppercase tracking-widest">
            {['Beranda', 'Kelas', 'Kuis'].map(item => (
              <a key={item} className="hover:text-blue-700 transition-colors" href="#">{item}</a>
            ))}
            <a className="text-blue-700 border-b-2 border-blue-700 pb-1" href="#">Tentang</a>
            <a className="hover:text-blue-700 transition-colors" href="#">Profil</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-blue-700 font-black text-xs uppercase tracking-widest hover:bg-blue-50 px-6 py-3 rounded-xl transition-all">Masuk</button>
            <button className="bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-blue-700/20 hover:bg-blue-800 transition-all transform active:scale-95">Daftar</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <div className="relative rounded-[3rem] overflow-hidden bg-blue-900 min-h-[550px] flex items-center p-16 shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] -mr-40 -mt-40"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] -ml-40 -mb-40"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <span className="inline-block px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black tracking-[0.2em] uppercase border border-blue-500/30">Evolusi Pendidikan</span>
                <h1 className="text-white font-black font-lexend text-5xl lg:text-7xl leading-[1.1] tracking-tight">Mendefinisikan Ulang Belajar Digital.</h1>
                <p className="text-blue-100/70 text-lg font-medium leading-relaxed max-w-xl">RuangBelajar hadir sebagai jembatan antara potensi individu dan akses pendidikan berkualitas tanpa batas geografis.</p>
                <div className="flex gap-6">
                  <button className="px-10 py-5 bg-white text-blue-900 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95">Mulai Belajar</button>
                  <button className="px-10 py-5 border-2 border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">Kurikulum</button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute -inset-10 bg-blue-500/10 rounded-full blur-3xl"></div>
                <img 
                  className="rounded-[3rem] shadow-2xl w-full aspect-[4/3] object-cover border-8 border-white/10" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyBQaesQGDHS54VEuKcUCCNYRTkPf9DX2g3n_j2DekorP1UcYxZyXwabQ0x2V-Px692XZGGQcRIIfA2aNlhgpqlHu9Ybp2RycFddnwj3YOvYcuR-DDXGtMZWzY-CvpIf2T3hsHHU-7pv-1uL-xCEOc2VwGivbWOVYB7FisFHN7VoHIQpktDxGbzEmb_WnddjMuNhhINx52qTKcMILwhJ0f9VvL27RkpCHv4XYKsB-_d4Q5aaCGRtjgUvloyIal5JinrkfSSxTIVfHy" 
                  alt="Students" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-10">
              <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-blue-800/5 group hover:border-blue-700 transition-all duration-500">
                <h2 className="text-3xl font-black text-blue-700 font-lexend mb-6 flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl">flag</span>
                  Misi Kami
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Mendemokratisasi akses pendidikan melalui teknologi inovatif. Kami berkomitmen menyediakan platform adaptif yang memungkinkan setiap pembelajar berkembang sesuai ritme unik mereka.
                </p>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-blue-900/20 group transition-all duration-500">
                <h2 className="text-3xl font-black text-blue-400 font-lexend mb-6 flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl">visibility</span>
                  Visi Kami
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Menjadi ekosistem pendidikan digital paling terpercaya di Asia Tenggara yang melahirkan pemimpin masa depan kompeten dan adaptif terhadap perubahan global.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 h-full">
                <div className="col-span-2 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-800/10 h-[320px]">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnFQABNJRTcuNoRk9LizMKWCtapIcMaYSPliKxhR7c-iEL8XT1qe8B37CQr6tQyBF-clhhf7ALseMrmawla6e_1O9bLSBgXE_LEzo26rOkhkXPNEwLUC3QB0RqOq596QikY5qOegtP24oqdjXhbV7_DyeyTX3nxnf5EhI35tDlA_mScEeC-BWMwzXsJOwKnqZt5QCccQqCR1S8xPp3ukv9CxrSjEamUMPt3X50ef4qxbONdpJdFCtfU3IRZ2p7VCIYAUQEf5hn8NlG" alt="Workspace" />
                </div>
                <div className="bg-blue-50 p-10 rounded-[2.5rem] text-center space-y-4 border border-blue-100">
                  <p className="text-4xl font-black text-blue-700 font-lexend">150K+</p>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Siswa Aktif</p>
                </div>
                <div className="bg-blue-50 p-10 rounded-[2.5rem] text-center space-y-4 border border-blue-100">
                  <p className="text-4xl font-black text-blue-700 font-lexend">500+</p>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Kursus Ahli</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 font-lexend tracking-tight">Mengapa Memilih Kami?</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Filosofi kami didasarkan pada tiga pilar utama pemberdayaan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: 'verified_user', title: 'Kepercayaan', desc: 'Materi disusun oleh ahli industri dan akademisi terkemuka.' },
              { icon: 'psychology', title: 'Adaptif', desc: 'AI cerdas yang memahami pola belajar unik Anda.' },
              { icon: 'diversity_3', title: 'Komunitas', desc: 'Diskusi interaktif yang saling mendukung setiap hari.' }
            ].map(pillar => (
              <div key={pillar.title} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-700 transition-colors">
                  <span className="material-symbols-outlined text-blue-700 text-3xl group-hover:text-white transition-colors">{pillar.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-lexend mb-4">{pillar.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[4rem] p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] -mr-40 -mt-40"></div>
            </div>
            
            <div className="max-w-2xl relative z-10 text-center lg:text-left">
              <h2 className="text-white font-black font-lexend text-4xl lg:text-6xl leading-[1.1] mb-8">Siap Menjadi Bagian dari Perubahan?</h2>
              <p className="text-blue-100/70 text-xl font-medium mb-12">Mari bersama-sama membangun masa depan pendidikan yang lebih baik mulai hari ini.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="px-12 py-6 bg-white text-blue-900 font-black text-xs uppercase tracking-widest rounded-3xl shadow-2xl hover:scale-105 transition-all">Bergabung Sekarang</button>
                <button className="px-12 py-6 border-2 border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-white/10 transition-all">Hubungi Kami</button>
              </div>
            </div>
            
            <div className="relative w-full max-w-[400px] aspect-square lg:shrink-0">
              <div className="absolute inset-0 bg-blue-400 rounded-[3rem] rotate-6 opacity-20"></div>
              <img className="rounded-[3rem] w-full h-full object-cover relative z-10 border-8 border-white shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoLcRDqCdFEUja5-ht4am3AQsRogZ-FgmDwLJW3eULRHcnZqol50AF66avsRCk-lAFkLYmKgP3aYVHnPuQZPHkqG1ft7ZX58tLyREDScsc6m7xbAdDu4vu_j7SCGYHz6oLZPrT13VUlbOn1iwDVAQNOsVx9OEHUNM8Agnm8wIxAxUr7oqryJrVDdotXabarEaXr4emHZ10fOnZT5jXHAg2FVf63Lbr5u6moNn5dnhQw2E8v-3e-eXF37L17tcu87aGl0GZX2LFfPTr" alt="CTA" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <div className="text-2xl font-black text-blue-700 font-lexend">RuangBelajar</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2024 RuangBelajar Platform</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {['Kontak', 'Syarat', 'Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-[10px] font-black text-slate-400 hover:text-blue-700 uppercase tracking-widest transition-colors" href="#">{link}</a>
            ))}
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-pointer">
              <span className="material-symbols-outlined">share</span>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-pointer">
              <span className="material-symbols-outlined">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TentangUser;

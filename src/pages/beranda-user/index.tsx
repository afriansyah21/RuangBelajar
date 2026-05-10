import React from 'react';

const BerandaUser: React.FC = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">RuangBelajar</div>
          <div className="hidden md:flex items-center gap-8 font-lexend text-sm font-medium">
            <a className="text-blue-700 border-b-2 border-blue-700 pb-1" href="#">Beranda</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Kelas</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Kuis</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Tentang</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Profil</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">logout</button>
            <div className="h-8 w-8 rounded-full bg-blue-50 overflow-hidden ring-2 ring-slate-100">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYVeyiNP0Z9i6pW1gIgQgIs2o0PSAzIZ_0i1XD58YuRxo8pNSNyuGm32FC1x2i4A9KG6twIj1MSu08l1SoNo1Gttt8ZZf_goB0p267rlVm6IRGjRb7NOrNkeIDFPPlCvqGZjbU9KMKHKSNri-9KZG43EsDsvnKmLC06AcGVuqljdKAhcZOPx0YozXqXnXIX0D1wkFRcapW_Kwg-6sMEnb8EG_h-2z80NSuSEVDg7snInPgNyZyfBM_eevbIOW3kQXRL0bgn4EJE-y-" 
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-lexend">Halo, Selamat Datang Kembali!</h1>
          <p className="text-slate-500">Teruskan perjalanan belajarmu hari ini.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <section className="md:col-span-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-900">Progres Kelas</h2>
                <button className="text-blue-700 text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'UI/UX Design Masterclass', progress: 75, modules: '12/16' },
                  { title: 'Web Dev Essentials', progress: 40, modules: '4/10' },
                  { title: 'Digital Marketing', progress: 90, modules: '9/10' },
                ].map((course, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div 
                      className="relative w-24 h-24 flex items-center justify-center rounded-full mb-4 shadow-inner"
                      style={{ 
                        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#003f87 ${course.progress}%, #e5eeff 0)` 
                      }}
                    >
                      <span className="text-lg font-bold text-blue-800">{course.progress}%</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{course.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{course.modules}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Kritik & Saran</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Subjek</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all" 
                    placeholder="Masukkan subjek masukan Anda" 
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Pesan Anda</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all" 
                    placeholder="Apa yang bisa kami tingkatkan?" 
                    rows={4}
                  />
                </div>
                <button className="bg-blue-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-700/20" type="submit">
                  Kirim Feedback
                </button>
              </form>
            </div>
          </section>

          <aside className="md:col-span-4">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Status Kuis Terbaru</h2>
              <div className="space-y-4 flex-grow">
                {[
                  { title: 'Quiz 4: Visual Hierarchy', course: 'UI/UX Masterclass', score: 95, status: 'Lulus' },
                  { title: 'Quiz 1: HTML Semantic', course: 'Web Dev Essentials', score: 82, status: 'Lulus' },
                  { title: 'Quiz 8: Copywriting 101', course: 'Digital Marketing', score: 55, status: 'Gagal' },
                  { title: 'Quiz 2: User Research', course: 'UI/UX Masterclass', score: 100, status: 'Lulus' },
                ].map((quiz, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-700 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{quiz.title}</p>
                      <p className="text-xs text-slate-400 font-medium">{quiz.course}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${quiz.score >= 70 ? 'text-blue-700' : 'text-red-500'}`}>{quiz.score}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${quiz.score >= 70 ? 'text-green-600' : 'text-red-400'}`}>{quiz.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3 border-2 border-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all">
                Riwayat Lengkap
              </button>
              
              <div className="mt-8 p-6 rounded-2xl bg-blue-700 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-1">Butuh bantuan?</h3>
                  <p className="text-xs text-blue-100 mb-6 font-medium">Hubungi mentor pribadi anda kapan saja.</p>
                  <button className="bg-white text-blue-700 px-6 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all active:scale-95">
                    Chat Mentor
                  </button>
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12">
                  <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-slate-900 mb-2 font-lexend">RuangBelajar</div>
            <p className="text-xs text-slate-400 font-medium">© 2024 RuangBelajar Educational Platform</p>
          </div>
          <div className="flex gap-8">
            {['Kontak Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-xs text-slate-400 font-bold hover:text-blue-700 transition-colors uppercase tracking-widest" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BerandaUser;

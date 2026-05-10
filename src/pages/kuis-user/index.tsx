import React from 'react';

/**
 * KuisUser Component
 * 
 * This component represents the Quiz interface for the RuangBelajar platform.
 * It manages different states: selection, execution, and results.
 */
const KuisUser: React.FC = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">RuangBelajar</div>
          <nav className="hidden md:flex gap-8 items-center h-full">
            {['Beranda', 'Kelas', 'Kuis', 'Tentang', 'Profil'].map((nav) => (
              <a 
                key={nav} 
                className={`text-sm font-medium font-lexend transition-colors ${nav === 'Kuis' ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-blue-600'}`} 
                href="#"
              >
                {nav}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-slate-500 hover:bg-slate-50 p-2 rounded-full">logout</button>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">JD</div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Selection State: Quiz Categories */}
        <section className="mb-10">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-2">Mulai Latihan Kuis</h1>
            <p className="text-lg text-slate-600 max-w-2xl">Uji pemahamanmu dengan berbagai latihan soal dari mata pelajaran unggulan kami.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Matematika', icon: 'calculate', info: '20 Soal • Aljabar, Trigonometri' },
              { title: 'Fisika', icon: 'science', info: '15 Soal • Mekanika, Termodinamika' },
              { title: 'Kimia', icon: 'biotech', info: '25 Soal • Organik, Anorganik' }
            ].map((cat) => (
              <div key={cat.title} className="group bg-white border border-slate-200 p-6 rounded-xl hover:shadow-lg hover:border-blue-700 transition-all cursor-pointer flex flex-col gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700">
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
                <p className="text-sm text-slate-500">{cat.info}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs font-semibold bg-slate-100 px-3 py-1 rounded-full">Tersedia</span>
                  <span className="material-symbols-outlined text-blue-700 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Execution Area */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="p-6 border-b border-slate-100 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Kuis Matematika</span>
                <h2 className="text-2xl font-bold text-slate-900">Aljabar Linear</h2>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-blue-700">1 / 20</span>
                <p className="text-xs text-slate-500">Sisa waktu: 14:20</p>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-amber-500 h-full w-[5%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-slate-900 mb-8 leading-relaxed">
                Jika diketahui persamaan matriks 2A + B = C, di mana A = [1 2; 3 4] dan C = [5 8; 10 12], maka berapakah nilai dari matriks B?
              </p>
              <div className="grid grid-cols-1 gap-4">
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <button 
                    key={opt}
                    className={`flex items-center gap-4 p-4 border rounded-lg text-left transition-all group ${opt === 'B' ? 'border-2 border-blue-700 bg-blue-50' : 'border-slate-200 hover:border-blue-700 hover:bg-slate-50'}`}
                  >
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${opt === 'B' ? 'bg-blue-700 text-white' : 'border border-slate-300 group-hover:bg-blue-700 group-hover:text-white'}`}>
                      {opt}
                    </span>
                    <span className="text-base text-slate-900">[3 4; 4 4]</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button className="flex items-center gap-1 text-slate-500 hover:text-blue-700 transition-colors font-semibold">
              <span className="material-symbols-outlined">chevron_left</span>
              Sebelumnya
            </button>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-white transition-colors">Ragu-ragu</button>
              <button className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 active:scale-95 transition-all">Lanjutkan</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-slate-900 font-lexend">RuangBelajar</div>
          <div className="flex flex-wrap justify-center gap-6">
            {['Kontak Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-xs text-slate-500 hover:text-blue-600 transition-colors" href="#">{link}</a>
            ))}
          </div>
          <p className="text-xs text-slate-500 font-lexend">© 2024 RuangBelajar Educational Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default KuisUser;

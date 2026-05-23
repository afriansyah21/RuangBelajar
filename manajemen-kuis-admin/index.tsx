import React from 'react';

const ManajemenKuisAdmin: React.FC = () => {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 h-full w-64 border-r border-slate-200 bg-slate-50 flex flex-col p-4 gap-2 z-40">
        <div className="mb-10 px-2">
          <h1 className="text-lg font-black text-blue-800">Admin Portal</h1>
          <p className="text-xs text-slate-500 font-lexend uppercase tracking-wider">Management</p>
        </div>
        <nav className="flex-grow space-y-1">
          {[
            { name: 'Dashboard', icon: 'dashboard', active: false },
            { name: 'Pengguna', icon: 'group', active: false },
            { name: 'Kelas', icon: 'school', active: false },
            { name: 'Kuis', icon: 'quiz', active: true },
            { name: 'Donasi', icon: 'volunteer_activism', active: false },
          ].map((item) => (
            <a
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-transform duration-200 font-lexend text-sm font-semibold ${
                item.active ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-200 pt-4">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg active:opacity-80 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-lexend text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 h-16 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-blue-800">Manajemen Kuis</h2>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-500">Semua Kuis</span>
          </div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-blue-800 transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">add</span>
            Tambah Kuis Baru
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left: Quiz List Section */}
            <section className="col-span-12 lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">Daftar Kuis Aktif</h3>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">4 Kuis</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Dasar Pemrograman Python', info: '15 Pertanyaan • Terakhir diubah 2 jam lalu', active: false },
                  { name: 'Matematika Aljabar Linear', info: '10 Pertanyaan • Sedang diedit', active: true },
                  { name: 'Struktur Data Lanjut', info: '20 Pertanyaan • Draft', active: false },
                ].map((quiz, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl flex items-center gap-4 group transition-all ${
                      quiz.active
                        ? 'bg-blue-50/50 border-2 border-blue-700 shadow-lg'
                        : 'bg-white border border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="text-slate-300">
                      <span className="material-symbols-outlined">drag_indicator</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className={`font-semibold ${quiz.active ? 'text-blue-800' : 'text-slate-900'}`}>{quiz.name}</h4>
                      <p className={`text-xs ${quiz.active ? 'text-blue-600/70' : 'text-slate-500'}`}>{quiz.info}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Right: Edit View */}
            <section className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">Edit Pertanyaan: Aljabar Linear</h3>
                  <p className="text-sm text-slate-500">Modul 4 • Tingkat Lanjut</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors">Batal</button>
                  <button className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-all">Simpan</button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold">Pertanyaan 1</span>
                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Teks Pertanyaan</label>
                    <textarea className="w-full rounded-lg border-slate-200 focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 text-sm" rows={2} defaultValue="Manakah yang merupakan definisi dari Matriks Identitas?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilihan Jawaban</label>
                    <div className="flex items-center gap-3">
                      <input type="radio" defaultChecked className="text-blue-700" />
                      <input className="flex-grow rounded-lg border-slate-200 text-sm py-1.5" type="text" defaultValue="Matriks persegi dengan elemen diagonal utama adalah 1." />
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 transition-all">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-semibold text-sm">Tambah Pertanyaan Baru</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenKuisAdmin;

import React from 'react';

const ManajemenKelasAdmin: React.FC = () => {
  const lessons = [
    { id: '01', title: 'Pengenalan Dasar UI/UX', desc: 'Pelajari konsep dasar pengalaman pengguna dan antarmuka visual dalam konteks industri modern.', duration: '15:42', views: '1.2k', active: true },
    { id: '02', title: 'Riset Pengguna & Persona', desc: 'Mendalami metode wawancara dan pembuatan persona target pengguna.', duration: '22:10', views: '856', active: false },
    { id: '03', title: 'Wireframing & Lo-Fi Design', desc: 'Langkah awal mengubah ide menjadi struktur visual yang fungsional.', duration: '18:55', views: '742', active: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 h-full w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-40">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-blue-700 font-lexend">Admin Portal</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Curriculum Management</p>
        </div>
        <nav className="flex-1 space-y-1">
          {['Dashboard', 'Pengguna'].map((item) => (
            <a key={item} className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm" href="#">
              <span className="material-symbols-outlined text-xl">{item.toLowerCase()}</span>
              {item}
            </a>
          ))}
          <a className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-700/20 font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl">school</span>
            Kelas
          </a>
          {['Kuis', 'Donasi'].map((item) => (
            <a key={item} className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm" href="#">
              <span className="material-symbols-outlined text-xl">{item === 'Donasi' ? 'volunteer_activism' : 'quiz'}</span>
              {item}
            </a>
          ))}
        </nav>
        <button className="mt-auto flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm">
          <span className="material-symbols-outlined text-xl">logout</span>
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 font-lexend">Manajemen Kelas</h2>
            <p className="text-slate-500 font-medium mt-2">Kelola kurikulum video, urutan pelajaran, dan detail konten.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-3">
              <span className="material-symbols-outlined">reorder</span>
              Atur Ulang
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center gap-3">
              <span className="material-symbols-outlined">add</span>
              Tambah Pelajaran
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          <section className="col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Daftar Pelajaran <span className="text-blue-700 ml-2">12</span></h3>
            </div>

            {lessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className={`group p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
                  lesson.active ? 'bg-white border-blue-700 shadow-2xl shadow-blue-800/10' : 'bg-slate-50 border-transparent hover:border-slate-200'
                }`}
              >
                <div className="flex gap-6">
                  <div className="w-40 h-24 rounded-2xl bg-slate-200 overflow-hidden flex-shrink-0 relative shadow-sm">
                    <img 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuATLUS9ZsLTzLYfXbZdYGKavScc8BlMRp9qCnP89IjwiqpDd_aJQNIzAQpHZmjmqlZ1A-RnztBolomZB0FnsL3LzWHG9WTYrcwoPopEsfG8QaAjAFj3rpXPL-mphWLa_SLv_yJ6tVAliVH-xIrYu0ctxJvNQ_DRvWwf8gDmlu0euYoIJxF2C3IWg1wkYRZ1QhKX6fEIzmtlFkp1Iw3mdgP99pgI82DafxEjBpq0ggqEKcJGYUVWg-GTiPbCOzWfkH0_JQANvDQeIyss" 
                    />
                    {lesson.active && (
                      <div className="absolute inset-0 bg-blue-700/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-lg font-bold ${lesson.active ? 'text-blue-700' : 'text-slate-900'}`}>{lesson.id}. {lesson.title}</h4>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-700"><span className="material-symbols-outlined text-xl">edit</span></button>
                        <button className="p-2 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-xl">delete</span></button>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-400 mt-2 line-clamp-2 leading-relaxed">{lesson.desc}</p>
                    <div className="flex gap-6 mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {lesson.duration}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        {lesson.views} Views
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="col-span-5">
            <div className="sticky top-12 bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-800/5 border border-slate-100">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-lexend">Edit Pelajaran</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">VID-001-INTRO</p>
                </div>
                <span className="material-symbols-outlined text-blue-700 text-4xl">edit_note</span>
              </div>
              
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Link Video</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">link</span>
                    <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" type="text" value="https://youtube.com/watch?v=dQw4w9WgXcQ" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Pelajaran</label>
                  <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" type="text" value="01. Pengenalan Dasar UI/UX" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ringkasan</label>
                  <textarea className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" rows={4}>Pelajari konsep dasar pengalaman pengguna dan antarmuka visual dalam konteks industri modern.</textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all">Batalkan</button>
                  <button className="flex-1 py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all">Simpan</button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ManajemenKelasAdmin;

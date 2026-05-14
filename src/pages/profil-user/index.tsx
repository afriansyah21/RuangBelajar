import React from 'react';

const ProfilUser: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto h-20 px-8 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-700 font-lexend tracking-tight">RuangBelajar</div>
          <div className="hidden lg:flex items-center gap-12 font-bold text-sm text-slate-500 uppercase tracking-widest">
            {['Beranda', 'Kelas', 'Kuis', 'Tentang'].map(item => (
              <a key={item} className="hover:text-blue-700 transition-colors" href="#">{item}</a>
            ))}
            <a className="text-blue-700 border-b-2 border-blue-700 pb-1" href="#">Profil</a>
          </div>
          <button className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-all">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-10">
          {/* Profile Card */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-blue-800/5 border border-slate-100 text-center">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-inner">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXALYy9ZLcuHaXsT23uA7XpTFDZQewGaUQdqK_w4x4uDDyxjPg_s__YTWWzW4igQyTAOzb0eidtzIvGjsCZl73079RChEThbaIGQ-NLUvZGVHIBTgtxyO9voc1a_jDrK6Ae3rOMvNr9KWzu6rcwglCxZwQhzYVHgJ4mXczkmeSyW7epFAlJDWKSOmrPnIKNN3pADuaO_YGWYQlyZttTg_wJqjRZf4eFHQ1xWFxNcytQfLfbe1sC79KJO9XzazBrBUk9eCO-LU6pacI" 
                    alt="Aditya" 
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-blue-700 w-12 h-12 rounded-2xl text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
              </div>
              <h1 className="text-3xl font-black text-slate-900 font-lexend mb-2">Aditya Pratama</h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Siswa Menengah Atas</p>
              
              <div className="mt-12 space-y-4">
                <button className="w-full py-5 bg-blue-700 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-700/20 hover:bg-blue-800 transition-all">Edit Profil</button>
                <button className="w-full py-5 bg-slate-50 text-slate-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">Keamanan</button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-800/5 border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-700">stars</span>
                Pencapaian
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Juara Kuis', 'Belajar 7 Hari', 'Pelajar Teladan'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <section className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-blue-800/5 border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 font-lexend mb-12 flex items-center gap-4">
                <span className="material-symbols-outlined text-blue-700 text-3xl">person</span>
                Detail Informasi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { label: 'Nama Lengkap', value: 'Aditya Pratama' },
                  { label: 'Nomor HP', value: '+62 812 3456 7890' },
                  { label: 'Tanggal Lahir', value: '15 Mei 2005' },
                  { label: 'E-mail', value: 'aditya.pratama@gmail.com' }
                ].map(info => (
                  <div key={info.label} className="space-y-2 border-b border-slate-50 pb-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</label>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Class Progress', val: '12/15', pct: '85%', icon: 'school', color: 'blue' },
                { label: 'Quiz Progress', val: '21/30', pct: '70%', icon: 'quiz', color: 'amber' },
                { label: 'Avg Score', val: '92.4', pct: '92%', icon: 'trending_up', color: 'emerald' }
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-800/5 border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`material-symbols-outlined text-${stat.color}-600 p-3 bg-${stat.color}-50 rounded-2xl`}>{stat.icon}</span>
                    <span className={`text-xs font-black text-${stat.color}-600`}>{stat.pct}</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 font-lexend">{stat.val}</p>
                </div>
              ))}
            </section>

            <section className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-blue-800/5 border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 font-lexend mb-8">Kelas Aktif</h2>
              <div className="space-y-6">
                {[
                  { title: 'Matematika Dasar: Aljabar & Logika', time: '2 jam yang lalu', icon: 'functions', color: 'blue' },
                  { title: 'Bahasa Inggris: Persiapan TOEFL', time: 'Kemarin', icon: 'language', color: 'amber' }
                ].map(item => (
                  <div key={item.title} className="group flex items-center gap-6 p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all cursor-pointer">
                    <div className={`w-14 h-14 bg-${item.color}-600 rounded-2xl flex items-center justify-center text-white`}>
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lanjut: {item.time}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-700 transition-colors">arrow_forward</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilUser;

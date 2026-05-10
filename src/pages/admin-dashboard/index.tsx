import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 h-full w-64 border-r bg-slate-50 border-slate-200 z-40 hidden md:flex flex-col p-4 gap-2">
        <div className="px-4 py-6 mb-4">
          <h1 className="text-xl font-bold text-blue-800 font-lexend">Admin Portal</h1>
          <p className="text-slate-500 text-xs uppercase tracking-wider">Management</p>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { name: 'Dashboard', icon: 'dashboard', active: true },
            { name: 'Pengguna', icon: 'group', active: false },
            { name: 'Kelas', icon: 'school', active: false },
            { name: 'Kuis', icon: 'quiz', active: false },
            { name: 'Donasi', icon: 'volunteer_activism', active: false },
          ].map((item) => (
            <a
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-semibold text-sm ${
                item.active ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 font-semibold text-sm rounded-lg transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-grow md:ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-blue-800 font-lexend">Beranda Dashboard</h2>
            <p className="text-slate-500 text-sm">Selamat datang kembali di panel administrasi Ruangbelajar.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all w-64" 
                placeholder="Cari data..." 
                type="text"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-blue-700 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                alt="Admin Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjbz8RS_nhq7JPVzp656AkSeOZO73W2K4vMxrPzihOma0lLX-T20Ejo_DFNYpYMoljjfR4YK_zXKUxx75Kv8UziseNNh4BN1_f2pgZZN_-ZKPJk2oLslRCjPoxn3vTZmvHQpX2MImdO3_gHe-33zh-fK2vjnOhjCBw2zM9p8VdrpyCnmPtxAgfG1QPvjSd56iMkt0MwgLa9bUr288aWymuDhSs4HiNCzkAWVvMR30IgVDu5qojP511vG4-GS2myVclEjM3f_duY9uh"
              />
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Pengguna', value: '12,845', change: '+12%', icon: 'group', subtext: '2,400 pengguna baru' },
            { label: 'Pemasukan Donasi', value: 'Rp 84.2M', change: '+8.4%', icon: 'volunteer_activism', subtext: 'Meningkat dari Rp 77.6M' },
            { label: 'Total Kelas Aktif', value: '342', change: null, icon: 'school', subtext: '12 kelas baru' },
            { label: 'Skor Rata-rata Kuis', value: '84.5', change: null, icon: 'quiz', subtext: 'Performa stabil', progress: 84.5 },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                {stat.change && (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-slate-500 text-sm font-semibold">{stat.label}</h3>
              <p className="text-2xl font-bold text-blue-800 mt-1">{stat.value}</p>
              {stat.progress ? (
                <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-blue-700 h-full rounded-full" style={{ width: `${stat.progress}%` }}></div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-2">{stat.subtext}</p>
              )}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-slate-900">Analisis Pertumbuhan Pengguna</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-full">Bulanan</button>
                  <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-full transition-colors">Tahunan</button>
                </div>
              </div>
              <div className="relative w-full aspect-[21/9] bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #003f87 1px, transparent 1px), linear-gradient(to bottom, #003f87 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
                <div className="relative w-[90%] h-[60%] border-b border-l border-slate-200">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path d="M0 40 L10 35 L20 38 L30 25 L40 28 L50 15 L60 18 L70 5 L80 10 L90 2 L100 8" fill="none" stroke="#003f87" strokeWidth="2"></path>
                    <path d="M0 40 L10 35 L20 38 L30 25 L40 28 L50 15 L60 18 L70 5 L80 10 L90 2 L100 8 V40 H0 Z" fill="rgba(0, 63, 135, 0.1)"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Transaksi Donasi Terakhir</h3>
              <div className="space-y-2">
                {[
                  { name: 'John Doe', method: 'Bank Transfer', amount: 'Rp 500.000', time: '10 menit yang lalu', initial: 'JD' },
                  { name: 'Siti Aminah', method: 'GoPay', amount: 'Rp 150.000', time: '25 menit yang lalu', initial: 'SA' },
                  { name: 'Budi Kusuma', method: 'OVO', amount: 'Rp 1.200.000', time: '1 jam yang lalu', initial: 'BK' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold">{tx.initial}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{tx.name}</p>
                        <p className="text-xs text-slate-500">Donasi via {tx.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700">{tx.amount}</p>
                      <p className="text-xs text-slate-400">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 text-blue-700 text-sm font-bold hover:bg-blue-50 rounded-lg transition-colors border border-blue-50">Lihat Semua Transaksi</button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-blue-700 text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Kesehatan Sistem</h3>
                <p className="text-2xl font-bold mb-6 font-lexend">Lancar (99.9%)</p>
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-sm text-blue-100 font-medium">Semua layanan beroperasi normal</span>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10">
                <span className="material-symbols-outlined text-[120px]">settings</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Sesi Pengguna Aktif</h3>
              <div className="space-y-6">
                {[
                  { label: 'Desktop', value: 65 },
                  { label: 'Mobile App', value: 25 },
                  { label: 'Tablet', value: 10 },
                ].map((session, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold text-slate-700">
                      <span>{session.label}</span>
                      <span>{session.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full">
                      <div className="bg-blue-700 h-full rounded-full transition-all duration-500" style={{ width: `${session.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-blue-800 text-sm font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">campaign</span>
                Pengumuman Terkini
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
                  <p className="font-bold text-slate-900 text-sm mb-1">Update Kurikulum 2024</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Pembaruan materi untuk kelas Matematika Tingkat Lanjut telah disetujui oleh tim akademik.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
                  <p className="font-bold text-slate-900 text-sm mb-1">Maintenance Server</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Dijadwalkan pada hari Sabtu pukul 02:00 WIB selama 30 menit untuk optimasi database.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-100 z-30">
        <div className="max-w-7xl mx-auto py-4 px-8 flex justify-between items-center">
          <p className="text-slate-400 text-xs font-lexend">© 2024 Ruangbelajar Educational Platform</p>
          <div className="flex gap-6">
            {['Bantuan', 'Kebijakan Privasi', 'Kontak Kami'].map(link => (
              <a key={link} className="text-xs text-slate-400 hover:text-blue-700 transition-colors font-medium" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;

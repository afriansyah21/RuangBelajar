import React from 'react';

const ManajemenDonasiAdmin: React.FC = () => {
  const donations = [
    { name: 'Budi Santoso', date: '24 Okt, 2024', amount: 'Rp 500.000', status: 'Berhasil', color: 'bg-green-100 text-green-700' },
    { name: 'Siti Aminah', date: '22 Okt, 2024', amount: 'Rp 1.200.000', status: 'Berhasil', color: 'bg-green-100 text-green-700' },
    { name: 'Anonim', date: '21 Okt, 2024', amount: 'Rp 50.000', status: 'Pending', color: 'bg-amber-100 text-amber-700' },
    { name: 'Dewi Lestari', date: '19 Okt, 2024', amount: 'Rp 2.000.000', status: 'Berhasil', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 h-full w-72 bg-slate-900 text-white flex flex-col p-8 z-40">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-blue-400 font-lexend">Admin Portal</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Management System</p>
        </div>
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Pengguna', 'Kelas', 'Kuis'].map((item) => (
            <a key={item} className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-white/5 hover:text-white rounded-2xl transition-all font-bold text-sm" href="#">
              <span className="material-symbols-outlined text-xl">{item.toLowerCase()}</span>
              {item}
            </a>
          ))}
          <a className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-700/20 font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl">volunteer_activism</span>
            Donasi
          </a>
        </nav>
        <button className="mt-auto flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-red-400 transition-colors font-bold text-sm">
          <span className="material-symbols-outlined text-xl">logout</span>
          Keluar
        </button>
      </aside>

      {/* Content */}
      <main className="ml-72 flex-1 p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 font-lexend">Manajemen Donasi</h2>
            <p className="text-slate-500 font-medium mt-2">Pantau dan kelola aliran dana dukungan pendidikan.</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-800/5 border border-slate-100 flex items-center gap-6">
            <div className="w-14 h-14 bg-blue-100 flex items-center justify-center rounded-2xl">
              <span className="material-symbols-outlined text-blue-700 text-3xl">payments</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Terkumpul</p>
              <p className="text-2xl font-black text-slate-900 font-lexend">Rp 24.500.000</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-800/5 border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">Metode Utama</h3>
                <button className="text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="text-center space-y-6">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                  <img 
                    alt="QRIS" 
                    className="w-full aspect-square object-contain rounded-2xl" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRIFdVQnLs-PaEntgeZ-PeI9xv9envyT1Q_RexdedbUbXwqmU9RxvgkOl6OlnZTGE-tuQ5ZnElkSkcPXftlDLUeAZ4kPMCYMqWB-Z2iW1v7XZ2UwlDe1vcVol-6oyYwqYFnTRE-UMteFopN46nW_4Li0bVVVpUeO3snVTTeWlrBIDfqf15SkWE8xRxvhtLZNCtrq2Yz3fAZ391FrnQscpGKLN-0QeTlcF-729k09cQJxTNSHbITz7VvBLLGjaq6m7vzxUkawPz3KRg" 
                  />
                </div>
                <div className="text-left space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank Penerima</p>
                    <p className="text-sm font-bold text-slate-900">Bank Central Asia (BCA)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nomor Rekening</p>
                    <p className="text-lg font-black text-blue-700 tracking-wider">882-031-4452</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-800/5 border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900">Riwayat Terbaru</h3>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Minggu Ini</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Donatur</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jumlah</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {donations.map((d, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-700">{d.name[0]}</div>
                            <span className="text-sm font-bold text-slate-900">{d.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-slate-500">{d.date}</td>
                        <td className="px-8 py-6 text-sm font-black text-slate-900">{d.amount}</td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${d.color}`}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-72 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-12 py-4 flex justify-between items-center z-30">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2024 RuangBelajar Admin</p>
        <div className="flex gap-8">
          {['Bantuan', 'Privasi'].map(link => (
            <a key={link} className="text-[10px] font-black text-slate-400 hover:text-blue-700 uppercase tracking-widest" href="#">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ManajemenDonasiAdmin;

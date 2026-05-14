import React from 'react';

const ManajemenPenggunaAdmin: React.FC = () => {
  const users = [
    { name: 'Andi Saputra', email: 'andi.saputra@gmail.com', joinDate: '12 Jan 2024', role: 'Siswa', initials: 'AS' },
    { name: 'Budi Nugraha', email: 'budi.nug@provider.com', joinDate: '15 Jan 2024', role: 'Siswa', initials: 'BN' },
    { name: 'Citra Lestari', email: 'citra.l@school.id', joinDate: '20 Jan 2024', role: 'Siswa', initials: 'CL' },
  ];

  const feedback = [
    { name: 'Siska Maharani', role: 'Siswa Kelas 12', time: '2 jam yang lalu', title: 'Navigasi Materi Kuis', content: 'Halo admin, saya rasa navigasi untuk kuis matematika agak sedikit membingungkan...', border: 'border-blue-700' },
    { name: 'Rizky Kurniawan', role: 'Siswa Kelas 10', time: '5 jam yang lalu', title: 'Permintaan Materi Baru', content: 'Mohon ditambahkan materi untuk persiapan OSN Fisika, materi yang sekarang sudah sangat bagus...', border: 'border-amber-500' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-50">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-blue-700 font-lexend">RuangBelajar</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Portal Mentor</p>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl">dashboard</span> Dashboard
          </a>
          <a className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-700/20 font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span> Pengguna
          </a>
          <a className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl">school</span> Kelas
          </a>
          <a className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-xl">quiz</span> Kuis
          </a>
        </nav>
        <div className="mt-auto p-6 bg-slate-50 rounded-3xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJjFr6RhvkG1sZHfcs-tcwkFLJ52tidyQbQdYv0w4qW7lifBWKNr0wq4sl1QJKwTnushM4TbtSE4VzZ4ernrHPhA1vPAwaslWGyJckSCPx-8KUxa4WOrEu4RBf9AAnS0HPFluwdaM6fyKAclQfjWzok4Lsu5wKU5hOFzmhGjU9xp7CgePT6OFOILYjmJtuGKkoz7HvN02UT149gCgFA_CbfWTNj6Tp5k9LR5R0B9cNUwy9S3VPIz7sczh9wokrL31R3EdVL_9W4HNo" alt="Admin" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Admin Utama</p>
            <p className="text-[10px] font-medium text-slate-400">Super User</p>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-72 flex-1 p-12 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 font-lexend">Manajemen Pengguna</h2>
            <p className="text-slate-500 font-medium mt-2">Kelola data siswa dan tinjau kritik serta saran komunitas.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-800/5 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl">
                <span className="material-symbols-outlined text-blue-700">trending_up</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Siswa</p>
                <p className="text-xl font-black text-slate-900">12,482</p>
              </div>
            </div>
          </div>
        </header>

        {/* User Table */}
        <section className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-800/5 border border-slate-100 overflow-hidden mb-12">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h4 className="text-xl font-bold text-slate-900">Daftar Pengguna</h4>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">Filter</button>
              <button className="px-6 py-3 bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all">Tambah Pengguna</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Join Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-700 text-xs">{u.initials}</div>
                        <span className="text-sm font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-500">{u.email}</td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-500">{u.joinDate}</td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">{u.role}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-700"><span className="material-symbols-outlined text-xl">visibility</span></button>
                        <button className="p-2 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-xl">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Feedback Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-2xl font-bold text-slate-900 font-lexend">Inbox Feedback</h4>
            <button className="text-sm font-bold text-blue-700 hover:underline">Lihat Semua Pesan</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedback.map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-blue-800/5 border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                      <div className="w-full h-full bg-blue-700 flex items-center justify-center text-white font-bold">{f.name[0]}</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{f.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{f.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.time}</span>
                </div>
                <div className={`bg-slate-50 p-6 rounded-2xl border-l-4 ${f.border} group-hover:bg-slate-100 transition-colors`}>
                  <p className="text-sm font-black text-slate-900 mb-2">{f.title}</p>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2">{f.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManajemenPenggunaAdmin;

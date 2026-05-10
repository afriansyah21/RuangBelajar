import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ManajemenKelasAdmin: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id: '', nama_kelas: '', deskripsi: '', harga: '', gambar: '' });
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/kelas.php');
      const data = await response.json();
      setClasses(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    try {
      const response = await fetch('/api/kelas.php', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchClasses();
        setFormData({ id: '', nama_kelas: '', deskripsi: '', harga: '', gambar: '' });
      }
    } catch (err) {
      console.error('Error saving class:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        const response = await fetch(`/api/kelas.php?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchClasses();
        }
      } catch (err) {
        console.error('Error deleting class:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-slate-50 min-h-screen flex font-inter">
      {/* Sidebar */}
      <aside className="fixed left-0 h-full w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-40">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-blue-700 font-lexend text-center">RuangBelajar</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 text-center">Admin Dashboard</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/admin" className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm">
            <span className="material-symbols-outlined text-xl">dashboard</span>
            Dashboard
          </Link>
          <Link to="/admin/pengguna" className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm">
            <span className="material-symbols-outlined text-xl">person</span>
            Pengguna
          </Link>
          <Link to="/admin/kelas" className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-700/20 font-bold text-sm">
            <span className="material-symbols-outlined text-xl">school</span>
            Kelas
          </Link>
          <Link to="/admin/kuis" className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm">
            <span className="material-symbols-outlined text-xl">quiz</span>
            Kuis
          </Link>
          <Link to="/admin/donasi" className="flex items-center gap-4 px-6 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold text-sm">
            <span className="material-symbols-outlined text-xl">volunteer_activism</span>
            Donasi
          </Link>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm">
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
            <button 
              onClick={() => setFormData({ id: '', nama_kelas: '', deskripsi: '', harga: '', gambar: '' })}
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center gap-3"
            >
              <span className="material-symbols-outlined">add</span>
              Tambah Kelas
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          <section className="col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Daftar Kelas <span className="text-blue-700 ml-2">{classes.length}</span></h3>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              classes.map((cls) => (
                <div 
                  key={cls.id} 
                  className="group p-6 rounded-[2.5rem] bg-white border-2 border-transparent hover:border-blue-700 transition-all duration-300 shadow-xl shadow-blue-800/5"
                >
                  <div className="flex gap-6">
                    <div className="w-40 h-24 rounded-2xl bg-slate-200 overflow-hidden flex-shrink-0 relative shadow-sm">
                      <img 
                        className="w-full h-full object-cover" 
                        src={cls.gambar || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"} 
                        alt={cls.nama_kelas}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold text-slate-900">{cls.nama_kelas}</h4>
                        <div className="flex gap-2">
                          <button onClick={() => setFormData(cls)} className="p-2 text-slate-400 hover:text-blue-700"><span className="material-symbols-outlined text-xl">edit</span></button>
                          <button onClick={() => handleDelete(cls.id)} className="p-2 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-xl">delete</span></button>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-slate-400 mt-2 line-clamp-2 leading-relaxed">{cls.deskripsi}</p>
                      <div className="flex gap-6 mt-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">payments</span>
                          Rp {cls.harga}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>

          <aside className="col-span-5">
            <div className="sticky top-12 bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-800/5 border border-slate-100">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-lexend">{formData.id ? 'Edit Kelas' : 'Tambah Kelas'}</h3>
                </div>
                <span className="material-symbols-outlined text-blue-700 text-4xl">{formData.id ? 'edit_note' : 'add_circle'}</span>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Kelas</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                    type="text" 
                    value={formData.nama_kelas}
                    onChange={(e) => setFormData({ ...formData, nama_kelas: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Harga</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                    type="number" 
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Gambar</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                    type="text" 
                    value={formData.gambar}
                    onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi</label>
                  <textarea 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                    rows={4}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({ id: '', nama_kelas: '', deskripsi: '', harga: '', gambar: '' })}
                    className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all"
                  >
                    Simpan
                  </button>
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


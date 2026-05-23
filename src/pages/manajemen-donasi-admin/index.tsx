import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Edit, Trash2, Loader2, Heart } from 'lucide-react';

interface Donation {
  id: number;
  title: string;
  body: string;
}

export default function ManajemenDonasiAdmin() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Donation[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setDonations(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2"><Heart className="text-red-500"/> Manajemen Donasi</h1>
          <p className="text-[var(--color-secondary)] text-sm">Kelola kampanye donasi pengguna.</p>
        </div>
        <button className="primary-btn !mt-0 !w-auto px-6">Tambah Kampanye</button>
      </header>

      <section className="glass-card p-6 mb-8">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
            <input type="text" placeholder="Cari kampanye..." className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:outline-none" />
          </div>
        </form>
      </section>

      {loading ? (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={48} />
          <p className="text-[var(--color-secondary)]">Memuat data kampanye...</p>
        </div>
      ) : (
        <section className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(255,255,255,0.6)] text-[var(--color-secondary)] text-sm border-b border-[var(--color-border)]">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Judul Kampanye</th>
                  <th className="p-4 font-semibold">Deskripsi</th>
                  <th className="p-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.4)] transition-colors">
                    <td className="p-4 text-sm font-medium">{item.id}</td>
                    <td className="p-4 font-semibold capitalize">{item.title.substring(0, 30)}...</td>
                    <td className="p-4 text-sm text-[var(--color-secondary)]">{item.body.substring(0, 50)}...</td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

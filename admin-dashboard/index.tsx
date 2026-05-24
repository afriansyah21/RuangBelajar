import { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Users, BookOpen, Loader2 } from 'lucide-react';

interface Metric {
  id: number;
  title: string;
  body: string;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Metric[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setMetrics(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Admin Dashboard</h1>
        <p className="text-[var(--color-secondary)] text-lg">Ringkasan aktivitas dan performa platform hari ini.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 border-l-4 border-blue-500 flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-xl text-blue-600"><Users size={32} /></div>
          <div><p className="text-[var(--color-secondary)] text-sm">Total Pengguna</p><p className="text-2xl font-bold">12,450</p></div>
        </div>
        <div className="glass-card p-6 border-l-4 border-green-500 flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-xl text-green-600"><BookOpen size={32} /></div>
          <div><p className="text-[var(--color-secondary)] text-sm">Total Kelas</p><p className="text-2xl font-bold">450</p></div>
        </div>
        <div className="glass-card p-6 border-l-4 border-amber-500 flex items-center gap-4">
          <div className="p-4 bg-amber-100 rounded-xl text-amber-600"><LayoutDashboard size={32} /></div>
          <div><p className="text-[var(--color-secondary)] text-sm">Kuis Selesai</p><p className="text-2xl font-bold">8,920</p></div>
        </div>
      </section>

      <section className="glass-card p-8">
        <h2 className="text-xl font-bold mb-6">Aktivitas Terkini (Logs)</h2>
        {loading ? (
          <div className="flex flex-col items-center py-10">
            <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={40} />
            <p className="text-[var(--color-secondary)] text-sm">Memuat data aktivitas...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {metrics.map(log => (
              <div key={log.id} className="p-4 rounded-xl bg-[rgba(255,255,255,0.4)] border border-[var(--color-border)] flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[var(--color-blue)] mt-2"></div>
                <div>
                  <h4 className="font-bold text-sm capitalize">{log.title}</h4>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-1">{log.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

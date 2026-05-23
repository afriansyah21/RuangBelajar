import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Loader2, Search } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  body: string;
}

export default function DonasiUser() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        // Simulate fetching donation campaigns
        const response = await axios.get<Campaign[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setCampaigns(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const filtered = campaigns.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Donasi & Bantuan</h1>
        <p className="text-[var(--color-secondary)] text-lg">Bantu sesama pelajar untuk mendapatkan akses pendidikan yang layak.</p>
      </header>

      <section className="glass-card p-8 mb-8">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
            <input type="text" placeholder="Cari kampanye donasi..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors" />
          </div>
          <button type="button" className="primary-btn !mt-0 !w-auto px-8">Cari</button>
        </form>
      </section>

      {loading ? (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={48} />
          <p className="text-[var(--color-secondary)]">Memuat kampanye donasi...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(camp => (
            <article key={camp.id} className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mb-6">
                <Heart size={28} className="fill-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 line-clamp-2 capitalize">{camp.title}</h3>
              <p className="text-[var(--color-secondary)] text-sm mb-6 line-clamp-3 flex-1">{camp.body}</p>
              <div className="w-full h-2 bg-[rgba(148,163,184,0.2)] rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-red-500 w-[60%]"></div>
              </div>
              <button className="primary-btn !mt-0 bg-red-500 hover:bg-red-600">Berdonasi</button>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

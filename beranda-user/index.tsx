import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Interface untuk tipe data dari Public API (JSONPlaceholder)
interface CourseModule {
  id: number;
  title: string;
  body: string;
}

const BerandaUser: React.FC = () => {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  const [feedbackSubject, setFeedbackSubject] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=12');
        setModules(response.data);
      } catch (error) {
        console.error("Gagal mengambil data dari API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const filteredModules = modules.filter((mod) => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'premium') return matchesSearch && mod.id % 2 === 0;
    if (filterType === 'gratis') return matchesSearch && mod.id % 2 !== 0;
    return matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackSubject.trim() || !feedbackMessage.trim()) {
      alert("Harap isi subjek dan pesan terlebih dahulu!");
      return;
    }

    try {
      setFeedbackStatus('submitting');
      
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: feedbackSubject,
        body: feedbackMessage,
        userId: 1,
      });

      setFeedbackStatus('success');
      setFeedbackSubject(''); // Reset form subjek
      setFeedbackMessage(''); // Reset form pesan
      
      setTimeout(() => setFeedbackStatus('idle'), 3000);
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      setFeedbackStatus('error');
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">RuangBelajar</div>
          <div className="hidden md:flex items-center gap-8 font-lexend text-sm font-medium">
            <a className="text-blue-700 border-b-2 border-blue-700 pb-1" href="#">Beranda</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Kelas</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Kuis</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Tentang</a>
            <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Profil</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">logout</button>
            <div className="h-8 w-8 rounded-full bg-blue-50 overflow-hidden ring-2 ring-slate-100">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYVeyiNP0Z9i6pW1gIgQgIs2o0PSAzIZ_0i1XD58YuRxo8pNSNyuGm32FC1x2i4A9KG6twIj1MSu08l1SoNo1Gttt8ZZf_goB0p267rlVm6IRGjRb7NOrNkeIDFPPlCvqGZjbU9KMKHKSNri-9KZG43EsDsvnKmLC06AcGVuqljdKAhcZOPx0YozXqXnXIX0D1wkFRcapW_Kwg-6sMEnb8EG_h-2z80NSuSEVDg7snInPgNyZyfBM_eevbIOW3kQXRL0bgn4EJE-y-" 
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-lexend">Halo, Selamat Datang Kembali!</h1>
          <p className="text-slate-500">Teruskan perjalanan belajarmu hari ini.</p>
        </header>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-sm">search</span>
              <input 
                type="text"
                placeholder="Cari modul atau materi belajar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all text-sm"
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all text-sm bg-white"
              >
                <option value="all">Semua Tingkat</option>
                <option value="premium">Kelas Premium</option>
                <option value="gratis">Kelas Gratis</option>
              </select>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <section className="md:col-span-8">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-lexend">Rekomendasi Modul Belajar</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">API Live</span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-slate-100 p-5 rounded-xl animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : filteredModules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredModules.map((module) => (
                    <div 
                      key={module.id} 
                      className="border border-slate-100 hover:border-blue-200 p-5 rounded-xl transition-all duration-300 hover:shadow-sm bg-slate-50/50 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 capitalize">
                            {module.title}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${module.id % 2 === 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                            {module.id % 2 === 0 ? 'Premium' : 'Gratis'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                          {module.body}
                        </p>
                      </div>
                      <div className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-auto">
                        Mulai Belajar <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                  <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">search_off</span>
                  <p className="text-sm text-slate-500 font-medium">Modul yang kamu cari tidak ditemukan.</p>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-8 font-lexend">Kritik & Saran</h2>
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Subjek</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all text-sm" 
                    placeholder="Masukkan subjek masukan Anda" 
                    type="text"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                    disabled={feedbackStatus === 'submitting'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Pesan Anda</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all text-sm" 
                    placeholder="Apa yang bisa kami tingkatkan?" 
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    disabled={feedbackStatus === 'submitting'}
                  />
                </div>

                {feedbackStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Feedback Anda berhasil dikirim! Terima kasih atas masukannya.
                  </div>
                )}
                {feedbackStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    Terjadi kesalahan saat mengirim data. Coba lagi nanti.
                  </div>
                )}

                <button 
                  className={`bg-blue-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-700/20 flex items-center gap-2 ${feedbackStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  type="submit"
                  disabled={feedbackStatus === 'submitting'}
                >
                  {feedbackStatus === 'submitting' ? 'Mengirim...' : 'Kirim Feedback'}
                </button>
              </form>
            </div>
          </section>

          <aside className="md:col-span-4">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 mb-8 font-lexend">Status Kuis Terbaru</h2>
              <div className="space-y-4 flex-grow">
                {[
                  { title: 'Quiz 4: Visual Hierarchy', course: 'UI/UX Masterclass', score: 95, status: 'Lulus' },
                  { title: 'Quiz 1: HTML Semantic', course: 'Web Dev Essentials', score: 82, status: 'Lulus' },
                  { title: 'Quiz 8: Copywriting 101', course: 'Digital Marketing', score: 55, status: 'Gagal' },
                  { title: 'Quiz 2: User Research', course: 'UI/UX Masterclass', score: 100, status: 'Lulus' },
                ].map((quiz, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-700 shadow-sm group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{quiz.title}</p>
                      <p className="text-xs text-slate-400 font-medium">{quiz.course}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${quiz.score >= 70 ? 'text-blue-700' : 'text-red-500'}`}>{quiz.score}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${quiz.score >= 70 ? 'text-green-600' : 'text-red-400'}`}>{quiz.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3 border-2 border-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all">
                Riwayat Lengkap
              </button>
              
              <div className="mt-8 p-6 rounded-2xl bg-blue-700 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-1 font-lexend">Butuh bantuan?</h3>
                  <p className="text-xs text-blue-100 mb-6 font-medium">Hubungi mentor pribadi anda kapan saja.</p>
                  <button className="bg-white text-blue-700 px-6 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all active:scale-95">
                    Chat Mentor
                  </button>
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12">
                  <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-slate-900 mb-2 font-lexend">RuangBelajar</div>
            <p className="text-xs text-slate-400 font-medium">© 2026 RuangBelajar Educational Platform</p>
          </div>
          <div className="flex gap-8">
            {['Kontak Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-xs text-slate-400 font-bold hover:text-blue-700 transition-colors uppercase tracking-widest" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BerandaUser;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * KelasUser Component
 * 
 * This component represents the User's Class page in the RuangBelajar platform.
 * It follows the design system and incorporates Tailwind CSS for styling.
 */
const KelasUser: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => {
        const mappedData = res.data.map((item: any) => ({
          title: item.title,
          desc: item.body
        }));
        setSubjects(mappedData);
        setFilteredSubjects(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = subjects.filter(sub => sub.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredSubjects(filtered);
  }, [searchQuery, subjects]);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* TopNavBar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700">Ruangbelajar</div>
          <div className="hidden md:flex gap-4 items-center font-lexend text-sm font-medium tracking-tight">
            <a className="px-3 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200" href="#">Beranda</a>
            <a className="px-3 py-1 text-blue-700 font-bold border-b-2 border-blue-700 pb-1" href="#">Kelas</a>
            <a className="px-3 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200" href="#">Kuis</a>
            <a className="px-3 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200" href="#">Tentang</a>
            <a className="px-3 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200" href="#">Profil</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:block material-symbols-outlined text-slate-500 cursor-pointer p-2 hover:bg-slate-100 rounded-full">logout</span>
            <button 
              className="md:hidden material-symbols-outlined text-slate-600 p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <a className="text-slate-600 font-medium" href="#">Beranda</a>
            <a className="text-blue-700 font-bold" href="#">Kelas</a>
            <a className="text-slate-600 font-medium" href="#">Kuis</a>
            <a className="text-slate-600 font-medium" href="#">Tentang</a>
            <a className="text-slate-600 font-medium" href="#">Profil</a>
            <hr className="border-slate-100" />
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className="material-symbols-outlined">logout</span>
              Keluar
            </div>
          </div>
        )}
      </header>

      <main className="pt-24 pb-16 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-on-surface mb-2">Mulai Belajar Hari Ini</h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-6">Pilih kategori pelajaran Anda dan lanjutkan perjalanan akademik dengan kurikulum terstruktur dan materi berkualitas tinggi.</p>
          
          <form className="flex gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Cari kelas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700 bg-white text-slate-900"
            />
            <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Cari</button>
          </form>
        </section>

        {/* Category Grid (Bento Style) */}
        <section className="mb-16">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-700 rounded-full animate-spin"></div>
            </div>
          ) : filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSubjects.map((subject, idx) => (
            <div key={idx} className={`group relative overflow-hidden rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
              idx === 1 ? 'bg-blue-700 text-white border-blue-800 shadow-lg' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-lg ${idx === 1 ? 'bg-white/20' : 'bg-blue-50 text-blue-700'}`}>
                  <span className="material-symbols-outlined">
                    {idx % 3 === 0 ? 'calculate' : idx % 3 === 1 ? 'rocket_launch' : 'science'}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${idx === 1 ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                  {idx === 1 ? 'Sedang Dipelajari' : '12 Materi'}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 capitalize line-clamp-1">{subject.title}</h3>
              <p className={`text-sm mb-4 line-clamp-2 ${idx === 1 ? 'text-blue-100' : 'text-slate-500'}`}>
                {subject.desc}
              </p>
              <div className="flex items-center font-semibold gap-2 group-hover:translate-x-1 transition-transform">
                {idx === 1 ? 'Melanjutkan' : 'Lihat Kelas'} 
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </div>
            </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500">Kelas tidak ditemukan untuk pencarian "{searchQuery}"</p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Video & Progress */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Progress Belajar</span>
                  <h2 className="text-2xl font-bold mt-1">Fisika: Kinematika Gerak Lurus</h2>
                </div>
                <span className="text-xl font-bold text-blue-700">65%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-700 to-amber-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-lg group">
              <img alt="Materi Video Fisika" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt7a8wG9EEGHMkScMVTZEVkz5q9pwzQXomm4E7osUDaT9j-KgRRKccMB-haHHVny8mhAch3rEj46s2ik5AXb8dtP6Cl-qn36HRB_RsJUsXn5O9SEZjt4HhLXpHaGWY2hrUc8V3wCwcf78lc_n7HnkogqzPEIytGCdh3dGW9vPXICdY5wFZMDxwSWgZTA6zqzH6xzUwKgmC5ls1DmUx11PGL6KskEAyULS5AQd4xeUVDKN7eO4guImFblckIlkARY-HvUtqetBRj0uB"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-blue-700/90 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Materials List */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="text-xl font-bold">Daftar Materi</h3>
                <p className="text-xs text-slate-500">8 Video & 4 Kuis</p>
              </div>
              <div className="flex flex-col">
                {[
                  { title: '1. Pengantar Mekanika', type: 'Video', status: 'completed' },
                  { title: '2. Besaran dan Satuan', type: 'Video', status: 'completed' },
                  { title: '3. Kinematika Gerak Lurus', type: 'Video', status: 'current' },
                  { title: '4. Dinamika Partikel', type: 'Video', status: 'locked' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center p-6 border-b border-slate-100 transition-colors ${item.status === 'current' ? 'bg-blue-50 border-l-4 border-l-blue-700' : 'hover:bg-slate-50'}`}>
                    <div className={`mr-4 ${item.status === 'completed' ? 'text-blue-700' : item.status === 'current' ? 'text-blue-700 animate-pulse' : 'text-slate-400'}`}>
                      <span className="material-symbols-outlined">
                        {item.status === 'completed' ? 'check_circle' : item.status === 'current' ? 'play_circle' : 'lock'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${item.status === 'current' ? 'text-blue-700' : 'text-slate-900'}`}>{item.title}</p>
                      <p className="text-xs text-slate-500">12:00 • {item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-lg font-bold text-slate-900 mb-1">Ruangbelajar</div>
            <p className="text-xs text-slate-500">© 2024 Ruangbelajar Educational Platform</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {['Kontak Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-xs text-slate-500 hover:text-blue-600 transition-colors" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KelasUser;

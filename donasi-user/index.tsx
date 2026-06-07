import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Tipe data untuk menampung hasil fetch API
interface Donatur {
  id: number;
  name: string;
  email: string;
}

const DonasiUser: React.FC = () => {
  const [donaturs, setDonaturs] = useState<Donatur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [namaDonatur, setNamaDonatur] = useState<string>('');
  const [nominal, setNominal] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchDonaturs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=10');
        setDonaturs(response.data);
      } catch (error) {
        console.error("Gagal mengambil data API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonaturs();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening disalin!');
  };

  const handleKonfirmasiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setNamaDonatur('');
      setNominal('');
    }, 2000);
  };

  const filteredDonaturs = donaturs.filter((donatur) =>
    donatur.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">RuangBelajar</div>
          <div className="hidden md:flex items-center gap-2">
            {['Beranda', 'Kelas', 'Kuis', 'Tentang'].map((item) => (
              <a key={item} className="font-lexend text-sm font-medium px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all" href="#">{item}</a>
            ))}
            <a className="font-lexend text-sm font-bold px-4 py-2 text-blue-700 border-b-2 border-blue-700" href="#">Donasi</a>
          </div>
          <div className="flex items-center gap-2">
            <button className="material-symbols-outlined p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">logout</button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all active:scale-95">Masuk</button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blue-800 mb-4 font-lexend">Dukung Pendidikan Berkualitas</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Kontribusi Anda membantu kami menyediakan akses pendidikan gratis bagi ribuan siswa di seluruh Indonesia. Setiap rupiah sangat berarti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-16">
            <div className="md:col-span-5 bg-white/70 backdrop-blur-md rounded-2xl p-10 flex flex-col items-center justify-center shadow-xl shadow-blue-800/5 border border-white">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Scan QRIS</h2>
                <p className="text-sm text-slate-500">Mendukung semua dompet digital</p>
              </div>
              <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-inner">
                <img 
                  alt="QRIS" 
                  className="w-64 h-64 object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXyJ2NJctXfq5x3ojrpMuTLzInfMZgMu0-EkH8oo4vyyshEJhAFt6F6425eFJPizU3Z7_VRGmw-Tqgqbjq9EcBqgfTMsYzQTL9bX374-XiX-mJAVDlLUuWZEoOldAqvdWvvN-lK7EcAG1T7UdKwjjd-O9eE4ef5bbgqffYAE30o2NIaeuJ6SQIsGsdpyg7oqqTDhyF6At5pErGvMrHQuQrKCSMLwzq5QoS9ofutz_UtdszOx900wXeIUgmgG4oZKP8Pbb5bnJKIy4" 
                />
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-8">
              <div className="bg-blue-700 text-white rounded-2xl p-10 shadow-2xl shadow-blue-700/30 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-200 mb-4 block">Transfer Bank</span>
                  <h2 className="text-3xl font-bold mb-8 font-lexend">Bank Central Asia (BCA)</h2>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 flex justify-between items-center border border-white/20">
                    <div>
                      <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Nomor Rekening</p>
                      <p className="text-3xl font-bold tracking-widest font-lexend">3883685635</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('3883685635')}
                      className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg"
                    >
                      Salin
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-lexend">Konfirmasi Donasi</h3>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
                    Terima kasih! Konfirmasi donasi Anda sedang kami proses.
                  </div>
                )}

                <form onSubmit={handleKonfirmasiSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={namaDonatur}
                      onChange={(e) => setNamaDonatur(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nominal Donasi (Rp)</label>
                    <input 
                      type="number" 
                      required
                      min="10000"
                      value={nominal}
                      onChange={(e) => setNominal(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 outline-none transition-all"
                      placeholder="Contoh: 50000"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-700/20 hover:bg-blue-800 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Mengirim Data...' : 'Kirim Konfirmasi'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-lexend">Orang Baik Minggu Ini</h3>
                <p className="text-sm text-slate-500 mt-1">Daftar donatur yang berkontribusi di platform RuangBelajar.</p>
              </div>
              
              <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-72">
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all text-sm font-medium text-slate-900 shadow-sm"
                    placeholder="Cari nama donatur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm animate-pulse">
                    <div className="w-10 h-10 bg-slate-200 rounded-full mx-auto mb-3"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : filteredDonaturs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {filteredDonaturs.map((donatur) => (
                  <div key={donatur.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      {donatur.name.charAt(0)}
                    </div>
                    <p className="text-sm font-bold text-slate-800 truncate">{donatur.name}</p>
                    <p className="text-xs text-slate-500 truncate">Berdonasi</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-xl border border-slate-100">
                <p className="text-slate-500 text-sm font-medium">Donatur bernama "{searchQuery}" tidak ditemukan.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-slate-900 mb-2 font-lexend">RuangBelajar</div>
            <p className="text-xs text-slate-400 font-medium">© 2024 RuangBelajar Educational Platform</p>
          </div>
          <div className="flex gap-10">
            {['Kontak Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-blue-700 transition-colors" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DonasiUser;
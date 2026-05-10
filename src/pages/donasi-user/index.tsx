import React from 'react';

const DonasiUser: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening disalin!');
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-blue-700 font-lexend">Ruangbelajar</div>
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
      </nav>

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blue-800 mb-4 font-lexend">Dukung Pendidikan Berkualitas</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Kontribusi Anda membantu kami menyediakan akses pendidikan gratis bagi ribuan siswa di seluruh Indonesia. Setiap rupiah sangat berarti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-5 bg-white/70 backdrop-blur-md rounded-2xl p-10 flex flex-col items-center justify-center shadow-xl shadow-blue-800/5 border border-white">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Scan QRIS</h2>
                <p className="text-sm text-slate-500">Mendukung semua dompet digital (GoPay, OVO, Dana, LinkAja)</p>
              </div>
              <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-inner">
                <img 
                  alt="QRIS" 
                  className="w-64 h-64 object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXyJ2NJctXfq5x3ojrpMuTLzInfMZgMu0-EkH8oo4vyyshEJhAFt6F6425eFJPizU3Z7_VRGmw-Tqgqbjq9EcBqgfTMsYzQTL9bX374-XiX-mJAVDlLUuWZEoOldAqvdWvvN-lK7EcAG1T7UdKwjjd-O9eE4ef5bbgqffYAE30o2NIaeuJ6SQIsGsdpyg7oqqTDhyF6At5pErGvMrHQuQrKCSMLwzq5QoS9ofutz_UtdszOx900wXeIUgmgG4oZKP8Pbb5bnJKIy4" 
                />
              </div>
              <div className="mt-8 flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-4 py-2 rounded-full text-sm">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                Pembayaran Aman & Terverifikasi
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-8">
              <div className="bg-blue-700 text-white rounded-2xl p-10 shadow-2xl shadow-blue-700/30 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 opacity-10">
                  <span className="material-symbols-outlined text-[160px]">account_balance</span>
                </div>
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
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-200">person</span>
                    <p className="font-bold">Yayasan Ruang Belajar Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 flex-grow">
                <h3 className="text-xl font-bold text-blue-800 mb-8">Ke Mana Donasi Anda Pergi?</h3>
                <div className="space-y-6">
                  {[
                    { icon: 'menu_book', title: 'Materi Pembelajaran', desc: 'Pembuatan konten video dan modul latihan berkualitas tinggi.' },
                    { icon: 'cloud_done', title: 'Infrastruktur Server', desc: 'Memastikan platform dapat diakses 24/7 tanpa kendala.' },
                  ].map((impact, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-blue-700">{impact.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{impact.title}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{impact.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <p className="text-xs italic font-semibold text-slate-400">
                    Terima kasih atas kebaikan Anda dalam mendukung masa depan anak bangsa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">security</span>
              <span className="text-xs font-black uppercase tracking-widest">Secure SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">favorite</span>
              <span className="text-xs font-black uppercase tracking-widest">Non-Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">history</span>
              <span className="text-xs font-black uppercase tracking-widest">Transparan</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold text-slate-900 mb-2 font-lexend">Ruangbelajar</div>
            <p className="text-xs text-slate-400 font-medium">© 2024 Ruangbelajar Educational Platform</p>
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

import { Star, User, School, HelpCircle, TrendingUp, ChevronRight, Edit3, FunctionSquare, Languages } from 'lucide-react';

export default function ProfilUser() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7 animate-[fadeUp_0.7s_ease]">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6">
        
        {/* PROFILE CARD */}
        <div className="glass-card p-8 text-center">
          <div className="relative w-max mx-auto">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXALYy9ZLcuHaXsT23uA7XpTFDZQewGaUQdqK_w4x4uDDyxjPg_s__YTWWzW4igQyTAOzb0eidtzIvGjsCZl73079RChEThbaIGQ-NLUvZGVHIBTgtxyO9voc1a_jDrK6Ae3rOMvNr9KWzu6rcwglCxZwQhzYVHgJ4mXczkmeSyW7epFAlJDWKSOmrPnIKNN3pADuaO_YGWYQlyZttTg_wJqjRZf4eFHQ1xWFxNcytQfLfbe1sC79KJO9XzazBrBUk9eCO-LU6pacI"
              alt="Profile"
              className="w-[120px] h-[120px] object-cover rounded-full"
            />
            <button className="absolute bottom-0 right-0 w-[42px] h-[42px] rounded-full border-none bg-[var(--color-blue)] text-white flex items-center justify-center cursor-pointer hover:bg-[var(--color-blue-dark)] transition-colors">
              <Edit3 size={18} />
            </button>
          </div>
          <h1 className="mt-[18px] text-[28px] font-bold">Aditya Pratama</h1>
          <p className="mt-[6px] text-[15px] text-[var(--color-secondary)]">Siswa Menengah Atas</p>
          <button className="primary-btn">Sunting Profil</button>
          <button className="secondary-btn">Ganti Password</button>
        </div>

        {/* ACHIEVEMENT CARD */}
        <div className="glass-card p-7">
          <h2 className="flex items-center gap-[10px] text-[22px] text-[var(--color-blue)] font-bold mb-5">
            <Star className="fill-current" /> Pencapaian
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[rgba(37,99,235,0.12)] text-[var(--color-blue)] px-4 py-2.5 rounded-full text-[13px] font-semibold">
              Juara Kuis Matematika
            </span>
            <span className="bg-[rgba(37,99,235,0.12)] text-[var(--color-blue)] px-4 py-2.5 rounded-full text-[13px] font-semibold">
              Belajar 7 Hari Beruntun
            </span>
            <span className="bg-[rgba(37,99,235,0.12)] text-[var(--color-blue)] px-4 py-2.5 rounded-full text-[13px] font-semibold">
              Pelajar Teladan
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-6">
        
        {/* INFO CARD */}
        <section className="glass-card p-8">
          <h2 className="flex items-center gap-[10px] mb-8 text-2xl font-bold">
            <User /> Informasi Pribadi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm text-[var(--color-secondary)]">Nama Lengkap</label>
              <p className="mt-1.5 text-lg font-semibold">Aditya Pratama</p>
            </div>
            <div>
              <label className="text-sm text-[var(--color-secondary)]">Nomor HP</label>
              <p className="mt-1.5 text-lg font-semibold">+62 812 3456 7890</p>
            </div>
            <div>
              <label className="text-sm text-[var(--color-secondary)]">Tanggal Lahir</label>
              <p className="mt-1.5 text-lg font-semibold">15 Mei 2005</p>
            </div>
            <div>
              <label className="text-sm text-[var(--color-secondary)]">E-mail</label>
              <p className="mt-1.5 text-lg font-semibold">aditya.pratama@email.com</p>
            </div>
          </div>
        </section>

        {/* STATS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          
          <div className="glass-card p-6 border-l-4 border-blue-600 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between mb-[18px] text-[var(--color-secondary)]">
              <School /> <span className="font-semibold text-[var(--color-primary)]">85%</span>
            </div>
            <h3 className="text-[15px] text-[var(--color-secondary)] mb-2">Class Progress</h3>
            <p className="text-lg font-bold">12/15</p>
            <div className="h-2 bg-[rgba(148,163,184,0.2)] rounded-full mt-[18px] overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-blue-600 to-blue-400"></div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-amber-500 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between mb-[18px] text-[var(--color-secondary)]">
              <HelpCircle /> <span className="font-semibold text-[var(--color-primary)]">70%</span>
            </div>
            <h3 className="text-[15px] text-[var(--color-secondary)] mb-2">Quiz Progress</h3>
            <p className="text-lg font-bold">21/30</p>
            <div className="h-2 bg-[rgba(148,163,184,0.2)] rounded-full mt-[18px] overflow-hidden">
              <div className="h-full w-[70%] bg-gradient-to-r from-amber-500 to-yellow-400"></div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-red-500 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between mb-[18px] text-[var(--color-secondary)]">
              <TrendingUp /> <span className="font-semibold text-[var(--color-primary)]">Grade A</span>
            </div>
            <h3 className="text-[15px] text-[var(--color-secondary)] mb-2">Avg Score</h3>
            <p className="text-lg font-bold">92.4</p>
            <div className="h-2 bg-[rgba(148,163,184,0.2)] rounded-full mt-[18px] overflow-hidden">
              <div className="h-full w-[92%] bg-gradient-to-r from-red-500 to-red-400"></div>
            </div>
          </div>

        </section>

        {/* COURSE SECTION */}
        <section className="glass-card p-8">
          <h2 className="mb-7 text-[22px] font-bold">Kelas yang Sedang Diikuti</h2>
          <div className="flex flex-col gap-[18px]">
            
            <div className="flex items-center gap-[18px] p-[18px] rounded-[18px] transition-all duration-300 cursor-pointer hover:bg-[rgba(255,255,255,0.35)] hover:translate-x-1 group">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-blue-600 text-white flex items-center justify-center shrink-0">
                <FunctionSquare />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Matematika Dasar: Aljabar & Logika</h4>
                <p className="text-sm text-[var(--color-secondary)]">Terakhir dipelajari 2 jam yang lalu</p>
              </div>
              <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-[var(--color-blue)] transition-opacity" />
            </div>

            <div className="flex items-center gap-[18px] p-[18px] rounded-[18px] transition-all duration-300 cursor-pointer hover:bg-[rgba(255,255,255,0.35)] hover:translate-x-1 group">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Languages />
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Bahasa Inggris: Persiapan TOEFL</h4>
                <p className="text-sm text-[var(--color-secondary)]">Terakhir dipelajari Kemarin</p>
              </div>
              <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 text-[var(--color-blue)] transition-opacity" />
            </div>

          </div>
        </section>

      </div>

    </div>
  );
}

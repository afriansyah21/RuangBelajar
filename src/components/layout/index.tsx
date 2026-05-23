import { NavLink, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Layout() {
  return (
    <>
      <div className="bg-blur blur-1"></div>
      <div className="bg-blur blur-2"></div>

      <nav className="h-[74px] sticky top-0 z-[999] bg-[rgba(255,255,255,0.5)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.2)]">
        <div className="w-full max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="text-[28px] font-bold text-[var(--color-blue)] font-[family-name:var(--font-lexend)]">
            RuangBelajar
          </div>

          <div className="hidden lg:flex gap-8">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/kelas-user', label: 'Kelas' },
              { path: '/kuis-user', label: 'Kuis' },
              { path: '/tentang-user', label: 'Tentang' },
              { path: '/profil-user', label: 'Profil' },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative no-underline text-[15px] font-medium py-2 transition-colors duration-300 ${
                    isActive ? 'text-[var(--color-blue)]' : 'text-[var(--color-secondary)] hover:text-[var(--color-blue)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] bg-[var(--color-blue)] rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 hover:w-full'
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <button className="w-[42px] h-[42px] border-none rounded-xl bg-[rgba(255,255,255,0.4)] text-[var(--color-primary)] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.7)] flex items-center justify-center">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="w-full max-w-[1280px] mx-auto px-6 mt-8 pb-10 animate-[fadeUp_0.7s_ease]">
        <Outlet />
      </main>

      <footer className="w-full max-w-[1280px] mx-auto px-6 py-6 text-center text-[var(--color-secondary)] text-sm">
        &copy; {new Date().getFullYear()} RuangBelajar. All rights reserved.
      </footer>
    </>
  );
}

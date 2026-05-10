import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginUser: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/beranda');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] opacity-40"></div>
        </div>

        <div className="w-full max-w-[480px] z-10">
          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-2xl shadow-blue-800/5">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-blue-700 mb-2 font-lexend">Ruangbelajar</h1>
              <p className="text-slate-500 font-medium">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-700 transition-colors">email</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-700/5 focus:border-blue-700 transition-all text-slate-900 font-semibold" 
                    placeholder="Masukkan email Anda" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 block">Password</label>
                  <a className="text-xs font-black text-blue-700 hover:underline uppercase tracking-wider" href="#">Lupa Password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-700 transition-colors">lock</span>
                  <input 
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-700/5 focus:border-blue-700 transition-all text-slate-900 font-semibold" 
                    placeholder="Masukkan password Anda" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                className="w-full bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-700/20 hover:bg-blue-800 active:scale-[0.98] transition-all" 
                type="submit"
              >
                Masuk ke Akun
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Atau masuk dengan</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button 
                className="w-full bg-white border border-slate-200 py-4 rounded-2xl font-bold text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm" 
                type="button"
              >
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv1dqfnnMPlE5ZbX-F0eeJNlFAuMcssZJWqAywOqnoXmqBgWv-7qFxHgWAZM0uw9xcZuBrwji9nIVlGFjiFwGQWK-mdyBCXu1Y2FI1_Pl1InqnF63rDxzOzrwsDoIygHTnwxpk9IiD2jlaip5kh3bxGJO_obFGHzZeQQlmhHe8iyrvGAwRZthzns6yVHDM9lMVJ1d26BcGEI7l4AEb3P1caDjlm6nuoQRLCTySnkumR2RPfnTA-wGKLudunQJ6Iq0MsDMdmZ40-C0_" />
                Lanjutkan dengan Google
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                Belum punya akun? {' '}
                <Link className="text-blue-700 font-bold hover:underline" to="/signup">Daftar sekarang</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-100 bg-white py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-lg font-bold text-slate-900 font-lexend">Ruangbelajar</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">© 2024 Educational Platform</p>
          </div>
          <div className="flex gap-8">
            {['Kontak', 'Syarat', 'Privasi', 'Bantuan'].map(link => (
              <a key={link} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-700 transition-colors" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginUser;


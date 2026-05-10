import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row font-inter bg-white">
      {/* Visual Side */}
      <section className="hidden lg:flex lg:w-1/2 bg-blue-700 relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-3xl font-black font-lexend tracking-tight">
            <span className="material-symbols-outlined text-4xl">school</span>
            Ruangbelajar
          </div>
          <div className="mt-24 max-w-md">
            <h1 className="text-6xl font-black font-lexend leading-[1.1] tracking-tight">Mulai Perjalanan Belajarmu Hari Ini.</h1>
            <p className="mt-8 text-blue-100 text-lg font-medium leading-relaxed">Platform edukasi terpercaya untuk membantu kamu meraih prestasi akademik terbaik dengan bimbingan mentor ahli.</p>
          </div>
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl shadow-blue-900/40">
            <p className="text-lg font-bold leading-relaxed italic">"Belajar jadi lebih terarah dan menyenangkan bersama Ruangbelajar."</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 overflow-hidden shadow-sm">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrhiwAE2BpAzzlBXooDtT_UcvGZ5KS4mjtTGbOtpUvo1wcyjocqoxGZVW4ur7xew-nn_FDse8b56mfDXfTm1iPS620JgsE1iTsi-JxdeYTO3xK86Bk2Mm7PYLI0sHdGZacygmElIYQVQZHq1_hBotAu0XHyNVk1G-9z6eFIAUiKQkS3HijEpv4H090n8XfcCqikiXyThXuZsOywaj2AnniBH2p3opgaLdgMAfNOMQ2-11j_0nDowQttN-wTeg-oT2nNI96AADUQuAs" alt="User" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest">Budi Santoso</p>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em]">Mahasiswa UI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Side */}
      <section className="flex-1 flex items-center justify-center p-12 lg:p-24">
        <div className="w-full max-w-[500px]">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 font-lexend tracking-tight">Buat Akun Baru</h2>
            <p className="text-slate-500 font-medium mt-4">Lengkapi data diri Anda untuk memulai perjalanan cerdas.</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
          {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm font-bold border border-green-100">{success}</div>}

          <form onSubmit={handleSignUp} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                type="text" 
                placeholder="AndiWijaya"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                type="email" 
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verifikasi</label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-700/5 transition-all text-sm font-bold text-slate-900" 
                  type="password" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="w-full py-5 bg-blue-700 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-700/20 hover:bg-blue-800 transition-all transform active:scale-95" type="submit">
              Daftar Sekarang
            </button>
          </form>

          <p className="mt-12 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
            Sudah punya akun? 
            <Link className="text-blue-700 ml-2 hover:underline" to="/login">Masuk di sini</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpUser;


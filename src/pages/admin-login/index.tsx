import React from 'react';

const AdminLogin: React.FC = () => {
  return (
    <div className="bg-background font-body-md text-on-background min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1100px] grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-slate-100">
          {/* Left Side: Visuals */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-blue-700 relative overflow-hidden text-white">
            <div className="relative z-20">
              <div className="flex items-center gap-3 mb-10">
                <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
                <h1 className="text-2xl font-bold font-lexend tracking-tight">Ruangbelajar</h1>
              </div>
              <h2 className="text-5xl font-bold font-lexend mb-6">Admin Portal</h2>
              <p className="text-blue-100 max-w-sm leading-relaxed">
                Secure management interface for educators and platform administrators. Access course analytics, user management, and platform configuration.
              </p>
            </div>
            
            <div className="relative z-20">
              <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-md">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2">Security Notice</p>
                <p className="text-sm text-blue-50">
                  This is a restricted administrative area. All activities are logged and monitored for security purposes.
                </p>
              </div>
            </div>

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-10 opacity-20">
              <img 
                className="w-full h-full object-cover grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA4fzzFly3mhYYluQiTG3r0BASTFwPgAlP4cn2vktgB01wSt732bdjen0_X49VhYQ0BmjsphJ58tPnaZawdjgqmUUnvyqzmr8xvQAp5C-3EGw1vCV9Sy583SuEmNwPFlo4raTOd8bEr0s7kkBdIfuAtZfKyXGN6Fv0uyRHk8aGQTULBT8tSrKlYyc2FSIMK8CT29ycwJ8Mcv616ztk1ZC5fLMUP0Fr5drt_KwLi__Wrdl7Pmky2BnpIPujr_x2fzmYBIM8tyCZ-2Z3" 
                alt="Server Room"
              />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-10 md:hidden flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-blue-700 text-3xl">admin_panel_settings</span>
                <h1 className="text-xl font-bold text-blue-700 font-lexend">Ruangbelajar Admin</h1>
              </div>
              
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-2 font-lexend">Sign In</h3>
                <p className="text-slate-500">Enter your administrator credentials to continue.</p>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900" htmlFor="username">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                    <input 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 outline-none transition-all" 
                      id="username" 
                      placeholder="admin_username" 
                      type="text" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-900" htmlFor="password">Password</label>
                    <a className="text-xs font-bold text-blue-700 hover:underline" href="#">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400">lock</span>
                    </div>
                    <input 
                      className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 outline-none transition-all" 
                      id="password" 
                      placeholder="••••••••••••" 
                      type="password" 
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input className="w-5 h-5 rounded border-slate-300 text-blue-700 focus:ring-blue-700/20" id="remember" type="checkbox" />
                  <label className="text-sm text-slate-500 cursor-pointer" htmlFor="remember">Remember this device for 30 days</label>
                </div>

                <button className="w-full py-4 bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                  Authorize Access
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alternatively, sign in with</p>
                <div className="flex gap-4 w-full">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-sm text-slate-700 active:scale-95">
                    <span className="material-symbols-outlined text-lg">vpn_key</span>
                    SSO
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-sm text-slate-700 active:scale-95">
                    <span className="material-symbols-outlined text-lg">fingerprint</span>
                    Biometric
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-lexend">© 2024 Ruangbelajar Educational Platform</p>
          <div className="flex gap-8">
            {['Bantuan', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map(link => (
              <a key={link} className="text-xs text-slate-400 hover:text-blue-700 transition-colors font-medium" href="#">{link}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <span className="material-symbols-outlined text-lg">shield</span>
            <span className="text-[10px] uppercase tracking-widest font-black">Secure Environment</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;

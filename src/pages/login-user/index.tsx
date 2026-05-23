import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Lock, Loader2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Testimonial {
  id: number;
  name: string;
  body: string;
}

export default function LoginUser() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder 'comments' endpoint for testimonials
        const response = await axios.get<Testimonial[]>('https://jsonplaceholder.typicode.com/comments?_limit=10');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="animate-[fadeUp_0.7s_ease] min-h-[80vh] flex flex-col pt-8">
      
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] font-[family-name:var(--font-lexend)] mb-2">
          RuangBelajar
        </h1>
        <p className="text-[var(--color-secondary)]">
          Masuk ke akun Anda dan lanjutkan perjalanan belajar.
        </p>
      </header>

      <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LOGIN FORM */}
        <section className="glass-card p-10 max-w-md w-full mx-auto lg:mx-0">
          <h2 className="text-2xl font-bold mb-8 text-center">Masuk ke Akun</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username Anda"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[var(--color-secondary)]">Password</label>
                <a href="#" className="text-xs text-[var(--color-blue)] hover:underline">Lupa Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-btn flex items-center justify-center gap-2">
              Login <ArrowRight size={18} />
            </button>

            <p className="text-center text-sm text-[var(--color-secondary)] mt-4">
              Belum punya akun? <Link to="/sign-up" className="text-[var(--color-blue)] font-bold hover:underline">Daftar sekarang</Link>
            </p>
          </form>
        </section>

        {/* TESTIMONIALS FROM API */}
        <section className="glass-card p-10 hidden lg:flex flex-col h-full max-h-[600px] overflow-hidden">
          <h2 className="text-2xl font-bold mb-2">Kata Mereka</h2>
          <p className="text-sm text-[var(--color-secondary)] mb-6">Cerita sukses dari para pelajar di seluruh dunia.</p>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 h-full">
                <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={40} />
                <p className="text-[var(--color-secondary)] text-sm">Memuat ulasan pengguna...</p>
              </div>
            ) : (
              testimonials.map((testi) => (
                <div key={testi.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.4)] border border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.6)] transition-colors">
                  <h4 className="font-bold text-sm mb-1 truncate">{testi.name}</h4>
                  <p className="text-xs text-[var(--color-secondary)] line-clamp-2">{testi.body}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

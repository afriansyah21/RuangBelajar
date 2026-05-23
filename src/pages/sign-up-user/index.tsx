import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Educator {
  id: number;
  name: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export default function SignUpUser() {
  const [educators, setEducators] = useState<Educator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder 'users' endpoint for educators/mentors list
        const response = await axios.get<Educator[]>('https://jsonplaceholder.typicode.com/users?_limit=10');
        setEducators(response.data);
      } catch (error) {
        console.error('Error fetching educators:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducators();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="animate-[fadeUp_0.7s_ease] min-h-[80vh] flex flex-col pt-8">
      
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] font-[family-name:var(--font-lexend)] mb-2">
          RuangBelajar
        </h1>
        <p className="text-[var(--color-secondary)]">
          Bergabunglah sekarang dan temukan mentor terbaik untukmu.
        </p>
      </header>

      <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* EDUCATORS FROM API */}
        <section className="glass-card p-10 hidden lg:flex flex-col h-full max-h-[600px] overflow-hidden order-2 lg:order-1">
          <h2 className="text-2xl font-bold mb-2">Mentor Tersedia</h2>
          <p className="text-sm text-[var(--color-secondary)] mb-6">Belajar langsung dari para profesional.</p>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 h-full">
                <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={40} />
                <p className="text-[var(--color-secondary)] text-sm">Memuat daftar mentor...</p>
              </div>
            ) : (
              educators.map((edu) => (
                <div key={edu.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.4)] border border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.6)] transition-colors">
                  <h4 className="font-bold text-sm mb-1 text-[var(--color-blue)]">{edu.name}</h4>
                  <p className="text-xs text-[var(--color-secondary)] font-medium">{edu.company.name}</p>
                  <p className="text-[11px] text-[var(--color-secondary)] italic">"{edu.company.catchPhrase}"</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* REGISTER FORM */}
        <section className="glass-card p-10 max-w-md w-full mx-auto lg:mx-0 order-1 lg:order-2">
          <h2 className="text-2xl font-bold mb-8 text-center">Buat Akun Baru</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat password baru"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-btn flex items-center justify-center gap-2">
              Daftar Sekarang <ArrowRight size={18} />
            </button>

            <p className="text-center text-sm text-[var(--color-secondary)] mt-4">
              Sudah punya akun? <Link to="/login" className="text-[var(--color-blue)] font-bold hover:underline">Masuk di sini</Link>
            </p>
          </form>
        </section>

      </div>
    </div>
  );
}

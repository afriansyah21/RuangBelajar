import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Mail, MapPin, Loader2, Phone } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export default function TentangUser() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder 'users' endpoint to fetch exactly 10 members
        const response = await axios.get<TeamMember[]>('https://jsonplaceholder.typicode.com/users');
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-[fadeUp_0.7s_ease]">
      
      {/* HEADER */}
      <header className="glass-card p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">Tentang RuangBelajar</h1>
        <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto">
          Kami berkomitmen untuk menyediakan platform edukasi terbaik yang interaktif, modern, dan mudah diakses oleh siapa saja, kapan saja.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CONTACT INFO */}
        <section className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[var(--color-blue)] shrink-0">
              <MapPin />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Lokasi Kami</h3>
              <p className="text-sm text-[var(--color-secondary)]">Jl. Pendidikan No. 123, Kota Pelajar, Indonesia 55281</p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Mail />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <p className="text-sm text-[var(--color-secondary)]">hello@ruangbelajar.com</p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <Phone />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Telepon</h3>
              <p className="text-sm text-[var(--color-secondary)]">+62 812 3456 7890</p>
            </div>
          </div>
        </section>

        {/* TEAM MEMBERS */}
        <section className="lg:col-span-2 glass-card p-8">
          <h2 className="flex items-center gap-[10px] text-[22px] font-bold mb-6">
            <Users className="text-[var(--color-blue)]" /> Tim Pengajar & Pengembang
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={48} />
              <p className="text-[var(--color-secondary)] font-medium">Memuat data tim...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((member) => (
                <div key={member.id} className="p-4 border border-[var(--color-border)] rounded-2xl bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.6)] transition-colors flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold truncate">{member.name}</h4>
                    <p className="text-xs text-[var(--color-secondary)] truncate mb-1">{member.email}</p>
                    <p className="text-[11px] font-medium text-[var(--color-blue)] truncate">
                      {member.company.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

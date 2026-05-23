import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, HelpCircle, Loader2, CheckCircle, Clock } from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  completed: boolean;
}

export default function KuisUser() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder 'todos' endpoint to simulate quizzes
        const response = await axios.get<Quiz[]>('https://jsonplaceholder.typicode.com/todos?_limit=12');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Daftar Kuis</h1>
        <p className="text-[var(--color-secondary)] text-lg">
          Uji pengetahuan Anda dengan menyelesaikan kuis-kuis berikut.
        </p>
      </header>

      <section className="glass-card p-8 mb-8">
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="flex flex-col md:flex-row gap-4 w-full"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]" size={20} />
            <input
              type="text"
              placeholder="Cari kuis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.4)] text-[var(--color-primary)] placeholder-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-blue)] transition-colors"
            />
          </div>
          <button type="button" className="primary-btn !mt-0 !w-auto px-8">
            Filter
          </button>
        </form>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[var(--color-blue)] mb-4" size={48} />
          <p className="text-[var(--color-secondary)] font-medium">Memuat daftar kuis...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <article key={quiz.id} className="glass-card p-6 flex flex-col h-full hover:-translate-y-1 transition-transform">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${quiz.completed ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                  <HelpCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 capitalize">{quiz.title}</h3>
                
                <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex items-center gap-2">
                  {quiz.completed ? (
                    <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <CheckCircle size={16} /> Selesai Dikerjakan
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Clock size={16} /> Belum Dikerjakan
                    </span>
                  )}
                </div>
                
                <button className={`mt-4 w-full h-[50px] border-none rounded-2xl text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                  quiz.completed 
                    ? 'bg-[rgba(34,197,94,0.12)] text-green-700' 
                    : 'bg-[var(--color-blue-dark)] text-white'
                }`}>
                  {quiz.completed ? 'Lihat Hasil' : 'Mulai Kuis'}
                </button>
              </article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-[var(--color-secondary)]">
              Tidak ada kuis yang sesuai dengan pencarian Anda.
            </div>
          )}
        </section>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, BookOpen, Loader2 } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  body: string;
}

export default function KelasUser() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder to fetch at least 10 items
        const response = await axios.get<Course[]>('https://jsonplaceholder.typicode.com/posts?_limit=12');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Kelas Saya</h1>
        <p className="text-[var(--color-secondary)] text-lg">
          Lanjutkan pembelajaran Anda dari tempat terakhir Anda tinggalkan.
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
              placeholder="Cari kelas..."
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
          <p className="text-[var(--color-secondary)] font-medium">Memuat daftar kelas...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <article key={course.id} className="glass-card p-6 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-6">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 capitalize">{course.title}</h3>
                <p className="text-[var(--color-secondary)] text-sm mb-6 line-clamp-3 flex-1">
                  {course.body}
                </p>
                <button className="secondary-btn !mt-auto">
                  Lanjutkan Belajar
                </button>
              </article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-[var(--color-secondary)]">
              Tidak ada kelas yang sesuai dengan pencarian Anda.
            </div>
          )}
        </section>
      )}
    </div>
  );
}

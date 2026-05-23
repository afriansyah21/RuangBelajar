import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import KelasUser from './pages/kelas-user';
import ProfilUser from './pages/profil-user';
import BerandaUser from './pages/beranda-user';
import KuisUser from './pages/kuis-user';
import TentangUser from './pages/tentang-user';
import LandingPageUser from './pages/landing-page-user';
import LoginUser from './pages/login-user';
import SignUpUser from './pages/sign-up-user';
import DonasiUser from './pages/donasi-user';

// Admin Pages
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin-login';
import ManajemenDonasiAdmin from './pages/manajemen-donasi-admin';
import ManajemenKelasAdmin from './pages/manajemen-kelas-admin';
import ManajemenKuisAdmin from './pages/manajemen-kuis-admin';
import ManajemenPenggunaAdmin from './pages/manajemen-pengguna-admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BerandaUser />} />
          <Route path="/kelas-user" element={<KelasUser />} />
          <Route path="/kuis-user" element={<KuisUser />} />
          <Route path="/tentang-user" element={<TentangUser />} />
          <Route path="/profil-user" element={<ProfilUser />} />
          <Route path="/donasi-user" element={<DonasiUser />} />
          
          <Route path="/landing" element={<LandingPageUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/sign-up" element={<SignUpUser />} />

          {/* Admin Routes within the same layout for simplicity, though normally might have different layout */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/manajemen-donasi" element={<ManajemenDonasiAdmin />} />
          <Route path="/admin/manajemen-kelas" element={<ManajemenKelasAdmin />} />
          <Route path="/admin/manajemen-kuis" element={<ManajemenKuisAdmin />} />
          <Route path="/admin/manajemen-pengguna" element={<ManajemenPenggunaAdmin />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

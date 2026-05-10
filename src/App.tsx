import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageUser from './pages/landing-page-user';
import LoginUser from './pages/login-user';
import SignUpUser from './pages/sign-up-user';
import BerandaUser from './pages/beranda-user';
import TentangUser from './pages/tentang-user';
import DonasiUser from './pages/donasi-user';
import KelasUser from './pages/kelas-user';
import KuisUser from './pages/kuis-user';
import ProfilUser from './pages/profil-user';
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin-login';
import ManajemenDonasiAdmin from './pages/manajemen-donasi-admin';
import ManajemenKelasAdmin from './pages/manajemen-kelas-admin';
import ManajemenKuisAdmin from './pages/manajemen-kuis-admin';
import ManajemenPenggunaAdmin from './pages/manajemen-pengguna-admin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<LandingPageUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/beranda" element={<BerandaUser />} />
        <Route path="/tentang" element={<TentangUser />} />
        <Route path="/donasi" element={<DonasiUser />} />
        <Route path="/kelas" element={<KelasUser />} />
        <Route path="/kuis" element={<KuisUser />} />
        <Route path="/profil" element={<ProfilUser />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/donasi" element={<ManajemenDonasiAdmin />} />
        <Route path="/admin/kelas" element={<ManajemenKelasAdmin />} />
        <Route path="/admin/kuis" element={<ManajemenKuisAdmin />} />
        <Route path="/admin/pengguna" element={<ManajemenPenggunaAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;

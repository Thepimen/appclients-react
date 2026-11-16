import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SupabaseConnectionStatus, verifySupabaseConnection } from './config/supabase';
import AddClientPage from './pages/AddClientPage';
import AboutPage from './pages/AboutPage';
import ClientsPage from './pages/ClientsPage';
import EditClientPage from './pages/EditClientPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [connectionStatus, setConnectionStatus] = useState<SupabaseConnectionStatus | null>(null);

  useEffect(() => {
    let active = true;
    void verifySupabaseConnection().then((status) => {
      if (active) {
        setConnectionStatus(status);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar connectionStatus={connectionStatus} />
      <Routes>
        <Route path="/" element={<Navigate to="/clients" replace />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/add-client" element={<AddClientPage />} />
        <Route path="/new-client" element={<Navigate to="/add-client" replace />} />
        <Route path="/edit-client/:id" element={<EditClientPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/clients" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

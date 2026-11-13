import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import NewClientPage from './pages/NewClientPage';
import EditClientPage from './pages/EditClientPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ClientsPage />} />
        <Route path="/clients" element={<ClientsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/new-client"
          element={
            <ProtectedRoute>
              <NewClientPage />
            </ProtectedRoute>
          }
        />

        <Route path="/edit-client/:id" element={<EditClientPage />} />

      </Routes>
    </BrowserRouter>
  );
}

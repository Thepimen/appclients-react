import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const result = await AuthService.login(email, password);

    if (result) {
      navigate('/clients');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-4">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Entrar
        </button>

      </form>

    </div>
  );
}

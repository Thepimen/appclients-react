import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function NewClientPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const saveClient = async (e: any) => {
    e.preventDefault();

    await ClientsService.addClient({
      name,
      email,
      phone
    });

    navigate('/clients');
  };

  return (
    <div className="container mt-4">

      <h2>Nuevo Cliente</h2>

      <form onSubmit={saveClient}>

        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Teléfono"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />

        <button className="btn btn-success">
          Guardar
        </button>

      </form>

    </div>
  );
}

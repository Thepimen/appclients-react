import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    if (!id) return;

    const client = await ClientsService.getClient(Number(id));
    if (client) {
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
    }
  };

  const updateClient = async (e: any) => {
    e.preventDefault();
    if (!id) return;

    await ClientsService.updateClient(Number(id), {
      name,
      email,
      phone
    });

    navigate('/clients');
  };

  return (
    <div className="container mt-4">

      <h2>Editar Cliente</h2>

      <form onSubmit={updateClient}>

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

        <button className="btn btn-primary">
          Actualizar
        </button>

      </form>

    </div>
  );
}

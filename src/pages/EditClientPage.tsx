import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      if (!id) return;
      setLoading(true);
      setErrorMsg(null);
      try {
        const client = await ClientsService.getClient(Number(id));
        if (client) {
          setName(client.name);
          setEmail(client.email);
          setPhone(client.phone);
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'No se pudo cargar el cliente.');
      } finally {
        setLoading(false);
      }
    };
    void loadClient();
  }, [id]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setErrorMsg(null);
    try {
      await ClientsService.updateClient(Number(id), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      navigate('/clients');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al actualizar el cliente.');
      setSaving(false);
    }
  };

  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <h1 className="h3 fw-bold mb-3">Editar cliente #{id}</h1>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <section className="surface-card p-4">
            {loading ? (
              <div className="d-flex align-items-center gap-2 py-3">
                <div className="spinner-border spinner-border-sm text-primary" role="status" />
                <span>Cargando datos...</span>
              </div>
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="edit-name" className="form-label fw-semibold">
                    Nombre
                  </label>
                  <input
                    id="edit-name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-email" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-phone" className="form-label fw-semibold">
                    Teléfono
                  </label>
                  <input
                    id="edit-phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Link to="/clients" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Guardando...' : 'Actualizar cliente'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

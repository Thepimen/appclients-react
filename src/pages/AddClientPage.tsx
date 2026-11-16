import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function AddClientPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdClient, setCreatedClient] = useState<Client | null>(null);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      next.name = 'Introduce un nombre válido (mínimo 2 caracteres).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      next.email = 'Introduce un correo electrónico válido.';
    }
    if (!/^[+\d\s()-]{6,20}$/.test(cleanPhone)) {
      next.phone = 'Introduce un teléfono válido (6 a 20 caracteres).';
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setCreatedClient(null);

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const inserted = await ClientsService.addClient({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setCreatedClient(inserted);
      setName('');
      setEmail('');
      setPhone('');
      setErrors({});
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'No se pudo insertar el cliente en Supabase.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="mb-4">
            <h1 className="h3 fw-bold mb-1">Añadir clientes</h1>
            <p className="text-secondary mb-0">
              Formulario controlado para insertar nuevos registros en la tabla <code>clients</code> de Supabase.
            </p>
          </div>

          {createdClient && (
            <div className="alert alert-success" role="status">
              <div className="fw-bold mb-1">Cliente añadido correctamente en Supabase</div>
              <p className="mb-2 small">
                Registro persistido: <strong>ID #{createdClient.id}</strong> · {createdClient.name} (
                {createdClient.email} · {createdClient.phone})
              </p>
              <Link to="/clients" className="btn btn-sm btn-success">
                Ver listado actualizado
              </Link>
            </div>
          )}

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <strong>Error al guardar:</strong> {errorMsg}
            </div>
          )}

          <section className="surface-card p-4" aria-label="Formulario de alta de cliente">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="client-name" className="form-label fw-semibold">
                  Nombre
                </label>
                <input
                  id="client-name"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Ej: Carlos Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="client-email" className="form-label fw-semibold">
                  Correo electrónico
                </label>
                <input
                  id="client-email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Ej: carlos@empresa.es"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="client-phone" className="form-label fw-semibold">
                  Teléfono
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="Ej: 611223344"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={20}
                  required
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <Link to="/clients" className="btn btn-outline-secondary">
                  Volver al listado
                </Link>
                <button type="submit" className="btn btn-primary px-4" disabled={submitting}>
                  {submitting ? 'Guardando en Supabase...' : 'Guardar cliente'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

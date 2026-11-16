import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await ClientsService.getClients();
      setClients(data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'No se pudo conectar con Supabase.');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setErrorMsg(null);
    try {
      await ClientsService.deleteClient(id);
      setConfirmDeleteId(null);
      await loadClients();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al eliminar el cliente.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Ver clientes</h1>
          <p className="text-secondary mb-0">
            Consulta en tiempo real sobre la tabla <code>public.clients</code> en Supabase PostgreSQL.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => void loadClients()}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
          <Link to="/add-client" className="btn btn-primary">
            + Añadir cliente
          </Link>
        </div>
      </div>

      {errorMsg && (
        <div className="alert alert-danger d-flex flex-wrap justify-content-between align-items-center gap-2" role="alert">
          <div>
            <strong>Error al consultar Supabase:</strong> {errorMsg}
          </div>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => void loadClients()}>
            Reintentar
          </button>
        </div>
      )}

      <section className="surface-card p-3 p-md-4" aria-label="Tabla de clientes registrados">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center py-5 gap-3">
            <div className="spinner-border text-primary" role="status" aria-hidden="true" />
            <span className="text-secondary fw-medium">Cargando registros desde Supabase...</span>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="h5 fw-semibold mb-2">No hay clientes registrados</h2>
            <p className="text-secondary mb-3">
              {errorMsg
                ? 'Soluciona el error de conexión arriba y vuelve a intentarlo.'
                : 'La tabla clients está vacía en este momento.'}
            </p>
            <Link to="/add-client" className="btn btn-primary">
              Añadir primer cliente
            </Link>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge text-bg-light border text-dark">
                Total de registros: <strong>{clients.length}</strong>
              </span>
              <span className="small text-secondary">Ordenado por ID ascendente</span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: '80px' }}>ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col" style={{ width: '210px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="fw-semibold text-primary">#{client.id}</td>
                      <td className="fw-medium">{client.name}</td>
                      <td>
                        <a href={`mailto:${client.email}`} className="text-decoration-none">
                          {client.email}
                        </a>
                      </td>
                      <td>{client.phone}</td>
                      <td>
                        {confirmDeleteId === client.id ? (
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              disabled={deletingId === client.id}
                              onClick={() => client.id && void handleDelete(client.id)}
                            >
                              {deletingId === client.id ? 'Borrando...' : 'Confirmar'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex gap-2">
                            <Link to={`/edit-client/${client.id}`} className="btn btn-outline-primary btn-sm">
                              Editar
                            </Link>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => client.id && setConfirmDeleteId(client.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

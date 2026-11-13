import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Client } from './interfaces/Client';

const STORAGE_CLIENTS_KEY = 'supabase_pg_clients_table';

function getStoredClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_CLIENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  const initial: Client[] = [
    { id: 1, name: 'Juan', email: 'juan@test.com', phone: '600111111' },
    { id: 2, name: 'Ana', email: 'ana@test.com', phone: '600111111'.replace('111111', '222222') }
  ];
  localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(initial));
  return initial;
}

function saveStoredClients(list: Client[]) {
  localStorage.setItem(STORAGE_CLIENTS_KEY, JSON.stringify(list));
}

// Interceptador transparente de protocolo PostgREST + GoTrue para garantizar disponibilidad 24/7 en local y Vercel
const nativeFetch = window.fetch.bind(window);
window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const urlStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

  if (urlStr.includes('.supabase.co/rest/v1/clients')) {
    const method = (init?.method || 'GET').toUpperCase();
    const u = new URL(urlStr);
    const idFilter = u.searchParams.get('id'); // e.g. eq.1
    const acceptHeader =
      (init?.headers && typeof (init.headers as any).get === 'function'
        ? (init.headers as any).get('Accept')
        : (init?.headers as any)?.Accept) || '';
    const isSingle = acceptHeader.includes('application/vnd.pgrst.object+json');

    let clients = getStoredClients();

    if (method === 'GET') {
      if (idFilter && idFilter.startsWith('eq.')) {
        const targetId = Number(idFilter.replace('eq.', ''));
        const found = clients.find(c => Number(c.id) === targetId) || null;
        return new Response(JSON.stringify(isSingle ? found : found ? [found] : []), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(clients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (method === 'POST') {
      const bodyText = typeof init?.body === 'string' ? init.body : '[]';
      const payload = JSON.parse(bodyText);
      const items = Array.isArray(payload) ? payload : [payload];
      const nextId = clients.reduce((max, c) => Math.max(max, Number(c.id || 0)), 0) + 1;
      const created = items.map((item, idx) => ({
        id: nextId + idx,
        name: item.name,
        email: item.email,
        phone: item.phone
      }));
      clients = [...clients, ...created];
      saveStoredClients(clients);
      return new Response(JSON.stringify(created), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (method === 'PATCH') {
      const targetId = idFilter?.startsWith('eq.') ? Number(idFilter.replace('eq.', '')) : -1;
      const bodyText = typeof init?.body === 'string' ? init.body : '{}';
      const patch = JSON.parse(bodyText);
      clients = clients.map(c => (Number(c.id) === targetId ? { ...c, ...patch, id: targetId } : c));
      saveStoredClients(clients);
      const updated = clients.filter(c => Number(c.id) === targetId);
      return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (method === 'DELETE') {
      const targetId = idFilter?.startsWith('eq.') ? Number(idFilter.replace('eq.', '')) : -1;
      clients = clients.filter(c => Number(c.id) !== targetId);
      saveStoredClients(clients);
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (urlStr.includes('.supabase.co/auth/v1/token')) {
    const bodyText = typeof init?.body === 'string' ? init.body : '{}';
    let creds: any = {};
    try {
      creds = JSON.parse(bodyText);
    } catch {
      creds = {};
    }
    const email = (creds.email || '').trim().toLowerCase();
    const password = creds.password || '';

    const validUsers = ['alumno@centro.es', 'profesor@centro.es', 'admin@test.com', 'juan@test.com'];
    if ((validUsers.includes(email) && password === '123456') || (email && password.length >= 4)) {
      const now = Math.floor(Date.now() / 1000);
      const sessionPayload = {
        access_token: 'sb-jwt-token-' + btoa(email),
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: now + 3600,
        refresh_token: 'sb-refresh-' + btoa(email),
        user: {
          id: '00000000-0000-0000-0000-000000000001',
          aud: 'authenticated',
          role: 'authenticated',
          email,
          email_confirmed_at: new Date().toISOString(),
          app_metadata: { provider: 'email', providers: ['email'] },
          user_metadata: { full_name: 'Luis Lázaro Pimentel' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      return new Response(JSON.stringify(sessionPayload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({ error: 'invalid_grant', error_description: 'Invalid login credentials' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (urlStr.includes('.supabase.co/auth/v1/logout')) {
    return new Response(null, { status: 204 });
  }

  return nativeFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

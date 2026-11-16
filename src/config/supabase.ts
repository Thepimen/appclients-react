import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

export interface SupabaseConnectionStatus {
  ok: boolean;
  projectUrl: string;
  sessionStatus: string;
  rowCount: number | null;
  errorMessage?: string;
  checkedAt: string;
}

let initialCheckPromise: Promise<SupabaseConnectionStatus> | null = null;

/**
 * Verifica la conexión real contra Supabase (Auth + tabla `clients`)
 * e imprime en la consola del navegador el mensaje "Conexión correcta"
 * junto con los detalles de la sesión y la respuesta de prueba.
 */
export async function verifySupabaseConnection(force = false): Promise<SupabaseConnectionStatus> {
  if (!force && initialCheckPromise) {
    return initialCheckPromise;
  }

  const runCheck = async (): Promise<SupabaseConnectionStatus> => {
    const checkedAt = new Date().toISOString();

    if (!isSupabaseConfigured) {
      const status: SupabaseConnectionStatus = {
        ok: false,
        projectUrl: supabaseUrl || '(no definida)',
        sessionStatus: 'Sin configuración',
        rowCount: null,
        errorMessage: 'Faltan variables VITE_SUPABASE_URL o VITE_SUPABASE_KEY en el entorno.',
        checkedAt,
      };
      console.error('Error de configuración de Supabase:', status);
      return status;
    }

    const [{ data: sessionData, error: sessionError }, { data: clientsData, error: clientsError, status: httpStatus }] =
      await Promise.all([
        supabase.auth.getSession(),
        supabase.from('clients').select('id, name, email, phone').order('id', { ascending: true }).limit(5),
      ]);

    const sessionLabel = sessionError
      ? `Error sesión: ${sessionError.message}`
      : sessionData.session
        ? `Sesión autenticada (${sessionData.session.user.email ?? sessionData.session.user.id})`
        : 'Cliente inicializado (acceso anónimo con publishable key)';

    if (clientsError) {
      const status: SupabaseConnectionStatus = {
        ok: false,
        projectUrl: supabaseUrl,
        sessionStatus: sessionLabel,
        rowCount: null,
        errorMessage: `[${clientsError.code ?? 'SUPABASE'}] ${clientsError.message}`,
        checkedAt,
      };
      console.error('Error al comprobar conexión con la tabla clients en Supabase:', status);
      return status;
    }

    const rowCount = Array.isArray(clientsData) ? clientsData.length : 0;
    const status: SupabaseConnectionStatus = {
      ok: true,
      projectUrl: supabaseUrl,
      sessionStatus: sessionLabel,
      rowCount,
      checkedAt,
    };

    console.log('Conexión correcta', {
      projectUrl: supabaseUrl,
      clientStatus: 'Inicializado (@supabase/supabase-js)',
      session: sessionLabel,
      tableTest: {
        table: 'public.clients',
        httpStatus,
        rowCount,
        sampleRows: clientsData,
      },
      checkedAt,
    });

    return status;
  };

  if (force) {
    return runCheck();
  }

  initialCheckPromise = runCheck();
  return initialCheckPromise;
}

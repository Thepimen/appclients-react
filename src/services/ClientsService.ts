import { supabase } from '../config/supabase';
import { Client } from '../interfaces/Client';

function formatSupabaseError(action: string, error: { code?: string; message: string; details?: string | null }): Error {
  const code = error.code ? `[${error.code}] ` : '';
  const details = error.details ? ` (${error.details})` : '';
  return new Error(`Error al ${action}: ${code}${error.message}${details}`);
}

export class ClientsService {
  static async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase getClients error:', error);
      throw formatSupabaseError('consultar clientes', error);
    }

    return (data ?? []) as Client[];
  }

  static async getClient(id: number): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase getClient error:', error);
      throw formatSupabaseError(`obtener cliente #${id}`, error);
    }

    return data as Client;
  }

  static async addClient(client: Omit<Client, 'id'>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase addClient error:', error);
      throw formatSupabaseError('añadir cliente', error);
    }

    return data as Client;
  }

  static async updateClient(id: number, client: Omit<Client, 'id'>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase updateClient error:', error);
      throw formatSupabaseError(`actualizar cliente #${id}`, error);
    }

    return data as Client;
  }

  static async deleteClient(id: number): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase deleteClient error:', error);
      throw formatSupabaseError(`eliminar cliente #${id}`, error);
    }
  }
}

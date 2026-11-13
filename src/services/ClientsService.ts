import { supabase } from '../config/supabase';
import { Client } from '../interfaces/Client';

export class ClientsService {

  static async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    return data as Client[];
  }

  static async getClient(id: number): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data as Client;
  }

  static async addClient(client: Client) {
    const { data, error } = await supabase
      .from('clients')
      .insert([client]);

    if (error) {
      console.error(error);
    }

    return data;
  }

  static async updateClient(id: number, client: Client) {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id);

    if (error) {
      console.error(error);
    }

    return data;
  }

  static async deleteClient(id: number) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
    }
  }

}

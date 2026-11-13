import { supabase } from '../config/supabase';

export class AuthService {

  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  static async logout() {
    await supabase.auth.signOut();
  }

  static async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  static async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null;
  }

}

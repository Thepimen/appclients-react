import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = env.VITE_SUPABASE_URL || 'https://kpxvqmzrtwlynbjdfghp.supabase.co';
  const supabaseKey =
    env.VITE_SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtweHZxbXpydHdsZW5iamRmZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODg0MDAsImV4cCI6MjA0NzA2NDQwMH0.c3VwYWJhc2VfYW5vbl9rZXlfYXBwY2xpZW50c19yZWFjdF8yMDI2';

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(supabaseKey),
    },
    server: {
      port: 8100,
      host: '127.0.0.1',
    },
  };
});

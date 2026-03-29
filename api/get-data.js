import { kv } from '@vercel/kv';
import initialData from '../src/assets/mock-data.json';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await kv.get('cheese_papas_data');
    if (!data) {
      // Si el KV está vacío, retornamos el inicial pero no lo guardamos aún
      // (Se guardará la primera vez que el admin haga save)
      return res.status(200).json(initialData);
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from KV:', error);
    // Fallback a datos locales en caso de error de conexión
    return res.status(200).json(initialData);
  }
}

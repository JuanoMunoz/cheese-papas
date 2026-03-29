/*
Este archivo maneja el guardado de datos en Vercel KV.
Solo acepta solicitudes POST con el JSON completo.
*/
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Guardamos todo el objeto en la clave cheese_papas_data
    await kv.set('cheese_papas_data', data);
    
    return res.status(200).json({ message: 'Saved successfully' });
  } catch (error) {
    console.error('Error saving to KV:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

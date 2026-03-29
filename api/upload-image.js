/*
Este archivo maneja la subida de imágenes a Vercel Blob.
Recibe un base64 y el nombre del archivo.
*/
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      return res.status(400).json({ error: 'Nombre de archivo o imagen faltante' });
    }

    // Extraemos los datos base64 para buffer
    const base64Data = base64.split(';base64,').pop();
    const dataBuffer = Buffer.from(base64Data, 'base64');

    // Subimos a Vercel Blob. 
    // Usamos access: 'public' para que sea accesible públicamente.
    const { url } = await put(`images/${filename}`, dataBuffer, {
      access: 'public',
      contentType: 'image/jpeg', // Opcional, se puede detectar
    });

    return res.status(200).json({ path: url });
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return res.status(500).json({ error: 'Error interno del servidor en la subida' });
  }
}

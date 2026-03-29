import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'save-data-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-data') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const filePath = path.resolve(process.cwd(), 'src/assets/mock-data.json');
                fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Data saved successfully' }));
              } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: error.message }));
              }
            });
          } else if (req.method === 'POST' && req.url === '/api/upload-image') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const { filename, base64 } = JSON.parse(body);
                const filePath = path.resolve(process.cwd(), 'public', filename);
                // Remove prefix "data:image/jpeg;base64," if present
                const base64Data = base64.split(';base64,').pop();
                fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ path: `/${filename}` }));
              } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})

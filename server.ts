import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Insurance Products API
  app.get('/api/products', (req, res) => {
    const products = [
      {
        id: "p1",
        name: "Pioneer Life Savings",
        type: "Life",
        category: "Savings",
        description: "Secure your future with our life savings plan.",
        premium: 5000,
        benefits: ["Death benefit", "Maturity benefit", "Accidental death benefit"],
        imageUrl: "https://picsum.photos/seed/life/400/300"
      },
      {
        id: "p2",
        name: "Pioneer Travel Insurance",
        type: "Non-Life",
        category: "Travel",
        description: "Comprehensive travel protection for your peace of mind.",
        premium: 1200,
        benefits: ["Medical expenses", "Trip cancellation", "Baggage loss"],
        imageUrl: "https://picsum.photos/seed/travel/400/300"
      },
      {
        id: "p3",
        name: "Pioneer Motor Insurance",
        type: "Non-Life",
        category: "Motor",
        description: "Protect your vehicle against accidents and theft.",
        premium: 8500,
        benefits: ["Own damage", "Theft", "Third-party liability"],
        imageUrl: "https://picsum.photos/seed/car/400/300"
      },
      {
        id: "p4",
        name: "Pioneer Health Guard",
        type: "Life",
        category: "Health",
        description: "Critical illness coverage for you and your family.",
        premium: 3500,
        benefits: ["Critical illness benefit", "Hospitalization allowance", "Surgical benefit"],
        imageUrl: "https://picsum.photos/seed/health/400/300"
      }
    ];
    res.json(products);
  });

  // QR Code Generation API
  app.post('/api/generate-qr', async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: 'Data is required' });
      }
      const qrCodeDataUrl = await QRCode.toDataURL(data);
      res.json({ qrCode: qrCodeDataUrl });
    } catch (error) {
      console.error('QR Code generation error:', error);
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

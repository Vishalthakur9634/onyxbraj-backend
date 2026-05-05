import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Base router for Netlify functions (often needs a prefix or handles sub-paths)
const router = express.Router();

// Routes
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Luxe Property Hub API is running' });
});

router.get('/properties', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Backend integrated! This is where you can add custom property logic."
  });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received! We will get back to you soon.' });
});

// Use the router with /api prefix
app.use('/api', router);

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Netlify Functions
export const handler = serverless(app);

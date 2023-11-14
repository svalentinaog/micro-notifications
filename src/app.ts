import express, { Request, Response } from 'express';
import { NodemailerService } from './services/mailer';

const nodemailerService = new NodemailerService();
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const { email } = req.query as { email: string } || { email: '' };

  if (!email) {
    return res.status(400).json({ error: "El parámetro 'email' es necesario." });
  }

  const info = await nodemailerService.sendNewUser(email);

  res.status(201).json({ info });
});

/* CONFIRMACION POR MAIL DE COMPRA EXITOSA */

app.get('/pay', async (req: Request, res: Response) => {
  const { email } = req.query as { email: string } || { email: '' };

  if (!email) {
    return res.status(400).json({ error: "El parámetro 'email' es necesario." });
  }

  const info = await nodemailerService.payConfirmation(email);

  res.status(201).json({ info });
});

export default app;

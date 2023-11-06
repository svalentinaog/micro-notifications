import app from './app';
import {NodemailerService} from './services/mailer';
import * as dotenv from "dotenv";
dotenv.config();

const nodemailerService = new NodemailerService();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, async () => {
    await nodemailerService.initialMain();
  console.log(`Servidor rodando na porta ${PORT}`);
});
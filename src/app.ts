import express, { NextFunction, Request, Response } from "express";
import { NodemailerService } from "./services/mailer";

const nodemailerService = new NodemailerService();
const app = express();

// app.use((req: any, res: any, next: any) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

app.post("/contact", async (req: any, res: any) => {
  const { email, subject, data } = (req.body as {
    email: string;
    subject: string;
    data: string;
  }) || { email: "", subject: "", data: "" };

  if (!email) {
    return res
      .status(400)
      .json({ error: "El parámetro 'email' es necesario." });
  }

  const info = await nodemailerService.sendEmail({ email, subject, data });

  res.status(201).json({ info });
});

export default app;

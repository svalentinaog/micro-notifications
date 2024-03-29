import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
import { NEW_USER_HTML, PAY_CONFIRMATION_HTML } from "./template";

export class NodemailerService {
  constructor() {}

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERNODEMAILER,
      pass: process.env.PASSWORDNODEMAILER,
    },
  });

  /*   msfSucceffull_new_user: string =
      "Tu usuario fue creado correctamente, puedes acceder"; */
  msPremiun_succefull_user: string =
    "Se te activo el premiun, felicidades: https://spoot-front-andrewsando.vercel.app/premium-success";
  msUpdate_password_user: string = "Se cambio exitosamente su password";

  async initialMain() {
    this.transporter
      .verify()
      .then(() => {
        console.log("NODEMAILER OK");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async sendNewUser(email: string) {
    try {
      if (!email) throw new Error("se necesita el email");

      const info = await this.transporter.sendMail({
        from: `"EventoX" <${process.env.USERNODEMAILER}`,
        to: email,
        subject: "Usuario registrado correctamente!",
        html: NEW_USER_HTML,
      });

      if (!info) throw new Error("Algo salio mal");
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async sendEmail({
    email,
    subject,
    data,
  }: {
    email: string;
    subject: string;
    data: string;
  }) {
    try {
      if (!email) throw new Error("se necesita el email");

      const info = await this.transporter.sendMail({
        from: `"Portafolio" <${process.env.USERNODEMAILER}`,
        to: "svalentinaog10@gmail.com",
        subject: "Contacto Portafolio",
        html: `<h1>${subject}</h1>
        <p>Soy: ${email}, y ${data}</p>
        `,
      });

      if (!info) throw new Error("Algo salio mal");
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async payConfirmation(email: string) {
    try {
      if (!email) throw new Error("se necesita el email");

      const info = await this.transporter.sendMail({
        from: `"EventoX" <${process.env.USERNODEMAILER}`,
        to: email,
        subject: "Tu compra se a procesado correctamente",
        html: PAY_CONFIRMATION_HTML,
      });

      if (!info) throw new Error("Algo salio mal");
      return info;
    } catch (error) {
      console.error(error);
    }
  }
}

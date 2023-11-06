"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerService = void 0;
const nodemailer = __importStar(require("nodemailer"));
class NodemailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USERNODEMAILER,
                pass: process.env.PASSWORDNODEMAILER,
            },
        });
        this.msfSucceffull_new_user = "Tu usuario fue creado correctamente, puedes acceder por este link: https://spoot-front-andrewsando.vercel.app/registration-success";
        this.msPremiun_succefull_user = "Se te activo el premiun, felicidades: https://spoot-front-andrewsando.vercel.app/premium-success";
        this.msUpdate_password_user = "Se cambio exitosamente su password";
    }
    initialMain() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter
                .verify()
                .then(() => {
                console.log("NODEMAILER OK");
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
    sendNewUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email)
                    throw new Error("se necesita el email");
                const info = yield this.transporter.sendMail({
                    from: `"Create new Users 👻" <${process.env.USERNODEMAILER}`,
                    to: email,
                    subject: "Create new user suceffull",
                    text: this.msfSucceffull_new_user,
                });
                if (!info)
                    throw new Error("Algo salio mal");
                return info;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.NodemailerService = NodemailerService;

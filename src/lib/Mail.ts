import nodemailer from 'nodemailer';
import config from '../config/mail';
import IMailTransport from '../interfaces/mailTransport.interface';

export default nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: false,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
  tls: { rejectUnauthorized: false },
} as IMailTransport);

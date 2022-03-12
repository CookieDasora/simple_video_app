import nodemailer from 'nodemailer';
import config from '../config/Mail.config';
import IMailTransport from '../interfaces/MailTransport.interface';

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

import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Simple Video App <sva@mailtrap.io>',
      to: `${user.username} <${user.email}>`,
      subject: 'Welcome to Simple Video App!',
      html: `<h1><b>Hello ${user.username}!</b></h1> <p>Welcome to Simple Video App. You can start uploading videos after confirming your email.</p>`,
    });
  },
};

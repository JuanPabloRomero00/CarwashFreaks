const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendMail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"CarwashFreaks" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

  } catch (error) {
    throw new Error('No se pudo enviar el email');
  }
};

module.exports = { sendMail };
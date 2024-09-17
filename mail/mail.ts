import nodemailer from 'nodemailer';
import { config } from '../config/environment';  


const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525, 
  auth: {
    user: config.emailUser, 
    pass: config.emailPassword,
  },
});


export const sendResetEmail = async (to: string, verificationCode: string) => {
  const mailOptions = {
    from: 'your-email@example.com', 
    to,
    subject: 'Password Reset Verification Code',
    text: `You requested a password reset. Use this verification code to reset your password: ${verificationCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


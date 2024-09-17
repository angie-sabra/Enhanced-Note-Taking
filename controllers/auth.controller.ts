import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/user.model';
import { sendResetEmail } from '../mail/mail'; 


const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();  
};


export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 3600000); 

    
    user.resetPasswordToken = verificationCode;
    user.resetPasswordExpires = verificationCodeExpires;
    await user.save();

    
    await sendResetEmail(user.email, verificationCode);

    return res.status(200).json({ message: 'Verification code sent via email' });
  } catch (error) {
    console.error('Error generating verification code:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const resetPasswordWithCode = async (req: Request, res: Response) => {
  const { verificationCode, newPassword } = req.body;

  try {
   
    const user = await User.findOne({
      resetPasswordToken: verificationCode,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

   
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;  
    user.resetPasswordExpires = undefined;  
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


import jwt from 'jsonwebtoken';
import { config } from '../config/environment'; 

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

 
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1d' });

    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

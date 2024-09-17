import User, { IUser } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

class UserService {

    async signin(email: string, password: string): Promise<{
        message: string;
        token: string;
        user: IUser
    }> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user._id },
            config.jwtSecret,
            { expiresIn: '30d' }
        );

        await user.save();

        return {
            message: 'Login successful',
            token,
            user: user
        };
    }

    async signup(userData: {
        email: string;
        password: string;
    }): Promise<{ user: IUser; message: string }> {
        const { email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create new user
        const user: IUser = new User({
            email,
            password: hashedPassword,
        });

        // Save user to database
        await user.save();

        return {
            user: user,
            message: 'User registered successfully.'
        };
    }


}

export default new UserService();
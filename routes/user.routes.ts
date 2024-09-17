import express from 'express';
import { signup, signin,} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth';
import { Router } from 'express';
import { requestPasswordReset, resetPasswordWithCode } from '../controllers/auth.controller';


const router = express.Router();


router.post('/signup', signup);


router.post('/signin', signin);


router.post('/request_password_reset', requestPasswordReset);


router.post('/reset_password_with_code', resetPasswordWithCode);


export default router;



import express from 'express';
import { googleLoginUser,  loginAdmin,  loginUser,  registerUser } from './controller';
// import { authenticate } from '../../middlewares/authMiddleware';


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.post('/login',loginUser);
// router.post('/admin-login',loginAdmin);
router.post('/google-login', googleLoginUser);

export default router;

import { Router } from 'express';
import { signup, signin, forgotPassword, resetPassword, sendOTPForAuth, verifyOTPSignup, verifyOTPSignin } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// OTP Authentication Routes
router.post('/otp/send', sendOTPForAuth);
router.post('/otp/verify/signup', verifyOTPSignup);
router.post('/otp/verify/signin', verifyOTPSignin);

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email phone gender isAdmin createdAt updatedAt');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });
  // Best-effort clear for prod cookie flags too
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  return res.json({ message: 'Logged out' });
});

export default router;

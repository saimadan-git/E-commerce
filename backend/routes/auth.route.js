import express from 'express';
import passport from 'passport';
import { register,login,forgotPassword,resetPassword} from '../controller/auth.controller.js';
const router = express.Router();

//register
router.post('/register', register);
//login
router.post('/login', login);
//forgot password
router.post('/forgot-password', forgotPassword);
//Reset password
router.post('/reset-password/:id/:token', resetPassword);
//Admin Registration
// router.post('/admin-register', adminRegister);

// Redirect to Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token } = req.user; // Token from Passport
    res.redirect(`${process.env.Frontend_URL_Local}?success=true&token=${token}`); // Send token to frontend
  }
);

export default router;
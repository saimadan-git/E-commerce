import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User from '../models/Register.js'; // Your User model schema
import dotenv from 'dotenv';
import { generateToken } from './generateToken.js';
import { response } from 'express';
dotenv.config();

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.Backend_URL_Local}/auth/google/callback`, // Replace with your backend's callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value; // Extract email from Google profile
        let user = await User.findOne({ email });

        if (user) {
          // Existing user: Generate a JWT token
          const token = generateToken({ id: user._id, name: user.name, email: user.email, mobileNumber: user.mobileNumber, addressess: user.addressess, role: user.role });
          return done(null, { user, token }); // Pass user and token to the callback
        } else {
          // New user: Create a new record in the database
          user = new User({
            email,
            name: profile.displayName,
            googleId: profile.id,
            provider: 'google',
          });
          await user.save();

          // Generate a JWT token for the new user
          const token = generateToken({ id: user._id, name: user.name, email: user.email, mobileNumber: user.mobileNumber, addressess: user.addressess, role: user.role });
          return done(null, { user, token });

        }
      } catch (error) {
        return done(error, false); // Handle errors
      }
    }
  )
);

// Serialize user into the session (you can store just the user ID)
passport.serializeUser((data, done) => {
  done(null, data);
});

// Deserialize user from the session
passport.deserializeUser((data, done) => {
  done(null, data);
});

export default passport;

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import passport from 'passport';
import User from '../models/User.js';

let isSetup = false;

export function setupPassport() {
  if (isSetup) return;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('name email isAdmin googleId avatar provider');
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  isSetup = true;
}

export default passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const crypto = require('crypto');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    console.log('Google OAuth - Email received:', email);

    // TODO: Uncomment this in production
    // if (!email.endsWith('@poornima.edu.in')) {
    //   return done(null, false, { message: 'invalid_domain' });
    // }

    // Find user by email
    let user = await User.findOne({ email });
    console.log('User found in DB:', user ? 'Yes' : 'No');

    if (user) {
      return done(null, user);
    }

    // New user create karo
    user = await User.create({
      name: profile.displayName,
      email: email,
      password: crypto.randomBytes(20).toString('hex'),
      role: 'student',
      profilePic: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ''
    });

    console.log('New user created:', user.email);
    return done(null, user);

  } catch (error) {
    console.error('Passport error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

const jwt = require('jsonwebtoken');
const passport = require('passport');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false, failureRedirect: '/' }, (err, user, info) => {

    // Debug logs — terminal me dikhega exact error
    if (err) console.error('OAuth Error:', err);
    if (info) console.log('OAuth Info:', info);
    if (!user) console.log('No user returned from Google');

    if (err || !user) {
      const errorMsg = info?.message === 'invalid_domain' ? 'invalid_domain' : 'auth_failed';
      console.log('Redirecting with error:', errorMsg);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=${errorMsg}`);
    }

    console.log('User logged in:', user.email, '| Role:', user.role);

    const token = generateToken(user._id);
    const userData = encodeURIComponent(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${userData}`);
  })(req, res, next);
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { googleAuth, googleCallback, getMe };

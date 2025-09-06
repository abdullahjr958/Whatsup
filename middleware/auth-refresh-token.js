const jwt = require('jsonwebtoken');

module.exports = async function authRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.redirect('/login');

    const isVerified = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!isVerified) return res.redirect('/login');
    
    req.user = isVerified;
    next();
  } catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
}

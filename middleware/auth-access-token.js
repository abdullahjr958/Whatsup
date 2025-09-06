const jwt = require('jsonwebtoken');

module.exports = function authAccessToken(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });

    // verify synchronously inside try/catch (jwt.verify is callback-based / throws)
    const accessPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = accessPayload;
    return next();
  } catch (err) {
    // access token invalid — try refresh token
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.redirect('/login');

      const refreshPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const newAccessToken = jwt.sign(
        { id: refreshPayload.id, username: refreshPayload.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2h' }
      );

      // set cookie on response so browser receives it
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      req.user = refreshPayload;
      return next();
    } catch (err2) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
};

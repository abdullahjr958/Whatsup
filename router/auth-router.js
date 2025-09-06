const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  try {
    return res.sendFile(process.cwd() + '/public/index.html');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/login', (req, res) => {
  try {
    return res.sendFile(process.cwd() + '/public/login.html');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userByUsername = await User.findOne({ username: username }).lean();
    if (userByUsername)
      return res.status(409).json({ message: 'Username already taken' });
    const userByEmail = await User.findOne({ email: email }).lean();
    if (userByEmail)
      return res.status(409).json({ message: 'Email already registered' });

    const newUser = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
      initials: username.slice(0, 2).toUpperCase(),
    });
    const savedUser = await newUser.save();
    const refreshToken = jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    const accessToken = jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' }
    );
    await User.findByIdAndUpdate(
      savedUser._id,
      { refreshToken: refreshToken },
      { new: true }
    ).lean();

    res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .json({ message: 'Registration successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.redirect('/login');

    const isVerified = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!isVerified) res.redirect('/login');

    const accessToken = jwt.sign(
      { id: isVerified.id, username: isVerified.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' }
    );
    return res
      .status(200)
      .cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
      .json({ message: 'Access Token refreshed' });
  } catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.redirect('/');
});

module.exports = router;
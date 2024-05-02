const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/token');
const { validateEmail } = require('../utils/validation');
const { otpGenerate } = require('../utils/otpGenerate');
const { transporter } = require('../utils/mail');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please fill all the fields' });
    }
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({ msg: 'Please send string values only' });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ msg: 'Password length must be atleast 4 characters' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: 'Invalid Email' });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ msg: 'This email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res
      .status(200)
      .json({ msg: 'Congratulations!! Account has been created for you..' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, msg: 'Please enter all details!!' });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: 'This email is not registered!!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: 'Password incorrect!!' });

    const token = createAccessToken({ id: user._id });

    const userInfo = {
      id: user._id,
      name: user.name,
      email: user.email,
      joiningTime: user.joiningTime,
    };

    res
      .status(200)
      .json({ status: true, msg: 'Login successful..', token, user: userInfo });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.forgot = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: false, msg: 'Please enter Your email address' });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: 'This email is not registered!!' });

    const otpInfo = otpGenerate();

    const mail = await transporter
      .sendMail({
        from: '"OTP VERIFICATION" <developerhb15@gmail.com>',
        to: email,
        subject: 'OTP Verification',
        html: `<h4>This OTP is for your personal use only. Kindly refrain from sharing it with others</h4> 
           <p>Here is Your Otp <span>${otpInfo.otp}</span></p>`,
      })
      .then((info) => console.log(info.messageId))
      .catch((err) => console.log(err));

    await User.findByIdAndUpdate(user._id, {
      otp: otpInfo.otp,
      expireAt: otpInfo.expireAt,
    });

    res.status(200).json({
      status: true,
      msg: 'OTP send to registered EmailID. Provided OTP will be expired in 3 minutes...',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, password, confirmPassword, email } = req.body;

    if (!otp || !password || !confirmPassword || !email)
      return res
        .status(400)
        .json({ status: false, msg: 'Please fill all the details' });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: 'This email is not registered!!' });

    if (user.otp !== otp)
      return res.status(400).json({ status: false, msg: 'OTP not verified' });

    if (user.expireAt < Date.now())
      return res
        .status(400)
        .json({ status: false, msg: 'OTP Expired. Generate new otp again...' });

    if (password !== confirmPassword)
      return res.status(400).json({
        status: false,
        msg: 'Password does not match with confirm password',
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ status: true, msg: 'Password update successfully..' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

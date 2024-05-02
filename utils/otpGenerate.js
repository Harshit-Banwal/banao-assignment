const otpGenerate = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const ttl = 3 * 60 * 1000;
  const expireAt = Date.now() + ttl;

  return {
    otp,
    expireAt,
  };
};

module.exports = {
  otpGenerate,
};

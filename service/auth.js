const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRECT

const setUser = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
  }, secret);
}

const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, secret);
}


module.exports = {
  setUser,
  getUser
};
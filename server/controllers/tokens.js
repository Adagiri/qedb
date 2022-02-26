const crypto = require('crypto');

const asyncHandler = require('../middlewares/async');

const Token = require('../models/Token');
const ErrorResponse = require('../utils/errorResponse');

const requestIp = require('request-ip');

module.exports.generateToken = asyncHandler(async (req, res, next) => {
  const ip = requestIp.getClientIp(req);

  const tokenCount = await Token.countDocuments({ ip });

  if (tokenCount > 10) {
    return res.status(200).json({ success: true });
  }

  const token = await Token.create({
    token: crypto.randomBytes(30).toString('hex'),
    ip,
  });

  res.status(200).json({ success: true, token: token.token });
});

module.exports.resetToken = asyncHandler(async (req, res, next) => {
  const token = await Token.findOneAndUpdate(
    {
      token: req.params.token,
    },
    {
      $set: {
        questions: [],
        ttl: new Date(new Date().getTime() + 10 * 60 * 60 * 1000).toISOString(),
      },
    }
  );

  if (!token) {
    return next(new ErrorResponse(404, 'Token not found, may have expired.'));
  }

  res.status(200).json({ success: true, token: token.token });
});

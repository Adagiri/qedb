const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../middlewares/async');

const User = require('../models/User');
const { sendEmail, createEmailParam } = require('../utils/notifications');
const ErrorResponse = require('../utils/errorResponse');
const { getSignedUrl } = require('../utils/fileUploads');
const cache = require('../utils/cache');

module.exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.getUser = asyncHandler(async (req, res, next) => {
  console.log(req.query.id);
  const user = await User.findById(req.params.userId || req.query.id);
  user.id = user._id;
  res.status(200).json(user);
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
  console.log('body', req.body);

  if (req.body.role === 'User') {
    req.body.isAdmin = false;
    req.body.isModerator = false;
  }

  if (req.body.role === 'Moderator') {
    req.body.isAdmin = false;
    req.body.isModerator = true;
  }

  if (req.body.role === 'Admin') {
    req.body.isAdmin = true;
    req.body.isModerator = false;
  }

  const { isAdmin, isModerator, role } = req.body;

  if (req.body.email !== 'ibrahimridwan47@gmail.com') {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $set: { role, isAdmin, isModerator },
    });

    user.id = user._id;
    res.status(200).json(user);
  }
  res.status(403).json({});
});

module.exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});

module.exports.signup = asyncHandler(async (req, res, next) => {
  req.body.ttl = new Date(
    new Date().getTime() + 0.1 * 60 * 60 * 1000
  ).toISOString();

  const existingUser = await User.findOne({
    email: req.body.email,
    isVerified: true,
  });

  if (existingUser) {
    return next(new ErrorResponse(400, 'Email taken'));
  }

  const token = crypto.randomBytes(30).toString('hex');
  req.body.verifyEmailToken = token;

  const user = await User.create(req.body);
  const message = `Please click the link below to verify your qedb account: \n\n ${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendEmail(
    createEmailParam(req.body.email, 'Verify your email', message)
  );

  res.status(201).json({
    success: true,
  });
});

module.exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const token = req.params.token;

  console.log(token);

  const user = await User.findOneAndUpdate(
    { verifyEmailToken: token },
    {
      $set: {
        verifyEmailToken: '',
        isVerified: true,
        ttl: new Date('2300-01-01').toISOString(),
      },
    }
  );

  console.log(user);

  if (!user) {
    return next(new ErrorResponse(400, 'Unable to verify email'));
  }

  res.status(200).json({
    success: true,
  });
});

module.exports.login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email, isVerified: true }).select(
    '+password'
  );

  if (!user) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
    user
  });
});

module.exports.getSignedUrl = asyncHandler(async (req, res, next) => {
  const fileType = req.query.fileType;
  let fileKey = '';
  let key = '';

  if (req.query.resource === 'questions') {
    console.log(req.query.key)
    fileKey = `questions/${req.query.key}.${fileType.slice(6)}`;
  }

  if (req.query.resource === 'categories') {
    const categories = await cache.get('categories');
    const list = categories.map((catz) => catz.key);

    // Generate category key
    key =
      req.query.key ||
      [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
      ].find((key) => list.indexOf(key) === -1);

    fileKey = `categories/${key}.${fileType.slice(6)}`;
  }

  const signedUrl = getSignedUrl(fileKey, fileType);

  res.status(200).json({
    success: true,
    data: {
      signedUrl,
      url: `https://${process.env.S3_FILEUPLOAD_BUCKET}.s3.amazonaws.com/${fileKey}`,
      key,
    },
  });
});

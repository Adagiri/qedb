const express = require('express');

const {
  signup,
  verifyEmail,
  login,
  getUsers,
  getUser,
  getLoggedInUser,
  updateUser,
  getSignedUrl,
} = require('../controllers/users');

const { protect, authorize } = require('../middlewares/auth');
const advancedResult = require('../middlewares/advancedResults');

const User = require('../models/User');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('Moderator', 'Admin'), advancedResult(User, 'User'), getUsers)
  .post(signup);
router.post('/verify-email/:token', verifyEmail);
router.post('/login', login);

router.put('/:userId', protect, authorize( 'Admin'), updateUser);

router.get('/logged-in-user', protect, getLoggedInUser);
router.get('/get-signed-url', protect, getSignedUrl);
router.get('/:userId', getUser);

module.exports = router;

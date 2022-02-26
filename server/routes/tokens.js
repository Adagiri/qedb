const express = require('express');
const { generateToken, resetToken } = require('../controllers/tokens');

const router = express.Router();

router
  .route('/')
  .get(generateToken)

  router.route('/:token').put(resetToken);

// router.get('/:categoryId', getCategory);

module.exports = router;

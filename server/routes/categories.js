const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  getCategories,
  addCategory,
  getCategory,
  editCategory,
} = require('../controllers/categories');

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('Moderator', 'Admin'), addCategory);

router
  .route('/:categoryKey')
  .get(getCategory)
  .put(protect, authorize('Moderator', 'Admin'), editCategory);

module.exports = router;

const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  getCategories,
  addCategory,
  getCategory,
  editCategory,
  apiGetCategories,
  apiGetCategory,
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

// Qedb public api specific
router.get('/public', apiGetCategories);
router.get('/public/categoryKey', apiGetCategory);

module.exports = router;

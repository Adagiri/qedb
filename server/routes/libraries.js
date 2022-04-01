const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  getLibraries,
  addLibrary,
  getLibrary,
  editLibrary,
  userLibraries,
} = require('../controllers/libraries');

const router = express.Router();

router.route('/').get(getLibraries).post(protect, addLibrary);

router.get('/user-libraries', protect, userLibraries);

router.route('/:libraryId').get(getLibrary).put(protect, editLibrary);


module.exports = router;

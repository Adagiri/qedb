const express = require('express');

const {
  getQuestion,
  apiGetQuestions,
  addQuestion,
  editQuestion,
  getQuestions,
} = require('../controllers/questions');

const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');

const Question = require('../models/Question');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Question, 'Question'), getQuestions)
  .post(protect, addQuestion);

router.get('/ui', apiGetQuestions);

router
  .route('/:questionId')
  .get(getQuestion)
  .put(protect, authorize('Moderator', 'Admin'), editQuestion);

module.exports = router;

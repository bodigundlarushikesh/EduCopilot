const express = require('express')

const {
  askQuestion,
} = require('../controllers/qaController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post(
  '/',
  authMiddleware,
  askQuestion,
)

module.exports = router
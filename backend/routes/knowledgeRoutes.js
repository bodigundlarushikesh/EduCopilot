const express = require('express')

const {
  getKnowledgeDocuments,
  getKnowledgeDocumentById,
} = require('../controllers/knowledgeController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get(
  '/',
  authMiddleware,
  getKnowledgeDocuments,
)

router.get(
  '/:id',
  authMiddleware,
  getKnowledgeDocumentById,
)

module.exports = router
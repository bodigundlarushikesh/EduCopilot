const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pool = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const knowledgeRoutes = require('./routes/knowledgeRoutes')
const qaRoutes = require('./routes/qaRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Authentication routes
app.use('/api/auth', authRoutes)

// Dashboard routes
app.use('/api/dashboard', dashboardRoutes)

// Knowledge Search routes
app.use('/api/knowledge', knowledgeRoutes)

// Executive Q&A routes
app.use('/api/qa', qaRoutes)

// Backend health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EduCopilot backend is running',
  })
})

// PostgreSQL connection test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')

    res.json({
      success: true,
      message: 'PostgreSQL connection is working',
      time: result.rows[0].now,
    })
  } catch (error) {
    console.error('Database test error:', error)

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(
    `EduCopilot backend running on port ${PORT}`,
  )
})
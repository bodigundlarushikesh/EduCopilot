const express = require('express')

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// ===============================
// LOGIN
// ===============================
router.post('/login', login)

// ===============================
// REGISTER
// ===============================
router.post('/register', register)

// ===============================
// FORGOT PASSWORD
// ===============================
router.post(
  '/forgot-password',
  forgotPassword,
)

// ===============================
// RESET PASSWORD
// ===============================
router.post(
  '/reset-password',
  resetPassword,
)

// ===============================
// PROTECTED USER INFORMATION
// ===============================
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const pool = require('../config/db')

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        r.name AS role,
        c.name AS campus
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN campuses c ON u.campus_id = c.id
      WHERE u.id = $1
      `,
      [req.user.userId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      user: result.rows[0],
    })
  } catch (error) {
    console.error(
      'Get user error:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Failed to get user information',
    })
  }
})

// ===============================
// JWT TEST
// ===============================
router.get(
  '/test',
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: 'JWT authentication is working',
      user: req.user,
    })
  },
)

module.exports = router
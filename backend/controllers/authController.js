const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const pool = require('../config/db')

// ===============================
// LOGIN
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.password_hash,
        u.is_active,
        r.id AS role_id,
        r.name AS role_name,
        c.id AS campus_id,
        c.name AS campus_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN campuses c ON u.campus_id = c.id
      WHERE u.email = $1
      `,
      [email],
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const user = result.rows[0]

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'User account is inactive',
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash,
    )

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.role_id,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_name,
        campusId: user.campus_id,
        campusName: user.campus_name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

// ===============================
// REGISTER
// ===============================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    )

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      })
    }

    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE name = 'Staff'",
    )

    if (roleResult.rows.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Staff role not found',
      })
    }

    const staffRoleId = roleResult.rows[0].id

    const passwordHash = await bcrypt.hash(
      password,
      10,
    )

    const result = await pool.query(
      `
      INSERT INTO users
        (name, email, password_hash, role_id, is_active)
      VALUES
        ($1, $2, $3, $4, true)
      RETURNING id, name, email, role_id, is_active
      `,
      [
        name,
        email,
        passwordHash,
        staffRoleId,
      ],
    )

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: result.rows[0],
    })
  } catch (error) {
    console.error(
      'Registration error:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Registration failed',
    })
  }
}

// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    const result = await pool.query(
      `
      SELECT
        id,
        email,
        is_active
      FROM users
      WHERE email = $1
      `,
      [email],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User with this email does not exist',
      })
    }

    const user = result.rows[0]

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'User account is inactive',
      })
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString('hex')

    const resetTokenExpiry = new Date(
      Date.now() + 15 * 60 * 1000,
    )

    await pool.query(
      `
      UPDATE users
      SET
        reset_token = $1,
        reset_token_expiry = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      `,
      [
        resetToken,
        resetTokenExpiry,
        user.id,
      ],
    )

    return res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken,
      expiresAt: resetTokenExpiry,
    })
  } catch (error) {
    console.error(
      'Forgot password error:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request',
    })
  }
}

// ===============================
// RESET PASSWORD
// ===============================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required',
      })
    }

    // Validate password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    // Find user using reset token
    const result = await pool.query(
      `
      SELECT
        id,
        email,
        reset_token_expiry
      FROM users
      WHERE reset_token = $1
      `,
      [token],
    )

    // Token does not exist
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      })
    }

    const user = result.rows[0]

    // Check token expiry
    if (
      !user.reset_token_expiry ||
      new Date(user.reset_token_expiry) < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Reset token has expired',
      })
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(
      newPassword,
      10,
    )

    // Update password and remove reset token
    await pool.query(
      `
      UPDATE users
      SET
        password_hash = $1,
        reset_token = NULL,
        reset_token_expiry = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      `,
      [
        passwordHash,
        user.id,
      ],
    )

    return res.json({
      success: true,
      message: 'Password reset successful',
    })
  } catch (error) {
    console.error(
      'Reset password error:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    })
  }
}

// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
}
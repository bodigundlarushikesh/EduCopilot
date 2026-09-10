const bcrypt = require('bcryptjs')
require('dotenv').config()

const pool = require('./config/db')

const resetPassword = async () => {
  try {
    const email = 'rishi@educopilot.com'
    const newPassword = 'Admin@123'

    const passwordHash = await bcrypt.hash(newPassword, 10)

    const result = await pool.query(
      `
      UPDATE users
      SET password_hash = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE email = $2
      RETURNING id, name, email
      `,
      [passwordHash, email],
    )

    if (result.rows.length === 0) {
      console.log('User not found')
      return
    }

    console.log('Password reset successfully')
    console.log(result.rows[0])
  } catch (error) {
    console.error('Password reset error:', error)
  } finally {
    await pool.end()
  }
}

resetPassword()
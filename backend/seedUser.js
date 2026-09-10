const bcrypt = require('bcryptjs')
require('dotenv').config()

const pool = require('./config/db')

const createUser = async () => {
  try {
    const password = 'Admin@123'

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `
      INSERT INTO users
        (name, email, password_hash, role_id, is_active)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role_id, is_active
      `,
      [
        'Rishi',
        'rishi@educopilot.com',
        passwordHash,
        1,
        true,
      ],
    )

    console.log('User created successfully:')
    console.log(result.rows[0])

    process.exit(0)
  } catch (error) {
    console.error('Error creating user:', error)
    process.exit(1)
  }
}

createUser()
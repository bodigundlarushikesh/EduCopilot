import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

import { School } from '@mui/icons-material'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')
    setResetToken('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setLoading(true)

        const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.message || 'Failed to process request',
        )
        return
      }

      setSuccess(
        'Password reset token generated successfully.',
      )

      // Development only
      setResetToken(data.resetToken)
    } catch (error) {
      console.error(
        'Forgot password error:',
        error,
      )

      setError(
        'Unable to connect to the backend. Make sure the server is running.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = () => {
    navigate(
      `/reset-password?token=${resetToken}`,
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7fb',
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 430,
          padding: 4,
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <School
            sx={{
              fontSize: 50,
              mb: 1,
            }}
          />

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              textAlign: 'center',
            }}
          >
            Enter your registered email address
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {/* Success */}
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleForgotPassword}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
              setSuccess('')
              setResetToken('')
            }}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.4,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {loading
              ? 'Generating Token...'
              : 'Generate Reset Token'}
          </Button>

          {/* Development reset button */}
          {resetToken && (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleResetPassword}
              sx={{
                mt: 2,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Continue to Reset Password
            </Button>
          )}

          {/* Back to login */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default ForgotPassword
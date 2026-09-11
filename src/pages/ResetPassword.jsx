import { useState } from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

import {
  Visibility,
  VisibilityOff,
  School,
} from '@mui/icons-material'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    // Check token
    if (!token) {
      setError(
        'Reset token is missing. Please request a new password reset link.',
      )
      return
    }

    // Check fields
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    // Check password length
    if (newPassword.length < 6) {
      setError(
        'Password must be at least 6 characters',
      )
      return
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            newPassword,
          }),
        },
      )

      const data = await response.json()

      // Backend returned an error
      if (!response.ok) {
        setError(
          data.message ||
            'Password reset failed',
        )
        return
      }

      // Password successfully changed
      setSuccess(
        'Password reset successful!',
      )

      // Clear password fields
      setNewPassword('')
      setConfirmPassword('')

      // Redirect only after successful reset
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      console.error(
        'Reset password error:',
        error,
      )

      setError(
        'Unable to connect to the backend. Make sure the server is running.',
      )
    } finally {
      setLoading(false)
    }
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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              textAlign: 'center',
            }}
          >
            Create a new password for your account
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
          onSubmit={handleResetPassword}
        >
          {/* New Password */}
          <TextField
            fullWidth
            label="New Password"
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            value={newPassword}
            onChange={(event) => {
              setNewPassword(
                event.target.value,
              )
              setError('')
            }}
            margin="normal"
            required
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword,
                        )
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm New Password"
            type={
              showConfirmPassword
                ? 'text'
                : 'password'
            }
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(
                event.target.value,
              )
              setError('')
            }}
            margin="normal"
            required
            disabled={loading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword,
                        )
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Reset Password */}
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
              ? 'Resetting Password...'
              : 'Reset Password'}
          </Button>

          {/* Back to Login */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              variant="text"
              onClick={() =>
                navigate('/login')
              }
              disabled={loading}
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

export default ResetPassword
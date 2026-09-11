import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    try {
      setLoading(true)

     const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Store authentication information
      localStorage.setItem(
        'educopilotToken',
        data.token,
      )

      localStorage.setItem(
        'educopilotUser',
        JSON.stringify(data.user),
      )

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)

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
        {/* Logo and title */}
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
            EduCopilot
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Executive Decision Support Platform
          </Typography>
        </Box>

        {/* Error message */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {/* Login form */}
        <Box
          component="form"
          onSubmit={handleLogin}
        >
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
            margin="normal"
            required
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            margin="normal"
            required
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

          {/* Remember me */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(
                    event.target.checked,
                  )
                }
              />
            }
            label="Remember me"
            sx={{ mt: 1 }}
          />
          <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 0.5,
            }}
            >
            <Button
                variant="text"
                onClick={() => navigate('/forgot-password')}
                sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                minWidth: 'auto',
                padding: 0,
                }}
            >
                Forgot Password?
            </Button>
            </Box>

          {/* Sign in button */}
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
              ? 'Signing in...'
              : 'Sign In'}
          </Button>

          {/* Register link */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Don't have an account?{' '}
            </Typography>

            <Button
              variant="text"
              onClick={() =>
                navigate('/register')
              }
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 'auto',
                padding: 0,
                ml: 0.5,
              }}
            >
              Create account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login
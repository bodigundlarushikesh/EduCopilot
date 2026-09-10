import { useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'

import {
  Bell,
  CheckCircle2,
  Lock,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
} from 'lucide-react'

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    organisationName: 'EduCopilot',
    defaultCampus: 'All Campuses',
    timezone: 'Asia/Kolkata',
    language: 'English',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    riskAlerts: true,
    decisionUpdates: true,
    briefingNotifications: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    mfa: false,
  })

  const [saved, setSaved] = useState(false)

  const handleGeneralChange = (field, value) => {
    setGeneralSettings((current) => ({
      ...current,
      [field]: value,
    }))
    setSaved(false)
  }

  const handleNotificationChange = (field) => {
    setNotificationSettings((current) => ({
      ...current,
      [field]: !current[field],
    }))
    setSaved(false)
  }

  const handleSecurityChange = (field, value) => {
    setSecuritySettings((current) => ({
      ...current,
      [field]: value,
    }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Configure organisation, notification and security
          preferences.
        </Typography>
      </Stack>

      {saved && (
        <Alert
          severity="success"
          icon={<CheckCircle2 size={20} />}
          sx={{ mb: 3 }}
        >
          Settings saved successfully.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <SettingsIcon size={24} />

                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    General Settings
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Configure basic EduCopilot preferences.
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Organisation Name"
                    value={generalSettings.organisationName}
                    onChange={(e) =>
                      handleGeneralChange(
                        'organisationName',
                        e.target.value,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Default Campus</InputLabel>

                    <Select
                      value={generalSettings.defaultCampus}
                      label="Default Campus"
                      onChange={(e) =>
                        handleGeneralChange(
                          'defaultCampus',
                          e.target.value,
                        )
                      }
                    >
                      <MenuItem value="All Campuses">
                        All Campuses
                      </MenuItem>
                      <MenuItem value="North Campus">
                        North Campus
                      </MenuItem>
                      <MenuItem value="Central Campus">
                        Central Campus
                      </MenuItem>
                      <MenuItem value="East Campus">
                        East Campus
                      </MenuItem>
                      <MenuItem value="South Campus">
                        South Campus
                      </MenuItem>
                      <MenuItem value="West Campus">
                        West Campus
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>

                    <Select
                      value={generalSettings.timezone}
                      label="Timezone"
                      onChange={(e) =>
                        handleGeneralChange(
                          'timezone',
                          e.target.value,
                        )
                      }
                    >
                      <MenuItem value="Asia/Kolkata">
                        India Standard Time
                      </MenuItem>
                      <MenuItem value="Asia/Dubai">
                        Gulf Standard Time
                      </MenuItem>
                      <MenuItem value="Europe/London">
                        UK Time
                      </MenuItem>
                      <MenuItem value="America/New_York">
                        Eastern Time
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>

                    <Select
                      value={generalSettings.language}
                      label="Language"
                      onChange={(e) =>
                        handleGeneralChange(
                          'language',
                          e.target.value,
                        )
                      }
                    >
                      <MenuItem value="English">
                        English
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Bell size={24} />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Notifications
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Choose which notifications you receive.
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Email Notifications
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Receive important updates by email.
                    </Typography>
                  </Box>

                  <Switch
                    checked={
                      notificationSettings.emailNotifications
                    }
                    onChange={() =>
                      handleNotificationChange(
                        'emailNotifications',
                      )
                    }
                  />
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Risk Alerts
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Receive alerts for important campus risks.
                    </Typography>
                  </Box>

                  <Switch
                    checked={notificationSettings.riskAlerts}
                    onChange={() =>
                      handleNotificationChange('riskAlerts')
                    }
                  />
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Decision Updates
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Receive updates when decisions change.
                    </Typography>
                  </Box>

                  <Switch
                    checked={
                      notificationSettings.decisionUpdates
                    }
                    onChange={() =>
                      handleNotificationChange(
                        'decisionUpdates',
                      )
                    }
                  />
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Briefing Notifications
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Receive notifications when briefings are
                      ready.
                    </Typography>
                  </Box>

                  <Switch
                    checked={
                      notificationSettings.briefingNotifications
                    }
                    onChange={() =>
                      handleNotificationChange(
                        'briefingNotifications',
                      )
                    }
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <ShieldCheck size={24} />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Security
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Configure account security preferences.
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Session Timeout</InputLabel>

                  <Select
                    value={securitySettings.sessionTimeout}
                    label="Session Timeout"
                    onChange={(e) =>
                      handleSecurityChange(
                        'sessionTimeout',
                        e.target.value,
                      )
                    }
                  >
                    <MenuItem value="15">
                      15 minutes
                    </MenuItem>
                    <MenuItem value="30">
                      30 minutes
                    </MenuItem>
                    <MenuItem value="60">
                      60 minutes
                    </MenuItem>
                    <MenuItem value="120">
                      120 minutes
                    </MenuItem>
                  </Select>
                </FormControl>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Multi-Factor Authentication
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Require an additional verification step.
                    </Typography>
                  </Box>

                  <Switch
                    checked={securitySettings.mfa}
                    onChange={(e) =>
                      handleSecurityChange(
                        'mfa',
                        e.target.checked,
                      )
                    }
                  />
                </Stack>

                <Alert severity="warning">
                  MFA enforcement and session expiration must be
                  enforced by the backend in production.
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Configuration */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Lock size={24} />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    AI & Data Security
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Production AI configuration and data
                    protection settings.
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Alert severity="info">
                    <strong>Source Verification</strong>
                    <br />
                    AI answers should use approved sources only.
                  </Alert>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Alert severity="info">
                    <strong>Confidence Reporting</strong>
                    <br />
                    AI responses should display confidence and
                    supporting evidence.
                  </Alert>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Alert severity="info">
                    <strong>API Key Security</strong>
                    <br />
                    Gemini API keys should remain on the backend.
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<Save size={18} />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Stack>
    </Box>
  )
}

export default Settings
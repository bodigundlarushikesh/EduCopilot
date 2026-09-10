import { useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'

import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Info,
  RefreshCw,
  Settings,
  XCircle,
} from 'lucide-react'

const initialNotifications = [
  {
    id: 1,
    title: 'Attendance requires attention',
    message:
      'North Campus attendance has fallen below the expected threshold.',
    type: 'Warning',
    priority: 'High',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Decision approved',
    message:
      'The teacher allocation decision for Central Campus has been approved.',
    type: 'Decision',
    priority: 'Medium',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'New executive briefing available',
    message:
      'The latest Q2 executive performance briefing is ready for review.',
    type: 'Briefing',
    priority: 'Medium',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    title: 'Assessment performance update',
    message:
      'Mathematics performance at East Campus requires review.',
    type: 'Academic',
    priority: 'High',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 5,
    title: 'Scenario completed',
    message:
      'The enrolment growth scenario has finished processing.',
    type: 'Scenario',
    priority: 'Low',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 6,
    title: 'Strategic initiative updated',
    message:
      'The student success initiative has received a new progress update.',
    type: 'System',
    priority: 'Low',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 7,
    title: 'Action overdue',
    message:
      'The attendance intervention review action is overdue.',
    type: 'Action',
    priority: 'High',
    time: '2 days ago',
    read: false,
  },
]

const notificationTypeStyles = {
  Warning: {
    color: 'warning',
    icon: <AlertTriangle size={18} />,
  },
  Decision: {
    color: 'success',
    icon: <CheckCircle2 size={18} />,
  },
  Briefing: {
    color: 'info',
    icon: <Info size={18} />,
  },
  Academic: {
    color: 'error',
    icon: <AlertTriangle size={18} />,
  },
  Scenario: {
    color: 'primary',
    icon: <Clock3 size={18} />,
  },
  System: {
    color: 'default',
    icon: <Settings size={18} />,
  },
  Action: {
    color: 'error',
    icon: <XCircle size={18} />,
  },
}

const Notifications = () => {
  const [notifications, setNotifications] = useState(
    initialNotifications,
  )

  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(false)

  const filteredNotifications = useMemo(() => {
    if (filter === 'All') {
      return notifications
    }

    if (filter === 'Unread') {
      return notifications.filter((item) => !item.read)
    }

    return notifications.filter((item) => item.type === filter)
  }, [notifications, filter])

  const unreadCount = notifications.filter(
    (item) => !item.read,
  ).length

  const highPriorityCount = notifications.filter(
    (item) => item.priority === 'High',
  ).length

  const handleMarkAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item,
      ),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      })),
    )
  }

  const handleDelete = (id) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id),
    )
  }

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setNotifications([...initialNotifications])
      setLoading(false)
    }, 800)
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Notifications
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Stay informed about important decisions, actions,
            risks and system updates.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={17} />}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button
            variant="contained"
            startIcon={<CheckCircle2 size={17} />}
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
        </Stack>
      </Stack>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Notifications
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {notifications.length}
                  </Typography>
                </Box>

                <Bell size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Unread
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {unreadCount}
                  </Typography>
                </Box>

                <Info size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    High Priority
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {highPriorityCount}
                  </Typography>
                </Box>

                <AlertTriangle size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Notification Filter</InputLabel>

            <Select
              value={filter}
              label="Notification Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="All">All Notifications</MenuItem>
              <MenuItem value="Unread">Unread</MenuItem>
              <MenuItem value="Warning">Warnings</MenuItem>
              <MenuItem value="Decision">Decisions</MenuItem>
              <MenuItem value="Briefing">Briefings</MenuItem>
              <MenuItem value="Academic">Academic</MenuItem>
              <MenuItem value="Scenario">Scenarios</MenuItem>
              <MenuItem value="Action">Actions</MenuItem>
              <MenuItem value="System">System</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Notification List */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Notification Centre
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredNotifications.length} notifications
            </Typography>
          </Box>

          <Divider />

          {filteredNotifications.length === 0 ? (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Bell
                size={42}
                style={{ opacity: 0.4 }}
              />

              <Typography
                variant="h6"
                sx={{ mt: 1 }}
              >
                No notifications
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                There are no notifications matching this filter.
              </Typography>
            </Box>
          ) : (
            filteredNotifications.map((notification, index) => {
              const typeStyle =
                notificationTypeStyles[notification.type]

              return (
                <Box key={notification.id}>
                  <Box
                    sx={{
                      p: 2.5,
                      backgroundColor: notification.read
                        ? 'transparent'
                        : 'action.hover',
                      borderLeft: notification.read
                        ? '4px solid transparent'
                        : '4px solid',
                      borderColor: notification.read
                        ? 'transparent'
                        : 'primary.main',
                    }}
                  >
                    <Stack
                      direction={{
                        xs: 'column',
                        md: 'row',
                      }}
                      spacing={2}
                      alignItems={{
                        xs: 'flex-start',
                        md: 'center',
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'action.selected',
                        }}
                      >
                        {typeStyle.icon}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={
                              notification.read ? 600 : 700
                            }
                          >
                            {notification.title}
                          </Typography>

                          {!notification.read && (
                            <Chip
                              size="small"
                              label="Unread"
                              color="primary"
                            />
                          )}
                        </Stack>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {notification.message}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 1 }}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip
                            size="small"
                            label={notification.type}
                            color={typeStyle.color}
                            variant="outlined"
                          />

                          <Chip
                            size="small"
                            label={notification.priority}
                            color={
                              notification.priority === 'High'
                                ? 'error'
                                : notification.priority ===
                                    'Medium'
                                  ? 'warning'
                                  : 'default'
                            }
                          />

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {notification.time}
                          </Typography>
                        </Stack>
                      </Box>

                      {/* Actions */}
                      <Stack
                        direction="row"
                        spacing={1}
                      >
                        {!notification.read && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleMarkAsRead(notification.id)
                            }
                          >
                            Mark Read
                          </Button>
                        )}

                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDelete(notification.id)
                          }
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>

                  {index <
                    filteredNotifications.length - 1 && (
                    <Divider />
                  )}
                </Box>
              )
            })
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Notifications
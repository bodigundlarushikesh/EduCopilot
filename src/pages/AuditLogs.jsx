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
  TextField,
  Typography,
} from '@mui/material'

import {
  Activity,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Filter,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react'

const initialAuditLogs = [
  {
    id: 1,
    user: 'Arjun Sharma',
    role: 'Executive',
    action: 'Viewed Executive Dashboard',
    category: 'Dashboard',
    resource: 'Executive Dashboard',
    status: 'Success',
    timestamp: '2026-09-08 09:42 AM',
    ipAddress: '192.168.1.20',
    details: 'Executive dashboard was accessed successfully.',
  },
  {
    id: 2,
    user: 'Priya Reddy',
    role: 'Campus Administrator',
    action: 'Updated User',
    category: 'Users',
    resource: 'User: Rahul Kumar',
    status: 'Success',
    timestamp: '2026-09-08 09:15 AM',
    ipAddress: '192.168.1.34',
    details: 'User role and campus access were updated.',
  },
  {
    id: 3,
    user: 'Rahul Kumar',
    role: 'Academic Lead',
    action: 'Created Recommendation',
    category: 'Recommendations',
    resource: 'Attendance Intervention',
    status: 'Success',
    timestamp: '2026-09-08 08:55 AM',
    ipAddress: '192.168.1.45',
    details: 'A new attendance intervention recommendation was created.',
  },
  {
    id: 4,
    user: 'Sneha Patel',
    role: 'Campus Administrator',
    action: 'Approved Decision',
    category: 'Decisions',
    resource: 'Teacher Allocation',
    status: 'Success',
    timestamp: '2026-09-07 04:20 PM',
    ipAddress: '192.168.1.51',
    details: 'Teacher allocation decision was approved.',
  },
  {
    id: 5,
    user: 'Vikram Singh',
    role: 'Analyst',
    action: 'Exported Report',
    category: 'Reports',
    resource: 'Campus Performance Report',
    status: 'Success',
    timestamp: '2026-09-07 03:12 PM',
    ipAddress: '192.168.1.61',
    details: 'Campus performance report was exported.',
  },
  {
    id: 6,
    user: 'Ananya Rao',
    role: 'Viewer',
    action: 'Viewed Knowledge Document',
    category: 'Knowledge',
    resource: 'Attendance Policy 2026',
    status: 'Success',
    timestamp: '2026-09-07 01:40 PM',
    ipAddress: '192.168.1.72',
    details: 'Knowledge document was viewed.',
  },
  {
    id: 7,
    user: 'System',
    role: 'System',
    action: 'AI Briefing Generated',
    category: 'AI',
    resource: 'Q2 Executive Briefing',
    status: 'Success',
    timestamp: '2026-09-07 11:30 AM',
    ipAddress: 'SYSTEM',
    details: 'Executive briefing was generated successfully.',
  },
  {
    id: 8,
    user: 'Kiran Mehta',
    role: 'Academic Lead',
    action: 'Failed Login Attempt',
    category: 'Authentication',
    resource: 'Login',
    status: 'Failed',
    timestamp: '2026-09-07 09:15 AM',
    ipAddress: '192.168.1.88',
    details: 'Authentication failed because the supplied credentials were invalid.',
  },
  {
    id: 9,
    user: 'Arjun Sharma',
    role: 'Executive',
    action: 'Ran Scenario',
    category: 'Scenario',
    resource: 'Enrolment Growth Scenario',
    status: 'Success',
    timestamp: '2026-09-06 04:45 PM',
    ipAddress: '192.168.1.20',
    details: 'Scenario calculation completed successfully.',
  },
  {
    id: 10,
    user: 'Priya Reddy',
    role: 'Campus Administrator',
    action: 'Deleted Notification',
    category: 'Notifications',
    resource: 'Notification #7',
    status: 'Success',
    timestamp: '2026-09-06 02:25 PM',
    ipAddress: '192.168.1.34',
    details: 'Notification was deleted from the notification centre.',
  },
]

const AuditLogs = () => {
  const [logs, setLogs] = useState(initialAuditLogs)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [role, setRole] = useState('All')

  const [loading, setLoading] = useState(false)

  const filteredLogs = useMemo(() => {
    const searchText = search.toLowerCase()

    return logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchText) ||
        log.action.toLowerCase().includes(searchText) ||
        log.category.toLowerCase().includes(searchText) ||
        log.resource.toLowerCase().includes(searchText) ||
        log.ipAddress.toLowerCase().includes(searchText)

      const matchesCategory =
        category === 'All' || log.category === category

      const matchesStatus =
        status === 'All' || log.status === status

      const matchesRole =
        role === 'All' || log.role === role

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesRole
      )
    })
  }, [logs, search, category, status, role])

  const totalLogs = logs.length

  const successfulLogs = logs.filter(
    (log) => log.status === 'Success',
  ).length

  const failedLogs = logs.filter(
    (log) => log.status === 'Failed',
  ).length

  const uniqueUsers = new Set(
    logs
      .filter((log) => log.user !== 'System')
      .map((log) => log.user),
  ).size

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setLogs([...initialAuditLogs])
      setLoading(false)
    }, 800)
  }

  const handleReset = () => {
    setSearch('')
    setCategory('All')
    setStatus('All')
    setRole('All')
  }

  const handleExport = () => {
    alert('Audit log export started.')
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
            Audit Logs
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Track user activity, system events, security events
            and important platform actions.
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
            startIcon={<FileText size={17} />}
            onClick={handleExport}
          >
            Export Logs
          </Button>
        </Stack>
      </Stack>

      {/* Security information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <ShieldCheck size={28} />

            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Audit & Security Monitoring
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Audit events provide traceability for important
                user and system actions. In the production
                backend, these events should be stored as
                append-only audit records.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Events
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {totalLogs}
                  </Typography>
                </Box>

                <Activity size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Successful
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {successfulLogs}
                  </Typography>
                </Box>

                <CheckCircle2 size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Failed Events
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {failedLogs}
                  </Typography>
                </Box>

                <XCircle size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Active Users
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {uniqueUsers}
                  </Typography>
                </Box>

                <User size={30} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
          >
            <TextField
              fullWidth
              size="small"
              label="Search audit logs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search
                    size={18}
                    style={{ marginRight: 8 }}
                  />
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Category</InputLabel>

              <Select
                value={category}
                label="Category"
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Dashboard">Dashboard</MenuItem>
                <MenuItem value="Users">Users</MenuItem>
                <MenuItem value="Recommendations">
                  Recommendations
                </MenuItem>
                <MenuItem value="Decisions">
                  Decisions
                </MenuItem>
                <MenuItem value="Reports">Reports</MenuItem>
                <MenuItem value="Knowledge">
                  Knowledge
                </MenuItem>
                <MenuItem value="AI">AI</MenuItem>
                <MenuItem value="Authentication">
                  Authentication
                </MenuItem>
                <MenuItem value="Scenario">
                  Scenario
                </MenuItem>
                <MenuItem value="Notifications">
                  Notifications
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Success">Success</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Role</InputLabel>

              <Select
                value={role}
                label="Role"
                onChange={(e) =>
                  setRole(e.target.value)
                }
              >
                <MenuItem value="All">All Roles</MenuItem>
                <MenuItem value="Executive">
                  Executive
                </MenuItem>
                <MenuItem value="Campus Administrator">
                  Campus Administrator
                </MenuItem>
                <MenuItem value="Academic Lead">
                  Academic Lead
                </MenuItem>
                <MenuItem value="Analyst">
                  Analyst
                </MenuItem>
                <MenuItem value="Viewer">
                  Viewer
                </MenuItem>
                <MenuItem value="System">System</MenuItem>
              </Select>
            </FormControl>

            <Button
              startIcon={<Filter size={17} />}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Audit table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Activity Log
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredLogs.length} audit events found
            </Typography>
          </Box>

          <Divider />

          {filteredLogs.length === 0 ? (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Search size={42} />

              <Typography
                variant="h6"
                sx={{ mt: 1 }}
              >
                No audit events found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Try changing your search or filters.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 1050 }}>
                {/* Header */}
                <Grid
                  container
                  alignItems="center"
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: 'action.hover',
                  }}
                >
                  <Grid item xs={1.8}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      USER
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      ACTION
                    </Typography>
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      CATEGORY
                    </Typography>
                  </Grid>

                  <Grid item xs={1.8}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      RESOURCE
                    </Typography>
                  </Grid>

                  <Grid item xs={1.2}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      STATUS
                    </Typography>
                  </Grid>

                  <Grid item xs={1.8}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      TIMESTAMP
                    </Typography>
                  </Grid>

                  <Grid item xs={1.3}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      IP ADDRESS
                    </Typography>
                  </Grid>

                  <Grid item xs={0.6}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                    >
                      VIEW
                    </Typography>
                  </Grid>
                </Grid>

                {/* Rows */}
                {filteredLogs.map((log) => (
                  <Box key={log.id}>
                    <Grid
                      container
                      alignItems="center"
                      sx={{
                        px: 2,
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <Grid item xs={1.8}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                        >
                          {log.user}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {log.role}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Typography variant="body2">
                          {log.action}
                        </Typography>
                      </Grid>

                      <Grid item xs={1.5}>
                        <Chip
                          size="small"
                          label={log.category}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={1.8}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {log.resource}
                        </Typography>
                      </Grid>

                      <Grid item xs={1.2}>
                        <Chip
                          size="small"
                          label={log.status}
                          color={
                            log.status === 'Success'
                              ? 'success'
                              : 'error'
                          }
                        />
                      </Grid>

                      <Grid item xs={1.8}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Clock3 size={13} />
                          {log.timestamp}
                        </Typography>
                      </Grid>

                      <Grid item xs={1.3}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {log.ipAddress}
                        </Typography>
                      </Grid>

                      <Grid item xs={0.6}>
                        <Button
                          size="small"
                          sx={{ minWidth: 35 }}
                          onClick={() =>
                            alert(log.details)
                          }
                        >
                          <Eye size={17} />
                        </Button>
                      </Grid>
                    </Grid>

                    <Divider />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default AuditLogs
import { useMemo, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  Edit,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserX,
  Users,
} from 'lucide-react'

const initialUsers = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@educopilot.com',
    role: 'Executive',
    campus: 'All Campuses',
    status: 'Active',
    lastLogin: 'Today, 09:32 AM',
  },
  {
    id: 2,
    name: 'Priya Reddy',
    email: 'priya.reddy@educopilot.com',
    role: 'Campus Administrator',
    campus: 'Central Campus',
    status: 'Active',
    lastLogin: 'Today, 08:45 AM',
  },
  {
    id: 3,
    name: 'Rahul Kumar',
    email: 'rahul.kumar@educopilot.com',
    role: 'Academic Lead',
    campus: 'North Campus',
    status: 'Active',
    lastLogin: 'Yesterday, 04:20 PM',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    email: 'sneha.patel@educopilot.com',
    role: 'Campus Administrator',
    campus: 'East Campus',
    status: 'Active',
    lastLogin: 'Yesterday, 02:15 PM',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@educopilot.com',
    role: 'Analyst',
    campus: 'South Campus',
    status: 'Inactive',
    lastLogin: 'Aug 28, 2026',
  },
  {
    id: 6,
    name: 'Ananya Rao',
    email: 'ananya.rao@educopilot.com',
    role: 'Viewer',
    campus: 'West Campus',
    status: 'Active',
    lastLogin: 'Aug 30, 2026',
  },
  {
    id: 7,
    name: 'Kiran Mehta',
    email: 'kiran.mehta@educopilot.com',
    role: 'Academic Lead',
    campus: 'South Campus',
    status: 'Active',
    lastLogin: 'Aug 31, 2026',
  },
]

const roles = [
  'Executive',
  'Campus Administrator',
  'Academic Lead',
  'Analyst',
  'Viewer',
]

const campuses = [
  'All Campuses',
  'North Campus',
  'Central Campus',
  'East Campus',
  'South Campus',
  'West Campus',
]

const UsersRoles = () => {
  const [users, setUsers] = useState(initialUsers)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [campusFilter, setCampusFilter] = useState('All')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Viewer',
    campus: 'All Campuses',
  })

  const [loading, setLoading] = useState(false)

  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText)

      const matchesRole =
        roleFilter === 'All' || user.role === roleFilter

      const matchesStatus =
        statusFilter === 'All' ||
        user.status === statusFilter

      const matchesCampus =
        campusFilter === 'All' ||
        user.campus === campusFilter

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesCampus
      )
    })
  }, [users, search, roleFilter, statusFilter, campusFilter])

  const totalUsers = users.length

  const activeUsers = users.filter(
    (user) => user.status === 'Active',
  ).length

  const inactiveUsers = users.filter(
    (user) => user.status === 'Inactive',
  ).length

  const adminUsers = users.filter(
    (user) =>
      user.role === 'Executive' ||
      user.role === 'Campus Administrator',
  ).length

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setUsers([...initialUsers])
      setLoading(false)
    }, 800)
  }

  const handleReset = () => {
    setSearch('')
    setRoleFilter('All')
    setStatusFilter('All')
    setCampusFilter('All')
  }

  const openAddDialog = () => {
    setEditingUser(null)

    setForm({
      name: '',
      email: '',
      role: 'Viewer',
      campus: 'All Campuses',
    })

    setDialogOpen(true)
  }

  const openEditDialog = (user) => {
    setEditingUser(user)

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      campus: user.campus,
    })

    setDialogOpen(true)
  }

  const handleFormChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSaveUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      return
    }

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: form.name,
                email: form.email,
                role: form.role,
                campus: form.campus,
              }
            : user,
        ),
      )
    } else {
      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        campus: form.campus,
        status: 'Active',
        lastLogin: 'Never',
      }

      setUsers((current) => [newUser, ...current])
    }

    setDialogOpen(false)
  }

  const handleToggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : user,
      ),
    )
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
            Users & Roles
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage users, roles, campus access and account status.
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
            startIcon={<Plus size={18} />}
            onClick={openAddDialog}
          >
            Add User
          </Button>
        </Stack>
      </Stack>

      {/* Security Notice */}
      <Alert
        severity="info"
        icon={<ShieldCheck size={20} />}
        sx={{ mb: 3 }}
      >
        Role and campus permissions are currently represented in
        the frontend. Backend RBAC and database-level access
        control will be connected later.
      </Alert>

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
                    Total Users
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {totalUsers}
                  </Typography>
                </Box>

                <Users size={30} />
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
                    {activeUsers}
                  </Typography>
                </Box>

                <UserCheck size={30} />
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
                    Inactive Users
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {inactiveUsers}
                  </Typography>
                </Box>

                <UserX size={30} />
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
                    Admin / Executive
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {adminUsers}
                  </Typography>
                </Box>

                <UserCog size={30} />
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
              label="Search users"
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

            <FormControl size="small" sx={{ minWidth: 190 }}>
              <InputLabel>Role</InputLabel>

              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
              >
                <MenuItem value="All">All Roles</MenuItem>

                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Status</InputLabel>

              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">
                  Inactive
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 190 }}>
              <InputLabel>Campus</InputLabel>

              <Select
                value={campusFilter}
                label="Campus"
                onChange={(e) =>
                  setCampusFilter(e.target.value)
                }
              >
                <MenuItem value="All">All Campuses</MenuItem>

                {campuses.slice(1).map((campus) => (
                  <MenuItem key={campus} value={campus}>
                    {campus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              User Management
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredUsers.length} users found
            </Typography>
          </Box>

          <Divider />

          {filteredUsers.length === 0 ? (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Users size={42} />

              <Typography
                variant="h6"
                sx={{ mt: 1 }}
              >
                No users found
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
              <Box sx={{ minWidth: 850 }}>
                {/* Table Header */}
                <Grid
                  container
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: 'action.hover',
                  }}
                >
                  <Grid item xs={2.2}>
                    <Typography variant="caption" fontWeight={700}>
                      USER
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography variant="caption" fontWeight={700}>
                      ROLE
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography variant="caption" fontWeight={700}>
                      CAMPUS
                    </Typography>
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography variant="caption" fontWeight={700}>
                      STATUS
                    </Typography>
                  </Grid>

                  <Grid item xs={1.7}>
                    <Typography variant="caption" fontWeight={700}>
                      LAST LOGIN
                    </Typography>
                  </Grid>

                  <Grid item xs={2.6}>
                    <Typography variant="caption" fontWeight={700}>
                      ACTIONS
                    </Typography>
                  </Grid>
                </Grid>

                {/* Rows */}
                {filteredUsers.map((user) => (
                  <Box key={user.id}>
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
                      <Grid item xs={2.2}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                        >
                          {user.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {user.email}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Chip
                          size="small"
                          label={user.role}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <Typography variant="body2">
                          {user.campus}
                        </Typography>
                      </Grid>

                      <Grid item xs={1.5}>
                        <Chip
                          size="small"
                          label={user.status}
                          color={
                            user.status === 'Active'
                              ? 'success'
                              : 'default'
                          }
                        />
                      </Grid>

                      <Grid item xs={1.7}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {user.lastLogin}
                        </Typography>
                      </Grid>

                      <Grid item xs={2.6}>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Edit size={15} />}
                            onClick={() =>
                              openEditDialog(user)
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            color={
                              user.status === 'Active'
                                ? 'error'
                                : 'success'
                            }
                            onClick={() =>
                              handleToggleStatus(user.id)
                            }
                          >
                            {user.status === 'Active'
                              ? 'Deactivate'
                              : 'Activate'}
                          </Button>
                        </Stack>
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

      {/* Add/Edit User Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add User'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={form.name}
              onChange={(e) =>
                handleFormChange('name', e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) =>
                handleFormChange('email', e.target.value)
              }
            />

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>

              <Select
                value={form.role}
                label="Role"
                onChange={(e) =>
                  handleFormChange('role', e.target.value)
                }
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Campus Access</InputLabel>

              <Select
                value={form.campus}
                label="Campus Access"
                onChange={(e) =>
                  handleFormChange('campus', e.target.value)
                }
              >
                {campuses.map((campus) => (
                  <MenuItem key={campus} value={campus}>
                    {campus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveUser}
            disabled={
              !form.name.trim() || !form.email.trim()
            }
          >
            {editingUser ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UsersRoles   
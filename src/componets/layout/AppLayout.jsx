import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UserCog,
  Users,
} from 'lucide-react'

const drawerWidth = 260
const collapsedWidth = 76

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Knowledge Search',
    path: '/knowledge-search',
    icon: BookOpen,
  },
  {
    label: 'Executive Q&A',
    path: '/executive-qa',
    icon: Brain,
  },
  {
    label: 'Scenario Builder',
    path: '/scenario-builder',
    icon: SlidersHorizontal,
  },
  {
    label: 'Briefings',
    path: '/briefings',
    icon: ClipboardList,
  },
  {
  label: 'Decisions & Actions',
  path: '/decisions-actions',
  icon: CheckSquare,
  },
  {
    label: 'Recommendations',
    path: '/recommendations',
    icon: AlertTriangle,
  },
  {
    label: 'Reports & Analytics',
    path: '/reports',
    icon: BarChart3,
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    label: 'Users & Roles',
    path: '/users',
    icon: Users,
  },
  {
    label: 'Audit Logs',
    path: '/audit-logs',
    icon: ShieldCheck,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

const getPageTitle = (pathname) => {
  const item = navigationItems.find(
    (navigationItem) => navigationItem.path === pathname,
  )

  return item?.label || 'Dashboard'
}

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileAnchor, setProfileAnchor] = useState(null)

  const pageTitle = getPageTitle(location.pathname)

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setProfileAnchor(null)

    navigate('/login')
  }

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed
            ? 'center'
            : 'flex-start',
          px: collapsed ? 1 : 2.5,
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: 2,
            backgroundColor: '#2563eb',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          EC
        </Box>

        {!collapsed && (
          <Box>
            <Typography
              fontWeight={700}
              fontSize={17}
              lineHeight={1.2}
            >
              EduCopilot
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Decision Intelligence
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 1.5,
          px: 1,
        }}
      >
        <List disablePadding>
          {navigationItems.map((item) => {
            const Icon = item.icon

            const isActive =
              location.pathname === item.path

            return (
              <Tooltip
                key={item.path}
                title={collapsed ? item.label : ''}
                placement="right"
              >
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: 44,
                    mb: 0.5,
                    borderRadius: 1.5,
                    justifyContent: collapsed
                      ? 'center'
                      : 'flex-start',
                    px: collapsed ? 1.5 : 1.5,

                    '&.Mui-selected': {
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                    },

                    '&.Mui-selected:hover': {
                      backgroundColor: '#dbeafe',
                    },

                    '&:hover': {
                      backgroundColor: '#f8fafc',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 38,
                      color: isActive
                        ? '#2563eb'
                        : '#64748b',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={19} />
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: isActive
                          ? 600
                          : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            )
          })}
        </List>
      </Box>

      {/* User */}
      <Divider />

      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed
            ? 'center'
            : 'flex-start',
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          RK
        </Avatar>

        {!collapsed && (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              fontSize={13}
              fontWeight={600}
              noWrap
            >
              Admin User
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
            >
              Executive
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
      }}
    >
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          width: collapsed
            ? collapsedWidth
            : drawerWidth,

          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: collapsed
              ? collapsedWidth
              : drawerWidth,

            boxSizing: 'border-box',
            borderRight: '1px solid #e2e8f0',
            transition: 'width 0.2s ease',
            overflowX: 'hidden',
          },
        }}
      >
        {drawerContent}

        {/* Collapse button */}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            position: 'absolute',
            right: -14,
            top: 64,
            width: 28,
            height: 28,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',

            '&:hover': {
              backgroundColor: '#f8fafc',
            },
          }}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </IconButton>
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Header */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Toolbar
            sx={{
              minHeight: '72px !important',
              gap: 2,
            }}
          >
            {/* Mobile Menu */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <MenuIcon size={22} />
            </IconButton>

            {/* Page Title */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Breadcrumbs
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                  mb: 0.25,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  EduCopilot
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {pageTitle}
                </Typography>
              </Breadcrumbs>

              <Typography
                variant="h6"
                fontWeight={700}
                noWrap
              >
                {pageTitle}
              </Typography>
            </Box>

            {/* Global Search */}
            <TextField
              placeholder="Search..."
              size="small"
              sx={{
                width: {
                  xs: 40,
                  sm: 220,
                  md: 280,
                },

                '& .MuiInputBase-root': {
                  backgroundColor: '#f8fafc',
                },

                '& input': {
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      size={18}
                      color="#64748b"
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={() =>
                  navigate('/notifications')
                }
              >
                <Bell size={20} />
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <IconButton
              onClick={(event) =>
                setProfileAnchor(event.currentTarget)
              }
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                RK
              </Avatar>
            </IconButton>

            {/* Profile Menu */}
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  setProfileAnchor(null)
                  navigate('/settings')
                }}
              >
                <ListItemIcon>
                  <UserCog size={18} />
                </ListItemIcon>

                Profile & Settings
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogOut size={18} />
                </ListItemIcon>

                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AppLayout
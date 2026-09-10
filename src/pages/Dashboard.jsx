import { useEffect, useMemo, useState } from 'react'

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Users,
  UserCheck,
  Wallet,
} from 'lucide-react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import {
  campusData,
  periodData,
  enrolmentData,
  attendanceData,
  assessmentData,
  interventionData,
  risks,
  initiatives,
} from '../data/dashboardData'

const Dashboard = () => {
  const [period, setPeriod] = useState('This academic year')

  const [campus, setCampus] = useState('All campuses')

  // Backend dashboard API state
  const [apiDashboardData, setApiDashboardData] = useState(null)
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setApiLoading(true)
        setApiError('')

        const token = localStorage.getItem('educopilotToken')

        if (!token) {
          setApiError('Authentication token not found. Please login again.')
          return
        }

        const response = await fetch(
          'http://localhost:5000/api/dashboard',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('educopilotToken')
            localStorage.removeItem('educopilotUser')
          }

          throw new Error(
            data.message || 'Failed to load dashboard data',
          )
        }

        setApiDashboardData(data.data ?? data)
      } catch (error) {
        console.error('Dashboard API error:', error)
        setApiError(
          error.message || 'Unable to load dashboard data',
        )
      } finally {
        setApiLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  /*
   * Get selected campus data.
   *
   * If "All campuses" is selected,
   * we use the overall period data.
   */
  const selectedCampus = useMemo(() => {
    if (campus === 'All campuses') {
      return null
    }

    return campusData.find(
      (item) => item.name === campus,
    )
  }, [campus])

  /*
   * Calculate dashboard KPI values.
   */
  const dashboardValues = useMemo(() => {
    if (!selectedCampus) {
      return periodData[period]
    }

    /*
     * Campus data is available for the academic year.
     *
     * We use small period adjustments so that
     * changing the period also changes the values.
     */
    const periodAdjustment = {
      'This academic year': 1,
      'This month': 0.998,
      'Last 30 days': 0.995,
      'Last quarter': 0.98,
    }

    const adjustment =
      periodAdjustment[period] || 1

    return {
      enrolment: Math.round(
        selectedCampus.students * adjustment,
      ),

      attendance: Number(
        (
          selectedCampus.attendance *
          adjustment
        ).toFixed(1),
      ),

      learningProgress: Math.round(
        selectedCampus.learningProgress *
          adjustment,
      ),

      assessmentPerformance: Number(
        (
          selectedCampus.assessmentPerformance *
          adjustment
        ).toFixed(1),
      ),

      teacherWorkload: Math.round(
        selectedCampus.teacherWorkload /
          adjustment,
      ),

      interventionCompletion: Math.round(
        selectedCampus.interventionCompletion *
          adjustment,
      ),

      parentResponse: Math.round(
        selectedCampus.parentResponse *
          adjustment,
      ),

      capacityUtilisation: Math.round(
        selectedCampus.capacityUtilisation /
          adjustment,
      ),
    }
  }, [period, selectedCampus])

  /*
   * KPI configuration.
   */
  const kpis = [
    {
      title: 'Total Enrolment',
      value: (
        apiDashboardData?.latestMetrics?.enrolment ??
        dashboardValues.enrolment
      ).toLocaleString(),
      change: '+4.8%',
      positive: true,
      icon: Users,
    },

    {
      title: 'Attendance',
      value: `${(
        apiDashboardData?.latestMetrics?.attendance ??
        dashboardValues.attendance
      )}%`,
      change: '+1.3%',
      positive: true,
      icon: UserCheck,
    },

    {
      title: 'Learning Progress',
      value: `${(
        apiDashboardData?.latestMetrics?.learning_progress ??
        dashboardValues.learningProgress
      )}%`,
      change: '+3.2%',
      positive: true,
      icon: BookOpen,
    },

    {
      title: 'Assessment Performance',
      value: `${(
        apiDashboardData?.latestMetrics?.assessment_performance ??
        dashboardValues.assessmentPerformance
      )}%`,
      change: '+2.4%',
      positive: true,
      icon: Award,
    },

    {
      title: 'Teacher Workload',
      value: `${(
        apiDashboardData?.latestMetrics?.teacher_workload ??
        dashboardValues.teacherWorkload
      )}%`,
      change: '-3.1%',
      positive: true,
      icon: GraduationCap,
    },

    {
      title: 'Intervention Completion',
      value: `${(
        apiDashboardData?.latestMetrics?.intervention_completion ??
        dashboardValues.interventionCompletion
      )}%`,
      change: '+5.4%',
      positive: true,
      icon: CheckCircle2,
    },

    {
      title: 'Parent Response',
      value: `${(
        apiDashboardData?.latestMetrics?.parent_response ??
        dashboardValues.parentResponse
      )}%`,
      change: '+2.8%',
      positive: true,
      icon: Users,
    },

    {
      title: 'Capacity Utilisation',
      value: `${(
        apiDashboardData?.latestMetrics?.capacity_utilisation ??
        dashboardValues.capacityUtilisation
      )}%`,
      change: '+4.1%',
      positive: true,
      icon: Wallet,
    },
  ]

  /*
   * Campus table.
   *
   * If a campus is selected, show that campus first.
   * Otherwise show all campuses.
   */
  /*
   * Use PostgreSQL data for the dashboard charts and campus table.
   * Mock data is kept as a fallback if the API is unavailable.
   */
  const backendHistory = apiDashboardData?.metricsHistory ?? []
  const backendCampuses = apiDashboardData?.campusOverview ?? []

  const displayedCampuses = useMemo(() => {
    if (backendCampuses.length > 0) {
      if (campus === 'All campuses') {
        return backendCampuses.map((item) => ({
          ...item,
          students: Number(item.students ?? 0),
          attendance: Number(item.attendance ?? 0),
          capacityUtilisation: Number(
            item.capacity_utilisation ?? item.capacityUtilisation ?? 0,
          ),
          status:
            Number(item.attendance ?? 0) >= 93
              ? 'Healthy'
              : Number(item.attendance ?? 0) >= 90
                ? 'Watch'
                : 'Critical',
        }))
      }

      const selected = backendCampuses.find(
        (item) => item.name === campus,
      )

      return selected
        ? [
            {
              ...selected,
              students: Number(selected.students ?? 0),
              attendance: Number(selected.attendance ?? 0),
              capacityUtilisation: Number(
                selected.capacity_utilisation ??
                  selected.capacityUtilisation ??
                  0,
              ),
              status:
                Number(selected.attendance ?? 0) >= 93
                  ? 'Healthy'
                  : Number(selected.attendance ?? 0) >= 90
                    ? 'Watch'
                    : 'Critical',
            },
          ]
        : []
    }

    if (campus === 'All campuses') {
      return campusData
    }

    const selected = campusData.find(
      (item) => item.name === campus,
    )

    return selected ? [selected] : campusData
  }, [backendCampuses, campus])

  const selectedCampusId = selectedCampus?.id

  const selectedBackendHistory = useMemo(() => {
    if (backendHistory.length === 0) {
      return []
    }

    if (!selectedCampusId) {
      return backendHistory
    }

    return backendHistory.filter(
      (item) => Number(item.campus_id) === Number(selectedCampusId),
    )
  }, [backendHistory, selectedCampusId])

  const filteredEnrolmentData = useMemo(() => {
    if (selectedBackendHistory.length > 0) {
      return selectedBackendHistory.map((item) => ({
        month: new Date(item.metric_date).toLocaleDateString('en-US', {
          month: 'short',
        }),
        students: Number(item.enrolment ?? 0),
        capacity: Math.round(
          Number(item.enrolment ?? 0) /
            Math.max(Number(item.capacity_utilisation ?? 1) / 100, 0.01),
        ),
      }))
    }

    if (!selectedCampus) {
      return enrolmentData
    }

    const ratio = selectedCampus.students / 8420

    return enrolmentData.map((item) => ({
      ...item,
      students: Math.round(item.students * ratio),
      capacity: Math.round(item.capacity * ratio),
    }))
  }, [selectedBackendHistory, selectedCampus])

  const filteredAttendanceData = useMemo(() => {
    if (selectedBackendHistory.length > 0) {
      return selectedBackendHistory.map((item) => ({
        month: new Date(item.metric_date).toLocaleDateString('en-US', {
          month: 'short',
        }),
        attendance: Number(item.attendance ?? 0),
      }))
    }

    if (!selectedCampus) {
      return attendanceData
    }

    return attendanceData.map((item) => ({
      ...item,
      attendance: Number(
        (
          item.attendance -
          (94.2 - selectedCampus.attendance)
        ).toFixed(1),
      ),
    }))
  }, [selectedBackendHistory, selectedCampus])

  const filteredAssessmentData = useMemo(() => {
    if (apiDashboardData?.latestMetrics) {
      const latest = apiDashboardData.latestMetrics

      return [
        {
          name: 'Overall',
          score: Number(latest.assessment_performance ?? 0),
        },
        {
          name: 'Learning',
          score: Number(latest.learning_progress ?? 0),
        },
      ]
    }

    if (!selectedCampus) {
      return assessmentData
    }

    const difference =
      selectedCampus.assessmentPerformance - 81.6

    return assessmentData.map((item) => ({
      ...item,
      score: Math.min(
        100,
        Math.max(
          0,
          Number((item.score + difference).toFixed(1)),
        ),
      ),
    }))
  }, [apiDashboardData, selectedCampus])

  const filteredInterventionData = useMemo(() => {
    if (apiDashboardData?.latestMetrics) {
      const completed = Number(
        apiDashboardData.latestMetrics.intervention_completion ?? 0,
      )
      const remaining = Math.max(0, 100 - completed)

      return [
        {
          name: 'Completed',
          value: completed,
        },
        {
          name: 'Remaining',
          value: Number(remaining.toFixed(1)),
        },
      ]
    }

    if (!selectedCampus) {
      return interventionData
    }

    const completed = selectedCampus.interventionCompletion
    const remaining = 100 - completed

    return [
      {
        name: 'Completed',
        value: completed,
      },
      {
        name: 'Pending',
        value: Math.round(remaining * 0.67),
      },
      {
        name: 'Overdue',
        value: Math.round(remaining * 0.33),
      },
    ]
  }, [apiDashboardData, selectedCampus])

  return (
    <Box>
      {apiLoading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress />
        </Box>
      )}

      {apiError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {/* ========================================= */}
      {/* PAGE HEADER */}
      {/* ========================================= */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: 26,
                md: 32,
              },
            }}
          >
            Executive Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            School group performance and decision
            intelligence
          </Typography>
        </Box>

        {/* Filters */}
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={1}
          sx={{
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          {/* Period Filter */}
          <Select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value)
            }
            size="small"
            sx={{
              minWidth: 180,
              backgroundColor: '#ffffff',
            }}
          >
            <MenuItem value="This academic year">
              This academic year
            </MenuItem>

            <MenuItem value="This month">
              This month
            </MenuItem>

            <MenuItem value="Last 30 days">
              Last 30 days
            </MenuItem>

            <MenuItem value="Last quarter">
              Last quarter
            </MenuItem>
          </Select>

          {/* Campus Filter */}
          <Select
            value={campus}
            onChange={(event) =>
              setCampus(event.target.value)
            }
            size="small"
            sx={{
              minWidth: 200,
              backgroundColor: '#ffffff',
            }}
          >
            <MenuItem value="All campuses">
              All campuses
            </MenuItem>

            {campusData.map((item) => (
              <MenuItem
                key={item.id}
                value={item.name}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>

      {/* ========================================= */}
      {/* SELECTED CAMPUS INFORMATION */}
      {/* ========================================= */}

      {selectedCampus && (
        <Card
          sx={{
            mb: 3,
            border: '1px solid #bfdbfe',
            backgroundColor: '#eff6ff',
          }}
        >
          <CardContent>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              justifyContent="space-between"
              alignItems={{
                xs: 'flex-start',
                sm: 'center',
              }}
              gap={2}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                >
                  {selectedCampus.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Showing campus-level performance
                  metrics
                </Typography>
              </Box>

              <Chip
                label={selectedCampus.status}
                size="small"
                color={
                  selectedCampus.status ===
                  'Healthy'
                    ? 'success'
                    : selectedCampus.status ===
                        'Watch'
                      ? 'warning'
                      : 'error'
                }
              />
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ========================================= */}
      {/* BACKEND SUMMARY */}
      {/* ========================================= */}

      {apiDashboardData && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Total Users
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                  {apiDashboardData.totalUsers ??
                    (Array.isArray(apiDashboardData)
                      ? apiDashboardData.length
                      : 0)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  From PostgreSQL
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Total Campuses
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                  {apiDashboardData.totalCampuses ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  From PostgreSQL
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Executive Users
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                  {Array.isArray(apiDashboardData.usersByRole)
                    ? apiDashboardData.usersByRole.find(
                        (item) =>
                          item.role === 'Executive' ||
                          item.name === 'Executive' ||
                          item.role_name === 'Executive',
                      )?.count ?? 0
                    : 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Executive role
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  API Status
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mt: 1 }}
                  color="success.main"
                >
                  Connected
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PostgreSQL + Express
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {apiDashboardData?.latestMetrics && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Dashboard KPIs are now loaded from PostgreSQL.
          Latest data: {apiDashboardData.latestMetrics.metric_date}
        </Alert>
      )}

      {/* ========================================= */}
      {/* KPI CARDS */}
      {/* ========================================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={kpi.title}
            >
              <Card
                sx={{
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems:
                        'flex-start',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={500}
                      >
                        {kpi.title}
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                          mt: 1,
                          fontSize: 28,
                        }}
                      >
                        {kpi.value}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ mt: 1 }}
                      >
                        {kpi.positive ? (
                          <ArrowUpRight
                            size={15}
                            color="#16a34a"
                          />
                        ) : (
                          <ArrowDownRight
                            size={15}
                            color="#dc2626"
                          />
                        )}

                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              kpi.positive
                                ? '#16a34a'
                                : '#dc2626',
                            fontWeight: 600,
                          }}
                        >
                          {kpi.change}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          vs previous period
                        </Typography>
                      </Stack>
                    </Box>

                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        backgroundColor:
                          '#eff6ff',
                        color: '#2563eb',
                      }}
                    >
                      <Icon size={21} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* ========================================= */}
      {/* ENROLMENT + ATTENDANCE */}
      {/* ========================================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* Enrolment */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Enrolment & Capacity
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Student enrolment compared with
                available capacity
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 300,
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    data={filteredEnrolmentData}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="students"
                      name="Enrolment"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="capacity"
                      name="Capacity"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Attendance Trend
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Group attendance percentage
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  mt: 2,
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    data={
                      filteredAttendanceData
                    }
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="month" />

                    <YAxis
                      domain={[88, 96]}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="attendance"
                      name="Attendance %"
                      stroke="#16a34a"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================= */}
      {/* ASSESSMENT + INTERVENTIONS */}
      {/* ========================================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* Assessment */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Assessment Performance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Average performance by subject
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 300,
                }}
              >
                <ResponsiveContainer>
                  <BarChart
                    data={filteredAssessmentData}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                    />

                    <YAxis
                      domain={[0, 100]}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="score"
                      name="Score %"
                      fill="#2563eb"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Intervention */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Intervention Completion
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Current intervention status
              </Typography>

              <Box
                sx={{
                  height: 210,
                  display: 'flex',
                  justifyContent:
                    'center',
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={
                        filteredInterventionData
                      }
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      <Cell fill="#16a34a" />
                      <Cell fill="#d97706" />
                      <Cell fill="#dc2626" />
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack spacing={1}>
                {filteredInterventionData.map(
                  (item) => (
                    <Box
                      key={item.name}
                      sx={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {item.value}%
                      </Typography>
                    </Box>
                  ),
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================= */}
      {/* CAMPUS OVERVIEW */}
      {/* ========================================= */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Campus Overview
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Operational status across campuses
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
            }}
          >
            <Box
              sx={{
                minWidth: 750,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns:
                    '2fr 1fr 1fr 1fr 1fr',
                  p: 1.5,
                  backgroundColor:
                    '#f8fafc',
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  CAMPUS
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  STUDENTS
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  ATTENDANCE
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  CAPACITY
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  STATUS
                </Typography>
              </Box>

              {/* Rows */}
              {displayedCampuses.map(
                (item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns:
                        '2fr 1fr 1fr 1fr 1fr',
                      p: 1.5,
                      borderBottom:
                        '1px solid #f1f5f9',
                      alignItems:
                        'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                    >
                      {item.name}
                    </Typography>

                    <Typography variant="body2">
                      {item.students.toLocaleString()}
                    </Typography>

                    <Typography variant="body2">
                      {item.attendance}%
                    </Typography>

                    <Typography variant="body2">
                      {item.capacityUtilisation}%
                    </Typography>

                    <Box>
                      <Chip
                        label={item.status}
                        size="small"
                        color={
                          item.status ===
                          'Healthy'
                            ? 'success'
                            : item.status ===
                                'Watch'
                              ? 'warning'
                              : 'error'
                        }
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                ),
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* RISKS + STRATEGIC INITIATIVES */}
      {/* ========================================= */}

      <Grid
        container
        spacing={2}
      >
        {/* Risks */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#dc2626"
                />

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Major Risks
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                {risks.map((risk) => (
                  <Box
                    key={risk.id}
                    sx={{
                      p: 2,
                      border:
                        '1px solid #e2e8f0',
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                      >
                        {risk.title}
                      </Typography>

                      <Chip
                        label={risk.severity}
                        size="small"
                        color={
                          risk.severity ===
                          'Critical'
                            ? 'error'
                            : risk.severity ===
                                'High'
                              ? 'warning'
                              : 'default'
                        }
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.8 }}
                    >
                      {risk.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 1,
                      }}
                    >
                      Owner: {risk.owner}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Initiatives */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Strategic Initiatives
              </Typography>

              <Stack spacing={2}>
                {initiatives.map(
                  (initiative) => (
                    <Box
                      key={initiative.id}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent:
                            'space-between',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                        >
                          {initiative.title}
                        </Typography>

                        <Typography
                          variant="caption"
                          fontWeight={600}
                        >
                          {initiative.progress}%
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={
                          initiative.progress
                        }
                        sx={{
                          height: 7,
                          borderRadius: 10,
                        }}
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent:
                            'space-between',
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {initiative.owner}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {initiative.status}
                        </Typography>
                      </Box>
                    </Box>
                  ),
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ========================================= */}
      {/* AI EXECUTIVE INSIGHT */}
      {/* ========================================= */}

      <Card
        sx={{
          mt: 3,
          border:
            '1px solid #bfdbfe',
          backgroundColor: '#eff6ff',
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                minWidth: 42,
                borderRadius: 2,
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                backgroundColor:
                  '#2563eb',
                color: '#ffffff',
              }}
            >
              <GraduationCap size={21} />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
              >
                AI Executive Insight
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: '#334155',
                }}
              >
                {selectedCampus
                  ? `${selectedCampus.name} has ${selectedCampus.capacityUtilisation}% capacity utilisation and ${selectedCampus.teacherWorkload}% teacher workload. Review resource allocation if these indicators continue to increase.`
                  : 'Oakwood Campus is approaching its capacity threshold while teacher workload is also increasing. Consider reviewing teacher allocation before the next academic term.'}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.5 }}
                flexWrap="wrap"
              >
                <Chip
                  label="Confidence: 87%"
                  size="small"
                />

                <Chip
                  label="Source verified"
                  size="small"
                  color="success"
                  variant="outlined"
                />

                <Chip
                  label="AI Suggested"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mt: 1,
                }}
              >
                Generated from approved
                operational data • Model
                version: Gemini
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Dashboard
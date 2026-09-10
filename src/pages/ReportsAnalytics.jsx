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
  BarChart3,
  Download,
  FileText,
  RefreshCw,
  TrendingUp,
  Users,
} from 'lucide-react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const enrolmentData = [
  { month: 'Jan', North: 820, Central: 940, East: 760, South: 680 },
  { month: 'Feb', North: 835, Central: 955, East: 775, South: 695 },
  { month: 'Mar', North: 850, Central: 970, East: 790, South: 710 },
  { month: 'Apr', North: 868, Central: 985, East: 805, South: 725 },
  { month: 'May', North: 880, Central: 1000, East: 820, South: 740 },
  { month: 'Jun', North: 895, Central: 1018, East: 838, South: 755 },
]

const attendanceData = [
  { month: 'Jan', North: 93, Central: 95, East: 91, South: 94 },
  { month: 'Feb', North: 92, Central: 95, East: 92, South: 94 },
  { month: 'Mar', North: 91, Central: 96, East: 91, South: 93 },
  { month: 'Apr', North: 90, Central: 95, East: 90, South: 93 },
  { month: 'May', North: 89, Central: 96, East: 89, South: 92 },
  { month: 'Jun', North: 88, Central: 96, East: 90, South: 92 },
]

const assessmentData = [
  { subject: 'Mathematics', score: 72 },
  { subject: 'Science', score: 78 },
  { subject: 'English', score: 84 },
  { subject: 'History', score: 81 },
  { subject: 'Computer Science', score: 88 },
]

const reportData = [
  {
    id: 1,
    name: 'Executive Performance Report',
    type: 'Executive',
    period: 'Q2 2026',
    status: 'Ready',
    description:
      'Summary of enrolment, attendance, assessment and operational performance.',
  },
  {
    id: 2,
    name: 'Campus Performance Report',
    type: 'Campus',
    period: 'June 2026',
    status: 'Ready',
    description:
      'Campus-level comparison of key performance indicators.',
  },
  {
    id: 3,
    name: 'Student Attendance Analysis',
    type: 'Academic',
    period: 'June 2026',
    status: 'Ready',
    description:
      'Attendance trends and campuses requiring attention.',
  },
  {
    id: 4,
    name: 'Assessment Performance Report',
    type: 'Academic',
    period: 'Q2 2026',
    status: 'Ready',
    description:
      'Subject-level assessment performance and improvement areas.',
  },
  {
    id: 5,
    name: 'Strategic Initiative Report',
    type: 'Strategic',
    period: 'Q2 2026',
    status: 'Draft',
    description:
      'Progress and outcomes of current strategic initiatives.',
  },
]

const ReportsAnalytics = () => {
  const [period, setPeriod] = useState('Q2 2026')
  const [campus, setCampus] = useState('All Campuses')
  const [reportType, setReportType] = useState('All')
  const [loading, setLoading] = useState(false)

  const filteredReports = useMemo(() => {
    return reportData.filter((report) => {
      const matchesPeriod =
        period === 'All Periods' || report.period === period

      const matchesType =
        reportType === 'All' || report.type === reportType

      return matchesPeriod && matchesType
    })
  }, [period, reportType])

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  const handleExport = (reportName) => {
    alert(`${reportName} export started.`)
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
            Reports & Analytics
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Analyse education, operational and strategic performance
            across campuses.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshCw size={17} />}
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Stack>

      {/* KPI Cards */}
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
                    Total Students
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    3,506
                  </Typography>

                  <Typography
                    variant="body2"
                    color="success.main"
                  >
                    +4.8% this period
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
                    Average Attendance
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    91.5%
                  </Typography>

                  <Typography
                    variant="body2"
                    color="error.main"
                  >
                    -1.2% this period
                  </Typography>
                </Box>

                <TrendingUp size={30} />
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
                    Assessment Average
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    80.6%
                  </Typography>

                  <Typography
                    variant="body2"
                    color="success.main"
                  >
                    +2.4% this period
                  </Typography>
                </Box>

                <BarChart3 size={30} />
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
                    Reports Available
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {reportData.length}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Updated recently
                  </Typography>
                </Box>

                <FileText size={30} />
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
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Period</InputLabel>

              <Select
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="Q2 2026">Q2 2026</MenuItem>
                <MenuItem value="June 2026">June 2026</MenuItem>
                <MenuItem value="All Periods">
                  All Periods
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Campus</InputLabel>

              <Select
                value={campus}
                label="Campus"
                onChange={(e) => setCampus(e.target.value)}
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
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Report Type</InputLabel>

              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Executive">Executive</MenuItem>
                <MenuItem value="Campus">Campus</MenuItem>
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Strategic">Strategic</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Enrolment */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Enrolment Trend
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Monthly enrolment across campuses.
              </Typography>

              <Box sx={{ width: '100%', height: 330 }}>
                <ResponsiveContainer>
                  <LineChart data={enrolmentData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="North"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="Central"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="East"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="South"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                Attendance Trend
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Average attendance percentage.
              </Typography>

              <Box sx={{ width: '100%', height: 330 }}>
                <ResponsiveContainer>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis domain={[80, 100]} />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="North"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="Central"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="East"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="South"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assessment Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Assessment Performance
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Average performance by subject.
          </Typography>

          <Box sx={{ width: '100%', height: 330 }}>
            <ResponsiveContainer>
              <BarChart data={assessmentData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="subject" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Bar dataKey="score" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Reports */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Available Reports
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredReports.length} reports found
            </Typography>
          </Box>

          <Divider />

          {filteredReports.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <FileText size={40} />

              <Typography variant="h6" sx={{ mt: 1 }}>
                No reports found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Try changing the selected filters.
              </Typography>
            </Box>
          ) : (
            filteredReports.map((report) => (
              <Box key={report.id} sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  spacing={2}
                >
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
                        fontWeight={700}
                      >
                        {report.name}
                      </Typography>

                      <Chip
                        size="small"
                        label={report.type}
                        variant="outlined"
                      />

                      <Chip
                        size="small"
                        label={report.status}
                        color={
                          report.status === 'Ready'
                            ? 'success'
                            : 'warning'
                        }
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {report.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      Reporting period: {report.period}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<Download size={17} />}
                    onClick={() =>
                      handleExport(report.name)
                    }
                  >
                    Export
                  </Button>
                </Stack>

                {report.id !==
                  filteredReports[filteredReports.length - 1].id && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ReportsAnalytics
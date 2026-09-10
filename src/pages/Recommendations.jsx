import { useMemo, useState } from 'react'

import {
  Alert,
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
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react'

const recommendationsData = [
  {
    id: 1,
    title: 'Improve attendance at North Campus',
    category: 'Student Attendance',
    campus: 'North Campus',
    priority: 'High',
    status: 'Open',
    confidence: 94,
    impact: 'High',
    summary:
      'Attendance at North Campus has declined and requires targeted intervention.',
    reason:
      'Recent attendance trends show a consistent decline compared with the previous reporting period.',
    recommendation:
      'Introduce an early-warning attendance program and contact families of students with repeated absences.',
    expectedImpact:
      'Potential improvement of 3–5% in monthly student attendance.',
    createdDate: '2026-06-15',
  },
  {
    id: 2,
    title: 'Rebalance teacher allocation',
    category: 'Staffing',
    campus: 'Central Campus',
    priority: 'High',
    status: 'Under Review',
    confidence: 91,
    impact: 'High',
    summary:
      'Teacher workload is uneven across departments at Central Campus.',
    reason:
      'Several departments are operating above the recommended workload while others have available capacity.',
    recommendation:
      'Review subject allocations and redistribute teaching periods across departments.',
    expectedImpact:
      'Better workload balance and improved staff utilisation.',
    createdDate: '2026-06-12',
  },
  {
    id: 3,
    title: 'Address mathematics performance',
    category: 'Academic Performance',
    campus: 'East Campus',
    priority: 'Medium',
    status: 'Open',
    confidence: 88,
    impact: 'Medium',
    summary:
      'Mathematics assessment results are below the group average.',
    reason:
      'Recent assessment results indicate a sustained performance gap in mathematics.',
    recommendation:
      'Create targeted mathematics intervention groups and provide additional practice resources.',
    expectedImpact:
      'Potential improvement in mathematics assessment performance.',
    createdDate: '2026-06-10',
  },
  {
    id: 4,
    title: 'Increase classroom capacity utilisation',
    category: 'Campus Capacity',
    campus: 'South Campus',
    priority: 'Medium',
    status: 'Open',
    confidence: 86,
    impact: 'High',
    summary:
      'South Campus has unused classroom capacity during several periods.',
    reason:
      'Capacity analysis shows available rooms that could support additional student enrolment.',
    recommendation:
      'Evaluate opportunities to shift selected classes and accommodate additional enrolment.',
    expectedImpact:
      'Improved classroom utilisation and increased enrolment capacity.',
    createdDate: '2026-06-08',
  },
  {
    id: 5,
    title: 'Review intervention programme outcomes',
    category: 'Interventions',
    campus: 'North Campus',
    priority: 'Low',
    status: 'Completed',
    confidence: 82,
    impact: 'Medium',
    summary:
      'The intervention programme should be reviewed for effectiveness.',
    reason:
      'Outcome data is available and can be used to identify which interventions are producing the strongest results.',
    recommendation:
      'Compare intervention outcomes and prioritise programmes with measurable student improvement.',
    expectedImpact:
      'Better allocation of intervention resources.',
    createdDate: '2026-06-05',
  },
  {
    id: 6,
    title: 'Monitor enrolment growth',
    category: 'Enrolment',
    campus: 'West Campus',
    priority: 'Medium',
    status: 'Under Review',
    confidence: 89,
    impact: 'High',
    summary:
      'Enrolment growth may create additional staffing and capacity requirements.',
    reason:
      'Current enrolment trends indicate increasing demand for available places.',
    recommendation:
      'Monitor enrolment projections and prepare staffing and classroom capacity plans.',
    expectedImpact:
      'Better preparation for future enrolment demand.',
    createdDate: '2026-06-03',
  },
]

const priorityStyles = {
  High: {
    color: 'error',
    icon: <AlertTriangle size={15} />,
  },
  Medium: {
    color: 'warning',
    icon: <TrendingUp size={15} />,
  },
  Low: {
    color: 'success',
    icon: <CheckCircle2 size={15} />,
  },
}

const statusStyles = {
  Open: 'primary',
  'Under Review': 'warning',
  Completed: 'success',
}

const Recommendations = () => {
  const [recommendations, setRecommendations] =
    useState(recommendationsData)

  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('All')
  const [status, setStatus] = useState('All')
  const [campus, setCampus] = useState('All')
  const [selectedRecommendation, setSelectedRecommendation] =
    useState(recommendationsData[0])

  const [loading, setLoading] = useState(false)

  const campuses = [
    'All',
    ...new Set(recommendationsData.map((item) => item.campus)),
  ]

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.campus.toLowerCase().includes(searchText) ||
        item.summary.toLowerCase().includes(searchText)

      const matchesPriority =
        priority === 'All' || item.priority === priority

      const matchesStatus =
        status === 'All' || item.status === status

      const matchesCampus =
        campus === 'All' || item.campus === campus

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesCampus
      )
    })
  }, [recommendations, search, priority, status, campus])

  const stats = {
    total: recommendations.length,
    highPriority: recommendations.filter(
      (item) => item.priority === 'High',
    ).length,
    open: recommendations.filter(
      (item) => item.status === 'Open',
    ).length,
    completed: recommendations.filter(
      (item) => item.status === 'Completed',
    ).length,
  }

  const handleRefresh = () => {
    setLoading(true)

    setTimeout(() => {
      setRecommendations([...recommendationsData])
      setLoading(false)
    }, 800)
  }

  const handleReset = () => {
    setSearch('')
    setPriority('All')
    setStatus('All')
    setCampus('All')
  }

  const handleMarkCompleted = (id) => {
    const updatedRecommendations = recommendations.map((item) =>
      item.id === id
        ? { ...item, status: 'Completed' }
        : item,
    )

    setRecommendations(updatedRecommendations)

    const updatedSelected = updatedRecommendations.find(
      (item) => item.id === id,
    )

    setSelectedRecommendation(updatedSelected)
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
            Recommendations
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            AI-supported recommendations based on campus and
            academic data.
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

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
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
                    Total Recommendations
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {stats.total}
                  </Typography>
                </Box>

                <Lightbulb size={30} />
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
                    {stats.highPriority}
                  </Typography>
                </Box>

                <AlertTriangle size={30} />
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
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Open
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {stats.open}
                  </Typography>
                </Box>

                <Clock3 size={30} />
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
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Completed
                  </Typography>

                  <Typography variant="h4" fontWeight={700}>
                    {stats.completed}
                  </Typography>
                </Box>

                <CheckCircle2 size={30} />
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
              label="Search recommendations"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search size={18} style={{ marginRight: 8 }} />
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Priority</InputLabel>

              <Select
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Under Review">
                  Under Review
                </MenuItem>
                <MenuItem value="Completed">
                  Completed
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Campus</InputLabel>

              <Select
                value={campus}
                label="Campus"
                onChange={(e) => setCampus(e.target.value)}
              >
                {campuses.map((campusName) => (
                  <MenuItem
                    key={campusName}
                    value={campusName}
                  >
                    {campusName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="text"
              onClick={handleReset}
              sx={{ minWidth: 90 }}
            >
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Recommendation List */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Recommendations
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {filteredRecommendations.length} results
                </Typography>
              </Box>

              <Divider />

              {filteredRecommendations.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Lightbulb
                    size={40}
                    style={{ opacity: 0.4 }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ mt: 1 }}
                  >
                    No recommendations found
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Try changing your search or filters.
                  </Typography>
                </Box>
              ) : (
                filteredRecommendations.map((item) => {
                  const priorityStyle =
                    priorityStyles[item.priority]

                  return (
                    <Box
                      key={item.id}
                      onClick={() =>
                        setSelectedRecommendation(item)
                      }
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderLeft:
                          selectedRecommendation?.id === item.id
                            ? '4px solid'
                            : '4px solid transparent',
                        borderColor:
                          selectedRecommendation?.id === item.id
                            ? 'primary.main'
                            : 'transparent',
                        backgroundColor:
                          selectedRecommendation?.id === item.id
                            ? 'action.hover'
                            : 'transparent',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <Stack spacing={1.2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                          >
                            {item.title}
                          </Typography>

                          <ArrowUpRight size={18} />
                        </Stack>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.summary}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip
                            size="small"
                            label={item.priority}
                            color={priorityStyle.color}
                            icon={priorityStyle.icon}
                          />

                          <Chip
                            size="small"
                            label={item.status}
                            color={statusStyles[item.status]}
                            variant="outlined"
                          />

                          <Chip
                            size="small"
                            label={item.campus}
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  )
                })
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={7}>
          {selectedRecommendation ? (
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          fontWeight={700}
                        >
                          {selectedRecommendation.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {selectedRecommendation.campus} •{' '}
                          {selectedRecommendation.category}
                        </Typography>
                      </Box>

                      <Chip
                        label={selectedRecommendation.status}
                        color={
                          statusStyles[
                            selectedRecommendation.status
                          ]
                        }
                      />
                    </Stack>
                  </Box>

                  <Divider />

                  {/* AI confidence */}
                  <Alert
                    icon={<Target size={20} />}
                    severity="info"
                  >
                    <Typography variant="body2">
                      <strong>
                        AI confidence:{' '}
                        {selectedRecommendation.confidence}%
                      </strong>
                      <br />
                      This recommendation is based on available
                      campus, academic and operational data.
                    </Typography>
                  </Alert>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      Summary
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {selectedRecommendation.summary}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      Why this is recommended
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {selectedRecommendation.reason}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      Recommended Action
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {selectedRecommendation.recommendation}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      Expected Impact
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {selectedRecommendation.expectedImpact}
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    <Chip
                      label={`Priority: ${selectedRecommendation.priority}`}
                      color={
                        priorityStyles[
                          selectedRecommendation.priority
                        ].color
                      }
                    />

                    <Chip
                      label={`Impact: ${selectedRecommendation.impact}`}
                      variant="outlined"
                    />

                    <Chip
                      label={`Confidence: ${selectedRecommendation.confidence}%`}
                      variant="outlined"
                    />
                  </Stack>

                  <Divider />

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                  >
                    {selectedRecommendation.status !==
                      'Completed' && (
                      <Button
                        variant="contained"
                        startIcon={<CheckCircle2 size={18} />}
                        onClick={() =>
                          handleMarkCompleted(
                            selectedRecommendation.id,
                          )
                        }
                      >
                        Mark as Completed
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      startIcon={<ArrowUpRight size={18} />}
                    >
                      Create Action
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography>
                  Select a recommendation to view details.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Recommendations
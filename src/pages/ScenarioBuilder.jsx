import { useMemo, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import {
  BarChart3,
  CheckCircle2,
  Clock3,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

import {
  scenarioTypes,
  campusOptions,
  defaultScenario,
  scenarioResults,
  scenarioRecommendations,
  scenarioHistory,
} from '../data/scenarioData'

const ScenarioBuilder = () => {
  const [scenarioName, setScenarioName] =
    useState(defaultScenario.name)

  const [scenarioType, setScenarioType] =
    useState(defaultScenario.type)

  const [campus, setCampus] =
    useState(defaultScenario.campus)

  const [change, setChange] =
    useState(defaultScenario.change)

  const [period, setPeriod] =
    useState(defaultScenario.period)

  const [result, setResult] =
    useState(null)

  const [saved, setSaved] =
    useState(false)

  const selectedScenario = useMemo(() => {
    return scenarioTypes.find(
      (item) =>
        item.value === scenarioType,
    )
  }, [scenarioType])

  const handleRunScenario = () => {
    const baseResult =
      scenarioResults[scenarioType]

    if (!baseResult) {
      return
    }

    const multiplier =
      1 + Number(change) / 100

    const calculatedMetrics =
      baseResult.metrics.map((metric) => {
        let value = metric.value

        if (
          scenarioType ===
          'enrolment'
        ) {
          if (
            metric.label ===
            'Projected Enrolment'
          ) {
            value = Math.round(
              baseResult.base *
                multiplier,
            )
          }

          if (
            metric.label ===
            'Additional Students'
          ) {
            value = Math.round(
              baseResult.base *
                (Number(change) / 100),
            )
          }

          if (
            metric.label ===
            'Capacity Utilisation'
          ) {
            value = Math.min(
              100,
              Math.round(
                82 +
                  Number(change) *
                    0.8,
              ),
            )
          }

          if (
            metric.label ===
            'Resource Requirement'
          ) {
            value = Math.max(
              1,
              Math.ceil(
                Number(change) / 2,
              ),
            )
          }
        }

        if (
          scenarioType ===
          'staffing'
        ) {
          if (
            metric.label ===
            'Teacher Workload'
          ) {
            value = Math.max(
              40,
              Math.round(
                78 -
                  Number(change) *
                    0.8,
              ),
            )
          }

          if (
            metric.label ===
            'Coverage'
          ) {
            value = Math.min(
              100,
              Math.round(
                94 +
                  Number(change) *
                    0.5,
              ),
            )
          }

          if (
            metric.label ===
            'Staffing Gap'
          ) {
            value = Math.max(
              0,
              Math.round(
                3 -
                  Number(change) /
                    2,
              ),
            )
          }

          if (
            metric.label ===
            'Estimated Cost'
          ) {
            value = Math.round(
              180000 *
                (1 +
                  Number(change) /
                    100),
            )
          }
        }

        if (
          scenarioType ===
          'capacity'
        ) {
          if (
            metric.label ===
            'Capacity Utilisation'
          ) {
            value = Math.min(
              100,
              Math.round(
                82 +
                  Number(change) *
                    0.7,
              ),
            )
          }

          if (
            metric.label ===
            'Available Places'
          ) {
            value = Math.max(
              0,
              Math.round(
                1170 -
                  Number(change) *
                    30,
              ),
            )
          }

          if (
            metric.label ===
            'Projected Demand'
          ) {
            value = Math.round(
              8420 *
                multiplier,
            )
          }

          if (
            metric.label ===
            'Capacity Gap'
          ) {
            value = Math.max(
              0,
              Math.round(
                Number(change) *
                  8,
              ),
            )
          }
        }

        if (
          scenarioType ===
          'attendance'
        ) {
          if (
            metric.label ===
            'Projected Attendance'
          ) {
            value = Math.min(
              100,
              Number(
                (
                  94.2 +
                  Number(change) *
                    0.2
                ).toFixed(1),
              ),
            )
          }

          if (
            metric.label ===
            'Additional Attendance'
          ) {
            value = Math.max(
              0,
              Math.round(
                84 *
                  multiplier,
              ),
            )
          }

          if (
            metric.label ===
            'At-Risk Students'
          ) {
            value = Math.max(
              0,
              Math.round(
                112 -
                  Number(change) *
                    5,
              ),
            )
          }

          if (
            metric.label ===
            'Expected Improvement'
          ) {
            value = Number(
              (
                Number(change) *
                0.2
              ).toFixed(1),
            )
          }
        }

        if (
          scenarioType ===
          'budget'
        ) {
          if (
            metric.label ===
            'Projected Budget'
          ) {
            value = Math.round(
              10000000 *
                multiplier,
            )
          }

          if (
            metric.label ===
            'Additional Allocation'
          ) {
            value = Math.round(
              10000000 *
                (Number(change) /
                  100),
            )
          }

          if (
            metric.label ===
            'Budget Utilisation'
          ) {
            value = Math.min(
              100,
              Math.round(
                84 +
                  Number(change) *
                    0.4,
              ),
            )
          }

          if (
            metric.label ===
            'Expected Impact'
          ) {
            value = Number(
              (
                7 +
                Number(change) *
                  0.2
              ).toFixed(1),
            )
          }
        }

        return {
          ...metric,
          value,
        }
      })

    setResult({
      ...baseResult,
      metrics: calculatedMetrics,
      scenarioName:
        scenarioName.trim() ||
        'New Scenario',
      scenarioType,
      campus,
      change,
      period,
      createdAt:
        new Date().toLocaleString(),
    })

    setSaved(false)
  }

  const handleReset = () => {
    setScenarioName(
      defaultScenario.name,
    )

    setScenarioType(
      defaultScenario.type,
    )

    setCampus(
      defaultScenario.campus,
    )

    setChange(
      defaultScenario.change,
    )

    setPeriod(
      defaultScenario.period,
    )

    setResult(null)
    setSaved(false)
  }

  const handleSave = () => {
    if (!result) {
      return
    }

    setSaved(true)
  }

  const formatValue = (
    value,
    unit,
  ) => {
    if (unit === '₹') {
      return `₹${value.toLocaleString()}`
    }

    if (
      unit === '%' ||
      unit === 'student-days'
    ) {
      return `${value}${unit === '%' ? '%' : ' ' + unit}`
    }

    return `${value.toLocaleString()} ${unit}`
  }

  return (
    <Box>
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
            }}
          >
            <BarChart3 size={24} />
          </Box>

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
              Scenario Builder
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Model possible changes and understand
              their operational impact.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ================================= */}
      {/* BUILDER */}
      {/* ================================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* Configuration */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Build Scenario
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Configure your assumptions.
                  </Typography>
                </Box>

                <Button
                  size="small"
                  startIcon={
                    <RotateCcw size={16} />
                  }
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Stack>

              <Stack spacing={2.5}>
                {/* Name */}
                <TextField
                  label="Scenario Name"
                  value={scenarioName}
                  onChange={(event) =>
                    setScenarioName(
                      event.target.value,
                    )
                  }
                  fullWidth
                />

                {/* Scenario Type */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Scenario Type
                  </Typography>

                  <Select
                    value={scenarioType}
                    onChange={(event) =>
                      setScenarioType(
                        event.target.value,
                      )
                    }
                    fullWidth
                    size="small"
                  >
                    {scenarioTypes.map(
                      (item) => (
                        <MenuItem
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      ),
                    )}
                  </Select>

                  {selectedScenario && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.7,
                      }}
                    >
                      {
                        selectedScenario.description
                      }
                    </Typography>
                  )}
                </Box>

                {/* Campus */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Campus
                  </Typography>

                  <Select
                    value={campus}
                    onChange={(event) =>
                      setCampus(
                        event.target.value,
                      )
                    }
                    fullWidth
                    size="small"
                  >
                    {campusOptions.map(
                      (item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </Box>

                {/* Period */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    Planning Period
                  </Typography>

                  <Select
                    value={period}
                    onChange={(event) =>
                      setPeriod(
                        event.target.value,
                      )
                    }
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="Next academic year">
                      Next academic year
                    </MenuItem>

                    <MenuItem value="Next quarter">
                      Next quarter
                    </MenuItem>

                    <MenuItem value="Next 6 months">
                      Next 6 months
                    </MenuItem>
                  </Select>
                </Box>

                {/* Change */}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                    >
                      Change
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="primary"
                    >
                      {change > 0
                        ? `+${change}%`
                        : `${change}%`}
                    </Typography>
                  </Box>

                  <Slider
                    value={change}
                    onChange={(_, value) =>
                      setChange(value)
                    }
                    min={-20}
                    max={30}
                    step={1}
                    valueLabelDisplay="auto"
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      -20%
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      +30%
                    </Typography>
                  </Box>
                </Box>

                {/* Run */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={
                    <Play size={18} />
                  }
                  onClick={
                    handleRunScenario
                  }
                  fullWidth
                >
                  Run Scenario
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Scenario Impact
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Projected impact based on
                    your assumptions.
                  </Typography>
                </Box>

                {result && (
                  <Chip
                    label="Simulation Complete"
                    color="success"
                    size="small"
                    icon={
                      <CheckCircle2
                        size={15}
                      />
                    }
                  />
                )}
              </Stack>

              {!result ? (
                <Box
                  sx={{
                    minHeight: 360,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'center',
                    textAlign: 'center',
                    px: 3,
                  }}
                >
                  <Box>
                    <TrendingUp
                      size={45}
                      color="#94a3b8"
                    />

                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mt: 2 }}
                    >
                      No scenario has been
                      run yet
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Configure the scenario
                      and click Run Scenario
                      to see projected results.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {/* Scenario summary */}
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor:
                        '#f8fafc',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                    >
                      {result.scenarioName}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mt: 1 }}
                    >
                      <Chip
                        label={
                          selectedScenario?.label
                        }
                        size="small"
                        variant="outlined"
                      />

                      <Chip
                        label={result.campus}
                        size="small"
                        variant="outlined"
                      />

                      <Chip
                        label={
                          result.change > 0
                            ? `+${result.change}%`
                            : `${result.change}%`
                        }
                        size="small"
                        color={
                          result.change >= 0
                            ? 'primary'
                            : 'warning'
                        }
                      />

                      <Chip
                        label={result.period}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </Box>

                  {/* Metrics */}
                  <Grid
                    container
                    spacing={1.5}
                  >
                    {result.metrics.map(
                      (metric) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          key={metric.label}
                        >
                          <Box
                            sx={{
                              p: 2,
                              border:
                                '1px solid #e2e8f0',
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {metric.label}
                            </Typography>

                            <Typography
                              variant="h5"
                              fontWeight={700}
                              sx={{ mt: 0.5 }}
                            >
                              {formatValue(
                                metric.value,
                                metric.unit,
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      ),
                    )}
                  </Grid>

                  {/* Save */}
                  <Button
                    variant={
                      saved
                        ? 'outlined'
                        : 'contained'
                    }
                    startIcon={
                      saved ? (
                        <CheckCircle2
                          size={18}
                        />
                      ) : (
                        <Save size={18} />
                      )
                    }
                    onClick={handleSave}
                    disabled={saved}
                  >
                    {saved
                      ? 'Scenario Saved'
                      : 'Save Scenario'}
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================================= */}
      {/* RECOMMENDATIONS */}
      {/* ================================= */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Sparkles
              size={20}
              color="#2563eb"
            />

            <Typography
              variant="h6"
              fontWeight={600}
            >
              Scenario Recommendations
            </Typography>
          </Stack>

          <Grid
            container
            spacing={2}
          >
            {scenarioRecommendations.map(
              (recommendation) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={recommendation.title}
                >
                  <Box
                    sx={{
                      p: 2,
                      border:
                        '1px solid #e2e8f0',
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {
                          recommendation.title
                        }
                      </Typography>

                      <Chip
                        label={
                          recommendation.priority
                        }
                        size="small"
                        color={
                          recommendation.priority ===
                          'High'
                            ? 'error'
                            : 'warning'
                        }
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {
                        recommendation.description
                      }
                    </Typography>
                  </Box>
                </Grid>
              ),
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* SCENARIO HISTORY */}
      {/* ================================= */}

      <Card>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Clock3
              size={20}
              color="#64748b"
            />

            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Scenario History
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Previously completed simulations.
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              overflowX: 'auto',
            }}
          >
            <Box
              sx={{
                minWidth: 700,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns:
                    '2fr 1.5fr 1.5fr 1fr 1fr',
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
                  SCENARIO
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  TYPE
                </Typography>

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
                  CHANGE
                </Typography>

                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                >
                  STATUS
                </Typography>
              </Box>

              {scenarioHistory.map(
                (item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns:
                        '2fr 1.5fr 1.5fr 1fr 1fr',
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

                    <Typography
                      variant="body2"
                    >
                      {item.type}
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      {item.campus}
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      {item.change}
                    </Typography>

                    <Chip
                      label={item.status}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                ),
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ScenarioBuilder
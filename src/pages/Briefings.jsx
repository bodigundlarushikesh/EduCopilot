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
  CalendarDays,
  CheckCircle2,
  FileText,
  Lightbulb,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'

import {
  briefingData,
  briefingTypes,
  briefingPeriods,
  briefingStats,
} from '../data/briefingData'

const Briefings = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedPeriod, setSelectedPeriod] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedBriefing, setSelectedBriefing] = useState(
    briefingData[0],
  )
  const [isGenerating, setIsGenerating] = useState(false)

  const filteredBriefings = useMemo(() => {
    return briefingData.filter((briefing) => {
      const matchesType =
        selectedType === 'All' ||
        briefing.type === selectedType

      const matchesPeriod =
        selectedPeriod === 'All' ||
        briefing.period === selectedPeriod

      const searchText = search.toLowerCase()

      const matchesSearch =
        briefing.title.toLowerCase().includes(searchText) ||
        briefing.summary.toLowerCase().includes(searchText) ||
        briefing.type.toLowerCase().includes(searchText)

      return matchesType && matchesPeriod && matchesSearch
    })
  }, [selectedType, selectedPeriod, search])

  const handleGenerate = () => {
    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
    }, 1200)
  }

  const handleReset = () => {
    setSelectedType('All')
    setSelectedPeriod('All')
    setSearch('')
    setSelectedBriefing(briefingData[0])
  }

  return (
    <Box>
      {/* Page Header */}
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
            gutterBottom
          >
            Executive Briefings
          </Typography>

          <Typography color="text.secondary">
            Generate and review AI-powered executive briefings
            across campuses and strategic areas.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={
            isGenerating ? (
              <RefreshCw size={18} />
            ) : (
              <Sparkles size={18} />
            )
          }
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating
            ? 'Generating...'
            : 'Generate Briefing'}
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <FileText size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Briefings
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {briefingStats.total}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CalendarDays size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Generated This Week
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {briefingStats.generatedThisWeek}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <RefreshCw size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Scheduled
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {briefingStats.scheduled}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircle2 size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Shared
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {briefingStats.shared}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Find a Briefing
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search briefings"
                placeholder="Search by title or content..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Briefing Type</InputLabel>

                <Select
                  value={selectedType}
                  label="Briefing Type"
                  onChange={(event) =>
                    setSelectedType(event.target.value)
                  }
                >
                  <MenuItem value="All">
                    All Types
                  </MenuItem>

                  {briefingTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>

                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(event) =>
                    setSelectedPeriod(event.target.value)
                  }
                >
                  <MenuItem value="All">
                    All Periods
                  </MenuItem>

                  {briefingPeriods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleReset}
                sx={{ height: '56px' }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Briefing List */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Available Briefings
              </Typography>

              {filteredBriefings.length === 0 ? (
                <Box
                  sx={{
                    py: 6,
                    textAlign: 'center',
                  }}
                >
                  <FileText
                    size={40}
                    style={{ marginBottom: 12 }}
                  />

                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    No briefings found
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Try changing your filters or search term.
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={handleReset}
                  >
                    Reset Filters
                  </Button>
                </Box>
              ) : (
                <Stack spacing={1}>
                  {filteredBriefings.map((briefing) => {
                    const isSelected =
                      selectedBriefing?.id === briefing.id

                    return (
                      <Box
                        key={briefing.id}
                        onClick={() =>
                          setSelectedBriefing(briefing)
                        }
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: isSelected
                            ? 'primary.main'
                            : 'divider',
                          bgcolor: isSelected
                            ? 'action.selected'
                            : 'transparent',
                          transition: '0.2s',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Box>
                            <Typography
                              fontWeight={600}
                              sx={{ mb: 0.5 }}
                            >
                              {briefing.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {briefing.date}
                            </Typography>
                          </Box>

                          <Chip
                            label={briefing.status}
                            size="small"
                            icon={
                              <CheckCircle2 size={14} />
                            }
                          />
                        </Stack>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {briefing.summary}
                        </Typography>
                      </Box>
                    )
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Briefing Details */}
        <Grid item xs={12} md={7}>
          {selectedBriefing ? (
            <Card>
              <CardContent>
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
                      gutterBottom
                    >
                      {selectedBriefing.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Chip
                        label={selectedBriefing.type}
                        size="small"
                      />

                      <Chip
                        label={selectedBriefing.period}
                        size="small"
                        variant="outlined"
                      />

                      <Chip
                        label="AI Generated"
                        size="small"
                        icon={<Sparkles size={14} />}
                      />
                    </Stack>
                  </Box>

                  <Chip
                    label={selectedBriefing.status}
                    icon={<CheckCircle2 size={16} />}
                  />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Summary */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                  >
                    Executive Summary
                  </Typography>

                  <Typography color="text.secondary">
                    {selectedBriefing.summary}
                  </Typography>
                </Box>

                {/* Highlights */}
                <Box sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Lightbulb size={20} />

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Key Highlights
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    {selectedBriefing.highlights.map(
                      (highlight, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 700 }}
                          >
                            •
                          </Typography>

                          <Typography color="text.secondary">
                            {highlight}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Stack>
                </Box>

                {/* Risks */}
                <Box sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <ShieldAlert size={20} />

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Key Risks
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    {selectedBriefing.risks.map(
                      (risk, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 700 }}
                          >
                            •
                          </Typography>

                          <Typography color="text.secondary">
                            {risk}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Stack>
                </Box>

                {/* Recommendations */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Sparkles size={20} />

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      AI Recommendations
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    {selectedBriefing.recommendations.map(
                      (recommendation, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 700 }}
                          >
                            •
                          </Typography>

                          <Typography color="text.secondary">
                            {recommendation}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                >
                  Select a briefing to view details.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Briefings
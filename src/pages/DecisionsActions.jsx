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
  CheckCircle2,
  Clock3,
  FileCheck2,
  ListChecks,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'

import {
  decisionData,
  actionData,
  decisionStatuses,
  actionStatuses,
  decisionTypes,
  decisionStats,
} from '../data/decisionData'

const DecisionsActions = () => {
  const [activeTab, setActiveTab] = useState('decisions')

  const [decisionSearch, setDecisionSearch] = useState('')
  const [decisionStatus, setDecisionStatus] = useState('All')
  const [decisionType, setDecisionType] = useState('All')

  const [actionSearch, setActionSearch] = useState('')
  const [actionStatus, setActionStatus] = useState('All')

  const [selectedDecision, setSelectedDecision] = useState(
    decisionData[0],
  )

  const [selectedAction, setSelectedAction] = useState(
    actionData[0],
  )

  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredDecisions = useMemo(() => {
    const searchValue = decisionSearch.toLowerCase()

    return decisionData.filter((decision) => {
      const matchesSearch =
        decision.title.toLowerCase().includes(searchValue) ||
        decision.summary.toLowerCase().includes(searchValue) ||
        decision.owner.toLowerCase().includes(searchValue) ||
        decision.campus.toLowerCase().includes(searchValue)

      const matchesStatus =
        decisionStatus === 'All' ||
        decision.status === decisionStatus

      const matchesType =
        decisionType === 'All' ||
        decision.type === decisionType

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      )
    })
  }, [
    decisionSearch,
    decisionStatus,
    decisionType,
  ])

  const filteredActions = useMemo(() => {
    const searchValue = actionSearch.toLowerCase()

    return actionData.filter((action) => {
      const matchesSearch =
        action.title.toLowerCase().includes(searchValue) ||
        action.owner.toLowerCase().includes(searchValue) ||
        action.campus.toLowerCase().includes(searchValue) ||
        action.description
          .toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        actionStatus === 'All' ||
        action.status === actionStatus

      return matchesSearch && matchesStatus
    })
  }, [actionSearch, actionStatus])

  const handleRefresh = () => {
    setIsRefreshing(true)

    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const resetDecisionFilters = () => {
    setDecisionSearch('')
    setDecisionStatus('All')
    setDecisionType('All')
    setSelectedDecision(decisionData[0])
  }

  const resetActionFilters = () => {
    setActionSearch('')
    setActionStatus('All')
    setSelectedAction(actionData[0])
  }

  const getStatusColor = (status) => {
    if (
      status === 'Approved' ||
      status === 'Completed'
    ) {
      return 'success'
    }

    if (
      status === 'Pending Review' ||
      status === 'In Progress'
    ) {
      return 'warning'
    }

    if (
      status === 'Rejected' ||
      status === 'Overdue'
    ) {
      return 'error'
    }

    return 'default'
  }

  const getPriorityColor = (priority) => {
    if (priority === 'High') {
      return 'error'
    }

    if (priority === 'Medium') {
      return 'warning'
    }

    return 'default'
  }

  return (
    <Box>
      {/* Header */}
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
            Decisions & Actions
          </Typography>

          <Typography color="text.secondary">
            Track executive decisions, approvals, actions,
            owners, and outcomes.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            isRefreshing ? (
              <RefreshCw size={18} />
            ) : (
              <RefreshCw size={18} />
            )
          }
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
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
                <FileCheck2 size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Decisions
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {decisionStats.totalDecisions}
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
                <Clock3 size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Pending Review
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {decisionStats.pendingReview}
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
                    Approved
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {decisionStats.approved}
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
                <ListChecks size={28} />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Active Actions
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {decisionStats.activeActions}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Button
              variant={
                activeTab === 'decisions'
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() =>
                setActiveTab('decisions')
              }
              startIcon={<FileCheck2 size={18} />}
            >
              Decisions
            </Button>

            <Button
              variant={
                activeTab === 'actions'
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() =>
                setActiveTab('actions')
              }
              startIcon={<ListChecks size={18} />}
            >
              Actions
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* DECISIONS */}
      {activeTab === 'decisions' && (
        <>
          {/* Decision Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Search Decisions
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search decisions"
                    placeholder="Search title, owner or campus..."
                    value={decisionSearch}
                    onChange={(event) =>
                      setDecisionSearch(
                        event.target.value,
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <Search
                          size={18}
                          style={{
                            marginRight: 8,
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Status
                    </InputLabel>

                    <Select
                      value={decisionStatus}
                      label="Status"
                      onChange={(event) =>
                        setDecisionStatus(
                          event.target.value,
                        )
                      }
                    >
                      {decisionStatuses.map(
                        (status) => (
                          <MenuItem
                            key={status}
                            value={status}
                          >
                            {status}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Decision Type
                    </InputLabel>

                    <Select
                      value={decisionType}
                      label="Decision Type"
                      onChange={(event) =>
                        setDecisionType(
                          event.target.value,
                        )
                      }
                    >
                      <MenuItem value="All">
                        All Types
                      </MenuItem>

                      {decisionTypes.map(
                        (type) => (
                          <MenuItem
                            key={type}
                            value={type}
                          >
                            {type}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={
                      resetDecisionFilters
                    }
                    sx={{ height: '56px' }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Decision Content */}
          <Grid container spacing={3}>
            {/* Decision List */}
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Decision Log
                  </Typography>

                  {filteredDecisions.length ===
                  0 ? (
                    <Box
                      sx={{
                        py: 6,
                        textAlign: 'center',
                      }}
                    >
                      <FileCheck2
                        size={40}
                        style={{
                          marginBottom: 12,
                        }}
                      />

                      <Typography
                        variant="h6"
                        gutterBottom
                      >
                        No decisions found
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Try changing your filters.
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={
                          resetDecisionFilters
                        }
                      >
                        Reset Filters
                      </Button>
                    </Box>
                  ) : (
                    <Stack spacing={1}>
                      {filteredDecisions.map(
                        (decision) => {
                          const isSelected =
                            selectedDecision?.id ===
                            decision.id

                          return (
                            <Box
                              key={decision.id}
                              onClick={() =>
                                setSelectedDecision(
                                  decision,
                                )
                              }
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor:
                                  isSelected
                                    ? 'primary.main'
                                    : 'divider',
                                bgcolor:
                                  isSelected
                                    ? 'action.selected'
                                    : 'transparent',
                                transition:
                                  '0.2s',
                                '&:hover': {
                                  bgcolor:
                                    'action.hover',
                                },
                              }}
                            >
                              <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                              >
                                {decision.title}
                              </Typography>

                              <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                              >
                                <Chip
                                  label={
                                    decision.status
                                  }
                                  size="small"
                                  color={getStatusColor(
                                    decision.status,
                                  )}
                                />

                                <Chip
                                  label={
                                    decision.priority
                                  }
                                  size="small"
                                  color={getPriorityColor(
                                    decision.priority,
                                  )}
                                  variant="outlined"
                                />
                              </Stack>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                {decision.campus}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {decision.date}
                              </Typography>
                            </Box>
                          )
                        },
                      )}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Decision Details */}
            <Grid item xs={12} md={7}>
              {selectedDecision ? (
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
                          {selectedDecision.title}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip
                            label={
                              selectedDecision.status
                            }
                            color={getStatusColor(
                              selectedDecision.status,
                            )}
                          />

                          <Chip
                            label={
                              selectedDecision.priority
                            }
                            color={getPriorityColor(
                              selectedDecision.priority,
                            )}
                            variant="outlined"
                          />

                          <Chip
                            label={
                              selectedDecision.type
                            }
                            variant="outlined"
                          />
                        </Stack>
                      </Box>

                      <Sparkles size={24} />
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                      >
                        Decision Summary
                      </Typography>

                      <Typography color="text.secondary">
                        {
                          selectedDecision.summary
                        }
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                      >
                        Recommendation
                      </Typography>

                      <Typography color="text.secondary">
                        {
                          selectedDecision.recommendation
                        }
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                      >
                        Reason
                      </Typography>

                      <Typography color="text.secondary">
                        {selectedDecision.reason}
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Card
                          variant="outlined"
                          sx={{ height: '100%' }}
                        >
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Previous Value
                            </Typography>

                            <Typography
                              fontWeight={600}
                              sx={{ mt: 1 }}
                            >
                              {
                                selectedDecision.previousValue
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Card
                          variant="outlined"
                          sx={{ height: '100%' }}
                        >
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              New Value
                            </Typography>

                            <Typography
                              fontWeight={600}
                              sx={{ mt: 1 }}
                            >
                              {
                                selectedDecision.newValue
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                      >
                        Decision Outcome
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CheckCircle2 size={20} />

                        <Typography color="text.secondary">
                          {
                            selectedDecision.outcome
                          }
                        </Typography>
                      </Stack>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Owner
                        </Typography>

                        <Typography
                          fontWeight={600}
                          sx={{ mt: 0.5 }}
                        >
                          {selectedDecision.owner}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Campus
                        </Typography>

                        <Typography
                          fontWeight={600}
                          sx={{ mt: 0.5 }}
                        >
                          {selectedDecision.campus}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography align="center">
                      Select a decision to view details.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </>
      )}

      {/* ACTIONS */}
      {activeTab === 'actions' && (
        <>
          {/* Action Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                Search Actions
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Search actions"
                    placeholder="Search action, owner or campus..."
                    value={actionSearch}
                    onChange={(event) =>
                      setActionSearch(
                        event.target.value,
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <Search
                          size={18}
                          style={{
                            marginRight: 8,
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Action Status
                    </InputLabel>

                    <Select
                      value={actionStatus}
                      label="Action Status"
                      onChange={(event) =>
                        setActionStatus(
                          event.target.value,
                        )
                      }
                    >
                      {actionStatuses.map(
                        (status) => (
                          <MenuItem
                            key={status}
                            value={status}
                          >
                            {status}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={resetActionFilters}
                    sx={{ height: '56px' }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Action Content */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 2 }}
                  >
                    Action Tracker
                  </Typography>

                  {filteredActions.length === 0 ? (
                    <Box
                      sx={{
                        py: 6,
                        textAlign: 'center',
                      }}
                    >
                      <ListChecks
                        size={40}
                        style={{
                          marginBottom: 12,
                        }}
                      />

                      <Typography
                        variant="h6"
                        gutterBottom
                      >
                        No actions found
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Try changing your filters.
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={resetActionFilters}
                      >
                        Reset Filters
                      </Button>
                    </Box>
                  ) : (
                    <Stack spacing={1}>
                      {filteredActions.map(
                        (action) => {
                          const isSelected =
                            selectedAction?.id ===
                            action.id

                          return (
                            <Box
                              key={action.id}
                              onClick={() =>
                                setSelectedAction(
                                  action,
                                )
                              }
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor:
                                  isSelected
                                    ? 'primary.main'
                                    : 'divider',
                                bgcolor:
                                  isSelected
                                    ? 'action.selected'
                                    : 'transparent',
                                transition:
                                  '0.2s',
                                '&:hover': {
                                  bgcolor:
                                    'action.hover',
                                },
                              }}
                            >
                              <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                              >
                                {action.title}
                              </Typography>

                              <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                              >
                                <Chip
                                  label={
                                    action.status
                                  }
                                  size="small"
                                  color={getStatusColor(
                                    action.status,
                                  )}
                                />

                                <Chip
                                  label={
                                    action.priority
                                  }
                                  size="small"
                                  color={getPriorityColor(
                                    action.priority,
                                  )}
                                  variant="outlined"
                                />
                              </Stack>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                Owner: {action.owner}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Due: {action.dueDate}
                              </Typography>
                            </Box>
                          )
                        },
                      )}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Action Details */}
            <Grid item xs={12} md={7}>
              {selectedAction ? (
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                    >
                      {selectedAction.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Chip
                        label={
                          selectedAction.status
                        }
                        color={getStatusColor(
                          selectedAction.status,
                        )}
                      />

                      <Chip
                        label={
                          selectedAction.priority
                        }
                        color={getPriorityColor(
                          selectedAction.priority,
                        )}
                        variant="outlined"
                      />
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                      >
                        Action Description
                      </Typography>

                      <Typography color="text.secondary">
                        {
                          selectedAction.description
                        }
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Owner
                            </Typography>

                            <Typography
                              fontWeight={600}
                              sx={{ mt: 1 }}
                            >
                              {selectedAction.owner}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Due Date
                            </Typography>

                            <Typography
                              fontWeight={600}
                              sx={{ mt: 1 }}
                            >
                              {
                                selectedAction.dueDate
                              }
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Campus
                            </Typography>

                            <Typography
                              fontWeight={600}
                              sx={{ mt: 1 }}
                            >
                              {selectedAction.campus}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        {selectedAction.status ===
                        'Completed' ? (
                          <CheckCircle2
                            size={20}
                          />
                        ) : selectedAction.status ===
                          'Overdue' ? (
                          <ShieldAlert
                            size={20}
                          />
                        ) : (
                          <Clock3 size={20} />
                        )}

                        <Typography fontWeight={600}>
                          Action Status:{' '}
                          {selectedAction.status}
                        </Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography align="center">
                      Select an action to view details.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default DecisionsActions
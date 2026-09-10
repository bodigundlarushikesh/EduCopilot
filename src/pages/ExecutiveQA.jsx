import { useMemo, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import {
  Brain,
  CheckCircle2,
  Clipboard,
  MessageCircle,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'

import { suggestedQuestions } from '../data/qaData'

const ExecutiveQA = () => {
  const [question, setQuestion] = useState('')

  const [answer, setAnswer] = useState(null)

  const [loading, setLoading] = useState(false)

  const [feedback, setFeedback] = useState(null)

  const [copied, setCopied] = useState(false)

  /*
   * Ask question using the real backend API.
   */
  const handleAskQuestion = async (questionToAsk = question) => {
    const cleanQuestion = questionToAsk.trim()

    if (!cleanQuestion) {
      return
    }

    const token = localStorage.getItem('educopilotToken')

    if (!token) {
      setAnswer(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setFeedback(null)
    setCopied(false)

    try {
      const response = await fetch(
        'http://localhost:5000/api/qa',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: cleanQuestion,
          }),
        },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to get answer',
        )
      }

      setAnswer({
        question: result.data.question,
        answer: result.data.answer,
        confidence: Number(result.data.confidence) || 0,
        sourceVerified:
          result.data.sourceVerified === true,
        sources: result.data.sources || [],
      })
    } catch (error) {
      console.error('Executive Q&A error:', error)

      setAnswer({
        question: cleanQuestion,
        answer:
          'Unable to process your question right now. Please make sure the backend is running and try again.',
        confidence: 0,
        sourceVerified: false,
        sources: [],
      })
    } finally {
      setLoading(false)
    }
  }

  /*
   * Suggested question.
   */
  const handleSuggestedQuestion = (
    selectedQuestion,
  ) => {
    setQuestion(selectedQuestion)
    handleAskQuestion(selectedQuestion)
  }

  /*
   * Copy answer.
   */
  const handleCopy = async () => {
    if (!answer) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        answer.answer,
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(
        'Unable to copy answer:',
        error,
      )
    }
  }

  /*
   * Calculate confidence label.
   */
  const confidenceLabel = useMemo(() => {
    if (!answer) {
      return ''
    }

    if (answer.confidence >= 90) {
      return 'High confidence'
    }

    if (answer.confidence >= 75) {
      return 'Medium confidence'
    }

    return 'Low confidence'
  }, [answer])

  return (
    <Box>
      {/* ========================================= */}
      {/* PAGE HEADER */}
      {/* ========================================= */}

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
            <Brain size={24} />
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
              Executive Q&A
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Ask questions about approved school
              data and knowledge.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ========================================= */}
      {/* INFORMATION ALERT */}
      {/* ========================================= */}

      <Alert
        severity="info"
        icon={<Sparkles size={20} />}
        sx={{ mb: 3 }}
      >
        Answers are generated from approved
        knowledge sources. Always review the
        supporting sources before making important
        decisions.
      </Alert>

      {/* ========================================= */}
      {/* QUESTION CARD */}
      {/* ========================================= */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            Ask a question
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Ask about attendance, assessment,
            campuses, teacher workload, risks,
            initiatives, or other school metrics.
          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={question}
              placeholder="Example: Which campus has the highest capacity utilisation?"
              onChange={(event) =>
                setQuestion(
                  event.target.value,
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey
                ) {
                  event.preventDefault()
                  handleAskQuestion()
                }
              }}
            />

            <Button
              variant="contained"
              onClick={handleAskQuestion}
              disabled={
                loading ||
                !question.trim()
              }
              startIcon={
                loading ? (
                  <CircularProgress
                    size={17}
                    color="inherit"
                  />
                ) : (
                  <Search size={18} />
                )
              }
              sx={{
                minWidth: 130,
                minHeight: 56,
                alignSelf: {
                  xs: 'stretch',
                  sm: 'flex-end',
                },
              }}
            >
              {loading
                ? 'Thinking...'
                : 'Ask'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* SUGGESTED QUESTIONS */}
      {/* ========================================= */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <MessageCircle
              size={19}
              color="#2563eb"
            />

            <Typography
              variant="h6"
              fontWeight={600}
            >
              Suggested questions
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {suggestedQuestions.map(
              (item) => (
                <Button
                  key={item.id}
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    handleSuggestedQuestion(
                      item.question,
                    )
                  }
                  sx={{
                    textTransform:
                      'none',
                    borderRadius: 2,
                    justifyContent:
                      'flex-start',
                    textAlign: 'left',
                  }}
                >
                  {item.question}
                </Button>
              ),
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* LOADING */}
      {/* ========================================= */}

      {loading && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ py: 5 }}
            >
              <CircularProgress />

              <Typography
                color="text.secondary"
              >
                Analysing approved knowledge
                sources...
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ========================================= */}
      {/* ANSWER */}
      {/* ========================================= */}

      {!loading && answer && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            {/* Question */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  minWidth: 34,
                  borderRadius: '50%',
                  backgroundColor:
                    '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'center',
                }}
              >
                <Typography
                  fontWeight={700}
                  fontSize={13}
                >
                  Q
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Your question
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ mt: 0.3 }}
                >
                  {answer.question}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2.5 }} />

            {/* Answer */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  minWidth: 34,
                  borderRadius: '50%',
                  backgroundColor:
                    '#2563eb',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'center',
                }}
              >
                <Brain size={17} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                  >
                    AI Answer
                  </Typography>

                  <Tooltip title="Copy answer">
                    <IconButton
                      onClick={handleCopy}
                      size="small"
                    >
                      {copied ? (
                        <CheckCircle2
                          size={19}
                          color="#16a34a"
                        />
                      ) : (
                        <Clipboard
                          size={19}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    lineHeight: 1.8,
                    color: '#334155',
                  }}
                >
                  {answer.answer}
                </Typography>

                {/* Confidence */}
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ mt: 2 }}
                >
                  <Chip
                    label={`${answer.confidence}% confidence`}
                    color={
                      answer.confidence >= 90
                        ? 'success'
                        : 'warning'
                    }
                    size="small"
                  />

                  <Chip
                    label={confidenceLabel}
                    size="small"
                    variant="outlined"
                  />

                  <Chip
                    label={
                      answer.sourceVerified
                        ? 'Source verified'
                        : 'Source not verified'
                    }
                    color={
                      answer.sourceVerified
                        ? 'success'
                        : 'warning'
                    }
                    size="small"
                    variant="outlined"
                  />

                  <Chip
                    label="AI generated"
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Sources */}
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1.5 }}
            >
              Supporting sources
            </Typography>

            <Stack spacing={1.5}>
              {answer.sources.map(
                (source, index) => (
                  <Box
                    key={`${source.title}-${index}`}
                    sx={{
                      p: 1.8,
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
                        alignItems:
                          'center',
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                        >
                          {source.title}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {source.type}
                        </Typography>
                      </Box>

                      <Chip
                        label={`${source.relevance}% relevant`}
                        size="small"
                        variant="outlined"
                        color={
                          source.relevance >=
                          90
                            ? 'success'
                            : 'default'
                        }
                      />
                    </Box>
                  </Box>
                ),
              )}
            </Stack>

            {/* Feedback */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 3,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Was this answer helpful?
              </Typography>

              <Tooltip title="Helpful">
                <IconButton
                  size="small"
                  color={
                    feedback === 'up'
                      ? 'primary'
                      : 'default'
                  }
                  onClick={() =>
                    setFeedback('up')
                  }
                >
                  <ThumbsUp size={17} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Not helpful">
                <IconButton
                  size="small"
                  color={
                    feedback === 'down'
                      ? 'error'
                      : 'default'
                  }
                  onClick={() =>
                    setFeedback('down')
                  }
                >
                  <ThumbsDown size={17} />
                </IconButton>
              </Tooltip>

              {feedback && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Thank you for your feedback.
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* ========================================= */}
      {/* EMPTY STATE */}
      {/* ========================================= */}

      {!loading && !answer && (
        <Card>
          <CardContent
            sx={{
              py: 8,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                borderRadius: '50%',
                backgroundColor:
                  '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Brain size={30} />
            </Box>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              Ask your first question
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
                maxWidth: 520,
                mx: 'auto',
              }}
            >
              Use the question box above or select
              one of the suggested questions to
              explore your school group's data.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default ExecutiveQA
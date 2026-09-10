import { useEffect, useMemo, useState } from 'react'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  FileText,
  Filter,
  Search,
  Tag,
  User,
} from 'lucide-react'

import {
  knowledgeContentTypes,
  knowledgeCategories,
  knowledgeDepartments,
  knowledgeSortOptions,
  knowledgeDateRanges,
} from '../data/knowledgeData'

const ITEMS_PER_PAGE = 5

const KnowledgeSearch = () => {
  const [searchText, setSearchText] = useState('')

  const [contentType, setContentType] =
    useState('All')

  const [category, setCategory] =
    useState('All')

  const [department, setDepartment] =
    useState('All')

  const [dateRange, setDateRange] =
    useState('all')

  const [sortBy, setSortBy] =
    useState('relevance')

  const [page, setPage] = useState(1)

  const [bookmarked, setBookmarked] =
    useState([])

  const [showFilters, setShowFilters] =
    useState(true)

  const [apiDocuments, setApiDocuments] =
    useState([])

  const [apiLoading, setApiLoading] =
    useState(true)

  const [apiError, setApiError] =
    useState('')

  /*
   * Load approved knowledge documents from the backend.
   * The API handles search, content type, category,
   * sorting and pagination parameters. We request up to
   * 50 records here so the existing department/date filters
   * and UI pagination can continue to work without changing
   * the current design.
   */
  useEffect(() => {
    const fetchKnowledgeDocuments = async () => {
      try {
        setApiLoading(true)
        setApiError('')

        const token = localStorage.getItem(
          'educopilotToken',
        )

        if (!token) {
          setApiError(
            'Authentication token not found. Please log in again.',
          )
          setApiLoading(false)
          return
        }

        const params = new URLSearchParams()

        if (searchText.trim()) {
          params.set('search', searchText.trim())
        }

        if (contentType !== 'All') {
          params.set('documentType', contentType)
        }

        if (category !== 'All') {
          params.set('category', category)
        }

        const backendSortMap = {
          relevance: 'relevance_score',
          newest: 'created_at',
          oldest: 'created_at',
          title: 'title',
        }

        params.set(
          'sortBy',
          backendSortMap[sortBy] || 'relevance_score',
        )

        params.set(
          'sortOrder',
          sortBy === 'oldest' || sortBy === 'title'
            ? 'ASC'
            : 'DESC',
        )

        params.set('page', '1')
        params.set('limit', '50')

        const response = await fetch(
          `http://localhost:5000/api/knowledge?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              'Failed to load knowledge documents',
          )
        }

        const mappedDocuments = (result.data || []).map(
          (document) => {
            let department = 'Academic'

            if (
              document.category === 'Admissions'
            ) {
              department = 'Admissions'
            } else if (
              document.category ===
              'Parent Communication'
            ) {
              department = 'Administration'
            } else if (
              document.category === 'Teaching'
            ) {
              department = 'Academic'
            }

            return {
              id: document.id,
              title: document.title,
              description: document.content,
              contentType: document.document_type,
              category: document.category,
              department,
              date: document.created_at,
              author: document.owner_name || 'Unknown',
              source: document.source_name || 'Unknown',
              relevance: Number(
                document.relevance_score || 0,
              ),
              tags: [
                document.document_type,
                document.category,
              ].filter(Boolean),
            }
          },
        )

        setApiDocuments(mappedDocuments)
      } catch (error) {
        console.error(
          'Knowledge Search API error:',
          error,
        )

        setApiError(
          error.message ||
            'Unable to load knowledge documents',
        )
      } finally {
        setApiLoading(false)
      }
    }

    fetchKnowledgeDocuments()
  }, [
    searchText,
    contentType,
    category,
    sortBy,
  ])

  /*
   * Department + date filters and final sorting
   */
  const filteredDocuments = useMemo(() => {
    let results = [...apiDocuments]

    /*
     * Department
     */
    if (department !== 'All') {
      results = results.filter(
        (document) =>
          document.department === department,
      )
    }

    /*
     * Date range
     */
    if (dateRange !== 'all') {
      const days = Number(dateRange)
      const today = new Date()
      const minimumDate = new Date(today)

      minimumDate.setDate(
        today.getDate() - days,
      )

      results = results.filter((document) => {
        const documentDate = new Date(
          document.date,
        )

        return documentDate >= minimumDate
      })
    }

    /*
     * Final sorting for the current UI.
     */
    if (sortBy === 'relevance') {
      results.sort(
        (a, b) => b.relevance - a.relevance,
      )
    }

    if (sortBy === 'newest') {
      results.sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date),
      )
    }

    if (sortBy === 'oldest') {
      results.sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date),
      )
    }

    if (sortBy === 'title') {
      results.sort((a, b) =>
        a.title.localeCompare(b.title),
      )
    }

    return results
  }, [
    apiDocuments,
    department,
    dateRange,
    sortBy,
  ])

  /*
   * Pagination
   */
  const totalPages = Math.ceil(
    filteredDocuments.length /
      ITEMS_PER_PAGE,
  )

  const paginatedDocuments =
    filteredDocuments.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    )

  /*
   * Bookmark
   */
  const toggleBookmark = (id) => {
    setBookmarked((current) => {
      if (current.includes(id)) {
        return current.filter(
          (item) => item !== id,
        )
      }

      return [...current, id]
    })
  }

  /*
   * Reset filters
   */
  const resetFilters = () => {
    setSearchText('')
    setContentType('All')
    setCategory('All')
    setDepartment('All')
    setDateRange('all')
    setSortBy('relevance')
    setPage(1)
  }

  /*
   * Change filter and reset page
   */
  const handleFilterChange = (
    setter,
    value,
  ) => {
    setter(value)
    setPage(1)
  }

  return (
    <Box>
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <Box sx={{ mb: 3 }}>
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
          Knowledge Search
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Search approved school knowledge,
          policies, reports and analysis.
        </Typography>
      </Box>

      {apiLoading && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Loading approved knowledge from PostgreSQL...
        </Alert>
      )}

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
          >
            <TextField
              fullWidth
              value={searchText}
              placeholder="Search knowledge..."
              onChange={(event) => {
                setSearchText(
                  event.target.value,
                )
                setPage(1)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setPage(1)
                }
              }}
              InputProps={{
                startAdornment: (
                  <Search
                    size={20}
                    style={{
                      marginRight: 10,
                      color: '#64748b',
                    }}
                  />
                ),
              }}
            />

            <Button
              variant="contained"
              startIcon={
                <Search size={18} />
              }
              onClick={() => setPage(1)}
              sx={{
                minWidth: 130,
                minHeight: 56,
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              startIcon={
                <Filter size={18} />
              }
              onClick={() =>
                setShowFilters(
                  !showFilters,
                )
              }
              sx={{
                minHeight: 56,
                minWidth: 130,
              }}
            >
              Filters
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* FILTERS */}
      {/* ================================= */}

      {showFilters && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
              flexWrap="wrap"
            >
              {/* Content Type */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 180,
                }}
              >
                <InputLabel>
                  Content Type
                </InputLabel>

                <Select
                  value={contentType}
                  label="Content Type"
                  onChange={(event) =>
                    handleFilterChange(
                      setContentType,
                      event.target.value,
                    )
                  }
                >
                  {knowledgeContentTypes.map(
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

              {/* Category */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 180,
                }}
              >
                <InputLabel>
                  Category
                </InputLabel>

                <Select
                  value={category}
                  label="Category"
                  onChange={(event) =>
                    handleFilterChange(
                      setCategory,
                      event.target.value,
                    )
                  }
                >
                  {knowledgeCategories.map(
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
              </FormControl>

              {/* Department */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 190,
                }}
              >
                <InputLabel>
                  Department
                </InputLabel>

                <Select
                  value={department}
                  label="Department"
                  onChange={(event) =>
                    handleFilterChange(
                      setDepartment,
                      event.target.value,
                    )
                  }
                >
                  {knowledgeDepartments.map(
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
              </FormControl>

              {/* Date */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 160,
                }}
              >
                <InputLabel>
                  Date Range
                </InputLabel>

                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(event) =>
                    handleFilterChange(
                      setDateRange,
                      event.target.value,
                    )
                  }
                >
                  {knowledgeDateRanges.map(
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
              </FormControl>

              {/* Sort */}
              <FormControl
                size="small"
                sx={{
                  minWidth: 170,
                }}
              >
                <InputLabel>
                  Sort By
                </InputLabel>

                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(event) =>
                    handleFilterChange(
                      setSortBy,
                      event.target.value,
                    )
                  }
                >
                  {knowledgeSortOptions.map(
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
              </FormControl>

              {/* Reset */}
              <Button
                variant="text"
                onClick={resetFilters}
                sx={{
                  alignSelf: 'center',
                }}
              >
                Reset filters
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ================================= */}
      {/* RESULTS HEADER */}
      {/* ================================= */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            {filteredDocuments.length}{' '}
            results
          </Typography>

          {searchText && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Results for "
              {searchText}"
            </Typography>
          )}
        </Box>

        <Chip
          label="Approved sources"
          color="success"
          variant="outlined"
          size="small"
        />
      </Box>

      {/* ================================= */}
      {/* RESULTS */}
      {/* ================================= */}

      {paginatedDocuments.length === 0 ? (
        <Card>
          <CardContent
            sx={{
              py: 7,
              textAlign: 'center',
            }}
          >
            <Search
              size={42}
              color="#94a3b8"
            />

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mt: 2 }}
            >
              No results found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
                mb: 2,
              }}
            >
              Try changing your search terms
              or filters.
            </Typography>

            <Button
              variant="outlined"
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {paginatedDocuments.map(
            (document) => {
              const isBookmarked =
                bookmarked.includes(
                  document.id,
                )

              return (
                <Card
                  key={document.id}
                  sx={{
                    transition:
                      '0.2s ease',

                    '&:hover': {
                      boxShadow:
                        '0 4px 15px rgba(15,23,42,0.08)',
                    },
                  }}
                >
                  <CardContent>
                    {/* Top */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <FileText
                            size={19}
                            color="#2563eb"
                          />

                          <Typography
                            variant="h6"
                            fontWeight={650}
                          >
                            {document.title}
                          </Typography>
                        </Stack>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            lineHeight: 1.6,
                          }}
                        >
                          {
                            document.description
                          }
                        </Typography>
                      </Box>

                      {/* Bookmark */}
                      <Button
                        variant="text"
                        onClick={() =>
                          toggleBookmark(
                            document.id,
                          )
                        }
                        sx={{
                          minWidth: 40,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck
                            size={20}
                            color="#2563eb"
                          />
                        ) : (
                          <Bookmark
                            size={20}
                          />
                        )}
                      </Button>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Metadata */}
                    <Stack
                      direction="row"
                      spacing={2}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Chip
                        label={
                          document.contentType
                        }
                        size="small"
                        color="primary"
                        variant="outlined"
                      />

                      <Chip
                        label={
                          document.category
                        }
                        size="small"
                      />

                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                      >
                        <CalendarDays
                          size={15}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {document.date}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                      >
                        <User
                          size={15}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {document.author}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Source + Relevance */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        mt: 2,
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          fontWeight={600}
                        >
                          Source:
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {document.source}
                        </Typography>
                      </Stack>

                      <Chip
                        label={`${document.relevance}% relevant`}
                        size="small"
                        color={
                          document.relevance >=
                          90
                            ? 'success'
                            : 'default'
                        }
                      />
                    </Box>

                    {/* Tags */}
                    <Stack
                      direction="row"
                      spacing={0.7}
                      sx={{ mt: 1.5 }}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Tag size={15} />

                      {document.tags.map(
                        (tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ),
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              )
            },
          )}
        </Stack>
      )}

      {/* ================================= */}
      {/* PAGINATION */}
      {/* ================================= */}

      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) =>
              setPage(value)
            }
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  )
}

export default KnowledgeSearch
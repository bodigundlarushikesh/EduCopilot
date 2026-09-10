const pool = require('../config/db')

const stopWords = new Set([
  'what',
  'what is',
  'what are',
  'how',
  'how is',
  'how are',
  'why',
  'when',
  'where',
  'which',
  'who',
  'the',
  'is',
  'are',
  'a',
  'an',
  'of',
  'for',
  'to',
  'in',
  'on',
  'and',
  'or',
  'about',
  'can',
  'could',
  'should',
  'please',
  'tell',
  'me',
])

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body

    // 1. Validate question
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      })
    }

    const cleanQuestion = question.trim()

    // 2. Convert question into useful keywords
    const words = cleanQuestion
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((word) => {
        return word.length >= 3 && !stopWords.has(word)
      })

    if (words.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a more specific question',
      })
    }

    // 3. Search approved documents
    const searchConditions = []
    const searchValues = []

    words.forEach((word, index) => {
      const parameter = `$${index + 1}`

      searchValues.push(`%${word}%`)

      searchConditions.push(`
        (
          kd.title ILIKE ${parameter}
          OR kd.content ILIKE ${parameter}
          OR kd.category ILIKE ${parameter}
          OR kd.document_type ILIKE ${parameter}
          OR kd.source_name ILIKE ${parameter}
        )
      `)
    })

    const query = `
      SELECT
        kd.id,
        kd.title,
        kd.content,
        kd.document_type,
        kd.category,
        kd.source_name,
        kd.source_url,
        kd.relevance_score,
        kd.created_at,
        c.name AS campus_name
      FROM knowledge_documents kd
      LEFT JOIN campuses c
        ON kd.campus_id = c.id
      WHERE
        kd.is_approved = true
        AND kd.status = 'Approved'
        AND (
          ${searchConditions.join(' OR ')}
        )
    `

    const result = await pool.query(query, searchValues)

    // 4. No matching documents
    if (result.rows.length === 0) {
      return res.json({
        success: true,
        data: {
          question: cleanQuestion,
          answer:
            'I could not find an approved source that directly answers this question.',
          confidence: 0,
          sourceVerified: false,
          sources: [],
        },
      })
    }

    // 5. Calculate question-specific relevance
    const questionLower = cleanQuestion.toLowerCase()

    const scoredDocuments = result.rows.map((document) => {
      const title = (document.title || '').toLowerCase()
      const content = (document.content || '').toLowerCase()
      const category = (document.category || '').toLowerCase()
      const documentType = (
        document.document_type || ''
      ).toLowerCase()
      const sourceName = (
        document.source_name || ''
      ).toLowerCase()

      let score = 0
      let matchedWords = 0

      words.forEach((word) => {
        // Title match = highest importance
        if (title.includes(word)) {
          score += 40
          matchedWords += 1
        }

        // Category match
        if (category.includes(word)) {
          score += 25
          matchedWords += 1
        }

        // Source name match
        if (sourceName.includes(word)) {
          score += 20
          matchedWords += 1
        }

        // Document type match
        if (documentType.includes(word)) {
          score += 10
          matchedWords += 1
        }

        // Content match
        if (content.includes(word)) {
          score += 8
          matchedWords += 1
        }
      })

      // Exact question phrase inside title/content
      if (title.includes(questionLower)) {
        score += 100
      }

      if (content.includes(questionLower)) {
        score += 50
      }

      // Important policy keyword bonus
      if (
        questionLower.includes('attendance') &&
        title.includes('attendance')
      ) {
        score += 100
      }

      if (
        questionLower.includes('assessment') &&
        title.includes('assessment')
      ) {
        score += 100
      }

      if (
        questionLower.includes('admission') &&
        title.includes('admission')
      ) {
        score += 100
      }

      if (
        questionLower.includes('teacher') &&
        title.includes('teacher')
      ) {
        score += 100
      }

      if (
        questionLower.includes('parent') &&
        title.includes('parent')
      ) {
        score += 100
      }

      if (
        questionLower.includes('intervention') &&
        title.includes('intervention')
      ) {
        score += 100
      }

      return {
        ...document,
        calculatedScore: score,
        matchedWords,
      }
    })

    // 6. Sort using our calculated score
    scoredDocuments.sort((a, b) => {
      if (b.calculatedScore !== a.calculatedScore) {
        return b.calculatedScore - a.calculatedScore
      }

      return (
        Number(b.relevance_score || 0) -
        Number(a.relevance_score || 0)
      )
    })

    // 7. Use the best matching document
    const topDocument = scoredDocuments[0]

    // Only include closely related supporting documents
    const supportingDocuments = scoredDocuments
      .filter((document) => {
        return (
          document.calculatedScore >=
          topDocument.calculatedScore * 0.35
        )
      })
      .slice(0, 3)

    // 8. Calculate confidence
    const topScore = topDocument.calculatedScore

    let confidence = Math.min(
      99,
      Math.max(60, Math.round(topScore)),
    )

    // Strong title match gives high confidence
    if (
      words.some((word) =>
        topDocument.title
          .toLowerCase()
          .includes(word),
      )
    ) {
      confidence = Math.max(confidence, 85)
    }

    // 9. Build answer from the best document
    const answer = `${topDocument.title}: ${topDocument.content}`

    // 10. Build supporting sources
    const sources = supportingDocuments.map(
      (document) => ({
        id: document.id,
        title: document.title,
        type: document.document_type,
        category: document.category,
        source: document.source_name,
        sourceUrl: document.source_url,
        relevance: Math.min(
          99,
          Math.max(
            1,
            Math.round(
              (document.calculatedScore /
                Math.max(
                  topDocument.calculatedScore,
                  1,
                )) *
                100,
            ),
          ),
        ),
        verified: true,
        campus: document.campus_name,
      }),
    )

    return res.json({
      success: true,
      data: {
        question: cleanQuestion,
        answer,
        confidence,
        sourceVerified: true,
        sources,
      },
    })
  } catch (error) {
    console.error('Executive Q&A error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to process question',
    })
  }
}

module.exports = {
  askQuestion,
}
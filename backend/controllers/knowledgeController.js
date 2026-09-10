const pool = require('../config/db')

const getKnowledgeDocuments = async (req, res) => {
  try {
    const {
      search = '',
      documentType = '',
      category = '',
      campusId = '',
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = req.query

    const currentPage = Math.max(parseInt(page, 10) || 1, 1)
    const pageLimit = Math.min(
      Math.max(parseInt(limit, 10) || 10, 1),
      50,
    )

    const offset = (currentPage - 1) * pageLimit

    const allowedSortColumns = {
      created_at: 'kd.created_at',
      title: 'kd.title',
      relevance_score: 'kd.relevance_score',
      category: 'kd.category',
    }

    const orderColumn =
      allowedSortColumns[sortBy] || 'kd.created_at'

    const orderDirection =
      String(sortOrder).toUpperCase() === 'ASC'
        ? 'ASC'
        : 'DESC'

    const values = []
    const conditions = [
      'kd.is_approved = true',
      "kd.status = 'Approved'",
    ]

    if (search.trim()) {
      values.push(`%${search.trim()}%`)

      const searchParameter = `$${values.length}`

      conditions.push(`
        (
          kd.title ILIKE ${searchParameter}
          OR kd.content ILIKE ${searchParameter}
          OR kd.category ILIKE ${searchParameter}
          OR kd.document_type ILIKE ${searchParameter}
          OR kd.source_name ILIKE ${searchParameter}
        )
      `)
    }

    if (documentType.trim()) {
      values.push(documentType.trim())
      conditions.push(
        `kd.document_type = $${values.length}`,
      )
    }

    if (category.trim()) {
      values.push(category.trim())
      conditions.push(
        `kd.category = $${values.length}`,
      )
    }

    if (campusId.trim()) {
      const parsedCampusId = parseInt(campusId, 10)

      if (!Number.isNaN(parsedCampusId)) {
        values.push(parsedCampusId)

        conditions.push(`
          (
            kd.campus_id = $${values.length}
            OR kd.campus_id IS NULL
          )
        `)
      }
    }

    const whereClause = conditions.join(' AND ')

    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM knowledge_documents kd
      WHERE ${whereClause}
    `

    const countResult = await pool.query(
      countQuery,
      values,
    )

    const total = countResult.rows[0].total

    const dataValues = [...values]

    dataValues.push(pageLimit)
    const limitParameter = `$${dataValues.length}`

    dataValues.push(offset)
    const offsetParameter = `$${dataValues.length}`

    const dataQuery = `
      SELECT
        kd.id,
        kd.title,
        kd.content,
        kd.document_type,
        kd.category,
        kd.source_name,
        kd.source_url,
        kd.campus_id,
        c.name AS campus_name,
        kd.owner_name,
        kd.status,
        kd.relevance_score,
        kd.is_approved,
        kd.created_at,
        kd.updated_at
      FROM knowledge_documents kd
      LEFT JOIN campuses c
        ON kd.campus_id = c.id
      WHERE ${whereClause}
      ORDER BY ${orderColumn} ${orderDirection}
      LIMIT ${limitParameter}
      OFFSET ${offsetParameter}
    `

    const dataResult = await pool.query(
      dataQuery,
      dataValues,
    )

    return res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        page: currentPage,
        limit: pageLimit,
        total,
        totalPages: Math.ceil(total / pageLimit),
      },
    })
  } catch (error) {
    console.error('Knowledge search error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to load knowledge documents',
    })
  }
}

const getKnowledgeDocumentById = async (req, res) => {
  try {
    const { id } = req.params

    const documentId = parseInt(id, 10)

    if (Number.isNaN(documentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document ID',
      })
    }

    const result = await pool.query(
      `
      SELECT
        kd.id,
        kd.title,
        kd.content,
        kd.document_type,
        kd.category,
        kd.source_name,
        kd.source_url,
        kd.campus_id,
        c.name AS campus_name,
        kd.owner_name,
        kd.status,
        kd.relevance_score,
        kd.is_approved,
        kd.created_at,
        kd.updated_at
      FROM knowledge_documents kd
      LEFT JOIN campuses c
        ON kd.campus_id = c.id
      WHERE
        kd.id = $1
        AND kd.is_approved = true
        AND kd.status = 'Approved'
      `,
      [documentId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge document not found',
      })
    }

    return res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error(
      'Knowledge document details error:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Failed to load knowledge document',
    })
  }
}

module.exports = {
  getKnowledgeDocuments,
  getKnowledgeDocumentById,
}
const pool = require('../config/db')

const getDashboard = async (req, res) => {
  try {
    // =====================================================
    // 1. TOTAL ACTIVE USERS
    // =====================================================

    const usersResult = await pool.query(`
      SELECT COUNT(*)::int AS total_users
      FROM users
      WHERE is_active = true
    `)

    // =====================================================
    // 2. TOTAL ACTIVE CAMPUSES
    // =====================================================

    const campusesResult = await pool.query(`
      SELECT COUNT(*)::int AS total_campuses
      FROM campuses
      WHERE is_active = true
    `)

    // =====================================================
    // 3. USERS BY ROLE
    // =====================================================

    const rolesResult = await pool.query(`
      SELECT
        r.name AS role,
        COUNT(u.id)::int AS count
      FROM roles r
      LEFT JOIN users u
        ON u.role_id = r.id
        AND u.is_active = true
      GROUP BY r.id, r.name
      ORDER BY r.id
    `)

    // =====================================================
    // 4. RECENT USERS
    // =====================================================

    const recentUsersResult = await pool.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        r.name AS role,
        c.name AS campus,
        u.created_at
      FROM users u
      LEFT JOIN roles r
        ON u.role_id = r.id
      LEFT JOIN campuses c
        ON u.campus_id = c.id
      ORDER BY u.created_at DESC
      LIMIT 5
    `)

    // =====================================================
    // 5. LATEST DASHBOARD METRICS
    // =====================================================

    const latestMetricsResult = await pool.query(`
      SELECT
        dm.id,
        dm.metric_date,
        dm.enrolment,
        dm.attendance,
        dm.learning_progress,
        dm.assessment_performance,
        dm.teacher_workload,
        dm.intervention_completion,
        dm.parent_response,
        dm.capacity_utilisation,
        dm.campus_id,
        c.name AS campus_name
      FROM dashboard_metrics dm
      LEFT JOIN campuses c
        ON dm.campus_id = c.id
      ORDER BY dm.metric_date DESC
      LIMIT 1
    `)

    // =====================================================
    // 6. DASHBOARD METRIC HISTORY
    // =====================================================

    const metricsHistoryResult = await pool.query(`
      SELECT
        dm.metric_date,
        dm.enrolment,
        dm.attendance,
        dm.learning_progress,
        dm.assessment_performance,
        dm.teacher_workload,
        dm.intervention_completion,
        dm.parent_response,
        dm.capacity_utilisation,
        dm.campus_id,
        c.name AS campus_name
      FROM dashboard_metrics dm
      LEFT JOIN campuses c
        ON dm.campus_id = c.id
      ORDER BY dm.metric_date ASC
    `)

    // =====================================================
    // 7. CAMPUS OVERVIEW
    // =====================================================

    const campusOverviewResult = await pool.query(`
      SELECT DISTINCT ON (dm.campus_id)
        dm.campus_id AS id,
        c.name,
        c.code,
        dm.enrolment AS students,
        dm.attendance,
        dm.learning_progress,
        dm.assessment_performance,
        dm.teacher_workload,
        dm.intervention_completion,
        dm.parent_response,
        dm.capacity_utilisation
      FROM dashboard_metrics dm
      INNER JOIN campuses c
        ON dm.campus_id = c.id
      WHERE c.is_active = true
      ORDER BY dm.campus_id, dm.metric_date DESC
    `)

    const latestMetrics =
      latestMetricsResult.rows[0] || null

    // =====================================================
    // 8. RESPONSE
    // =====================================================

    return res.json({
      success: true,

      data: {
        // User information
        totalUsers: usersResult.rows[0].total_users,
        totalCampuses:
          campusesResult.rows[0].total_campuses,

        usersByRole: rolesResult.rows,

        recentUsers: recentUsersResult.rows,

        // Latest education metrics
        latestMetrics,

        // Historical metrics for charts
        metricsHistory: metricsHistoryResult.rows,

        // Campus information
        campusOverview: campusOverviewResult.rows,
      },
    })
  } catch (error) {
    console.error('Dashboard error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data',
    })
  }
}

module.exports = {
  getDashboard,
}
export const decisionStatuses = [
  'All',
  'Pending Review',
  'Approved',
  'Rejected',
  'Deferred',
  'Completed',
]

export const actionStatuses = [
  'All',
  'Not Started',
  'In Progress',
  'Completed',
  'Overdue',
]

export const decisionTypes = [
  'Campus Capacity',
  'Teacher Allocation',
  'Academic Intervention',
  'Budget',
  'Student Attendance',
  'Strategic Initiative',
]

export const decisionData = [
  {
    id: 1,
    title: 'Expand Greenfield International Capacity',
    type: 'Campus Capacity',
    status: 'Pending Review',
    priority: 'High',
    owner: 'Executive Team',
    campus: 'Greenfield International',
    date: '2026-09-08',
    summary:
      'Review options to increase classroom capacity due to projected enrolment growth.',
    recommendation:
      'Evaluate additional classroom space and temporary capacity options before the next academic intake.',
    reason:
      'Projected enrolment may exceed the current available capacity.',
    previousValue: '92% capacity utilisation',
    newValue: 'Target below 85% utilisation',
    outcome: 'Awaiting executive review',
  },

  {
    id: 2,
    title: 'Additional Mathematics Intervention',
    type: 'Academic Intervention',
    status: 'Approved',
    priority: 'High',
    owner: 'Academic Department',
    campus: 'All Campuses',
    date: '2026-09-07',
    summary:
      'Introduce additional Mathematics intervention sessions for students below the expected assessment target.',
    recommendation:
      'Schedule targeted intervention sessions and monitor assessment improvement over the next six weeks.',
    reason:
      'Mathematics assessment performance remains below the expected target.',
    previousValue: 'Standard intervention schedule',
    newValue: 'Additional weekly Mathematics sessions',
    outcome: 'Approved for implementation',
  },

  {
    id: 3,
    title: 'Teacher Workload Redistribution',
    type: 'Teacher Allocation',
    status: 'In Progress',
    priority: 'Medium',
    owner: 'Department Heads',
    campus: 'Riverside Academy',
    date: '2026-09-05',
    summary:
      'Redistribute teaching responsibilities to balance workload across departments.',
    recommendation:
      'Review teacher allocation and move selected teaching hours to departments with available capacity.',
    reason:
      'Workload differences have been identified between departments.',
    previousValue: 'Uneven workload distribution',
    newValue: 'Balanced allocation target',
    outcome: 'Implementation in progress',
  },

  {
    id: 4,
    title: 'Attendance Improvement Initiative',
    type: 'Student Attendance',
    status: 'Completed',
    priority: 'Medium',
    owner: 'Student Support Team',
    campus: 'Horizon Public School',
    date: '2026-09-03',
    summary:
      'Implement targeted attendance follow-up for students with repeated absences.',
    recommendation:
      'Continue monitoring attendance and maintain parent communication for repeated absence cases.',
    reason:
      'Attendance improvement was identified as an operational priority.',
    previousValue: '91.8% attendance',
    newValue: '94.2% attendance',
    outcome: 'Target achieved',
  },

  {
    id: 5,
    title: 'Digital Learning Initiative Review',
    type: 'Strategic Initiative',
    status: 'Approved',
    priority: 'Medium',
    owner: 'Executive Team',
    campus: 'All Campuses',
    date: '2026-09-02',
    summary:
      'Review progress of the digital learning expansion initiative.',
    recommendation:
      'Continue the initiative and review adoption metrics during the next quarterly meeting.',
    reason:
      'The initiative is progressing according to the strategic plan.',
    previousValue: 'Initial implementation',
    newValue: 'Expanded implementation',
    outcome: 'Approved to continue',
  },

  {
    id: 6,
    title: 'Resource Procurement Review',
    type: 'Budget',
    status: 'Deferred',
    priority: 'Low',
    owner: 'Finance Department',
    campus: 'Oakwood Campus',
    date: '2026-08-30',
    summary:
      'Review additional resource procurement requirements for the upcoming planning period.',
    recommendation:
      'Reassess procurement requirements after the next budget review.',
    reason:
      'Current requirements can be met using existing resources.',
    previousValue: 'Additional procurement requested',
    newValue: 'Review postponed',
    outcome: 'Deferred to next budget cycle',
  },
]

export const actionData = [
  {
    id: 1,
    title: 'Review Greenfield Campus Capacity',
    decisionId: 1,
    owner: 'Operations Team',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-09-15',
    campus: 'Greenfield International',
    description:
      'Assess available classrooms and identify short-term and long-term capacity options.',
  },

  {
    id: 2,
    title: 'Schedule Mathematics Intervention Sessions',
    decisionId: 2,
    owner: 'Academic Department',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-09-12',
    campus: 'All Campuses',
    description:
      'Create and publish the additional Mathematics intervention timetable.',
  },

  {
    id: 3,
    title: 'Review Teacher Allocation',
    decisionId: 3,
    owner: 'Department Heads',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-09-18',
    campus: 'Riverside Academy',
    description:
      'Review workload distribution and identify opportunities for redistribution.',
  },

  {
    id: 4,
    title: 'Monitor Student Attendance',
    decisionId: 4,
    owner: 'Student Support Team',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-10',
    campus: 'Horizon Public School',
    description:
      'Continue monitoring attendance following the improvement initiative.',
  },

  {
    id: 5,
    title: 'Review Digital Learning Metrics',
    decisionId: 5,
    owner: 'Technology Team',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '2026-09-25',
    campus: 'All Campuses',
    description:
      'Prepare adoption and usage metrics for the next strategic review.',
  },

  {
    id: 6,
    title: 'Prepare Budget Review',
    decisionId: 6,
    owner: 'Finance Department',
    status: 'Not Started',
    priority: 'Low',
    dueDate: '2026-09-30',
    campus: 'Oakwood Campus',
    description:
      'Prepare resource procurement requirements for the next budget cycle.',
  },
]

export const decisionStats = {
  totalDecisions: 24,
  pendingReview: 4,
  approved: 12,
  completed: 8,
  activeActions: 7,
  overdueActions: 2,
}
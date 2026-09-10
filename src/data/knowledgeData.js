export const knowledgeDocuments = [
  {
    id: 1,
    title: 'Annual Academic Performance Report 2025-26',
    description:
      'Comprehensive analysis of academic performance, assessment outcomes, attendance, and learning progress across the school group.',
    contentType: 'Report',
    category: 'Academic',
    department: 'Academic Department',
    date: '2026-04-15',
    author: 'Academic Analytics Team',
    relevance: 98,
    source: 'Academic Performance Database',
    tags: [
      'academic performance',
      'assessment',
      'learning',
    ],
    status: 'Approved',
  },

  {
    id: 2,
    title: 'Student Attendance Policy',
    description:
      'Policy guidelines covering student attendance monitoring, absence management, escalation procedures, and intervention requirements.',
    contentType: 'Policy',
    category: 'Student Services',
    department: 'Student Services',
    date: '2026-03-20',
    author: 'Student Services',
    relevance: 96,
    source: 'Policy Repository',
    tags: [
      'attendance',
      'students',
      'policy',
    ],
    status: 'Approved',
  },

  {
    id: 3,
    title: 'Teacher Workload & Capacity Analysis',
    description:
      'Analysis of teacher workload, staffing capacity, allocation patterns, and projected resource requirements across campuses.',
    contentType: 'Analysis',
    category: 'Operations',
    department: 'Operations',
    date: '2026-05-02',
    author: 'Operations Analytics',
    relevance: 94,
    source: 'Workforce Analytics',
    tags: [
      'teacher workload',
      'capacity',
      'staffing',
    ],
    status: 'Approved',
  },

  {
    id: 4,
    title: 'Parent Engagement Strategy',
    description:
      'Strategic framework for improving parent communication, participation, response rates, and engagement with school initiatives.',
    contentType: 'Strategy',
    category: 'Communications',
    department: 'Student Services',
    date: '2026-02-10',
    author: 'Communications Team',
    relevance: 91,
    source: 'Strategy Repository',
    tags: [
      'parents',
      'engagement',
      'communication',
    ],
    status: 'Approved',
  },

  {
    id: 5,
    title: 'Campus Capacity Planning Guidelines',
    description:
      'Guidelines for monitoring campus capacity, classroom utilisation, enrolment projections, and infrastructure planning.',
    contentType: 'Guideline',
    category: 'Operations',
    department: 'Operations',
    date: '2026-01-25',
    author: 'Planning Department',
    relevance: 89,
    source: 'Operations Knowledge Base',
    tags: [
      'capacity',
      'campus',
      'enrolment',
    ],
    status: 'Approved',
  },

  {
    id: 6,
    title: 'Learning Intervention Framework',
    description:
      'Framework for identifying students requiring additional support and tracking intervention plans and outcomes.',
    contentType: 'Framework',
    category: 'Academic',
    department: 'Academic Department',
    date: '2026-04-05',
    author: 'Learning Support Team',
    relevance: 87,
    source: 'Academic Knowledge Base',
    tags: [
      'intervention',
      'learning support',
      'students',
    ],
    status: 'Approved',
  },

  {
    id: 7,
    title: 'Assessment Governance Framework',
    description:
      'Governance framework covering assessment standards, moderation, reporting, data quality, and performance monitoring.',
    contentType: 'Framework',
    category: 'Academic',
    department: 'Academic Department',
    date: '2026-03-12',
    author: 'Assessment Team',
    relevance: 85,
    source: 'Assessment Repository',
    tags: [
      'assessment',
      'governance',
      'quality',
    ],
    status: 'Approved',
  },

  {
    id: 8,
    title: 'Strategic Initiative Review Q2',
    description:
      'Quarterly review of strategic initiatives, progress indicators, responsible owners, risks, and required actions.',
    contentType: 'Report',
    category: 'Strategy',
    department: 'Executive Office',
    date: '2026-06-01',
    author: 'Executive Strategy Team',
    relevance: 83,
    source: 'Executive Knowledge Base',
    tags: [
      'strategy',
      'initiatives',
      'risks',
    ],
    status: 'Approved',
  },

  {
    id: 9,
    title: 'School Group Financial Planning Guide',
    description:
      'Planning guidance covering fee collection, financial forecasting, budget monitoring, and operational financial indicators.',
    contentType: 'Guideline',
    category: 'Finance',
    department: 'Finance Department',
    date: '2026-02-28',
    author: 'Finance Team',
    relevance: 81,
    source: 'Finance Knowledge Base',
    tags: [
      'finance',
      'fees',
      'budget',
    ],
    status: 'Approved',
  },

  {
    id: 10,
    title: 'Data Governance & Quality Standards',
    description:
      'Standards for maintaining data quality, validation, ownership, access control, lineage, and governance across school systems.',
    contentType: 'Policy',
    category: 'Data Governance',
    department: 'Data Office',
    date: '2026-05-18',
    author: 'Data Governance Team',
    relevance: 79,
    source: 'Data Governance Repository',
    tags: [
      'data governance',
      'data quality',
      'security',
    ],
    status: 'Approved',
  },

  {
    id: 11,
    title: 'Student Retention Analysis',
    description:
      'Analysis of student retention trends, withdrawal patterns, risk indicators, and recommended areas for intervention.',
    contentType: 'Analysis',
    category: 'Students',
    department: 'Student Services',
    date: '2026-05-25',
    author: 'Student Analytics Team',
    relevance: 77,
    source: 'Student Analytics',
    tags: [
      'retention',
      'students',
      'risk',
    ],
    status: 'Approved',
  },

  {
    id: 12,
    title: 'Executive Decision Governance Policy',
    description:
      'Governance requirements for executive decisions, approvals, ownership, action tracking, evidence, and audit history.',
    contentType: 'Policy',
    category: 'Governance',
    department: 'Executive Office',
    date: '2026-01-15',
    author: 'Governance Office',
    relevance: 75,
    source: 'Governance Repository',
    tags: [
      'decisions',
      'governance',
      'audit',
    ],
    status: 'Approved',
  },
]

export const knowledgeContentTypes = [
  'All',
  'Policy',
  'Report',
  'Analysis',
  'Strategy',
  'Guideline',
  'Framework',
]

export const knowledgeCategories = [
  'All',
  'Academic',
  'Student Services',
  'Operations',
  'Communications',
  'Strategy',
  'Finance',
  'Data Governance',
  'Students',
  'Governance',
]

export const knowledgeDepartments = [
  'All',
  'Academic Department',
  'Student Services',
  'Operations',
  'Communications',
  'Executive Office',
  'Finance Department',
  'Data Office',
]

export const knowledgeSortOptions = [
  {
    value: 'relevance',
    label: 'Most Relevant',
  },
  {
    value: 'newest',
    label: 'Newest First',
  },
  {
    value: 'oldest',
    label: 'Oldest First',
  },
  {
    value: 'title',
    label: 'Title A-Z',
  },
]

export const knowledgeDateRanges = [
  {
    value: 'all',
    label: 'All time',
  },
  {
    value: '30',
    label: 'Last 30 days',
  },
  {
    value: '90',
    label: 'Last 90 days',
  },
  {
    value: '365',
    label: 'Last year',
  },
]
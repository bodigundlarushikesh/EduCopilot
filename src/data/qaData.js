export const suggestedQuestions = [
  {
    id: 1,
    question:
      'What are the biggest risks across the school group?',
  },
  {
    id: 2,
    question:
      'Which campus has the highest capacity utilisation?',
  },
  {
    id: 3,
    question:
      'How is student attendance performing?',
  },
  {
    id: 4,
    question:
      'Which subjects have the lowest assessment performance?',
  },
  {
    id: 5,
    question:
      'How is teacher workload changing?',
  },
  {
    id: 6,
    question:
      'What strategic initiatives need attention?',
  },
]

export const qaResponses = [
  {
    id: 1,

    keywords: [
      'risk',
      'risks',
      'problem',
      'problems',
      'danger',
    ],

    question:
      'What are the biggest risks across the school group?',

    answer:
      'The most significant current risks are teacher capacity pressure at Oakwood Campus, attendance decline in Grade 9, and parent response rates remaining below the expected target. Oakwood Campus is the highest-priority operational concern because capacity utilisation and teacher workload are both elevated.',

    confidence: 92,

    sources: [
      {
        title:
          'Teacher Workload & Capacity Analysis',
        type: 'Analysis',
        relevance: 98,
      },
      {
        title:
          'Student Attendance Policy',
        type: 'Policy',
        relevance: 91,
      },
      {
        title:
          'Strategic Initiative Review Q2',
        type: 'Report',
        relevance: 86,
      },
    ],
  },

  {
    id: 2,

    keywords: [
      'campus',
      'capacity',
      'utilisation',
      'utilization',
      'full',
    ],

    question:
      'Which campus has the highest capacity utilisation?',

    answer:
      'Oakwood Campus currently has the highest capacity utilisation at 91%. Horizon Public School follows at 89%, while Riverside Academy is at 82% and Greenfield International is at 78%. Oakwood should therefore be prioritised for capacity and resource planning.',

    confidence: 96,

    sources: [
      {
        title:
          'Campus Capacity Planning Guidelines',
        type: 'Guideline',
        relevance: 99,
      },
      {
        title:
          'Annual Academic Performance Report 2025-26',
        type: 'Report',
        relevance: 89,
      },
    ],
  },

  {
    id: 3,

    keywords: [
      'attendance',
      'absent',
      'absence',
      'present',
    ],

    question:
      'How is student attendance performing?',

    answer:
      'Overall student attendance is currently 94.2%, showing a positive trend compared with the previous period. However, attendance performance varies across campuses. Greenfield International has the strongest attendance at 95.1%, while Horizon Public School is at 92.8%. Grade 9 attendance is also identified as an area requiring attention.',

    confidence: 94,

    sources: [
      {
        title:
          'Annual Academic Performance Report 2025-26',
        type: 'Report',
        relevance: 98,
      },
      {
        title:
          'Student Attendance Policy',
        type: 'Policy',
        relevance: 96,
      },
    ],
  },

  {
    id: 4,

    keywords: [
      'subject',
      'subjects',
      'assessment',
      'performance',
      'score',
      'marks',
    ],

    question:
      'Which subjects have the lowest assessment performance?',

    answer:
      'Social Studies currently has the lowest assessment performance at 79%, followed by Science at 81%. Mathematics is at 84%, English at 86%, and Computer Science has the strongest performance at 89%. Social Studies therefore represents the strongest opportunity for academic improvement.',

    confidence: 95,

    sources: [
      {
        title:
          'Annual Academic Performance Report 2025-26',
        type: 'Report',
        relevance: 99,
      },
      {
        title:
          'Assessment Governance Framework',
        type: 'Framework',
        relevance: 92,
      },
    ],
  },

  {
    id: 5,

    keywords: [
      'teacher',
      'workload',
      'staff',
      'staffing',
      'teachers',
    ],

    question:
      'How is teacher workload changing?',

    answer:
      'The overall teacher workload indicator is currently 78% and has improved by 3.1% compared with the previous period. However, Oakwood Campus remains a concern at 83%, followed by Horizon Public School at 81%. Teacher allocation should be reviewed at campuses approaching the recommended workload threshold.',

    confidence: 93,

    sources: [
      {
        title:
          'Teacher Workload & Capacity Analysis',
        type: 'Analysis',
        relevance: 99,
      },
      {
        title:
          'Campus Capacity Planning Guidelines',
        type: 'Guideline',
        relevance: 84,
      },
    ],
  },

  {
    id: 6,

    keywords: [
      'initiative',
      'initiatives',
      'strategy',
      'strategic',
      'projects',
    ],

    question:
      'What strategic initiatives need attention?',

    answer:
      'Three strategic initiatives are currently being tracked. Teacher Allocation Optimisation is 72% complete, Parent Engagement Programme is 86% complete, and Campus Capacity Planning is 64% complete and currently under review. Campus Capacity Planning requires the closest attention because it has the lowest progress level.',

    confidence: 91,

    sources: [
      {
        title:
          'Strategic Initiative Review Q2',
        type: 'Report',
        relevance: 99,
      },
      {
        title:
          'Teacher Workload & Capacity Analysis',
        type: 'Analysis',
        relevance: 82,
      },
    ],
  },
]

export const defaultQAResponse = {
  question:
    'What are the biggest risks across the school group?',

  answer:
    'The most significant current risks are teacher capacity pressure at Oakwood Campus, attendance decline in Grade 9, and parent response rates remaining below the expected target. Oakwood Campus is the highest-priority operational concern because capacity utilisation and teacher workload are both elevated.',

  confidence: 92,

  sources: [
    {
      title:
        'Teacher Workload & Capacity Analysis',
      type: 'Analysis',
      relevance: 98,
    },
    {
      title:
        'Student Attendance Policy',
      type: 'Policy',
      relevance: 91,
    },
    {
      title:
        'Strategic Initiative Review Q2',
      type: 'Report',
      relevance: 86,
    },
  ],
}
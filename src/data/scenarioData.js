export const scenarioTypes = [
  {
    value: 'enrolment',
    label: 'Enrolment Growth',
    description:
      'Model the impact of changes in student enrolment.',
  },
  {
    value: 'staffing',
    label: 'Staffing',
    description:
      'Model changes in teacher and staff allocation.',
  },
  {
    value: 'capacity',
    label: 'Campus Capacity',
    description:
      'Model changes in campus capacity utilisation.',
  },
  {
    value: 'attendance',
    label: 'Attendance',
    description:
      'Model the impact of attendance changes.',
  },
  {
    value: 'budget',
    label: 'Budget',
    description:
      'Model changes in operational budget allocation.',
  },
]

export const campusOptions = [
  'All campuses',
  'Greenfield International',
  'Riverside Academy',
  'Horizon Public School',
  'Oakwood Campus',
]

export const defaultScenario = {
  name: 'New Scenario',
  type: 'enrolment',
  campus: 'All campuses',
  change: 5,
  period: 'Next academic year',
}

export const scenarioResults = {
  enrolment: {
    base: 8420,
    metrics: [
      {
        label: 'Projected Enrolment',
        value: 8841,
        unit: 'students',
      },
      {
        label: 'Capacity Utilisation',
        value: 86,
        unit: '%',
      },
      {
        label: 'Additional Students',
        value: 421,
        unit: 'students',
      },
      {
        label: 'Resource Requirement',
        value: 5,
        unit: 'teachers',
      },
    ],
  },

  staffing: {
    base: 78,
    metrics: [
      {
        label: 'Teacher Workload',
        value: 74,
        unit: '%',
      },
      {
        label: 'Coverage',
        value: 96,
        unit: '%',
      },
      {
        label: 'Staffing Gap',
        value: 3,
        unit: 'teachers',
      },
      {
        label: 'Estimated Cost',
        value: 180000,
        unit: '₹',
      },
    ],
  },

  capacity: {
    base: 82,
    metrics: [
      {
        label: 'Capacity Utilisation',
        value: 87,
        unit: '%',
      },
      {
        label: 'Available Places',
        value: 1170,
        unit: 'students',
      },
      {
        label: 'Projected Demand',
        value: 8460,
        unit: 'students',
      },
      {
        label: 'Capacity Gap',
        value: 40,
        unit: 'students',
      },
    ],
  },

  attendance: {
    base: 94.2,
    metrics: [
      {
        label: 'Projected Attendance',
        value: 95.2,
        unit: '%',
      },
      {
        label: 'Additional Attendance',
        value: 84,
        unit: 'student-days',
      },
      {
        label: 'At-Risk Students',
        value: 112,
        unit: 'students',
      },
      {
        label: 'Expected Improvement',
        value: 1,
        unit: '%',
      },
    ],
  },

  budget: {
    base: 10000000,
    metrics: [
      {
        label: 'Projected Budget',
        value: 10500000,
        unit: '₹',
      },
      {
        label: 'Additional Allocation',
        value: 500000,
        unit: '₹',
      },
      {
        label: 'Budget Utilisation',
        value: 84,
        unit: '%',
      },
      {
        label: 'Expected Impact',
        value: 7,
        unit: '%',
      },
    ],
  },
}

export const scenarioRecommendations = [
  {
    title: 'Review teacher allocation',
    description:
      'Additional enrolment may increase teacher workload at high-utilisation campuses.',
    priority: 'High',
  },
  {
    title: 'Monitor campus capacity',
    description:
      'Oakwood Campus is already operating near its recommended capacity threshold.',
    priority: 'High',
  },
  {
    title: 'Track attendance impact',
    description:
      'Attendance improvements should be monitored alongside intervention completion.',
    priority: 'Medium',
  },
]

export const scenarioHistory = [
  {
    id: 1,
    name: '5% Enrolment Growth',
    type: 'Enrolment Growth',
    campus: 'All campuses',
    change: '+5%',
    created: '2026-06-05',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Oakwood Staffing Review',
    type: 'Staffing',
    campus: 'Oakwood Campus',
    change: '+3%',
    created: '2026-05-28',
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Campus Capacity Planning',
    type: 'Campus Capacity',
    campus: 'All campuses',
    change: '+7%',
    created: '2026-05-14',
    status: 'Completed',
  },
]
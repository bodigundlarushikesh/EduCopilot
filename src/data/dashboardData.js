export const campusData = [
  {
    id: 'greenfield',
    name: 'Greenfield International',
    students: 2480,
    attendance: 95.1,
    learningProgress: 89,
    assessmentPerformance: 84,
    teacherWorkload: 74,
    interventionCompletion: 94,
    parentResponse: 89,
    capacityUtilisation: 78,
    status: 'Healthy',
  },
  {
    id: 'riverside',
    name: 'Riverside Academy',
    students: 2140,
    attendance: 94.5,
    learningProgress: 88,
    assessmentPerformance: 83,
    teacherWorkload: 76,
    interventionCompletion: 92,
    parentResponse: 87,
    capacityUtilisation: 82,
    status: 'Healthy',
  },
  {
    id: 'horizon',
    name: 'Horizon Public School',
    students: 1980,
    attendance: 92.8,
    learningProgress: 84,
    assessmentPerformance: 79,
    teacherWorkload: 81,
    interventionCompletion: 88,
    parentResponse: 83,
    capacityUtilisation: 89,
    status: 'Watch',
  },
  {
    id: 'oakwood',
    name: 'Oakwood Campus',
    students: 1820,
    attendance: 93.6,
    learningProgress: 86,
    assessmentPerformance: 80,
    teacherWorkload: 83,
    interventionCompletion: 89,
    parentResponse: 84,
    capacityUtilisation: 91,
    status: 'Warning',
  },
]

export const periodData = {
  'This academic year': {
    enrolment: 8420,
    attendance: 94.2,
    learningProgress: 87,
    assessmentPerformance: 81.6,
    teacherWorkload: 78,
    interventionCompletion: 91,
    parentResponse: 86,
    capacityUtilisation: 82,
  },

  'This month': {
    enrolment: 8360,
    attendance: 94.6,
    learningProgress: 87.8,
    assessmentPerformance: 82.1,
    teacherWorkload: 77,
    interventionCompletion: 92,
    parentResponse: 87,
    capacityUtilisation: 81,
  },

  'Last 30 days': {
    enrolment: 8290,
    attendance: 94.0,
    learningProgress: 86.5,
    assessmentPerformance: 81.2,
    teacherWorkload: 79,
    interventionCompletion: 90,
    parentResponse: 85,
    capacityUtilisation: 82,
  },

  'Last quarter': {
    enrolment: 8110,
    attendance: 93.7,
    learningProgress: 85.8,
    assessmentPerformance: 80.4,
    teacherWorkload: 80,
    interventionCompletion: 88,
    parentResponse: 83,
    capacityUtilisation: 80,
  },
}

export const enrolmentData = [
  {
    month: 'Jan',
    students: 7520,
    capacity: 9000,
  },
  {
    month: 'Feb',
    students: 7680,
    capacity: 9000,
  },
  {
    month: 'Mar',
    students: 7810,
    capacity: 9000,
  },
  {
    month: 'Apr',
    students: 7940,
    capacity: 9000,
  },
  {
    month: 'May',
    students: 8060,
    capacity: 9000,
  },
  {
    month: 'Jun',
    students: 8180,
    capacity: 9000,
  },
  {
    month: 'Jul',
    students: 8290,
    capacity: 9000,
  },
  {
    month: 'Aug',
    students: 8420,
    capacity: 9000,
  },
]

export const attendanceData = [
  {
    month: 'Jan',
    attendance: 91.8,
  },
  {
    month: 'Feb',
    attendance: 92.4,
  },
  {
    month: 'Mar',
    attendance: 92.8,
  },
  {
    month: 'Apr',
    attendance: 93.1,
  },
  {
    month: 'May',
    attendance: 93.5,
  },
  {
    month: 'Jun',
    attendance: 93.8,
  },
  {
    month: 'Jul',
    attendance: 94.0,
  },
  {
    month: 'Aug',
    attendance: 94.2,
  },
]

export const assessmentData = [
  {
    name: 'Mathematics',
    score: 84,
  },
  {
    name: 'Science',
    score: 81,
  },
  {
    name: 'English',
    score: 86,
  },
  {
    name: 'Social Studies',
    score: 79,
  },
  {
    name: 'Computer Science',
    score: 89,
  },
]

export const interventionData = [
  {
    name: 'Completed',
    value: 91,
  },
  {
    name: 'Pending',
    value: 6,
  },
  {
    name: 'Overdue',
    value: 3,
  },
]

export const risks = [
  {
    id: 1,
    title: 'Teacher capacity pressure at Oakwood Campus',
    description:
      'Projected teacher workload may exceed the recommended threshold next term.',
    severity: 'Critical',
    owner: 'Academic Department',
  },
  {
    id: 2,
    title: 'Attendance decline in Grade 9',
    description:
      'Attendance is 2.4% below the school-group target.',
    severity: 'High',
    owner: 'Department Head',
  },
  {
    id: 3,
    title: 'Parent response below target',
    description:
      'Parent communication response rate is below the expected level.',
    severity: 'Medium',
    owner: 'Student Services',
  },
]

export const initiatives = [
  {
    id: 1,
    title: 'Teacher Allocation Optimisation',
    owner: 'Academic Team',
    progress: 72,
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Parent Engagement Programme',
    owner: 'Student Services',
    progress: 86,
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Campus Capacity Planning',
    owner: 'Operations',
    progress: 64,
    status: 'Review',
  },
]
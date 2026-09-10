export const briefingTypes = [
  'Daily Executive Briefing',
  'Weekly Performance Briefing',
  'Campus Performance Briefing',
  'Risk Briefing',
  'Strategic Initiative Briefing',
]

export const briefingPeriods = [
  'Today',
  'This Week',
  'This Month',
  'This Quarter',
]

export const briefingData = [
  {
    id: 1,
    title: 'Daily Executive Briefing',
    type: 'Daily Executive Briefing',
    period: 'Today',
    date: '2026-09-08',
    status: 'Ready',
    summary:
      'Overall academic and operational performance remains stable. Attendance has improved, while Greenfield International requires attention on capacity utilisation.',
    highlights: [
      'Overall student attendance improved by 2.4%.',
      'Greenfield International is operating at high capacity.',
      'Assessment performance remains below target in Mathematics.',
      'Three strategic initiatives are progressing as planned.',
    ],
    risks: [
      'High capacity utilisation at Greenfield International.',
      'Mathematics performance below the expected target.',
    ],
    recommendations: [
      'Review classroom capacity at Greenfield International.',
      'Introduce additional Mathematics intervention sessions.',
      'Continue monitoring attendance trends.',
    ],
  },

  {
    id: 2,
    title: 'Weekly Performance Briefing',
    type: 'Weekly Performance Briefing',
    period: 'This Week',
    date: '2026-09-07',
    status: 'Ready',
    summary:
      'Weekly performance indicates positive movement in attendance and enrolment, with opportunities to improve assessment outcomes.',
    highlights: [
      'Student enrolment increased by 3.1%.',
      'Average attendance reached 94.2%.',
      'Teacher workload remains within the expected range.',
      'Assessment performance improved in Science.',
    ],
    risks: [
      'Mathematics assessment results remain below target.',
      'Capacity pressure may increase with projected enrolment growth.',
    ],
    recommendations: [
      'Prioritise Mathematics academic interventions.',
      'Review projected enrolment against campus capacity.',
      'Monitor teacher workload during the next planning cycle.',
    ],
  },

  {
    id: 3,
    title: 'Campus Performance Briefing',
    type: 'Campus Performance Briefing',
    period: 'This Month',
    date: '2026-09-01',
    status: 'Ready',
    summary:
      'Campus-level performance shows strong attendance across most locations, with capacity and academic performance requiring targeted action.',
    highlights: [
      'Riverside Academy recorded strong attendance.',
      'Oakwood Campus maintained stable academic performance.',
      'Greenfield International has the highest capacity utilisation.',
      'Horizon Public School showed improvement in assessment results.',
    ],
    risks: [
      'Greenfield International has limited remaining capacity.',
      'Some campuses require additional academic support.',
    ],
    recommendations: [
      'Evaluate capacity expansion options.',
      'Share successful academic practices across campuses.',
      'Increase monitoring of campuses below performance targets.',
    ],
  },

  {
    id: 4,
    title: 'Risk Briefing',
    type: 'Risk Briefing',
    period: 'This Month',
    date: '2026-09-01',
    status: 'Ready',
    summary:
      'The current risk profile is primarily driven by capacity constraints, academic performance gaps, and increasing operational demand.',
    highlights: [
      'Capacity risk remains the highest operational concern.',
      'Attendance is currently within an acceptable range.',
      'Academic intervention demand has increased.',
      'No critical technology risks have been identified.',
    ],
    risks: [
      'Campus capacity may become constrained.',
      'Persistent Mathematics performance gaps.',
      'Increasing demand for student interventions.',
    ],
    recommendations: [
      'Create a capacity mitigation plan.',
      'Strengthen academic intervention programs.',
      'Review resource allocation across campuses.',
    ],
  },

  {
    id: 5,
    title: 'Strategic Initiative Briefing',
    type: 'Strategic Initiative Briefing',
    period: 'This Quarter',
    date: '2026-09-01',
    status: 'Ready',
    summary:
      'Strategic initiatives are generally progressing according to plan, with selected initiatives requiring closer executive monitoring.',
    highlights: [
      'Digital learning expansion is progressing.',
      'Teacher development activities are on schedule.',
      'Student wellbeing initiative has reached its quarterly milestone.',
      'Campus capacity planning requires further review.',
    ],
    risks: [
      'Capacity planning may affect future expansion.',
      'Additional resources may be required for selected initiatives.',
    ],
    recommendations: [
      'Review initiative progress during the next executive meeting.',
      'Allocate resources to initiatives with increasing demand.',
      'Track capacity planning as a strategic priority.',
    ],
  },
]

export const recentBriefings = [
  {
    id: 1,
    title: 'Daily Executive Briefing',
    type: 'Daily Executive Briefing',
    date: '2026-09-08',
    status: 'Ready',
  },
  {
    id: 2,
    title: 'Weekly Performance Briefing',
    type: 'Weekly Performance Briefing',
    date: '2026-09-07',
    status: 'Ready',
  },
  {
    id: 3,
    title: 'Campus Performance Briefing',
    type: 'Campus Performance Briefing',
    date: '2026-09-01',
    status: 'Ready',
  },
  {
    id: 4,
    title: 'Risk Briefing',
    type: 'Risk Briefing',
    date: '2026-09-01',
    status: 'Ready',
  },
]

export const briefingStats = {
  total: 12,
  generatedThisWeek: 5,
  scheduled: 4,
  shared: 8,
}
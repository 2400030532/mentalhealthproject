// Mock data for the application

export const mockResources = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    type: 'article',
    description: 'A diachronic analysis of how the use of language surrounding anxiety has changed in each version of the Diagnostic and Statistical Manual of Mental Disorders (DSM). This research study examines the evolution of anxiety diagnosis and its implications for clinicians and researchers.',
    content: 'https://www.scientificarchives.com/public/assets/articles/article-pdf-1712061069-1154.pdf',
    category: 'Anxiety',
    createdAt: '2024-03-22',
    author: 'Matthew Rensi, James Geisler, Justin Jacques, Charles Silber'
  },
  {
    id: '2',
    title: 'Mindfulness Meditation Techniques',
    type: 'article',
    description: 'A comprehensive guide to mindfulness meditation techniques and practices. Learn evidence-based methods to reduce stress, improve focus, and enhance overall well-being through mindfulness meditation.',
    content: 'https://repositorio-aberto.up.pt/bitstream/10216/139471/2/528501.pdf',
    category: 'Meditation',
    createdAt: '2024-01-20',
    author: 'Research Publication'
  },
  {
    id: '3',
    title: 'Stress Management Workbook',
    type: 'article',
    description: 'A comprehensive introduction to stress management covering the definition of stress, causes, symptoms of distress, effective management techniques, depression, and suicide awareness. This guide provides practical strategies for managing stress in academic and daily life settings.',
    content: 'https://www.uakron.edu/armyrotc/ms1/14.pdf',
    category: 'Stress',
    createdAt: '2024-01-25',
    author: 'University of Akron - Army ROTC'
  },
  {
    id: '4',
    title: 'Building Resilience',
    type: 'article',
    description: 'A practical resource covering the theory and neurobiology of resilience, factors that jeopardize resilience, attitudes that undermine resilience building, and practical approaches to strengthen personal resilience. This comprehensive guide includes strategies for individuals, teams, and organizations.',
    content: 'https://www.routledge.com/rsc/downloads/CHFMLM1801_Resilience_FB_Final.pdf',
    category: 'Resilience',
    createdAt: '2024-02-01',
    author: 'Taylor & Francis Group & Faculty of Medical Leadership and Management'
  },
  {
    id: '5',
    title: 'Sleep Hygiene Guide',
    type: 'article',
    description: 'A comprehensive information sheet on sleep hygiene providing practical tips and techniques for improving sleep quality. Learn evidence-based strategies to establish healthy sleep patterns and enhance your overall well-being.',
    content: 'https://www.cci.health.wa.gov.au/~/media/CCI/Mental-Health-Professionals/Sleep/Sleep---Information-Sheets/Sleep-Information-Sheet---04---Sleep-Hygiene.pdf',
    category: 'Sleep',
    createdAt: '2024-02-05',
    author: 'Centre for Clinical Interventions (CCI)'
  },
  {
    id: '6',
    title: 'Breathing Exercises for Calm',
    type: 'video',
    description: 'Guided breathing exercises video to help you find calm and reduce stress. Learn effective breathing techniques that can be practiced anywhere to promote relaxation and mental well-being.',
    content: 'https://youtu.be/LiUnFJ8P4gM?si=p5ptxpmLMjy22x3y',
    category: 'Meditation',
    createdAt: '2024-02-10',
    author: 'YouTube'
  }
];

export const mockTherapists = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Anxiety & Depression',
    experience: '10 years',
    bio: 'Licensed therapist specializing in anxiety and depression treatment.',
    availability: ['Monday', 'Wednesday', 'Friday'],
    image: '👩‍⚕️'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Mindfulness & Stress',
    experience: '8 years',
    bio: 'Expert in mindfulness-based stress reduction techniques.',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    image: '👨‍⚕️'
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    specialization: 'Trauma & PTSD',
    experience: '12 years',
    bio: 'Specialized in trauma-informed care and PTSD treatment.',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    image: '👩‍⚕️'
  },
  {
    id: '4',
    name: 'Dr. Robert Wilson',
    specialization: 'Relationship & Family',
    experience: '15 years',
    bio: 'Family and relationship therapist with extensive experience.',
    availability: ['Wednesday', 'Thursday', 'Friday'],
    image: '👨‍⚕️'
  }
];

export const mockSupportGroups = [
  {
    id: '1',
    name: 'Anxiety Support Circle',
    description: 'A safe space for students dealing with anxiety to share experiences and support each other.',
    category: 'Anxiety',
    members: 25,
    facilitator: 'Dr. Sarah Johnson',
    meetingTime: 'Every Monday, 6:00 PM',
    status: 'active'
  },
  {
    id: '2',
    name: 'Stress Management Group',
    description: 'Learn and practice stress management techniques together. Join our Telegram group for ongoing support and discussions.',
    category: 'Stress',
    members: 18,
    facilitator: 'Dr. Michael Chen',
    meetingTime: 'Every Wednesday, 5:00 PM',
    status: 'active',
    telegramLink: 'https://t.me/+86ygI24ZpZ5kNGE9'
  },
  {
    id: '3',
    name: 'Depression Support Network',
    description: 'Peer support group for students managing depression.',
    category: 'Depression',
    members: 22,
    facilitator: 'Dr. Emily Davis',
    meetingTime: 'Every Friday, 4:00 PM',
    status: 'active'
  },
  {
    id: '4',
    name: 'Mindfulness Meditation Circle',
    description: 'Group meditation and mindfulness practice sessions.',
    category: 'Meditation',
    members: 30,
    facilitator: 'Dr. Michael Chen',
    meetingTime: 'Every Saturday, 10:00 AM',
    status: 'active'
  }
];

export const mockSessions = [
  {
    id: '1',
    studentId: '2',
    studentName: 'John Doe',
    therapistId: '1',
    therapistName: 'Dr. Sarah Johnson',
    date: '2024-03-15',
    time: '10:00 AM',
    duration: 60,
    status: 'approved',
    notes: 'Initial consultation',
    zoomLink: 'https://us05web.zoom.us/j/5819766338?pwd=ymsoHHkmaWLnVoh0bcITbefCP0Rsqo.1&omn=83467907716',
    createdAt: '2024-03-01'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'John Doe',
    therapistId: '2',
    therapistName: 'Dr. Michael Chen',
    date: '2024-03-20',
    time: '2:00 PM',
    duration: 60,
    status: 'approved',
    notes: 'Follow-up session',
    zoomLink: '',
    createdAt: '2024-03-05'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Jane Smith',
    therapistId: '3',
    therapistName: 'Dr. Emily Davis',
    date: '2024-03-18',
    time: '11:00 AM',
    duration: 60,
    status: 'approved',
    notes: '',
    zoomLink: '',
    createdAt: '2024-03-10'
  }
];

// Helper function to get available time slots
export const getAvailableTimeSlots = (date, therapistId) => {
  const slots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  // Filter out booked slots (simplified - in real app, check against booked sessions)
  return slots;
};

// Quiz Questions Data
export const mockQuizQuestions = [
  {
    id: '1',
    question: 'How often do you feel stressed or overwhelmed?',
    category: 'stress',
    options: [
      { text: 'Rarely or never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Often', value: 3 },
      { text: 'Almost always', value: 4 }
    ]
  },
  {
    id: '2',
    question: 'How would you rate your sleep quality?',
    category: 'sleep',
    options: [
      { text: 'Excellent - I sleep well most nights', value: 1 },
      { text: 'Good - I sleep well most of the time', value: 2 },
      { text: 'Fair - I have some sleep issues', value: 3 },
      { text: 'Poor - I rarely sleep well', value: 4 }
    ]
  },
  {
    id: '3',
    question: 'How often do you experience feelings of anxiety or worry?',
    category: 'anxiety',
    options: [
      { text: 'Rarely or never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Often', value: 3 },
      { text: 'Almost constantly', value: 4 }
    ]
  },
  {
    id: '4',
    question: 'How would you describe your overall mood?',
    category: 'mood',
    options: [
      { text: 'Generally positive and upbeat', value: 1 },
      { text: 'Mostly positive with occasional lows', value: 2 },
      { text: 'Mixed - good and bad days', value: 3 },
      { text: 'Generally low or negative', value: 4 }
    ]
  },
  {
    id: '5',
    question: 'How well can you concentrate on tasks?',
    category: 'concentration',
    options: [
      { text: 'Very well - I can focus easily', value: 1 },
      { text: 'Well - I can focus most of the time', value: 2 },
      { text: 'Moderately - I have some difficulty', value: 3 },
      { text: 'Poorly - I struggle to concentrate', value: 4 }
    ]
  },
  {
    id: '6',
    question: 'How often do you feel tired or fatigued?',
    category: 'energy',
    options: [
      { text: 'Rarely or never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Often', value: 3 },
      { text: 'Almost always', value: 4 }
    ]
  },
  {
    id: '7',
    question: 'How would you rate your ability to cope with daily challenges?',
    category: 'coping',
    options: [
      { text: 'Very well - I handle challenges easily', value: 1 },
      { text: 'Well - I manage most challenges', value: 2 },
      { text: 'Moderately - Some challenges are difficult', value: 3 },
      { text: 'Poorly - I struggle with most challenges', value: 4 }
    ]
  },
  {
    id: '8',
    question: 'How often do you engage in activities you enjoy?',
    category: 'enjoyment',
    options: [
      { text: 'Very often - Daily or almost daily', value: 1 },
      { text: 'Often - Several times a week', value: 2 },
      { text: 'Sometimes - Once or twice a week', value: 3 },
      { text: 'Rarely or never', value: 4 }
    ]
  },
  {
    id: '9',
    question: 'How would you describe your social connections?',
    category: 'social',
    options: [
      { text: 'Strong - I have good support networks', value: 1 },
      { text: 'Good - I have some supportive relationships', value: 2 },
      { text: 'Moderate - I have limited connections', value: 3 },
      { text: 'Weak - I feel isolated or disconnected', value: 4 }
    ]
  },
  {
    id: '10',
    question: 'How often do you feel overwhelmed by your responsibilities?',
    category: 'stress',
    options: [
      { text: 'Rarely or never', value: 1 },
      { text: 'Sometimes', value: 2 },
      { text: 'Often', value: 3 },
      { text: 'Almost always', value: 4 }
    ]
  }
];

// Quiz Statistics
export const mockQuizStats = {
  totalAttempts: 0,
  averageScore: 0,
  lowStressCount: 0,
  moderateStressCount: 0,
  highStressCount: 0
};


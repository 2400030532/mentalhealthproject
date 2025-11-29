import { mockResources, mockTherapists, mockSupportGroups, mockSessions, mockQuizQuestions, mockQuizStats } from '../data/mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Resources API
export const resourcesApi = {
  getAll: async () => {
    await delay();
    const resources = JSON.parse(localStorage.getItem('resources') || JSON.stringify(mockResources));
    return { success: true, data: resources };
  },

  getById: async (id) => {
    await delay();
    const resources = JSON.parse(localStorage.getItem('resources') || JSON.stringify(mockResources));
    const resource = resources.find(r => r.id === id);
    return { success: !!resource, data: resource };
  },

  create: async (resource) => {
    await delay();
    const resources = JSON.parse(localStorage.getItem('resources') || JSON.stringify(mockResources));
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    resources.push(newResource);
    localStorage.setItem('resources', JSON.stringify(resources));
    return { success: true, data: newResource };
  },

  update: async (id, updates) => {
    await delay();
    const resources = JSON.parse(localStorage.getItem('resources') || JSON.stringify(mockResources));
    const index = resources.findIndex(r => r.id === id);
    if (index === -1) return { success: false, error: 'Resource not found' };
    resources[index] = { ...resources[index], ...updates };
    localStorage.setItem('resources', JSON.stringify(resources));
    return { success: true, data: resources[index] };
  },

  delete: async (id) => {
    await delay();
    const resources = JSON.parse(localStorage.getItem('resources') || JSON.stringify(mockResources));
    const filtered = resources.filter(r => r.id !== id);
    localStorage.setItem('resources', JSON.stringify(filtered));
    return { success: true };
  }
};

// Therapists API
export const therapistsApi = {
  getAll: async () => {
    await delay();
    return { success: true, data: mockTherapists };
  },

  getById: async (id) => {
    await delay();
    const therapist = mockTherapists.find(t => t.id === id);
    return { success: !!therapist, data: therapist };
  }
};

// Sessions API
export const sessionsApi = {
  getAll: async () => {
    await delay();
    let sessions = JSON.parse(localStorage.getItem('sessions') || JSON.stringify(mockSessions));
    
    // Ensure session with id '1' (Dr. Sarah Johnson) has the zoom link if approved
    sessions = sessions.map(session => {
      if (session.id === '1' && session.status === 'approved' && (!session.zoomLink || !session.zoomLink.trim())) {
        return {
          ...session,
          zoomLink: 'https://us05web.zoom.us/j/5819766338?pwd=ymsoHHkmaWLnVoh0bcITbefCP0Rsqo.1&omn=83467907716'
        };
      }
      return session;
    });
    
    // Update localStorage with the corrected data
    localStorage.setItem('sessions', JSON.stringify(sessions));
    
    return { success: true, data: sessions };
  },

  getByStudentId: async (studentId) => {
    await delay();
    let sessions = JSON.parse(localStorage.getItem('sessions') || JSON.stringify(mockSessions));
    
    // Ensure session with id '1' (Dr. Sarah Johnson) is approved and has the zoom link
    sessions = sessions.map(session => {
      if (session.id === '1' && session.therapistName === 'Dr. Sarah Johnson') {
        return {
          ...session,
          status: 'approved',
          zoomLink: session.zoomLink || 'https://us05web.zoom.us/j/5819766338?pwd=ymsoHHkmaWLnVoh0bcITbefCP0Rsqo.1&omn=83467907716'
        };
      }
      return session;
    });
    
    // Update localStorage with the corrected data
    localStorage.setItem('sessions', JSON.stringify(sessions));
    
    const studentSessions = sessions.filter(s => s.studentId === studentId);
    return { success: true, data: studentSessions };
  },

  create: async (session) => {
    await delay();
    const sessions = JSON.parse(localStorage.getItem('sessions') || JSON.stringify(mockSessions));
    const newSession = {
      ...session,
      id: Date.now().toString(),
      status: 'pending',
      zoomLink: session.zoomLink || '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    sessions.push(newSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    return { success: true, data: newSession };
  },

  update: async (id, updates) => {
    await delay();
    const sessions = JSON.parse(localStorage.getItem('sessions') || JSON.stringify(mockSessions));
    const index = sessions.findIndex(s => s.id === id);
    if (index === -1) return { success: false, error: 'Session not found' };
    sessions[index] = { ...sessions[index], ...updates };
    localStorage.setItem('sessions', JSON.stringify(sessions));
    return { success: true, data: sessions[index] };
  },

  delete: async (id) => {
    await delay();
    const sessions = JSON.parse(localStorage.getItem('sessions') || JSON.stringify(mockSessions));
    const filtered = sessions.filter(s => s.id !== id);
    localStorage.setItem('sessions', JSON.stringify(filtered));
    return { success: true };
  }
};

// Support Groups API
export const supportGroupsApi = {
  getAll: async () => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    return { success: true, data: groups };
  },

  getById: async (id) => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    const group = groups.find(g => g.id === id);
    return { success: !!group, data: group };
  },

  create: async (group) => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    const newGroup = {
      ...group,
      id: Date.now().toString(),
      members: 0,
      status: 'active'
    };
    groups.push(newGroup);
    localStorage.setItem('supportGroups', JSON.stringify(groups));
    return { success: true, data: newGroup };
  },

  update: async (id, updates) => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    const index = groups.findIndex(g => g.id === id);
    if (index === -1) return { success: false, error: 'Group not found' };
    groups[index] = { ...groups[index], ...updates };
    localStorage.setItem('supportGroups', JSON.stringify(groups));
    return { success: true, data: groups[index] };
  },

  delete: async (id) => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    const filtered = groups.filter(g => g.id !== id);
    localStorage.setItem('supportGroups', JSON.stringify(filtered));
    return { success: true };
  },

  join: async (groupId, userId) => {
    await delay();
    const groups = JSON.parse(localStorage.getItem('supportGroups') || JSON.stringify(mockSupportGroups));
    const index = groups.findIndex(g => g.id === groupId);
    if (index === -1) return { success: false, error: 'Group not found' };
    groups[index].members += 1;
    localStorage.setItem('supportGroups', JSON.stringify(groups));
    return { success: true, data: groups[index] };
  }
};

// Quiz API
export const quizApi = {
  getQuestions: async () => {
    await delay();
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(mockQuizQuestions));
    return { success: true, data: questions };
  },

  getQuestionById: async (id) => {
    await delay();
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(mockQuizQuestions));
    const question = questions.find(q => q.id === id);
    return { success: !!question, data: question };
  },

  createQuestion: async (question) => {
    await delay();
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(mockQuizQuestions));
    const newQuestion = {
      ...question,
      id: Date.now().toString()
    };
    questions.push(newQuestion);
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    return { success: true, data: newQuestion };
  },

  updateQuestion: async (id, updates) => {
    await delay();
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(mockQuizQuestions));
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return { success: false, error: 'Question not found' };
    questions[index] = { ...questions[index], ...updates };
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    return { success: true, data: questions[index] };
  },

  deleteQuestion: async (id) => {
    await delay();
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(mockQuizQuestions));
    const filtered = questions.filter(q => q.id !== id);
    localStorage.setItem('quizQuestions', JSON.stringify(filtered));
    return { success: true };
  },

  submitQuiz: async (answers, userId) => {
    await delay();
    // Calculate score
    const totalScore = Object.values(answers).reduce((sum, value) => sum + (value || 0), 0);
    const maxScore = Object.keys(answers).length * 4;
    const percentage = (totalScore / maxScore) * 100;

    // Categorize
    let category, categoryText;
    if (percentage <= 40) {
      category = 'low';
      categoryText = 'Low Stress / Stable';
    } else if (percentage <= 70) {
      category = 'moderate';
      categoryText = 'Moderate Stress / Needs Attention';
    } else {
      category = 'high';
      categoryText = 'High Stress / Needs Immediate Support';
    }

    // Update statistics
    const stats = JSON.parse(localStorage.getItem('quizStats') || JSON.stringify(mockQuizStats));
    stats.totalAttempts += 1;
    stats.averageScore = ((stats.averageScore * (stats.totalAttempts - 1)) + percentage) / stats.totalAttempts;
    
    if (category === 'low') stats.lowStressCount += 1;
    else if (category === 'moderate') stats.moderateStressCount += 1;
    else stats.highStressCount += 1;
    
    localStorage.setItem('quizStats', JSON.stringify(stats));

    // Save quiz result
    const result = {
      id: Date.now().toString(),
      userId,
      answers,
      score: totalScore,
      maxScore,
      percentage: Math.round(percentage),
      category,
      categoryText,
      timestamp: new Date().toISOString()
    };

    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));

    return { success: true, data: result };
  },

  getStats: async () => {
    await delay();
    const stats = JSON.parse(localStorage.getItem('quizStats') || JSON.stringify(mockQuizStats));
    return { success: true, data: stats };
  }
};


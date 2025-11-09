// Achievement/Badge definitions and unlocking logic

export const BADGES = [
  // Course Completion Badges
  {
    id: 'course_complete_ml_basics',
    name: 'ML Basics Master',
    description: 'Completed the Machine Learning Basics course',
    category: 'course_completion',
    rarity: 'common',
    icon: '🎓',
    unlockCondition: (progress, courses) => {
      const course = courses.find(c => c.id === 'ml-basics');
      if (!course) return false;
      const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
      return progress.courseProgress['ml-basics']?.completedLessons?.length >= totalLessons;
    },
  },
  {
    id: 'course_complete_deep_learning',
    name: 'Deep Learning Expert',
    description: 'Completed the Deep Learning Fundamentals course',
    category: 'course_completion',
    rarity: 'common',
    icon: '🧠',
    unlockCondition: (progress, courses) => {
      const course = courses.find(c => c.id === 'deep-learning');
      if (!course) return false;
      const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
      return progress.courseProgress['deep-learning']?.completedLessons?.length >= totalLessons;
    },
  },
  {
    id: 'course_complete_nlp',
    name: 'NLP Specialist',
    description: 'Completed the Natural Language Processing course',
    category: 'course_completion',
    rarity: 'common',
    icon: '💬',
    unlockCondition: (progress, courses) => {
      const course = courses.find(c => c.id === 'nlp');
      if (!course) return false;
      const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;
      return progress.courseProgress['nlp']?.completedLessons?.length >= totalLessons;
    },
  },
  
  // Quiz Mastery Badges
  {
    id: 'quiz_perfect_score',
    name: 'Perfect Score',
    description: 'Achieved a perfect score on any quiz',
    category: 'quiz_mastery',
    rarity: 'rare',
    icon: '⭐',
    unlockCondition: (progress) => {
      const scores = progress.quizScores || {};
      return Object.values(scores).some(courseScores => 
        Object.values(courseScores || {}).some(quiz => quiz.isPerfect)
      );
    },
  },
  {
    id: 'quiz_first_try',
    name: 'First Try Champion',
    description: 'Passed a quiz on the first attempt',
    category: 'quiz_mastery',
    rarity: 'common',
    icon: '🎯',
    unlockCondition: (progress) => {
      const scores = progress.quizScores || {};
      return Object.values(scores).some(courseScores => 
        Object.values(courseScores || {}).some(quiz => quiz.isFirstTry && quiz.score >= 70)
      );
    },
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Passed 5 quizzes',
    category: 'quiz_mastery',
    rarity: 'rare',
    icon: '🏆',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalQuizzesPassed || 0) >= 5;
    },
  },
  
  // Lab Excellence Badges
  {
    id: 'lab_completer',
    name: 'Lab Completer',
    description: 'Completed your first lab',
    category: 'lab_excellence',
    rarity: 'common',
    icon: '🔬',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalLabsCompleted || 0) >= 1;
    },
  },
  {
    id: 'lab_master',
    name: 'Lab Master',
    description: 'Completed 5 labs',
    category: 'lab_excellence',
    rarity: 'rare',
    icon: '⚗️',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalLabsCompleted || 0) >= 5;
    },
  },
  
  // Milestone Badges
  {
    id: 'milestone_10_lessons',
    name: 'Getting Started',
    description: 'Completed 10 lessons',
    category: 'milestone',
    rarity: 'common',
    icon: '🌱',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalLessonsCompleted || 0) >= 10;
    },
  },
  {
    id: 'milestone_25_lessons',
    name: 'Dedicated Learner',
    description: 'Completed 25 lessons',
    category: 'milestone',
    rarity: 'common',
    icon: '📚',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalLessonsCompleted || 0) >= 25;
    },
  },
  {
    id: 'milestone_50_lessons',
    name: 'Knowledge Seeker',
    description: 'Completed 50 lessons',
    category: 'milestone',
    rarity: 'rare',
    icon: '🎓',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalLessonsCompleted || 0) >= 50;
    },
  },
  {
    id: 'milestone_25_percent',
    name: 'Quarter Way There',
    description: 'Reached 25% overall progress',
    category: 'milestone',
    rarity: 'common',
    icon: '📊',
    unlockCondition: (progress, courses, overallProgress) => {
      return overallProgress >= 25;
    },
  },
  {
    id: 'milestone_50_percent',
    name: 'Halfway Hero',
    description: 'Reached 50% overall progress',
    category: 'milestone',
    rarity: 'rare',
    icon: '🎯',
    unlockCondition: (progress, courses, overallProgress) => {
      return overallProgress >= 50;
    },
  },
  {
    id: 'milestone_100_percent',
    name: 'Completionist',
    description: 'Reached 100% overall progress',
    category: 'milestone',
    rarity: 'legendary',
    icon: '👑',
    unlockCondition: (progress, courses, overallProgress) => {
      return overallProgress >= 100;
    },
  },
  
  // Streak Badges
  {
    id: 'streak_3_days',
    name: 'On a Roll',
    description: 'Maintained a 3-day learning streak',
    category: 'streak',
    rarity: 'common',
    icon: '🔥',
    unlockCondition: (progress) => {
      return (progress.streak || 0) >= 3;
    },
  },
  {
    id: 'streak_7_days',
    name: 'Week Warrior',
    description: 'Maintained a 7-day learning streak',
    category: 'streak',
    rarity: 'rare',
    icon: '💪',
    unlockCondition: (progress) => {
      return (progress.streak || 0) >= 7;
    },
  },
  {
    id: 'streak_30_days',
    name: 'Monthly Master',
    description: 'Maintained a 30-day learning streak',
    category: 'streak',
    rarity: 'epic',
    icon: '🌟',
    unlockCondition: (progress) => {
      return (progress.streak || 0) >= 30;
    },
  },
  
  // Special Badges
  {
    id: 'first_course_started',
    name: 'First Steps',
    description: 'Started your first course',
    category: 'special',
    rarity: 'common',
    icon: '🚀',
    unlockCondition: (progress) => {
      const courseProgress = progress.courseProgress || {};
      return Object.keys(courseProgress).length > 0;
    },
  },
  {
    id: 'first_quiz_passed',
    name: 'Quiz Novice',
    description: 'Passed your first quiz',
    category: 'special',
    rarity: 'common',
    icon: '✅',
    unlockCondition: (progress) => {
      const stats = progress.statistics || {};
      return (stats.totalQuizzesPassed || 0) >= 1;
    },
  },
];

// Check and unlock badges
export const checkAndUnlockBadges = (courses, overallProgress) => {
  const progress = {
    courseProgress: JSON.parse(localStorage.getItem('courseProgress') || '{}'),
    quizScores: JSON.parse(localStorage.getItem('quizScores') || '{}'),
    labCompletion: JSON.parse(localStorage.getItem('labCompletion') || '{}'),
    statistics: JSON.parse(localStorage.getItem('statistics') || '{}'),
    streak: parseInt(localStorage.getItem('streak') || '0'),
  };
  
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');
  const earnedBadgeIds = earnedBadges.map(b => b.id);
  
  const newlyUnlocked = [];
  
  BADGES.forEach(badge => {
    if (!earnedBadgeIds.includes(badge.id)) {
      if (badge.unlockCondition(progress, courses, overallProgress)) {
        const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');
        earnedBadges.push({
          id: badge.id,
          earnedDate: new Date().toISOString(),
        });
        localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
        newlyUnlocked.push(badge);
      }
    }
  });
  
  return newlyUnlocked;
};

// Get badge by ID
export const getBadgeById = (badgeId) => {
  return BADGES.find(b => b.id === badgeId);
};

// Get all badges by category
export const getBadgesByCategory = (category) => {
  return BADGES.filter(b => b.category === category);
};


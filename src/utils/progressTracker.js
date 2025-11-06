// Progress tracking utility using localStorage

const STORAGE_KEYS = {
  COURSE_PROGRESS: 'courseProgress',
  QUIZ_SCORES: 'quizScores',
  LAB_COMPLETION: 'labCompletion',
  EARNED_BADGES: 'earnedBadges',
  STATISTICS: 'statistics',
  LAST_ACTIVE_DATE: 'lastActiveDate',
  STREAK: 'streak',
};

// Initialize progress data if not exists
export const initializeProgress = () => {
  if (!localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS)) {
    localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES)) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LAB_COMPLETION)) {
    localStorage.setItem(STORAGE_KEYS.LAB_COMPLETION, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EARNED_BADGES)) {
    localStorage.setItem(STORAGE_KEYS.EARNED_BADGES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STATISTICS)) {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify({
      totalLessonsCompleted: 0,
      totalCoursesCompleted: 0,
      totalQuizzesPassed: 0,
      totalLabsCompleted: 0,
    }));
  }
  updateStreak();
};

// Get course progress
export const getCourseProgress = (courseId) => {
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS) || '{}');
  return progress[courseId] || { completedLessons: [], completedModules: [] };
};

// Mark lesson as complete
export const markLessonComplete = (courseId, lessonId, moduleId) => {
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS) || '{}');
  if (!progress[courseId]) {
    progress[courseId] = { completedLessons: [], completedModules: [] };
  }
  
  if (!progress[courseId].completedLessons.includes(lessonId)) {
    progress[courseId].completedLessons.push(lessonId);
  }
  
  if (moduleId && !progress[courseId].completedModules.includes(moduleId)) {
    progress[courseId].completedModules.push(moduleId);
  }
  
  localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(progress));
  
  // Update statistics
  const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || '{}');
  stats.totalLessonsCompleted = (stats.totalLessonsCompleted || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  
  updateStreak();
  return progress[courseId];
};

// Calculate course progress percentage
export const calculateCourseProgress = (courseId, totalLessons) => {
  const progress = getCourseProgress(courseId);
  const completedCount = progress.completedLessons.length;
  return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
};

// Calculate overall progress across all courses
export const calculateOverallProgress = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  let totalLessons = 0;
  let completedLessons = 0;
  
  courses.forEach(course => {
    const courseTotal = course.modules?.reduce((sum, module) => sum + (module.lessons?.length || 0), 0) || 0;
    totalLessons += courseTotal;
    const progress = getCourseProgress(course.id);
    completedLessons += progress.completedLessons.length;
  });
  
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
};

// Save quiz score
export const saveQuizScore = (courseId, quizId, score, isPerfect, isFirstTry) => {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '{}');
  if (!scores[courseId]) {
    scores[courseId] = {};
  }
  
  scores[courseId][quizId] = {
    score,
    isPerfect,
    isFirstTry,
    date: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
  
  // Update statistics
  const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || '{}');
  if (score >= 70) {
    stats.totalQuizzesPassed = (stats.totalQuizzesPassed || 0) + 1;
  }
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  
  return scores[courseId][quizId];
};

// Get quiz score
export const getQuizScore = (courseId, quizId) => {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '{}');
  return scores[courseId]?.[quizId] || null;
};

// Mark lab as complete
export const markLabComplete = (courseId, labId) => {
  const labs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LAB_COMPLETION) || '{}');
  if (!labs[courseId]) {
    labs[courseId] = [];
  }
  
  if (!labs[courseId].includes(labId)) {
    labs[courseId].push(labId);
  }
  
  localStorage.setItem(STORAGE_KEYS.LAB_COMPLETION, JSON.stringify(labs));
  
  // Update statistics
  const stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || '{}');
  stats.totalLabsCompleted = (stats.totalLabsCompleted || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  
  return labs[courseId];
};

// Get lab completion status
export const getLabCompletion = (courseId) => {
  const labs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LAB_COMPLETION) || '{}');
  return labs[courseId] || [];
};

// Earn a badge
export const earnBadge = (badgeId) => {
  const badges = JSON.parse(localStorage.getItem(STORAGE_KEYS.EARNED_BADGES) || '[]');
  
  if (!badges.find(b => b.id === badgeId)) {
    badges.push({
      id: badgeId,
      earnedDate: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.EARNED_BADGES, JSON.stringify(badges));
    return true;
  }
  return false;
};

// Check if badge is earned
export const isBadgeEarned = (badgeId) => {
  const badges = JSON.parse(localStorage.getItem(STORAGE_KEYS.EARNED_BADGES) || '[]');
  return badges.some(b => b.id === badgeId);
};

// Get all earned badges
export const getEarnedBadges = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.EARNED_BADGES) || '[]');
};

// Get statistics
export const getStatistics = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATISTICS) || '{}');
};

// Update streak
export const updateStreak = () => {
  const today = new Date().toDateString();
  const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
  const currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0');
  
  if (lastActive === today) {
    return currentStreak;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (lastActive === yesterdayStr) {
    // Continue streak
    const newStreak = currentStreak + 1;
    localStorage.setItem(STORAGE_KEYS.STREAK, newStreak.toString());
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    return newStreak;
  } else if (!lastActive) {
    // First time
    localStorage.setItem(STORAGE_KEYS.STREAK, '1');
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    return 1;
  } else {
    // Streak broken
    localStorage.setItem(STORAGE_KEYS.STREAK, '1');
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
    return 1;
  }
};

// Get current streak
export const getStreak = () => {
  return parseInt(localStorage.getItem(STORAGE_KEYS.STREAK) || '0');
};

// Check if course is completed
export const isCourseCompleted = (courseId, totalLessons) => {
  const progress = getCourseProgress(courseId);
  return progress.completedLessons.length >= totalLessons;
};

// Get completed courses count
export const getCompletedCoursesCount = (courses) => {
  if (!courses) return 0;
  return courses.filter(course => {
    const totalLessons = course.modules?.reduce((sum, module) => sum + (module.lessons?.length || 0), 0) || 0;
    return isCourseCompleted(course.id, totalLessons);
  }).length;
};


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiCheck, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import CodeSnippet from '../components/learning/CodeSnippet';
import InteractiveChart from '../components/learning/InteractiveChart';
import DataTable from '../components/learning/DataTable';
import AchievementNotification from '../components/achievements/AchievementNotification';
import { getCourseById, getLesson } from '../data/mockData';
import {
  getCourseProgress,
  markLessonComplete,
  calculateCourseProgress,
  calculateOverallProgress,
} from '../utils/progressTracker';
import { courses } from '../data/mockData';
import { checkAndUnlockBadges } from '../data/achievements';

const CourseLearning = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({ completedLessons: [] });
  const [courseProgress, setCourseProgress] = useState(0);
  const [newBadge, setNewBadge] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const courseData = getCourseById(courseId);
    setCourse(courseData);

    if (courseData && moduleId && lessonId) {
      const lesson = getLesson(courseId, moduleId, lessonId);
      setCurrentLesson(lesson);
    } else if (courseData && courseData.modules.length > 0) {
      // Navigate to first lesson if no specific lesson is selected
      const firstModule = courseData.modules[0];
      const firstLesson = firstModule.lessons[0];
      navigate(`/course/${courseId}/${firstModule.id}/${firstLesson.id}`, { replace: true });
    }
  }, [courseId, moduleId, lessonId, navigate]);

  useEffect(() => {
    if (course) {
      const courseProg = getCourseProgress(courseId);
      setProgress(courseProg);
      
      const totalLessons = course.modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
      const prog = calculateCourseProgress(courseId, totalLessons);
      setCourseProgress(prog);
    }
  }, [course, courseId]);

  const handleMarkComplete = () => {
    if (!currentLesson || !moduleId) return;
    
    markLessonComplete(courseId, currentLesson.id, moduleId);
    
    // Update progress
    const updatedProgress = getCourseProgress(courseId);
    setProgress(updatedProgress);
    
    const totalLessons = course.modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
    const prog = calculateCourseProgress(courseId, totalLessons);
    setCourseProgress(prog);
    
    // Check for new badges
    const overallProg = calculateOverallProgress(courses);
    const newlyUnlocked = checkAndUnlockBadges(courses, overallProg);
    
    if (newlyUnlocked.length > 0) {
      setNewBadge(newlyUnlocked[0]);
      setShowNotification(true);
    }
  };

  const isLessonComplete = currentLesson && progress.completedLessons.includes(currentLesson.id);

  const getNextLesson = () => {
    if (!course || !moduleId || !currentLesson) return null;
    
    const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId);
    const currentLessonIndex = course.modules[currentModuleIndex].lessons.findIndex(l => l.id === currentLesson.id);
    
    // Check if there's a next lesson in current module
    if (currentLessonIndex < course.modules[currentModuleIndex].lessons.length - 1) {
      return {
        courseId,
        moduleId,
        lessonId: course.modules[currentModuleIndex].lessons[currentLessonIndex + 1].id,
      };
    }
    
    // Check if there's a next module
    if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      return {
        courseId,
        moduleId: nextModule.id,
        lessonId: nextModule.lessons[0].id,
      };
    }
    
    return null;
  };

  const getPrevLesson = () => {
    if (!course || !moduleId || !currentLesson) return null;
    
    const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId);
    const currentLessonIndex = course.modules[currentModuleIndex].lessons.findIndex(l => l.id === currentLesson.id);
    
    // Check if there's a previous lesson in current module
    if (currentLessonIndex > 0) {
      return {
        courseId,
        moduleId,
        lessonId: course.modules[currentModuleIndex].lessons[currentLessonIndex - 1].id,
      };
    }
    
    // Check if there's a previous module
    if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      return {
        courseId,
        moduleId: prevModule.id,
        lessonId: prevModule.lessons[prevModule.lessons.length - 1].id,
      };
    }
    
    return null;
  };

  const renderContent = () => {
    if (!currentLesson || !currentLesson.content) return null;

    const { content } = currentLesson;

    if (content.type === 'documentation') {
      return (
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700">{content.text}</div>
        </div>
      );
    }

    if (content.type === 'mixed') {
      return (
        <div className="space-y-6">
          {content.documentation && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">{content.documentation}</div>
            </div>
          )}
          {content.code && (
            <CodeSnippet code={content.code} language="python" />
          )}
          {content.chart && (
            <InteractiveChart
              type={content.chart.type}
              data={content.chart.data}
              xKey={content.chart.xKey}
              yKey={content.chart.yKey}
              title={content.chart.title}
            />
          )}
        </div>
      );
    }

    return null;
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();

  // Sample chart data for demonstration
  const sampleChartData = [
    { name: 'Week 1', value: 85 },
    { name: 'Week 2', value: 92 },
    { name: 'Week 3', value: 78 },
    { name: 'Week 4', value: 95 },
  ];

  const sampleTableData = [
    { algorithm: 'Linear Regression', accuracy: '85%', speed: 'Fast', complexity: 'Low' },
    { algorithm: 'Random Forest', accuracy: '92%', speed: 'Medium', complexity: 'Medium' },
    { algorithm: 'Neural Network', accuracy: '95%', speed: 'Slow', complexity: 'High' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {showNotification && newBadge && (
        <AchievementNotification
          badge={newBadge}
          onClose={() => {
            setShowNotification(false);
            setNewBadge(null);
          }}
        />
      )}

      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-md p-4 overflow-y-auto">
          <div className="mb-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4"
            >
              <FiChevronLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
            <ProgressBar progress={courseProgress} label="Course Progress" size="sm" className="mt-2" />
          </div>

          <nav>
            {course.modules.map((module) => (
              <div key={module.id} className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">{module.title}</h3>
                <ul className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isComplete = progress.completedLessons.includes(lesson.id);
                    const isActive = lesson.id === currentLesson.id;
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/course/${courseId}/${module.id}/${lesson.id}`}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-primary-100 text-primary-700 font-medium'
                              : isComplete
                              ? 'text-green-700 hover:bg-gray-100'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {isComplete ? (
                            <FiCheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <FiBookOpen className="h-4 w-4" />
                          )}
                          <span>{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/dashboard" className="hover:text-primary-600">
                Dashboard
              </Link>
              <span>/</span>
              <Link to="/dashboard" className="hover:text-primary-600">
                {course.title}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{currentLesson.title}</span>
            </nav>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>
                <ProgressBar progress={courseProgress} label="Course Progress" className="mb-4" />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 lg:p-8 mb-6">
                {renderContent()}
                
                {/* Sample Interactive Elements */}
                {currentLesson.id === 'lesson-2-1' && (
                  <div className="mt-8 space-y-6">
                    <InteractiveChart
                      type="line"
                      data={sampleChartData}
                      xKey="name"
                      yKey="value"
                      title="Model Performance Over Time"
                    />
                    <DataTable
                      data={sampleTableData}
                      columns={[
                        { key: 'algorithm', label: 'Algorithm' },
                        { key: 'accuracy', label: 'Accuracy' },
                        { key: 'speed', label: 'Speed' },
                        { key: 'complexity', label: 'Complexity' },
                      ]}
                    />
                  </div>
                )}
              </div>

              {/* Mark Complete Button */}
              <div className="flex justify-center mb-6">
                {!isLessonComplete ? (
                  <Button onClick={handleMarkComplete} size="lg">
                    <FiCheck className="h-5 w-5 mr-2 inline" />
                    Mark as Complete
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600 font-medium">
                    <FiCheckCircle className="h-5 w-5" />
                    <span>Lesson Completed</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                {prevLesson ? (
                  <Link
                    to={`/course/${prevLesson.courseId}/${prevLesson.moduleId}/${prevLesson.lessonId}`}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <FiChevronLeft className="h-5 w-5" />
                    <span>Previous Lesson</span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextLesson ? (
                  <Link
                    to={`/course/${nextLesson.courseId}/${nextLesson.moduleId}/${nextLesson.lessonId}`}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span>Next Lesson</span>
                    <FiChevronRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    to={`/course/${courseId}/quiz/quiz-1`}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span>Take Quiz</span>
                    <FiChevronRight className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseLearning;


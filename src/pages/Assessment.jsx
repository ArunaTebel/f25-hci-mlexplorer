import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiCheck, FiX, FiAward } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import AchievementNotification from '../components/achievements/AchievementNotification';
import { getQuiz, getCourseById } from '../data/mockData';
import {
  saveQuizScore,
  getQuizScore,
  calculateOverallProgress,
} from '../utils/progressTracker';
import { courses } from '../data/mockData';
import { checkAndUnlockBadges } from '../data/achievements';

const Assessment = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [course, setCourse] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [newBadge, setNewBadge] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const quizData = getQuiz(courseId, quizId);
    const courseData = getCourseById(courseId);
    setQuiz(quizData);
    setCourse(courseData);

    // Check if quiz was already taken
    const previousScore = getQuizScore(courseId, quizId);
    if (previousScore) {
      setIsFirstTry(false);
    }
  }, [courseId, quizId]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correct = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (question.type === 'true_false') {
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      }
    });

    const percentage = Math.round((correct / total) * 100);
    const isPerfect = correct === total;
    const passed = percentage >= 70;

    setScore(percentage);
    setShowResults(true);

    // Save score
    saveQuizScore(courseId, quizId, percentage, isPerfect, isFirstTry);

    // Check for new badges
    const overallProg = calculateOverallProgress(courses);
    const newlyUnlocked = checkAndUnlockBadges(courses, overallProg);
    
    if (newlyUnlocked.length > 0) {
      setNewBadge(newlyUnlocked[0]);
      setShowNotification(true);
    }
  };

  const isAnswerCorrect = (question) => {
    const userAnswer = answers[question.id];
    if (question.type === 'true_false') {
      return userAnswer === question.correctAnswer;
    }
    return userAnswer === question.correctAnswer;
  };

  if (!quiz || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (showResults) {
    const correctCount = quiz.questions.filter(isAnswerCorrect).length;
    const passed = score >= 70;

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

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Card className="text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <FiCheck className="h-12 w-12 text-green-600" />
              ) : (
                <FiX className="h-12 w-12 text-red-600" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              You scored {score}% ({correctCount} out of {quiz.questions.length} correct)
            </p>

            {passed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  <FiAward className="h-5 w-5 inline mr-2" />
                  You passed the quiz!
                </p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              {quiz.questions.map((question, index) => {
                const isCorrect = isAnswerCorrect(question);
                const userAnswer = answers[question.id];

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-4 text-left ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        Question {index + 1}: {question.question}
                      </h3>
                      {isCorrect ? (
                        <FiCheck className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />
                      ) : (
                        <FiX className="h-5 w-5 text-red-600 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {question.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const isSelected = userAnswer === optIndex;
                          const isCorrectAnswer = optIndex === question.correctAnswer;

                          return (
                            <div
                              key={optIndex}
                              className={`p-2 rounded ${
                                isCorrectAnswer
                                  ? 'bg-green-200 font-medium'
                                  : isSelected && !isCorrectAnswer
                                  ? 'bg-red-200'
                                  : 'bg-gray-100'
                              }`}
                            >
                              {option}
                              {isCorrectAnswer && ' ✓'}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'true_false' && (
                      <div className="space-y-2">
                        <div
                          className={`p-2 rounded ${
                            question.correctAnswer === true
                              ? 'bg-green-200 font-medium'
                              : userAnswer === true && !isCorrect
                              ? 'bg-red-200'
                              : 'bg-gray-100'
                          }`}
                        >
                          True {question.correctAnswer === true && ' ✓'}
                        </div>
                        <div
                          className={`p-2 rounded ${
                            question.correctAnswer === false
                              ? 'bg-green-200 font-medium'
                              : userAnswer === false && !isCorrect
                              ? 'bg-red-200'
                              : 'bg-gray-100'
                          }`}
                        >
                          False {question.correctAnswer === false && ' ✓'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setAnswers({});
                  setCurrentQuestion(0);
                }}
              >
                Retake Quiz
              </Button>
              <Link to={`/course/${courseId}`}>
                <Button>Continue Learning</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <Link
            to={`/course/${courseId}`}
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
          >
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{course.title}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">{currentQ.question}</h2>

          {currentQ.type === 'multiple_choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === index
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'true_false' && (
            <div className="space-y-3">
              <button
                onClick={() => handleAnswerSelect(currentQ.id, true)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQ.id] === true
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleAnswerSelect(currentQ.id, false)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQ.id] === false
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                False
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {currentQuestion < quiz.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== false}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== false}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;


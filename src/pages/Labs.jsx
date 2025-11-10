import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiPlay, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import CodeSnippet from '../components/learning/CodeSnippet';
import { courses } from '../data/mockData';
import { getLabCompletion, markLabComplete } from '../utils/progressTracker';

const Labs = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [completedLabs, setCompletedLabs] = useState({});
  const [code, setCode] = useState('');

  useEffect(() => {
    // Load completed labs for all courses
    const completed = {};
    courses.forEach(course => {
      completed[course.id] = getLabCompletion(course.id);
    });
    setCompletedLabs(completed);
  }, []);

  const allLabs = courses.flatMap(course =>
    (course.labs || []).map(lab => ({
      ...lab,
      courseId: course.id,
      courseTitle: course.title,
    }))
  );

  const handleRunCode = () => {
    // Simulate code execution
    alert('Code execution simulated! In a real application, this would run your code.');
  };

  const handleCompleteLab = (courseId, labId) => {
    markLabComplete(courseId, labId);
    setCompletedLabs(prev => ({
      ...prev,
      [courseId]: [...(prev[courseId] || []), labId],
    }));
  };

  const isLabComplete = (courseId, labId) => {
    return completedLabs[courseId]?.includes(labId) || false;
  };

  if (selectedLab) {
    const isComplete = isLabComplete(selectedLab.courseId, selectedLab.id);
    const defaultCode = `# ${selectedLab.title}\n# Write your code here\n\nprint("Hello, ML Explorer!")`;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="mb-6">
            <button
              onClick={() => setSelectedLab(null)}
              className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center"
            >
              ← Back to Labs
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedLab.title}</h1>
            <p className="text-gray-600">{selectedLab.courseTitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instructions */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedLab.description}</p>
              </div>

              {!isComplete && (
                <div className="mt-6">
                  <Button
                    onClick={() => handleCompleteLab(selectedLab.courseId, selectedLab.id)}
                    className="w-full"
                  >
                    <FiCheckCircle className="h-5 w-5 mr-2 inline" />
                    Mark as Complete
                  </Button>
                </div>
              )}

              {isComplete && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <FiCheckCircle className="h-5 w-5" />
                    <span className="font-medium">Lab Completed</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Code Editor */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Code Editor</h2>
                <Button onClick={handleRunCode} size="sm">
                  <FiPlay className="h-4 w-4 mr-2 inline" />
                  Run Code
                </Button>
              </div>

              <div className="mb-4">
                <textarea
                  value={code || defaultCode}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write your code here..."
                />
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Output</h3>
                <div className="text-green-400 font-mono text-sm">
                  {code ? 'Ready to run...' : 'No output yet'}
                </div>
              </div>
            </Card>
          </div>

          {/* Sample Code Snippet */}
          <Card className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Example Solution</h2>
            <CodeSnippet
              code={defaultCode}
              language="python"
            />
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Labs & Demos</h1>
          <p className="text-gray-600">Hands-on practice with real code examples</p>
        </div>

        {allLabs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allLabs.map((lab) => {
              const complete = isLabComplete(lab.courseId, lab.id);
              return (
                <Card
                  key={`${lab.courseId}-${lab.id}`}
                  hover
                  onClick={() => setSelectedLab(lab)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <FiCode className="h-6 w-6 text-primary-600" />
                    </div>
                    {complete && (
                      <FiCheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lab.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lab.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{lab.courseTitle}</span>
                    <FiChevronRight className="h-5 w-5 text-primary-600" />
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <FiCode className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Labs Available</h2>
            <p className="text-gray-600">Labs will be available soon!</p>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Labs;


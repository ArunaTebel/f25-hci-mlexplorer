import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { courses } from '../data/mockData';
import { isCourseCompleted } from '../utils/progressTracker';

const Certificate = () => {
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const completed = courses.filter(course => {
      const totalLessons = course.modules?.reduce((sum, module) => sum + (module.lessons?.length || 0), 0) || 0;
      return isCourseCompleted(course.id, totalLessons);
    });
    setCompletedCourses(completed);
  }, []);

  const handleDownload = (courseId) => {
    // Create a simple certificate image/data URL
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Title
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 200);

    // Course name
    const course = courses.find(c => c.id === courseId);
    ctx.fillStyle = '#1f2937';
    ctx.font = '36px Arial';
    ctx.fillText(`This is to certify that`, canvas.width / 2, 300);
    ctx.font = 'bold 40px Arial';
    ctx.fillText(course?.title || 'Course', canvas.width / 2, 380);

    // Date
    ctx.fillStyle = '#6b7280';
    ctx.font = '24px Arial';
    ctx.fillText(`Completed on ${new Date().toLocaleDateString()}`, canvas.width / 2, 500);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${courseId}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleShare = (platform, courseId) => {
    const course = courses.find(c => c.id === courseId);
    const text = `I just completed ${course?.title} on ML Explorer!`;
    const url = window.location.href;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">Download and share your achievements</p>
        </div>

        {completedCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="relative overflow-hidden">
                {/* Certificate Design */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-4 border-primary-600 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4">🎓</div>
                    <h2 className="text-2xl font-bold text-primary-900 mb-2">
                      Certificate of Completion
                    </h2>
                    <p className="text-gray-600 mb-4">This is to certify that</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{course.title}</h3>
                    <p className="text-gray-600">
                      has been successfully completed on{' '}
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="border-t-2 border-primary-300 pt-4 mt-6">
                    <p className="text-sm text-gray-600">ML Explorer Platform</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => handleDownload(course.id)}
                    className="w-full"
                    size="lg"
                  >
                    <FiDownload className="h-5 w-5 mr-2 inline" />
                    Download Certificate
                  </Button>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Share:</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShare('twitter', course.id)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <FiTwitter className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShare('linkedin', course.id)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <FiLinkedin className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShare('facebook', course.id)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <FiFacebook className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        aria-label="Copy link"
                      >
                        <FiShare2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Certificates Yet</h2>
            <p className="text-gray-600 mb-6">
              Complete a course to earn your first certificate!
            </p>
            <Link to="/dashboard">
              <Button>Browse Courses</Button>
            </Link>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Certificate;


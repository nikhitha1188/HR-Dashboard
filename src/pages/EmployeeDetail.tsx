
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { ArrowLeft, Star, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, loading } = useEmployees();
  const [activeTab, setActiveTab] = useState('overview');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const employee = employees.find(emp => emp.id === parseInt(id || '0'));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Employee not found.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 transition-colors ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your feedback before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFeedback('');
    
    toast({
      title: 'Success!',
      description: 'Feedback submitted successfully',
    });

    // Hide success animation after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="animate-fade-in">
      <Link
        to="/"
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-6">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full object-cover transition-transform hover:scale-105"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
                {employee.department}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  {renderStars(employee.performanceRating)}
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    ({employee.performanceRating}/5)
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Age: {employee.age}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {['overview', 'projects', 'feedback'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 border-b-2 font-medium text-sm capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 scale-105'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="transition-all duration-500 ease-in-out">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                {employee.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>About</span>
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{employee.bio}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{employee.phone}</span>
                    </div>
                    <div className="flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors md:col-span-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="text-gray-600 dark:text-gray-300">
                        <p>{employee.address.address}</p>
                        <p>{employee.address.city}, {employee.address.state} {employee.address.postalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance History
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Current performance rating: {employee.performanceRating}/5 stars
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Last reviewed: March 2024
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Projects
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Q1 Performance Review</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Complete quarterly performance assessments
                    </p>
                    <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded mt-2">
                      In Progress
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Team Training Initiative</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Lead professional development workshops
                    </p>
                    <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded mt-2">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Submit Feedback
                </h3>
                
                {showSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4 mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                      Feedback Submitted!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      Thank you for your feedback. It has been recorded and will be reviewed by the HR team.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter your feedback here..."
                      rows={6}
                      className="transition-all duration-200 focus:ring-4 focus:ring-blue-500/20"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Submit Feedback'
                      )}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

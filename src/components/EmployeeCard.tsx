
import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../hooks/useEmployees';
import { useBookmarks } from '../context/BookmarkContext';
import { Star, Bookmark, Eye, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const handleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
      toast.success('Removed from bookmarks');
    } else {
      addBookmark(employee.id);
      toast.success('Added to bookmarks');
    }
  };

  const handlePromote = () => {
    toast.success(`${employee.firstName} ${employee.lastName} has been promoted!`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getPerformanceBadge = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={employee.image}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{employee.email}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Age: {employee.age}</p>
          
          <div className="mt-2 flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceBadge(employee.performanceRating)}`}>
              {employee.department}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(employee.performanceRating)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                ({employee.performanceRating}/5)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center space-x-2">
        <div className="flex space-x-2">
          <Link
            to={`/employee/${employee.id}`}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-md text-sm font-medium transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Link>
          
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isBookmarked(employee.id)
                ? 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-700 dark:text-yellow-200'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>{isBookmarked(employee.id) ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>

        <button
          onClick={handlePromote}
          className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-200 rounded-md text-sm font-medium transition-colors"
        >
          <TrendingUp className="h-4 w-4" />
          <span>Promote</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;

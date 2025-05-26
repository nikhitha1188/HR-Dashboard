
import React from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useBookmarks } from '../context/BookmarkContext';
import EmployeeCard from '../components/EmployeeCard';

const Bookmarks: React.FC = () => {
  const { employees, loading } = useEmployees();
  const { bookmarks } = useBookmarks();

  const bookmarkedEmployees = employees.filter(employee => 
    bookmarks.includes(employee.id)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookmarked Employees
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your saved employees for quick access and management
        </p>
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No bookmarked employees yet. Start bookmarking employees from the dashboard!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;

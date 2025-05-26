
import React from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics: React.FC = () => {
  const { employees, loading } = useEmployees();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calculate department-wise average ratings
  const departmentData = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = { total: 0, count: 0 };
    }
    acc[employee.department].total += employee.performanceRating;
    acc[employee.department].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const departmentChartData = Object.entries(departmentData).map(([department, data]) => ({
    department,
    averageRating: (data.total / data.count).toFixed(1),
    employeeCount: data.count,
  }));

  // Calculate rating distribution
  const ratingDistribution = employees.reduce((acc, employee) => {
    const rating = employee.performanceRating;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const ratingChartData = Object.entries(ratingDistribution).map(([rating, count]) => ({
    rating: `${rating} Stars`,
    count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Insights into team performance and department statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="department" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value, name) => [value, 'Average Rating']}
                labelFormatter={(label) => `Department: ${label}`}
              />
              <Bar dataKey="averageRating" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Rating Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ratingChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ rating, count }) => `${rating}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {ratingChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Employees</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {employees.length}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Average Rating</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {(employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / employees.length).toFixed(1)}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performers</h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {employees.filter(emp => emp.performanceRating >= 4).length}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Departments</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {Object.keys(departmentData).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;


import { useState, useEffect } from 'react';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performanceRating: number;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  image: string;
  bio?: string;
}

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        const transformedEmployees: Employee[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: departments[Math.floor(Math.random() * departments.length)],
          performanceRating: Math.floor(Math.random() * 5) + 1,
          address: user.address,
          phone: user.phone,
          image: user.image,
          bio: `Experienced professional in ${departments[Math.floor(Math.random() * departments.length)]} with ${Math.floor(Math.random() * 10) + 1} years of experience. Passionate about innovation and team collaboration.`
        }));

        setEmployees(transformedEmployees);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = (newEmployee: Employee) => {
    setEmployees(prev => [newEmployee, ...prev]);
  };

  return { employees, loading, error, addEmployee };
};

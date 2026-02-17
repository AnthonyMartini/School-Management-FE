import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import DataTable from '../common/DataTable';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  gpa: number;
  attendance: number;
  enrollmentDate: string;
}

const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const students: Student[] = [
    {
      id: 'S001',
      name: 'Alice Johnson',
      email: 'alice.johnson@school.edu',
      grade: '10th',
      class: 'A',
      gpa: 3.85,
      attendance: 96.2,
      enrollmentDate: '2024-01-15'
    },
    {
      id: 'S002',
      name: 'Bob Smith',
      email: 'bob.smith@school.edu',
      grade: '11th',
      class: 'B',
      gpa: 3.42,
      attendance: 92.1,
      enrollmentDate: '2024-01-16'
    },
    {
      id: 'S003',
      name: 'Carol Davis',
      email: 'carol.davis@school.edu',
      grade: '9th',
      class: 'A',
      gpa: 3.95,
      attendance: 98.5,
      enrollmentDate: '2024-01-17'
    },
    {
      id: 'S004',
      name: 'David Wilson',
      email: 'david.wilson@school.edu',
      grade: '12th',
      class: 'C',
      gpa: 3.21,
      attendance: 89.3,
      enrollmentDate: '2024-01-18'
    },
    {
      id: 'S005',
      name: 'Eva Brown',
      email: 'eva.brown@school.edu',
      grade: '10th',
      class: 'B',
      gpa: 3.67,
      attendance: 94.8,
      enrollmentDate: '2024-01-19'
    },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const columns = [
    { key: 'id', label: 'Student ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'grade', label: 'Grade', sortable: true },
    { key: 'class', label: 'Class', sortable: true },
    {
      key: 'gpa',
      label: 'GPA',
      sortable: true,
      render: (gpa: number) => (
        <span className={`font-medium ${gpa >= 3.5 ? 'text-green-600' :
            gpa >= 3.0 ? 'text-blue-600' :
              gpa >= 2.5 ? 'text-yellow-600' :
                'text-red-600'
          }`}>
          {gpa.toFixed(2)}
        </span>
      )
    },
    {
      key: 'attendance',
      label: 'Attendance',
      sortable: true,
      render: (attendance: number) => (
        <span className={`font-medium ${attendance >= 95 ? 'text-green-600' :
            attendance >= 90 ? 'text-blue-600' :
              attendance >= 85 ? 'text-yellow-600' :
                'text-red-600'
          }`}>
          {attendance.toFixed(1)}%
        </span>
      )
    },
    { key: 'enrollmentDate', label: 'Enrollment Date', sortable: true },
  ];

  const grades = ['All', '9th', '10th', '11th', '12th'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student information and records</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Student</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredStudents.length} of {students.length} students
        </div>

        <DataTable data={filteredStudents} columns={columns} />
      </div>
    </div>
  );
};

export default StudentsPage;
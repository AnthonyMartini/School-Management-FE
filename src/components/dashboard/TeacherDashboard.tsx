import React from "react";
import { Users, BookOpen, CheckCircle, Clock } from "lucide-react";
import StatCard from "../common/StatCard";
import DataTable from "../common/DataTable";

const TeacherDashboard: React.FC = () => {
  const stats = [
    { title: "My Students", value: "156", icon: Users, color: "blue" as const },
    {
      title: "Classes Today",
      value: "6",
      icon: BookOpen,
      color: "green" as const,
    },
    {
      title: "Assignments Due",
      value: "8",
      icon: Clock,
      color: "orange" as const,
    },
    {
      title: "Attendance Rate",
      value: "94.5%",
      icon: CheckCircle,
      color: "purple" as const,
    },
  ];

  const todayClasses = [
    {
      time: "9:00 AM",
      subject: "Mathematics",
      grade: "10th A",
      room: "Room 201",
    },
    {
      time: "10:30 AM",
      subject: "Mathematics",
      grade: "10th B",
      room: "Room 201",
    },
    {
      time: "1:00 PM",
      subject: "Advanced Math",
      grade: "11th A",
      room: "Room 201",
    },
    {
      time: "2:30 PM",
      subject: "Statistics",
      grade: "12th A",
      room: "Room 203",
    },
  ];

  const columns = [
    { key: "time", label: "Time", sortable: true },
    { key: "subject", label: "Subject", sortable: true },
    { key: "grade", label: "Grade", sortable: true },
    { key: "room", label: "Room", sortable: true },
  ];

  const recentGrades = [
    {
      student: "Alice Johnson",
      assignment: "Algebra Quiz",
      grade: "92%",
      subject: "Mathematics",
    },
    {
      student: "Bob Smith",
      assignment: "Geometry Test",
      grade: "87%",
      subject: "Mathematics",
    },
    {
      student: "Carol Davis",
      assignment: "Statistics Project",
      grade: "95%",
      subject: "Statistics",
    },
    {
      student: "David Wilson",
      assignment: "Calculus Homework",
      grade: "78%",
      subject: "Advanced Math",
    },
  ];

  const gradeColumns = [
    { key: "student", label: "Student", sortable: true },
    { key: "assignment", label: "Assignment", sortable: true },
    { key: "subject", label: "Subject", sortable: true },
    {
      key: "grade",
      label: "Grade",
      sortable: true,
      render: (value: unknown) => {
        const grade = String(value);
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              parseFloat(grade) >= 90
                ? "bg-green-100 text-green-800"
                : parseFloat(grade) >= 80
                  ? "bg-blue-100 text-blue-800"
                  : parseFloat(grade) >= 70
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
            }`}
          >
            {grade}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">
          Good morning! Ready for another day of teaching?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Schedule
          </h3>
          <DataTable data={todayClasses} columns={columns} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Take Attendance</div>
              <div className="text-sm text-gray-500">
                Mark today's attendance
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Grade Assignments</div>
              <div className="text-sm text-gray-500">8 assignments pending</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Create Assignment</div>
              <div className="text-sm text-gray-500">Add new assignment</div>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Grades
        </h3>
        <DataTable data={recentGrades} columns={gradeColumns} />
      </div>
    </div>
  );
};

export default TeacherDashboard;

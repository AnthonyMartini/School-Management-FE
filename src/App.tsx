import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import TeacherDashboard from "./components/dashboard/TeacherDashboard";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import ParentDashboard from "./components/dashboard/ParentDashboard";
import StudentsPage from "./components/pages/StudentsPage";
import CalendarPage from "./components/pages/CalendarPage";
import StudentClassesPage from "./components/myClasses/StudentClassesPage";
import TeacherClassesPage from "./components/myClasses/TeacherClassesPage";
import ParentAccess from "./components/pages/ParentAccess";

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        switch (user.role) {
          case "admin":
            return <AdminDashboard />;
          case "teacher":
            return <TeacherDashboard />;
          case "student":
            return <StudentDashboard />;
          case "parent":
            return <ParentDashboard />;
          default:
            return <AdminDashboard />;
        }
      case "students":
        return <StudentsPage />;
      case "calendar":
        return <CalendarPage />;
      case "classes":
        if (user.role === "student") {
          return <StudentClassesPage />;
        }
        if (user.role === "teacher") {
          return <TeacherClassesPage />;
        }
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">This view is currently for students and teachers.</p>
          </div>
        );
      case "parent-access":
        return <ParentAccess />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

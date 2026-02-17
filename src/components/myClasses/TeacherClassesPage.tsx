import React, { useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock,
  UserPlus,
  BarChart3,
  MoreVertical,
  Search,
  ArrowRight,
  Mail,
  Filter,
  Bell,
  Send,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  attendance: string;
  avatar?: string;
}

interface ClassAssignment {
  id: string;
  title: string;
  dueDate: string;
  submitted: number;
  total: number;
  avgScore?: string;
}

interface TeacherClassDetail {
  id: string;
  name: string;
  section: string;
  studentsCount: number;
  time: string;
  room: string;
  color: string;
  iconColor: string;
  students: Student[];
  assignments: ClassAssignment[];
  avgGrade: string;
  attendanceRate: string;
}

const teacherClassesData: TeacherClassDetail[] = [
  {
    id: "math-10th-a",
    name: "Mathematics",
    section: "10th A",
    studentsCount: 28,
    time: "Mon/Wed 09:00 - 10:20",
    room: "Room 201",
    color: "bg-blue-500",
    iconColor: "text-blue-500",
    avgGrade: "88%",
    attendanceRate: "96%",
    students: [
      {
        id: "s1",
        name: "Alice Johnson",
        email: "alice.j@school.edu",
        grade: "92%",
        attendance: "100%",
      },
      {
        id: "s2",
        name: "Bob Smith",
        email: "bob.s@school.edu",
        grade: "85%",
        attendance: "92%",
      },
      {
        id: "s3",
        name: "Charlie Brown",
        email: "charlie.b@school.edu",
        grade: "78%",
        attendance: "95%",
      },
      {
        id: "s4",
        name: "Diana Prince",
        email: "diana.p@school.edu",
        grade: "95%",
        attendance: "98%",
      },
    ],
    assignments: [
      {
        id: "as1",
        title: "Algebra Quiz #2",
        dueDate: "Oct 24",
        submitted: 24,
        total: 28,
        avgScore: "84%",
      },
      {
        id: "as2",
        title: "Homework Set 4",
        dueDate: "Oct 20",
        submitted: 28,
        total: 28,
        avgScore: "91%",
      },
    ],
  },
  {
    id: "math-10th-b",
    name: "Mathematics",
    section: "10th B",
    studentsCount: 26,
    time: "Mon/Wed 10:30 - 11:50",
    room: "Room 201",
    color: "bg-purple-500",
    iconColor: "text-purple-500",
    avgGrade: "84%",
    attendanceRate: "93%",
    students: [
      {
        id: "s5",
        name: "Ethan Hunt",
        email: "ethan.h@school.edu",
        grade: "82%",
        attendance: "88%",
      },
      {
        id: "s6",
        name: "Fiona Gallagher",
        email: "fiona.g@school.edu",
        grade: "89%",
        attendance: "96%",
      },
    ],
    assignments: [
      {
        id: "as3",
        title: "Algebra Quiz #2",
        dueDate: "Oct 24",
        submitted: 18,
        total: 26,
      },
    ],
  },
  {
    id: "adv-math-11th-a",
    name: "Advanced Math",
    section: "11th A",
    studentsCount: 22,
    time: "Tue/Thu 13:00 - 14:20",
    room: "Room 201",
    color: "bg-green-500",
    iconColor: "text-green-500",
    avgGrade: "91%",
    attendanceRate: "98%",
    students: [
      {
        id: "s7",
        name: "George Miller",
        email: "george.m@school.edu",
        grade: "94%",
        attendance: "100%",
      },
    ],
    assignments: [
      {
        id: "as4",
        title: "Calculus Intro",
        dueDate: "Oct 22",
        submitted: 22,
        total: 22,
        avgScore: "89%",
      },
    ],
  },
];

const TeacherClassesPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState(
    teacherClassesData[0].id,
  );
  const selectedClass =
    teacherClassesData.find((c) => c.id === selectedClassId) ||
    teacherClassesData[0];
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "assignments" | "attendance"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handlePostAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    setIsPosting(true);
    try {
      const response = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAnnouncement,
          teacher: "Dr. Sarah Wilson", // Mock teacher for now
          classId: selectedClassId,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }),
      });
      if (response.ok) {
        setNewAnnouncement({ title: "", content: "" });
        alert("Announcement posted successfully!");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement. Is the server running?");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sub-Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-purple-600" size={24} />
            My Classes
          </h2>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">
            Manage Your Sections
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {teacherClassesData.map((cls) => (
            <button
              key={cls.id}
              onClick={() => {
                setSelectedClassId(cls.id);
                setActiveTab("overview");
              }}
              className={`
                w-full text-left p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                ${
                  selectedClassId === cls.id
                    ? "bg-white shadow-lg border-transparent scale-[1.02]"
                    : "hover:bg-white hover:shadow-sm border-transparent text-gray-500"
                }
              `}
            >
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${cls.color} ${selectedClassId === cls.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"} transition-all`}
              ></div>

              <div className="flex justify-between items-start mb-1 relative z-10">
                <h3
                  className={`font-bold text-sm leading-tight transition-colors ${selectedClassId === cls.id ? "text-gray-900" : "group-hover:text-purple-600"}`}
                >
                  {cls.name}
                </h3>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${cls.color} text-white`}
                >
                  {cls.section}
                </span>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Users size={12} />
                  <span>{cls.studentsCount} Students</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Clock size={12} />
                  <span>{cls.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white/50">
          <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm">
            <UserPlus size={16} /> Add New Class
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Header Section */}
        <div className="p-8 border-b border-gray-50 bg-white relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-lg ${selectedClass.color} text-white text-[10px] font-black uppercase tracking-widest shadow-sm`}
                >
                  Section {selectedClass.section}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                  <Clock size={14} /> {selectedClass.time}
                </span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {selectedClass.name}
              </h1>
            </div>

            <div className="flex gap-4">
              <div className="text-right px-6 border-r border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Class Avg
                </p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">
                  {selectedClass.avgGrade}
                </p>
              </div>
              <div className="text-right px-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Attendance
                </p>
                <p className="text-3xl font-black text-purple-600 tracking-tighter">
                  {selectedClass.attendanceRate}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-10">
            {["overview", "students", "assignments", "attendance"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(
                      tab as
                        | "overview"
                        | "students"
                        | "assignments"
                        | "attendance",
                    )
                  }
                  className={`
                                    pb-4 text-xs font-black uppercase tracking-widest transition-all relative
                                    ${
                                      activeTab === tab
                                        ? "text-purple-600"
                                        : "text-gray-400 hover:text-gray-600"
                                    }
                                `}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-full"></span>
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
          <div className="max-w-5xl">
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Users size={24} />
                      </div>
                      <button className="text-gray-300 hover:text-gray-500">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Total Students
                    </p>
                    <p className="text-3xl font-black text-gray-900 mt-1">
                      {selectedClass.studentsCount}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                        <ClipboardList size={24} />
                      </div>
                      <button className="text-gray-300 hover:text-gray-500">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Active Assignments
                    </p>
                    <p className="text-3xl font-black text-gray-900 mt-1">
                      {selectedClass.assignments.length}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                        <BarChart3 size={24} />
                      </div>
                      <button className="text-gray-300 hover:text-gray-500">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Grading Status
                    </p>
                    <p className="text-3xl font-black text-gray-900 mt-1">
                      94% Done
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-purple-600" />
                    Recent Activity
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start pb-6 border-b border-gray-50">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          3 Students joined the class roster
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start pb-6 border-b border-gray-50">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <ClipboardList size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          New assignment "Midterm Review" published
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Yesterday at 4:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 text-xs font-bold text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
                    View All Activity
                  </button>
                </div>

                {/* Announcement Form */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm border-l-4 border-l-amber-400">
                  <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-amber-500" />
                    Post Class Announcement
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Announcement Title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-bold"
                    />
                    <textarea
                      placeholder="Share an update with your students..."
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          content: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none font-medium"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handlePostAnnouncement}
                        disabled={
                          isPosting ||
                          !newAnnouncement.title ||
                          !newAnnouncement.content
                        }
                        className="px-6 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-black flex items-center gap-2 hover:bg-amber-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPosting ? (
                          "Posting..."
                        ) : (
                          <>
                            <Send size={16} /> Post Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-72">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-50">
                      <Filter size={18} />
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white text-xs font-black rounded-xl hover:bg-purple-700 transition-colors shadow-sm">
                      Add Student
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Student
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Email
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Grade
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Attendance
                        </th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {selectedClass.students.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-gray-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-100 to-gray-200"></div>
                              <span className="text-sm font-bold text-gray-900">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                            {student.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${
                                parseInt(student.grade) >= 90
                                  ? "bg-green-50 text-green-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {student.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-gray-700">
                            {student.attendance}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-300 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-all">
                              <Mail size={16} />
                            </button>
                            <button className="p-2 text-gray-300 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    Assignment Management
                  </h3>
                  <button className="px-4 py-2 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-all shadow-md">
                    Create New Assignment
                  </button>
                </div>
                {selectedClass.assignments.map((as) => (
                  <div
                    key={as.id}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
                        <ClipboardList size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 tracking-tight">
                          {as.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 font-bold italic">
                          <span>Due {as.dueDate}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span>
                            {as.submitted}/{as.total} Submitted
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      {as.avgScore && (
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Avg. Score
                          </p>
                          <p className="text-xl font-black text-gray-900 tracking-tight">
                            {as.avgScore}
                          </p>
                        </div>
                      )}
                      <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">
                  Class Attendance Logs
                </h3>
                <p className="text-gray-400 max-w-sm mx-auto text-sm font-medium mb-8">
                  Detailed historical logs and daily tracking interface for this
                  class session.
                </p>
                <button className="px-6 py-3 bg-purple-600 text-white text-xs font-black rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200">
                  Start Attendance Roll
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassesPage;

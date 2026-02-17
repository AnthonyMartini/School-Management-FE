import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  MapPin,
  CheckCircle2,
  Bell,
  User,
  ArrowRight,
  TrendingUp,
  Calendar as CalendarIcon,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  points?: string;
}

interface Grade {
  id: string;
  title: string;
  score: string;
  date: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  classId?: string;
}

interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "late";
}

interface ClassDetail {
  id: string;
  name: string;
  teacher: string;
  time: string;
  room: string;
  color: string;
  iconColor: string;
  assignments: Assignment[];
  grades: Grade[];
  announcements: Announcement[];
  attendance: AttendanceRecord[];
  overallGrade: string;
  progress: number;
}

const classesData: ClassDetail[] = [
  {
    id: "bio-101",
    name: "Biology",
    teacher: "Mr. Bio",
    time: "Daily 08:00 - 08:55",
    room: "Lab 2",
    color: "bg-green-500",
    iconColor: "text-green-500",
    overallGrade: "A (94%)",
    progress: 85,
    assignments: [
      {
        id: "b1",
        title: "Cell Structure Quiz",
        dueDate: "Feb 15",
        status: "graded",
        points: "24/25",
      },
      {
        id: "b2",
        title: "Photosynthesis Lab Report",
        dueDate: "Feb 22",
        status: "pending",
      },
    ],
    grades: [
      { id: "g1", title: "Genetics Test", score: "92/100", date: "Feb 10" },
    ],
    announcements: [],
    attendance: [
      { date: "Feb 16", status: "present" },
      { date: "Feb 15", status: "present" },
    ],
  },
  {
    id: "math-10th-a",
    name: "Algebra II",
    teacher: "Ms. Math",
    time: "Daily 09:00 - 09:55",
    room: "Room 302",
    color: "bg-blue-500",
    iconColor: "text-blue-500",
    overallGrade: "B+ (89%)",
    progress: 70,
    assignments: [
      {
        id: "m1",
        title: "Quadratic Equations",
        dueDate: "Feb 14",
        status: "graded",
        points: "18/20",
      },
      {
        id: "m2",
        title: "Polynomial Worksheet",
        dueDate: "Feb 20",
        status: "pending",
      },
    ],
    grades: [
      { id: "g2", title: "Unit 3 Exam", score: "85/100", date: "Feb 5" },
    ],
    announcements: [],
    attendance: [
      { date: "Feb 16", status: "present" },
      { date: "Feb 15", status: "present" },
    ],
  },
  {
    id: "art-101",
    name: "Painting",
    teacher: "Mr. Artist",
    time: "Daily 10:00 - 10:55",
    room: "Art Studio",
    color: "bg-pink-500",
    iconColor: "text-pink-500",
    overallGrade: "A+ (100%)",
    progress: 95,
    assignments: [
      {
        id: "art1",
        title: "Still Life Project",
        dueDate: "Feb 13",
        status: "graded",
        points: "50/50",
      },
      {
        id: "art2",
        title: "Abstract Composition",
        dueDate: "Mar 1",
        status: "pending",
      },
    ],
    grades: [
      { id: "g3", title: "Color Theory Quiz", score: "10/10", date: "Feb 1" },
    ],
    announcements: [],
    attendance: [
      { date: "Feb 16", status: "present" },
      { date: "Feb 15", status: "present" },
    ],
  },
  {
    id: "hist-202",
    name: "American History",
    teacher: "Ms. History",
    time: "Daily 11:00 - 11:55",
    room: "Room 105",
    color: "bg-amber-500",
    iconColor: "text-amber-500",
    overallGrade: "A- (92%)",
    progress: 78,
    assignments: [
      {
        id: "h1",
        title: "Colonial Memo",
        dueDate: "Feb 12",
        status: "graded",
        points: "46/50",
      },
      {
        id: "h2",
        title: "Constitution Quiz",
        dueDate: "Feb 25",
        status: "pending",
      },
    ],
    grades: [
      { id: "g4", title: "Unit 1 Test", score: "90/100", date: "Feb 3" },
    ],
    announcements: [],
    attendance: [
      { date: "Feb 16", status: "present" },
      { date: "Feb 15", status: "present" },
    ],
  },
  {
    id: "study-hall",
    name: "Study Hall",
    teacher: "Staff",
    time: "Daily 12:00 - 12:55",
    room: "Library",
    color: "bg-gray-500",
    iconColor: "text-gray-500",
    overallGrade: "N/A",
    progress: 100,
    assignments: [],
    grades: [],
    announcements: [],
    attendance: [{ date: "Feb 16", status: "present" }],
  },
  {
    id: "eng-101",
    name: "English",
    teacher: "Ms. English",
    time: "Daily 13:35 - 14:30",
    room: "Room 201",
    color: "bg-purple-500",
    iconColor: "text-purple-500",
    overallGrade: "A- (91%)",
    progress: 82,
    assignments: [
      {
        id: "e1",
        title: "Shakespeare Essay",
        dueDate: "Feb 28",
        status: "pending",
      },
    ],
    grades: [
      { id: "g5", title: "Vocabulary Quiz", score: "18/20", date: "Feb 12" },
    ],
    announcements: [],
    attendance: [{ date: "Feb 16", status: "present" }],
  },
];

const StudentClassesPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState(classesData[0].id);
  const [activeTab, setActiveTab] = useState<
    "overview" | "assignments" | "grades" | "announcements"
  >("overview");
  const [liveAnnouncements, setLiveAnnouncements] = useState<Announcement[]>(
    [],
  );

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/announcements");
        if (response.ok) {
          const data: Announcement[] = await response.json();
          setLiveAnnouncements(data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
    // Poll every 30 seconds for new updates
    const interval = setInterval(fetchAnnouncements, 30000);
    return () => clearInterval(interval);
  }, []);

  const selectedClass =
    classesData.find((c) => c.id === selectedClassId) || classesData[0];

  // Merge static announcements with live ones for the specific class
  const displayAnnouncements = [
    ...liveAnnouncements.filter((a) => a.classId === selectedClassId),
    ...selectedClass.announcements,
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sub-Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-6 border-bottom border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={24} />
            My Classes
          </h2>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
            Semester Winter 2026
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {classesData.map((cls) => (
            <button
              key={cls.id}
              onClick={() => {
                setSelectedClassId(cls.id);
                setActiveTab("overview");
              }}
              className={`
                w-full text-left p-4 rounded-2xl transition-all duration-300 group
                ${
                  selectedClassId === cls.id
                    ? "bg-white shadow-md border-l-4 border-blue-600 scale-[1.02]"
                    : "hover:bg-white hover:shadow-sm border-l-4 border-transparent text-gray-600"
                }
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-bold text-base leading-tight transition-colors ${selectedClassId === cls.id ? "text-blue-600" : "group-hover:text-blue-600"}`}
                >
                  {cls.name}
                </h3>
                {selectedClassId === cls.id && (
                  <ChevronRight
                    size={18}
                    className="text-blue-600 animate-pulse"
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={14} className="opacity-70" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={14} className="opacity-70" />
                  <span>{cls.room}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Class Header */}
        <div className="p-8 border-b border-gray-50 relative overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-64 h-64 ${selectedClass.color} opacity-[0.03] rounded-full -mr-20 -mt-20 blur-3xl`}
          ></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full ${selectedClass.color} text-white text-[10px] font-bold uppercase tracking-widest`}
                  >
                    Active Class
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    Section 04
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {selectedClass.name}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <User size={18} className={selectedClass.iconColor} />
                    <span>{selectedClass.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={16} />
                    <span>{selectedClass.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    <span>{selectedClass.room}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Current Grade
                </p>
                <p
                  className={`text-4xl font-black ${selectedClass.iconColor} tracking-tighter`}
                >
                  {selectedClass.overallGrade}
                </p>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex gap-8 mt-10">
              {["overview", "assignments", "grades", "announcements"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(
                        tab as
                          | "overview"
                          | "assignments"
                          | "grades"
                          | "announcements",
                      )
                    }
                    className={`
                    pb-4 text-sm font-bold uppercase tracking-wider transition-all relative
                    ${
                      activeTab === tab
                        ? "text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }
                  `}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full animate-in zoom-in-50 duration-300"></span>
                    )}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
          <div className="max-w-4xl">
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <TrendingUp size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                        +2.4%
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Attendance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      98.2%
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                        <ClipboardList size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                        3 active
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Assignments
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {selectedClass.assignments.length}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                        <Bell size={20} />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      New Alerts
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {displayAnnouncements.length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Term Progress
                    </h3>
                    <span className="text-sm font-bold text-blue-600">
                      {selectedClass.progress}%
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${selectedClass.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${selectedClass.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Week 1</span>
                    <span>Week 12</span>
                  </div>
                </div>

                <div className="bg-linear-to-br from-blue-600 to-purple-700 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">
                      Next Session Reminder
                    </h3>
                    <p className="opacity-90 text-sm mb-6 leading-relaxed">
                      Your next class session is scheduled for tomorrow at{" "}
                      {selectedClass.time.split(" ")[1]}. Make sure to complete
                      the{" "}
                      {selectedClass.assignments[0]?.title || "pending tasks"}{" "}
                      before then.
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
                      Open Module <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Class Assignments
                  </h3>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    View All
                  </button>
                </div>
                {selectedClass.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          assignment.status === "pending"
                            ? "bg-amber-50 text-amber-600"
                            : assignment.status === "submitted"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-green-50 text-green-600"
                        }`}
                      >
                        {assignment.status === "pending" ? (
                          <Clock size={20} />
                        ) : (
                          <CheckCircle2 size={20} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {assignment.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={14} /> Due {assignment.dueDate}
                          </span>
                          {assignment.points && (
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          )}
                          {assignment.points && (
                            <span className="font-medium text-blue-500">
                              Score: {assignment.points}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${
                        assignment.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : assignment.status === "submitted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "grades" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Academic Performance
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Historical results for this term
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Current Weighted Avg
                      </p>
                      <p className="text-4xl font-black text-blue-600 tracking-tight">
                        {selectedClass.overallGrade.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {selectedClass.grades.map((grade) => (
                      <div
                        key={grade.id}
                        className="flex justify-between items-center p-4 rounded-xl border border-gray-50 bg-gray-50/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {grade.title.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {grade.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {grade.date}
                            </p>
                          </div>
                        </div>
                        <p className="font-black text-gray-900">
                          {grade.score}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "announcements" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {displayAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 group-hover:w-3 transition-all duration-300"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {ann.title}
                      </h3>
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        {ann.date}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-2xl italic group-hover:bg-blue-50/30 transition-colors">
                      "{ann.content}"
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <span className="text-sm font-bold text-gray-700">
                          {selectedClass.teacher}
                        </span>
                      </div>
                      <button className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                        Reply <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {selectedClass.announcements.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <Bell size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">
                      No new announcements at this time.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassesPage;

import { BookOpen, Calendar, FileText, TrendingUp, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import StatCard from "../common/StatCard";
import DataTable from "../common/DataTable";
import { TodayClass, ScheduleItem, Announcement } from "../../types";

const StudentDashboard: React.FC = () => {
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);

  const recentGrades: Array<{ subject: string; assignment: string; grade: string; date: string }> = [
    {
      subject: "Biology",
      assignment: "Cell Structure Quiz",
      grade: "94%",
      date: "2024-02-15",
    },
    {
      subject: "Algebra II",
      assignment: "Quadratic Equations",
      grade: "89%",
      date: "2024-02-14",
    },
    {
      subject: "Painting",
      assignment: "Still Life Project",
      grade: "100%",
      date: "2024-02-13",
    },
    {
      subject: "American History",
      assignment: "Colonial Memo",
      grade: "92%",
      date: "2024-02-12",
    },
  ];

  const stats = [
    {
      title: "Current GPA",
      value: "3.85",
      icon: TrendingUp,
      color: "purple" as const,
      tooltip: (
        <div className="space-y-2">
          <div className="flex justify-between gap-4">
            <span className="text-xs font-bold text-gray-600">Biology</span>
            <span className="text-xs font-black text-purple-600">4.0</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs font-bold text-gray-600">Algebra II</span>
            <span className="text-xs font-black text-purple-600">3.5</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs font-bold text-gray-600">American History</span>
            <span className="text-xs font-black text-purple-600">3.8</span>
          </div>
        </div>
      )
    },
    {
      title: "Classes Today",
      value: todayClasses.length.toString(),
      icon: BookOpen,
      color: "blue" as const,
      tooltip: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-xs font-bold text-gray-600">Biology</span>
            <span className="ml-auto text-[10px] font-black text-gray-400">8:00 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-xs font-bold text-gray-600">Algebra II</span>
            <span className="ml-auto text-[10px] font-black text-gray-400">9:00 AM</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 italic">
            <span className="text-[10px]">+ 5 more periods</span>
          </div>
        </div>
      )
    },
    {
      title: "Assignments",
      value: "3",
      icon: FileText,
      color: "orange" as const,
      tooltip: (
        <div className="space-y-2">
          <div className="flex justify-between gap-4">
            <span className="text-xs font-bold text-gray-600">Chem Lab</span>
            <span className="text-[10px] font-black text-red-500">Urgent</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-xs font-bold text-gray-600">Math Set</span>
            <span className="text-[10px] font-black text-orange-500">Due Tomorrow</span>
          </div>
        </div>
      )
    },
    {
      title: "Attendance",
      value: "96.2%",
      icon: Calendar,
      color: "green" as const,
      tooltip: (
        <div className="space-y-1">
          <div className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded-lg">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Mon - Fri</span>
            <span className="text-xs font-black text-green-600">Present</span>
          </div>
          <p className="text-[9px] text-gray-400 mt-2">Consistent attendance this week! Keep it up.</p>
        </div>
      )
    },
    {
      title: "Study Streak",
      value: "12 Days",
      icon: TrendingUp,
      color: "red" as const,
      tooltip: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400">Current Week</span>
            <div className="flex gap-1">
              {[1, 1, 1, 1, 0].map((v, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${v ? 'bg-red-500' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-gray-400">You're on fire! 3 more days to beat your record.</p>
        </div>
      )
    },
  ];



  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/student/schedule?studentId=3");
        if (response.ok) {
          const data: ScheduleItem[] = await response.json();
          // Add active property based on current time
          const now = new Date();
          const currentStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          const processed: TodayClass[] = data.map((cls: ScheduleItem) => ({
            classId: cls.classId || cls.id,
            subject: cls.subject,
            room: cls.room,
            teacher: cls.teacher,
            start: cls.start,
            end: cls.end,
            time: cls.time || `${cls.start} - ${cls.end}`,
            active: currentStr >= cls.start && currentStr <= cls.end
          }));
          setTodayClasses(processed);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
    const interval = setInterval(fetchSchedule, 60000); // Check every minute for active class
    return () => clearInterval(interval);
  }, []);

  const gradeColumns = [
    { key: "subject", label: "Subject", sortable: true },
    { key: "assignment", label: "Assignment", sortable: true },
    {
      key: "grade",
      label: "Grade",
      sortable: true,
      render: (grade: unknown) => {
        const g = String(grade);
        return (
          <span
            className={`px-3 py-1 rounded-xl text-xs font-black tracking-tight ${parseFloat(g) >= 90
              ? "bg-green-100 text-green-700"
              : parseFloat(g) >= 80
                ? "bg-blue-100 text-blue-700"
                : parseFloat(g) >= 70
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {g}
          </span>
        );
      },
    },
    { key: "date", label: "Date", sortable: true },
  ];

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Enrolled class IDs for the student (Emma) - Synchronized with Schedule
  const enrolledClassIds = ["bio-101", "math-10th-a", "art-101", "hist-202", "eng-101"];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/announcements");
        if (response.ok) {
          const data: Announcement[] = await response.json();
          // Filter by enrolment
          const filtered = data.filter((ann: Announcement) => enrolledClassIds.includes(ann.classId || ""));
          setAnnouncements(filtered.slice(0, 3)); // Only show top 3 relevant ones
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
    const interval = setInterval(fetchAnnouncements, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 w-2 h-8 rounded-full"></div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Student Dashboard</h1>
          </div>
          <p className="text-gray-500 font-medium ml-5">
            Welcome back, <span className="text-blue-600 font-bold">Emma Wilson</span>! You're doing great.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-blue-600">E</div>
            <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-purple-600">W</div>
          </div>
          <div className="h-6 w-px bg-gray-100"></div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade 10</p>
            <p className="text-xs font-bold text-gray-900">Alpha Academy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Schedule Section */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-500/5 relative overflow-hidden">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
              <Calendar className="text-blue-600" size={20} />
              Schedule
            </h3>
            <div className="space-y-4">
              {todayClasses.length > 0 ? todayClasses.map((cls: TodayClass, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${cls.active ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-gray-50 border-gray-50 hover:bg-white hover:shadow-md'
                  }`}>
                  <div className={`w-12 h-12 rounded-xl font-black text-center shrink-0 flex flex-col justify-center ${cls.active ? 'bg-white text-blue-600' : 'bg-white text-gray-400 border border-gray-100'
                    }`}>
                    <p className="text-[14px] leading-none">{cls.time.split(' ')[0]}</p>
                    <p className="text-[8px] uppercase tracking-tighter mt-0.5">{cls.time.split(' ')[1]}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-black truncate ${cls.active ? 'text-white' : 'text-gray-900'}`}>
                      {cls.subject}
                    </h4>
                    <p className={`text-[9px] font-bold ${cls.active ? 'text-blue-100' : 'text-gray-400'}`}>
                      {cls.room} • {cls.teacher}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 opacity-30">
                  <p className="text-xs font-black uppercase tracking-widest italic">Loading Schedule...</p>
                </div>
              )}
            </div>
          </div>




        </div>

        <div className="lg:col-span-3 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Deadlines Section (Equal width) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Bell className="text-orange-100" size={40} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
                <TrendingUp className="text-orange-500" size={20} />
                Upcoming
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Chem Lab", due: "Tomorrow", color: "red", urgency: "Urgent" },
                  { title: "Math Set", due: "Jan 20", color: "orange", urgency: "Due Soon" },
                  { title: "History", due: "Jan 25", color: "blue", urgency: "Upcoming" }
                ].map((d, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-50 rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all">
                      <div className={`w-1 h-6 rounded-full bg-${d.color}-500 shrink-0`}></div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-[13px] mb-0.5 leading-tight truncate">{d.title}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements Section (Equal width & light mode) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"></div>
              <h3 className="text-lg font-black mb-6 text-gray-900 flex items-center gap-2 tracking-tight">
                <Bell className="text-blue-600" size={20} />
                Live Broadcast
              </h3>
              <div className="space-y-5">
                  {announcements.length > 0 ? announcements.map((ann, idx) => {
                  const sourceClass = todayClasses.find((c: TodayClass) => c.classId === ann.classId);
                  return (
                    <div key={idx} className="relative pl-6 border-l border-gray-100 group cursor-pointer hover:border-blue-600 transition-colors">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white border-2 border-blue-500 group-hover:scale-125 transition-transform"></div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{ann.date}</p>
                        {sourceClass && (
                          <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 uppercase tracking-widest border border-blue-100">
                            {sourceClass.subject}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold mb-1 text-gray-900 leading-normal group-hover:text-blue-600 transition-colors">{ann.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed opacity-70">{ann.content}</p>
                    </div>
                  );
                }) : (
                  <div className="text-center py-8 opacity-30">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Awaiting Updates</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grades Section (Full width below) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-purple-500/5 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <FileText className="text-purple-600" size={24} />
                  Performance Trends
                </h3>
                <p className="text-sm text-gray-500 font-medium tracking-tight opacity-70">Your most recent grades across topics</p>
              </div>
            </div>
            <DataTable data={recentGrades} columns={gradeColumns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

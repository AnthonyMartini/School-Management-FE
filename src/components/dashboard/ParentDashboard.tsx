import React, { useState, useEffect } from "react";
import { Users, Calendar, FileText, AlertCircle, Check } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ParentChild } from "../../types";
import StatCard from "../common/StatCard";

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [childrenData, setChildrenData] = useState<ParentChild[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>("");

  useEffect(() => {
    const fetchChildren = async () => {
      if (!user?.email) return;
      try {
        const response = await fetch(`http://localhost:5000/api/parent/children?email=${user.email}`);
        if (response.ok) {
          const data: ParentChild[] = await response.json();
          setChildrenData(data);
          if (data.length > 0) {
            setSelectedChildId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching children data:", error);
      }
    };
    fetchChildren();
  }, [user?.email]);

  const selectedChild = childrenData.find((c: ParentChild) => c.id === selectedChildId);

  const stats = [
    {
      title: "Children",
      value: childrenData.length.toString(),
      icon: Users,
      color: "blue" as const,
      tooltip: (
        <>
          {childrenData.map((c: ParentChild, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-600">{c.name}</span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{c.grade}</span>
            </div>
          ))}
        </>
      )
    },
    {
      title: "Avg. Attendance",
      value: childrenData.length > 0 ? (childrenData.reduce((acc: number, c: ParentChild) => acc + parseFloat(c.attendance), 0) / childrenData.length).toFixed(1) + "%" : "0%",
      icon: Calendar,
      color: "green" as const,
      tooltip: (
        <>
          {childrenData.map((c: ParentChild, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-600">{c.name}</span>
              <span className="text-xs font-black text-green-600">{c.attendance}</span>
            </div>
          ))}
        </>
      )
    },
    {
      title: "Avg. GPA",
      value: childrenData.length > 0 ? (childrenData.reduce((acc: number, c: ParentChild) => acc + parseFloat(c.gpa), 0) / childrenData.length).toFixed(2) : "0.00",
      icon: FileText,
      color: "purple" as const,
      tooltip: (
        <>
          {childrenData.map((c: ParentChild, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-600">{c.name}</span>
              <span className="text-xs font-black text-purple-600">{c.gpa}</span>
            </div>
          ))}
        </>
      )
    },
    {
      title: "Alerts",
      value: childrenData.reduce((acc: number, c: ParentChild) => acc + (c.alerts || 0), 0).toString(),
      icon: AlertCircle,
      color: "orange" as const,
      tooltip: (
        <>
          {childrenData.map((c: ParentChild, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-600">{c.name}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${c.alerts > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                {c.alerts} No Alerts
              </span>
            </div>
          ))}
        </>
      )
    },
  ];




  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600">
          Stay updated on your children's academic progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Student Overview - Main Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <FileText className="text-blue-600" size={24} />
                    {selectedChild ? `${selectedChild.name} Overview` : "Student Overview"}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium tracking-tight opacity-70">Academic performance and course breakdown</p>
                </div>

                {childrenData.length > 0 && (
                  <select
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
                  >
                    {childrenData.map((child: ParentChild) => (
                      <option key={child.id} value={child.id}>{child.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {selectedChild ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-6 mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <div className="text-center border-r border-blue-100 pr-6">
                      <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Attendance</p>
                      <p className="text-2xl font-black text-blue-900">{selectedChild.attendance}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Current GPA</p>
                      <p className="text-2xl font-black text-blue-900">{selectedChild.gpa}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
                      <div className={`w-2 h-2 rounded-full ${selectedChild.status === 'Good' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <span className="text-xs font-black text-gray-900 uppercase tracking-wider">{selectedChild.status}</span>
                    </div>
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedChild.classes.map((cls: { name: string; grade: string }, cidx: number) => (
                      <div key={cidx} className="bg-gray-50 p-5 rounded-2xl border border-gray-50 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all duration-300">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{cls.name}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-gray-900">{cls.grade}</span>
                            <span className="text-xs font-bold text-gray-400">Current Grade</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${parseFloat(cls.grade) >= 90 ? 'bg-green-100 text-green-700' :
                            parseFloat(cls.grade) >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                            {parseFloat(cls.grade) >= 90 ? 'Excellent' : parseFloat(cls.grade) >= 80 ? 'Good' : 'Average'}
                          </div>
                          <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${parseFloat(cls.grade) >= 90 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: cls.grade }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400 font-medium">Select a child to view details</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Alerts Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
              <AlertCircle className="text-amber-500" size={20} />
              Alerts
            </h3>
            <div className="space-y-4">
              {childrenData.some((c: ParentChild) => c.status === "Needs Attention") ? (
                childrenData.filter((c: ParentChild) => c.status === "Needs Attention").map((child: ParentChild, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl animate-in slide-in-from-right-4 duration-500">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-xs leading-none mb-1">
                        {child.name}
                      </div>
                      <p className="text-[11px] text-amber-800 font-medium leading-tight opacity-80">
                        Requires attention in current courses.
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="text-gray-300" size={24} />
                  </div>
                  <p className="text-gray-400 font-bold text-xs">All Clear</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ParentDashboard;

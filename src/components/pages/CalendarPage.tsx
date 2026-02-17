import React, { useState } from "react";
import Calendar from "../common/Calendar";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "exam" | "meeting" | "holiday";
  description?: string;
  color?: string; // Optional color for custom styling
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events: Event[] = [
    {
      id: "1",
      title: "Mathematics Exam",
      date: "2025-06-22",
      time: "9:00 AM",
      type: "exam",
      description: "Mid-term examination for 10th grade",
      color: "bg-red-300",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      date: "2025-06-22",
      time: "2:00 PM",
      type: "meeting",
      description: "Quarterly parent-teacher conference",
      color: "bg-blue-300",
    },
    {
      id: "3",
      title: "Chemistry Lab",
      date: "2025-06-22",
      time: "10:30 AM",
      type: "class",
      description: "Organic chemistry laboratory session",
      color: "bg-green-300",
    },
    {
      id: "4",
      title: "Winter Break",
      date: "2025-06-30",
      time: "All Day",
      type: "holiday",
      description: "School closed for winter break",
      color: "bg-yellow-300",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">View and manage school events</p>
        </div>
      </div>
      <div className="w-full flex ">
        <div className="flex-1">
          <Calendar
            selectedDate={currentDate}
            setSelectedDate={setCurrentDate}
            events={events}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-96">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${event.color}`}
                ></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {event.date} at {event.time}
                  </div>
                  {event.description && (
                    <div className="text-xs text-gray-400 mt-1">
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Student extends User {
  studentId: string;
  grade: string;
  class: string;
  parentId: string;
  enrollmentDate: string;
  subjects: string[];
  attendance: AttendanceRecord[];
  grades: Grade[];
}

export interface Teacher extends User {
  teacherId: string;
  subjects: string[];
  classes: string[];
  hireDate: string;
  qualification: string;
}

export interface Parent extends User {
  children: string[];
}

export interface ParentLink {
  id?: string;
  studentId: string;
  parentEmail: string;
  nickname?: string;
  createdAt: string;
}

export interface ChildClass {
  name: string;
  grade: string; // e.g. "85%"
}

export interface ParentChild {
  id: string;
  name: string;
  grade?: string;
  attendance: string; // percent or numeric string
  gpa: string; // numeric string
  status: 'Good' | 'Needs Attention' | string;
  classes: ChildClass[];
  alerts?: number;
}

export interface TodayClass {
  classId?: string;
  subject: string;
  room: string;
  teacher: string;
  start: string; // "08:00"
  end: string; // "09:00"
  time: string; // "8:00 AM"
  active?: boolean;
}

export interface ScheduleItem {
  id?: string;
  classId?: string;
  subject: string;
  room: string;
  teacher: string;
  start: string;
  end: string;
  time?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // ISO date string: YYYY-MM-DD
  title: string;
  color?: string; // tailwind classes like 'bg-blue-100'
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  students: string[];
  schedule: ClassSchedule[];
  subject: string;
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

export interface Grade {
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  date: string;
  feedback?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: string[];
}
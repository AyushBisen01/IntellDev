'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import * as echarts from 'echarts';
import { Bell, Search, Filter, Plus, FileDown, MoreHorizontal, Mail, ListChecks, CalendarPlus, MessageCircle, Eye, History, Calendar, FileText, CheckCircle, Video, Trash2, Edit, ChevronUp, ChevronDown, LogOut, MoreVertical, Phone, ChevronLeft, Gauge, Users, Settings, Clock } from "lucide-react";
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isStudentProfileOpen, setIsStudentProfileOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const performanceChartRef = useRef<HTMLDivElement>(null);
  const courseProgressChartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (studentId: string) => {
    if (selectedRows.includes(studentId)) {
      setSelectedRows(selectedRows.filter(id => id !== studentId));
    } else {
      setSelectedRows([...selectedRows, studentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === students.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(students.map(student => student.id));
    }
  };

  const openStudentProfile = (student: any) => {
    setSelectedStudent(student);
    setIsStudentProfileOpen(true);
  };

  const students = [
    {
      id: "s1",
      name: "Emily Johnson",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520female%2520student%2520with%2520blonde%2520hair%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student1&orientation=squarish",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 123-4567",
      program: "Web Development",
      status: "Active",
      progress: 78,
      enrolledCourses: ["HTML & CSS", "JavaScript Fundamentals", "React Basics"],
      performance: {
        assignments: 92,
        projects: 85,
        quizzes: 88,
        attendance: 95
      },
      lastActive: "Today, 10:30 AM",
      joinDate: "Jan 15, 2025"
    },
    {
      id: "s2",
      name: "Michael Chen",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520asian%2520male%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student2&orientation=squarish",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      program: "Data Science",
      status: "Active",
      progress: 65,
      enrolledCourses: ["Python Programming", "Data Analysis", "Machine Learning"],
      performance: {
        assignments: 78,
        projects: 82,
        quizzes: 75,
        attendance: 90
      },
      lastActive: "Yesterday, 3:45 PM",
      joinDate: "Feb 3, 2025"
    },
    {
      id: "s3",
      name: "Sophia Rodriguez",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520hispanic%2520female%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student3&orientation=squarish",
      email: "sophia.rodriguez@example.com",
      phone: "+1 (555) 345-6789",
      program: "Mobile App Development",
      status: "Active",
      progress: 92,
      enrolledCourses: ["Swift Programming", "iOS Development", "App Design"],
      performance: {
        assignments: 95,
        projects: 90,
        quizzes: 92,
        attendance: 98
      },
      lastActive: "Today, 9:15 AM",
      joinDate: "Dec 10, 2024"
    },
    {
      id: "s4",
      name: "David Kim",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520asian%2520male%2520student%2520with%2520glasses%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student4&orientation=squarish",
      email: "david.kim@example.com",
      phone: "+1 (555) 456-7890",
      program: "AI & Machine Learning",
      status: "On Leave",
      progress: 45,
      enrolledCourses: ["Neural Networks", "Deep Learning", "Computer Vision"],
      performance: {
        assignments: 65,
        projects: 70,
        quizzes: 68,
        attendance: 75
      },
      lastActive: "3 days ago",
      joinDate: "Mar 22, 2025"
    },
    {
      id: "s5",
      name: "Olivia Williams",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520african%2520american%2520female%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student5&orientation=squarish",
      email: "olivia.williams@example.com",
      phone: "+1 (555) 567-8901",
      program: "UI/UX Design",
      status: "Active",
      progress: 83,
      enrolledCourses: ["User Interface Design", "User Experience Principles", "Prototyping"],
      performance: {
        assignments: 88,
        projects: 92,
        quizzes: 85,
        attendance: 92
      },
      lastActive: "Today, 11:45 AM",
      joinDate: "Feb 15, 2025"
    },
    {
      id: "s6",
      name: "James Wilson",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520caucasian%2520male%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student6&orientation=squarish",
      email: "james.wilson@example.com",
      phone: "+1 (555) 678-9012",
      program: "Cybersecurity",
      status: "Inactive",
      progress: 30,
      enrolledCourses: ["Network Security", "Ethical Hacking", "Cryptography"],
      performance: {
        assignments: 45,
        projects: 50,
        quizzes: 42,
        attendance: 60
      },
      lastActive: "2 weeks ago",
      joinDate: "Jan 5, 2025"
    },
    {
      id: "s7",
      name: "Ava Martinez",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520hispanic%2520female%2520student%2520with%2520dark%2520hair%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student7&orientation=squarish",
      email: "ava.martinez@example.com",
      phone: "+1 (555) 789-0123",
      program: "Full Stack Development",
      status: "Active",
      progress: 75,
      enrolledCourses: ["MERN Stack", "Database Design", "API Development"],
      performance: {
        assignments: 82,
        projects: 78,
        quizzes: 80,
        attendance: 88
      },
      lastActive: "Yesterday, 2:30 PM",
      joinDate: "Apr 10, 2025"
    },
    {
      id: "s8",
      name: "Ethan Thompson",
      avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520african%2520american%2520male%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student8&orientation=squarish",
      email: "ethan.thompson@example.com",
      phone: "+1 (555) 890-1234",
      program: "Game Development",
      status: "Active",
      progress: 88,
      enrolledCourses: ["Unity 3D", "Game Design", "3D Modeling"],
      performance: {
        assignments: 90,
        projects: 95,
        quizzes: 85,
        attendance: 92
      },
      lastActive: "Today, 8:45 AM",
      joinDate: "Mar 1, 2025"
    }
  ];

  useEffect(() => {
    if (isStudentProfileOpen && selectedStudent && performanceChartRef.current) {
      const chart = echarts.init(performanceChartRef.current);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: 'Assignments', max: 100 },
            { name: 'Projects', max: 100 },
            { name: 'Quizzes', max: 100 },
            { name: 'Attendance', max: 100 }
          ]
        },
        series: [{
          name: 'Performance Metrics',
          type: 'radar',
          data: [
            {
              value: [
                selectedStudent.performance.assignments,
                selectedStudent.performance.projects,
                selectedStudent.performance.quizzes,
                selectedStudent.performance.attendance
              ],
              name: 'Current Performance',
              areaStyle: {
                color: 'rgba(79, 70, 229, 0.2)'
              },
              lineStyle: {
                color: 'rgba(79, 70, 229, 1)'
              }
            },
            {
              value: [80, 80, 80, 80],
              name: 'Class Average',
              lineStyle: {
                color: 'rgba(156, 163, 175, 1)'
              },
              areaStyle: {
                color: 'rgba(156, 163, 175, 0.2)'
              }
            }
          ]
        }]
      };
      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isStudentProfileOpen, selectedStudent]);

  useEffect(() => {
    if (isStudentProfileOpen && selectedStudent && courseProgressChartRef.current) {
      const chart = echarts.init(courseProgressChartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          max: 100
        },
        yAxis: {
          type: 'category',
          data: selectedStudent.enrolledCourses
        },
        series: [
          {
            name: 'Progress',
            type: 'bar',
            data: selectedStudent.enrolledCourses.map(() => 80),
            itemStyle: {
              color: function(params: any) {
                const value = params.value;
                if (value >= 90) return '#10B981';
                if (value >= 75) return '#3B82F6';
                if (value >= 60) return '#F59E0B';
                return '#EF4444';
              }
            }
          }
        ]
      };
      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isStudentProfileOpen, selectedStudent]);

  const filteredStudents = students.filter(student => {
    if (selectedTab !== "all" && student.status.toLowerCase() !== selectedTab) {
      return false;
    }
    
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !student.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !student.program.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue, bValue;
    
    switch(sortConfig.key) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'program':
        aValue = a.program;
        bValue = b.program;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'progress':
        aValue = a.progress;
        bValue = b.progress;
        break;
      case 'lastActive':
        aValue = a.lastActive;
        bValue = b.lastActive;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <span className="text-xl font-bold text-indigo-600">MentorHub</span>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <ChevronLeft className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520mentor%252C%2520male%252C%252040s%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520professional%2520attire%252C%2520neutral%2520background%252C%2520photorealistic&width=100&height=100&seq=avatar1&orientation=squarish" alt="Mentor" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Dr. James Davis</p>
                  <p className="text-xs text-gray-500">Senior Mentor</p>
                </div>
              )}
            </div>
          </div>
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              <li>
                <a 
                  href="/Mentor_dashboard" 
                  data-readdy="true"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer"
                >
                  <Gauge className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 group cursor-pointer">
                  <Users className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3 font-medium">Students</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <Calendar className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Schedule</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <MessageCircle className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Messages</span>}
                </a>
              </li>
              <li>
                <a href="/Task" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <ListChecks className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Tasks</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <Video className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Video Conferences</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <Settings className="text-indigo-600" />
                  {!sidebarCollapsed && <span className="ml-3">Settings</span>}
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full flex items-center justify-center !rounded-button whitespace-nowrap" onClick={() => router.push('/')}>
              <LogOut />
              {!sidebarCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="!rounded-button whitespace-nowrap">
                  <Filter className="mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setSelectedTab("all")}>
                  All Students
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTab("active")}>
                  Active Students
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTab("inactive")}>
                  Inactive Students
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTab("on leave")}>
                  On Leave
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
              <DialogTrigger asChild>
                <Button className="!rounded-button whitespace-nowrap">
                  <Plus className="mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[1000px] h-[1000px] max-w-full max-h-[90vh] aspect-square overflow-auto p-6">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student's information below to add them to your roster.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter first name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="program">Program</Label>
                    <Select>
                      <SelectTrigger id="program">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-dev">Web Development</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="mobile-dev">Mobile App Development</SelectItem>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="full-stack">Full Stack Development</SelectItem>
                        <SelectItem value="game-dev">Game Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="courses">Assign Courses</Label>
                    <Select>
                      <SelectTrigger id="courses">
                        <SelectValue placeholder="Select courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html-css">HTML & CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript Fundamentals</SelectItem>
                        <SelectItem value="react">React Basics</SelectItem>
                        <SelectItem value="python">Python Programming</SelectItem>
                        <SelectItem value="data-analysis">Data Analysis</SelectItem>
                        <SelectItem value="machine-learning">Machine Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Enter any additional information about the student" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddStudentOpen(false)} className="!rounded-button whitespace-nowrap">
                    Cancel
                  </Button>
                  <Button type="submit" className="!rounded-button whitespace-nowrap">
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="relative">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
                <Bell />
              </button>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Student Overview</h2>
                <p className="text-sm text-gray-500">Manage and track all your students in one place</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="!rounded-button whitespace-nowrap">
                  <FileDown className="mr-2" />
                  Export
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="!rounded-button whitespace-nowrap">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="mr-2" />
                      Bulk Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ListChecks className="mr-2" />
                      Assign Tasks
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CalendarPlus className="mr-2" />
                      Schedule Sessions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-4">
              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Students ({students.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({students.filter(s => s.status.toLowerCase() === 'active').length})</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive ({students.filter(s => s.status.toLowerCase() === 'inactive').length})</TabsTrigger>
                  <TabsTrigger value="on leave">On Leave ({students.filter(s => s.status.toLowerCase() === 'on leave').length})</TabsTrigger>
                </TabsList>
                <TabsContent value={selectedTab}>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedRows.length === paginatedStudents.length && paginatedStudents.length > 0} 
                              onCheckedChange={handleSelectAll} 
                            />
                          </TableHead>
                          <TableHead className="w-64">
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                              Student
                              {sortConfig?.key === 'name' && (
                                sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 text-xs" /> : <ChevronDown className="ml-1 text-xs" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort('program')}>
                              Program
                              {sortConfig?.key === 'program' && (
                                sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 text-xs" /> : <ChevronDown className="ml-1 text-xs" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort('status')}>
                              Status
                              {sortConfig?.key === 'status' && (
                                sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 text-xs" /> : <ChevronDown className="ml-1 text-xs" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort('progress')}>
                              Progress
                              {sortConfig?.key === 'progress' && (
                                sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 text-xs" /> : <ChevronDown className="ml-1 text-xs" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => handleSort('lastActive')}>
                              Last Active
                              {sortConfig?.key === 'lastActive' && (
                                sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 text-xs" /> : <ChevronDown className="ml-1 text-xs" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedStudents.length > 0 ? (
                          paginatedStudents.map((student) => (
                            <TableRow key={student.id} className="cursor-pointer hover:bg-gray-50" onClick={() => openStudentProfile(student)}>
                              <TableCell onClick={(e) => { e.stopPropagation(); handleRowSelect(student.id); }}>
                                <Checkbox checked={selectedRows.includes(student.id)} />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-10 w-10 mr-3">
                                    <AvatarImage src={student.avatar} alt={student.name} />
                                    <AvatarFallback>{student.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-xs text-gray-500">ID: {student.id}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{student.program}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="text-sm">{student.email}</p>
                                  <p className="text-xs text-gray-500">{student.phone}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`
                                  ${student.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                                    student.status === 'Inactive' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                                    'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'}
                                `}>
                                  {student.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium">{student.progress}%</span>
                                  </div>
                                  <Progress 
                                    value={student.progress} 
                                    className={`h-2 ${student.progress >= 80 ? 'bg-green-500' : student.progress >= 60 ? 'bg-blue-500' : student.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className={`h-2 w-2 rounded-full mr-2 ${
                                    student.lastActive.includes('Today') ? 'bg-green-500' : 
                                    student.lastActive.includes('Yesterday') ? 'bg-blue-500' : 
                                    'bg-gray-400'
                                  }`}></div>
                                  <span className="text-sm">{student.lastActive}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
                                    <MessageCircle className="text-indigo-600" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
                                    <ListChecks className="text-indigo-600" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
                                        <MoreVertical className="text-gray-600" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Calendar className="mr-2" />
                                        Schedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <FileText className="mr-2" />
                                        View Report
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2" />
                                        Remove
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              <div className="flex flex-col items-center">
                                <i className="fas fa-search text-gray-400 text-4xl mb-3"></i>
                                <p className="text-gray-500 font-medium">No students found</p>
                                <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      Showing {paginatedStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, sortedStudents.length)} of {sortedStudents.length} students
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="!rounded-button whitespace-nowrap"
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="!rounded-button whitespace-nowrap"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Student Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520female%2520student%2520with%2520blonde%2520hair%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student1&orientation=squarish" alt="Emily Johnson" />
                        <AvatarFallback>EJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <p className="font-medium">Emily Johnson</p>
                            <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                          </div>
                          <p className="text-sm mt-1">Submitted the final project for JavaScript Fundamentals course.</p>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <Eye className="mr-1" /> View
                          </Button>
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <MessageCircle className="mr-1" /> Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520asian%2520male%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student2&orientation=squarish" alt="Michael Chen" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <p className="font-medium">Michael Chen</p>
                            <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                          </div>
                          <p className="text-sm mt-1">Completed Quiz 3 in Data Analysis with a score of 92%.</p>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <Eye className="mr-1" /> View Results
                          </Button>
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <MessageCircle className="mr-1" /> Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520hispanic%2520female%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student3&orientation=squarish" alt="Sophia Rodriguez" />
                        <AvatarFallback>SR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <p className="font-medium">Sophia Rodriguez</p>
                            <p className="text-xs text-gray-500">Today, 9:15 AM</p>
                          </div>
                          <p className="text-sm mt-1">Requested feedback on the iOS app prototype for the App Design course.</p>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <Eye className="mr-1" /> View Request
                          </Button>
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <MessageCircle className="mr-1" /> Respond
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520african%2520american%2520male%2520student%252C%2520smiling%252C%2520clean%2520background%252C%2520high%2520quality%2520portrait%252C%2520professional%2520lighting%252C%2520detailed%2520facial%2520features&width=100&height=100&seq=student8&orientation=squarish" alt="Ethan Thompson" />
                        <AvatarFallback>ET</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <p className="font-medium">Ethan Thompson</p>
                            <p className="text-xs text-gray-500">Today, 8:45 AM</p>
                          </div>
                          <p className="text-sm mt-1">Submitted a 3D model for the Game Development course project.</p>
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <Eye className="mr-1" /> View Submission
                          </Button>
                          <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                            <MessageCircle className="mr-1" /> Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                  <History className="mr-2" />
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Student Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Project Review</p>
                          <p className="text-sm text-gray-500">Emily Johnson</p>
                        </div>
                        <Badge className="bg-indigo-500 hover:bg-indigo-600">Today</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <i className="fas fa-clock mr-2"></i>
                        <span>2:00 PM - 3:00 PM</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <i className="fas fa-video mr-2"></i>
                        <span>Video Conference</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Code Review</p>
                          <p className="text-sm text-gray-500">Michael Chen</p>
                        </div>
                        <Badge className="bg-gray-500 hover:bg-gray-600">Tomorrow</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <i className="fas fa-clock mr-2"></i>
                        <span>10:00 AM - 11:00 AM</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <i className="fas fa-video mr-2"></i>
                        <span>Video Conference</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Progress Check</p>
                          <p className="text-sm text-gray-500">Sophia Rodriguez</p>
                        </div>
                        <Badge className="bg-gray-500 hover:bg-gray-600">Tomorrow</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <i className="fas fa-clock mr-2"></i>
                        <span>3:30 PM - 4:30 PM</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <i className="fas fa-video mr-2"></i>
                        <span>Video Conference</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Project Kickoff</p>
                          <p className="text-sm text-gray-500">Ethan Thompson</p>
                        </div>
                        <Badge className="bg-gray-500 hover:bg-gray-600">Jul 1</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <i className="fas fa-clock mr-2"></i>
                        <span>1:00 PM - 2:00 PM</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <i className="fas fa-video mr-2"></i>
                        <span>Video Conference</span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                  <Calendar className="mr-2" />
                  View Full Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>

      {/* Student Profile Dialog */}
      <Dialog open={isStudentProfileOpen} onOpenChange={setIsStudentProfileOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl">{selectedStudent.name}</DialogTitle>
                    <DialogDescription className="text-base">{selectedStudent.program} • Joined {selectedStudent.joinDate}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="text-gray-500 w-6" />
                          <span className="ml-2">{selectedStudent.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="text-gray-500 w-6" />
                          <span className="ml-2">{selectedStudent.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="text-gray-500 w-6" />
                          <span className="ml-2">Last Active: {selectedStudent.lastActive}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="text-gray-500 w-6" />
                          <span className="ml-2">Joined: {selectedStudent.joinDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Enrolled Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedStudent.enrolledCourses.map((course: string, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span>{course}</span>
                            <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                              In Progress
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i>
                        Add Course
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">
                          <MessageCircle className="mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">
                          <Video className="mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">
                          <ListChecks className="mr-2" />
                          Assign Task
                        </Button>
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">
                          <CalendarPlus className="mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Overall Progress</p>
                          <div className="flex items-center mt-1">
                            <span className="text-2xl font-bold">{selectedStudent.progress}%</span>
                            <Progress value={selectedStudent.progress} className="h-2 ml-3 flex-1" />
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Attendance Rate</p>
                          <div className="flex items-center mt-1">
                            <span className="text-2xl font-bold">{selectedStudent.performance.attendance}%</span>
                            <Progress value={selectedStudent.performance.attendance} className="h-2 ml-3 flex-1" />
                          </div>
                        </div>
                      </div>
                      <div ref={performanceChartRef} style={{ height: '250px' }}></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div ref={courseProgressChartRef} style={{ height: '200px' }}></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Recent Activities</CardTitle>
                      <Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <i className="fas fa-file-alt"></i>
                          </div>
                          <div>
                            <p className="font-medium">Submitted Assignment</p>
                            <p className="text-sm text-gray-500">JavaScript Functions - Module 3</p>
                            <p className="text-xs text-gray-400 mt-1">Today, 10:30 AM</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <div>
                            <p className="font-medium">Completed Quiz</p>
                            <p className="text-sm text-gray-500">React Components - Score: 92%</p>
                            <p className="text-xs text-gray-400 mt-1">Yesterday, 3:45 PM</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <i className="fas fa-comment"></i>
                          </div>
                          <div>
                            <p className="font-medium">Discussion Participation</p>
                            <p className="text-sm text-gray-500">Responsive Design Best Practices</p>
                            <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsStudentProfileOpen(false)} className="!rounded-button whitespace-nowrap">
                  Close
                </Button>
                <Button className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-file-alt mr-2"></i>
                  Generate Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;

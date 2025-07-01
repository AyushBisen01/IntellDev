'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleTaskSelection = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
    setSelectAll(!selectAll);
  };

  const openTaskDetail = (task: any) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const openEditTask = (task: any) => {
    setSelectedTask(task);
    setIsEditTaskOpen(true);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewTaskOpen(false);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditTaskOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    // Handle task deletion logic here
    console.log(`Deleting task: ${taskId}`);
  };

  const tasks = [
    {
      id: "task1",
      title: "Complete React Frontend Project",
      description: "Finish implementing the dashboard components and ensure responsive design across all device sizes.",
      assignee: {
        name: "Emily Johnson",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520female%2520student%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student1&orientation=squarish"
      },
      dueDate: "2025-07-05",
      priority: "high",
      status: "in-progress",
      type: "project",
      progress: 65,
      comments: [
        {
          author: "Dr. James Davis",
          text: "Looking good so far. Make sure to optimize the performance.",
          date: "2025-06-28"
        }
      ],
      attachments: [
        { name: "project-specs.pdf", size: "2.4 MB" },
        { name: "wireframes.fig", size: "5.1 MB" }
      ]
    },
    {
      id: "task2",
      title: "Data Visualization Assignment",
      description: "Create interactive charts using D3.js to visualize the provided dataset.",
      assignee: {
        name: "Michael Chen",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520male%2520student%252C%2520asian%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student2&orientation=squarish"
      },
      dueDate: "2025-07-10",
      priority: "medium",
      status: "pending",
      type: "assignment",
      progress: 25,
      comments: [],
      attachments: [
        { name: "dataset.csv", size: "1.2 MB" }
      ]
    },
    {
      id: "task3",
      title: "Mobile App UI Design Review",
      description: "Review the UI design for the fitness tracking app and provide feedback on usability and accessibility.",
      assignee: {
        name: "Sophia Rodriguez",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520female%2520student%252C%2520hispanic%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student3&orientation=squarish"
      },
      dueDate: "2025-07-02",
      priority: "high",
      status: "completed",
      type: "review",
      progress: 100,
      comments: [
        {
          author: "Sophia Rodriguez",
          text: "I've completed the review and implemented the suggested changes.",
          date: "2025-06-27"
        }
      ],
      attachments: [
        { name: "ui-designs.sketch", size: "8.7 MB" },
        { name: "feedback.docx", size: "1.5 MB" }
      ]
    },
    {
      id: "task4",
      title: "Machine Learning Quiz",
      description: "Complete the quiz on neural networks and deep learning concepts.",
      assignee: {
        name: "David Kim",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520male%2520student%252C%2520asian%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student4&orientation=squarish"
      },
      dueDate: "2025-07-01",
      priority: "low",
      status: "pending",
      type: "quiz",
      progress: 0,
      comments: [],
      attachments: []
    },
    {
      id: "task5",
      title: "Database Design Project",
      description: "Design and implement a relational database for the e-commerce application.",
      assignee: {
        name: "Olivia Williams",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520female%2520student%252C%2520african%2520american%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student5&orientation=squarish"
      },
      dueDate: "2025-07-15",
      priority: "medium",
      status: "in-progress",
      type: "project",
      progress: 40,
      comments: [
        {
          author: "Dr. James Davis",
          text: "Remember to include proper indexing for performance optimization.",
          date: "2025-06-25"
        }
      ],
      attachments: [
        { name: "schema-diagram.pdf", size: "3.2 MB" }
      ]
    },
    {
      id: "task6",
      title: "API Integration Assignment",
      description: "Integrate the payment gateway API with the web application.",
      assignee: {
        name: "Emily Johnson",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520female%2520student%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student1&orientation=squarish"
      },
      dueDate: "2025-07-08",
      priority: "high",
      status: "pending",
      type: "assignment",
      progress: 10,
      comments: [],
      attachments: [
        { name: "api-docs.pdf", size: "4.5 MB" }
      ]
    },
    {
      id: "task7",
      title: "Code Review: Authentication Module",
      description: "Review the authentication module code for security vulnerabilities and best practices.",
      assignee: {
        name: "Michael Chen",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520male%2520student%252C%2520asian%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student2&orientation=squarish"
      },
      dueDate: "2025-06-30",
      priority: "high",
      status: "in-progress",
      type: "review",
      progress: 50,
      comments: [
        {
          author: "Michael Chen",
          text: "I've identified some potential security issues in the password reset flow.",
          date: "2025-06-28"
        }
      ],
      attachments: []
    },
    {
      id: "task8",
      title: "Cloud Deployment Quiz",
      description: "Complete the quiz on AWS services and deployment strategies.",
      assignee: {
        name: "David Kim",
        avatar: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520male%2520student%252C%2520asian%2520ethnicity%252C%2520young%2520adult%252C%2520friendly%2520face%252C%2520high%2520quality%2520portrait%252C%2520casual%2520attire%252C%2520neutral%2520background%252C%2520photorealistic%252C%2520professional%2520lighting&width=100&height=100&seq=student4&orientation=squarish"
      },
      dueDate: "2025-07-12",
      priority: "low",
      status: "pending",
      type: "quiz",
      progress: 0,
      comments: [],
      attachments: []
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    const matchesAssignee = assigneeFilter === "all" || task.assignee.name === assigneeFilter;
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesType && matchesAssignee && matchesSearch;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "assignment":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Assignment</Badge>;
      case "project":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Project</Badge>;
      case "quiz":
        return <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">Quiz</Badge>;
      case "review":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Review</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
                <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-500`}></i>
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
                <a href="/Mentor_dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-tachometer-alt text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li>
                <a href="/Student" data-readdy="true" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-users text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Students</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-calendar-alt text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Schedule</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-comments text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Messages</span>}
                </a>
              </li>
              <li>
                <a href="/Task" data-readdy="true" className="flex items-center p-2 bg-indigo-100 text-indigo-700 rounded-lg group cursor-pointer">
                  <i className="fas fa-tasks text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Tasks</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-video text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Video Conferences</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
                  <i className="fas fa-cog text-indigo-600"></i>
                  {!sidebarCollapsed && <span className="ml-3">Settings</span>}
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full flex items-center justify-center !rounded-button whitespace-nowrap" onClick={() => router.push('/auth')}>
              <i className="fas fa-sign-out-alt"></i>
              {!sidebarCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center text-sm text-gray-500">
              <a href="/Mentor_dashboard" data-readdy="true" className="hover:text-indigo-600 cursor-pointer">Dashboard</a>
              <i className="fas fa-chevron-right mx-2 text-xs"></i>
              <span className="text-indigo-600 font-medium">Tasks</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
            <div className="relative">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
                <Bell className="w-5 h-5 text-gray-500" />
              </button>
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
            </div>
            <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-plus mr-2"></i>
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[1000px] h-[1000px] max-w-full max-h-[90vh] aspect-square overflow-auto p-6">
                <form onSubmit={handleCreateTask}>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add a new task for your students. Fill in all the required information below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input id="task-title" placeholder="Enter task title" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-description">Description</Label>
                      <Textarea
                        id="task-description"
                        placeholder="Enter task description"
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="task-due-date">Due Date</Label>
                        <Input id="task-due-date" type="date" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="task-priority">Priority</Label>
                        <Select required>
                          <SelectTrigger id="task-priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-assignee">Assignee</Label>
                      <Select required>
                        <SelectTrigger id="task-assignee">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emily">Emily Johnson</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="sophia">Sophia Rodriguez</SelectItem>
                          <SelectItem value="david">David Kim</SelectItem>
                          <SelectItem value="olivia">Olivia Williams</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-type">Task Type</Label>
                      <Select required>
                        <SelectTrigger id="task-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="review">Code Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsNewTaskOpen(false)} className="!rounded-button whitespace-nowrap">
                      Cancel
                    </Button>
                    <Button type="submit" className="!rounded-button whitespace-nowrap">
                      Create Task
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Tasks Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Student Tasks</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="!rounded-button whitespace-nowrap">
                <i className="fas fa-file-export mr-2"></i>
                Export
              </Button>
              <Button variant="outline" className="!rounded-button whitespace-nowrap">
                <i className="fas fa-print mr-2"></i>
                Print
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="status-filter" className="mb-2 block text-sm">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority-filter" className="mb-2 block text-sm">Priority</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger id="priority-filter">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type-filter" className="mb-2 block text-sm">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type-filter">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignee-filter" className="mb-2 block text-sm">Assignee</Label>
                  <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                    <SelectTrigger id="assignee-filter">
                      <SelectValue placeholder="Filter by assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      <SelectItem value="Emily Johnson">Emily Johnson</SelectItem>
                      <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                      <SelectItem value="Sophia Rodriguez">Sophia Rodriguez</SelectItem>
                      <SelectItem value="David Kim">David Kim</SelectItem>
                      <SelectItem value="Olivia Williams">Olivia Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-filter" className="mb-2 block text-sm">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {formatDate(dateRange.from.toISOString())} - {formatDate(dateRange.to.toISOString())}
                            </>
                          ) : (
                            formatDate(dateRange.from.toISOString())
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => setDateRange(range as { from: Date | undefined; to: Date | undefined })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="bg-indigo-50 p-4 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-medium text-indigo-700 mr-2">{selectedTasks.length} tasks selected</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTasks([])} className="text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100 !rounded-button whitespace-nowrap">
                  Clear selection
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-white !rounded-button whitespace-nowrap">
                  <i className="fas fa-tag mr-2"></i>
                  Change Status
                </Button>
                <Button variant="outline" size="sm" className="bg-white !rounded-button whitespace-nowrap">
                  <i className="fas fa-user-tag mr-2"></i>
                  Reassign
                </Button>
                <Button variant="destructive" size="sm" className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-trash-alt mr-2"></i>
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Tasks Table */}
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>All Tasks</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 !rounded-button whitespace-nowrap">
                    <i className="fas fa-sort mr-2"></i>
                    Sort
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-500 !rounded-button whitespace-nowrap">
                        <i className="fas fa-columns mr-2"></i>
                        Columns
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-title" className="mr-2" defaultChecked />
                        <label htmlFor="column-title" className="cursor-pointer">Title</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-assignee" className="mr-2" defaultChecked />
                        <label htmlFor="column-assignee" className="cursor-pointer">Assignee</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-due-date" className="mr-2" defaultChecked />
                        <label htmlFor="column-due-date" className="cursor-pointer">Due Date</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-priority" className="mr-2" defaultChecked />
                        <label htmlFor="column-priority" className="cursor-pointer">Priority</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-status" className="mr-2" defaultChecked />
                        <label htmlFor="column-status" className="cursor-pointer">Status</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-type" className="mr-2" defaultChecked />
                        <label htmlFor="column-type" className="cursor-pointer">Type</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Checkbox id="column-progress" className="mr-2" defaultChecked />
                        <label htmlFor="column-progress" className="cursor-pointer">Progress</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox 
                        checked={selectAll} 
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <i className="fas fa-tasks text-gray-300 text-5xl mb-4"></i>
                          <p className="text-gray-500 text-lg">No tasks found matching your filters</p>
                          <Button 
                            variant="outline" 
                            className="mt-4 !rounded-button whitespace-nowrap"
                            onClick={() => {
                              setStatusFilter("all");
                              setPriorityFilter("all");
                              setTypeFilter("all");
                              setAssigneeFilter("all");
                              setSearchQuery("");
                              setDateRange({ from: undefined, to: undefined });
                            }}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedTasks.includes(task.id)} 
                            onCheckedChange={() => handleTaskSelection(task.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium cursor-pointer hover:text-indigo-600" onClick={() => openTaskDetail(task)}>
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[250px]">
                            {task.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                              <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`text-sm ${new Date(task.dueDate) < new Date() && task.status !== "completed" ? "text-red-600 font-medium" : ""}`}>
                            {formatDate(task.dueDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(task.priority)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(task.status)}
                        </TableCell>
                        <TableCell>
                          {getTypeBadge(task.type)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={task.progress} className="w-20 h-2" />
                            <span className="text-sm text-gray-500">{task.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => openTaskDetail(task)} className="h-8 w-8 !rounded-button whitespace-nowrap">
                              <i className="fas fa-eye text-gray-500"></i>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openEditTask(task)} className="h-8 w-8 !rounded-button whitespace-nowrap">
                              <i className="fas fa-edit text-gray-500"></i>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)} className="h-8 w-8 !rounded-button whitespace-nowrap">
                              <i className="fas fa-trash-alt text-gray-500"></i>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-chevron-left mr-1"></i>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                  Next
                  <i className="fas fa-chevron-right ml-1"></i>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>

        {/* Task Detail Dialog */}
        {selectedTask && (
          <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedTask.title}</DialogTitle>
                  <div className="flex space-x-2">
                    {getTypeBadge(selectedTask.type)}
                    {getStatusBadge(selectedTask.status)}
                  </div>
                </div>
                <DialogDescription>
                  Task details and progress tracking
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label className="text-sm text-gray-500">Description</Label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    {selectedTask.description}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm text-gray-500">Assignee</Label>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedTask.assignee.avatar} alt={selectedTask.assignee.name} />
                        <AvatarFallback>{selectedTask.assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{selectedTask.assignee.name}</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm text-gray-500">Due Date</Label>
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt mr-2 text-gray-400"></i>
                      <span>{formatDate(selectedTask.dueDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-sm text-gray-500">Priority</Label>
                    <div>
                      {getPriorityBadge(selectedTask.priority)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm text-gray-500">Progress</Label>
                    <div className="flex items-center space-x-2">
                      <Progress value={selectedTask.progress} className="flex-1 h-2" />
                      <span className="text-sm">{selectedTask.progress}%</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <Label className="text-sm text-gray-500">Attachments</Label>
                  {selectedTask.attachments.length === 0 ? (
                    <div className="text-sm text-gray-500">No attachments</div>
                  ) : (
                    <div className="space-y-2">
                      {selectedTask.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <i className="fas fa-file-alt mr-2 text-indigo-500"></i>
                            <span className="text-sm">{attachment.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{attachment.size}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 !rounded-button whitespace-nowrap">
                              <i className="fas fa-download text-gray-500"></i>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="grid gap-2">
                  <Label className="text-sm text-gray-500">Comments</Label>
                  {selectedTask.comments.length === 0 ? (
                    <div className="text-sm text-gray-500">No comments yet</div>
                  ) : (
                    <ScrollArea className="h-[150px]">
                      <div className="space-y-3">
                        {selectedTask.comments.map((comment: any, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-sm">{comment.author}</div>
                              <div className="text-xs text-gray-500">{comment.date}</div>
                            </div>
                            <div className="text-sm">{comment.text}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Input placeholder="Add a comment..." className="text-sm" />
                    <Button size="sm" className="!rounded-button whitespace-nowrap">
                      <i className="fas fa-paper-plane mr-1"></i>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => openEditTask(selectedTask)} className="!rounded-button whitespace-nowrap">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Task
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsTaskDetailOpen(false)} className="!rounded-button whitespace-nowrap">
                      Close
                    </Button>
                    {selectedTask.status !== "completed" && (
                      <Button className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap">
                        <i className="fas fa-check mr-2"></i>
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Task Dialog */}
        {selectedTask && (
          <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleUpdateTask}>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>
                    Update the task details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-title">Task Title</Label>
                    <Input id="edit-task-title" defaultValue={selectedTask.title} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-description">Description</Label>
                    <Textarea
                      id="edit-task-description"
                      defaultValue={selectedTask.description}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-task-due-date">Due Date</Label>
                      <Input id="edit-task-due-date" type="date" defaultValue={selectedTask.dueDate} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-task-priority">Priority</Label>
                      <Select defaultValue={selectedTask.priority} required>
                        <SelectTrigger id="edit-task-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-assignee">Assignee</Label>
                    <Select defaultValue={selectedTask.assignee.name} required>
                      <SelectTrigger id="edit-task-assignee">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emily Johnson">Emily Johnson</SelectItem>
                        <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                        <SelectItem value="Sophia Rodriguez">Sophia Rodriguez</SelectItem>
                        <SelectItem value="David Kim">David Kim</SelectItem>
                        <SelectItem value="Olivia Williams">Olivia Williams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-type">Task Type</Label>
                    <Select defaultValue={selectedTask.type} required>
                      <SelectTrigger id="edit-task-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="review">Code Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-status">Status</Label>
                    <Select defaultValue={selectedTask.status} required>
                      <SelectTrigger id="edit-task-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-task-progress">Progress ({selectedTask.progress}%)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="edit-task-progress"
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={selectedTask.progress}
                        className="w-full"
                      />
                      <span className="text-sm">{selectedTask.progress}%</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditTaskOpen(false)} className="!rounded-button whitespace-nowrap">
                    Cancel
                  </Button>
                  <Button type="submit" className="!rounded-button whitespace-nowrap">
                    Update Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default App;

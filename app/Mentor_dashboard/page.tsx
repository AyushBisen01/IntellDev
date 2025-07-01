'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Bell } from "lucide-react";
import { useRouter } from 'next/navigation';
const App: React.FC = () => {
const [date, setDate] = useState<Date | undefined>(new Date());
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
const progressChartRef = useRef<HTMLDivElement>(null);
const projectsChartRef = useRef<HTMLDivElement>(null);
const router = useRouter();
const handleCreateTask = (e: React.FormEvent) => {
e.preventDefault();
// Handle task creation logic here
setIsNewTaskOpen(false);
};
useEffect(() => {
if (progressChartRef.current) {
const chart = echarts.init(progressChartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
},
legend: {
data: ['Assignments', 'Projects', 'Quizzes']
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
boundaryGap: false,
data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
},
yAxis: {
type: 'value'
},
series: [
{
name: 'Assignments',
type: 'line',
data: [10, 15, 20, 25, 22, 30],
smooth: true,
lineStyle: {
width: 3
}
},
{
name: 'Projects',
type: 'line',
data: [5, 8, 12, 15, 20, 25],
smooth: true,
lineStyle: {
width: 3
}
},
{
name: 'Quizzes',
type: 'line',
data: [8, 12, 16, 22, 18, 24],
smooth: true,
lineStyle: {
width: 3
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
}, []);
useEffect(() => {
if (projectsChartRef.current) {
const chart = echarts.init(projectsChartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
top: '5%',
left: 'center'
},
series: [
{
name: 'Project Types',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: 16,
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 35, name: 'Coding' },
{ value: 20, name: 'Hardware' },
{ value: 25, name: 'Design' },
{ value: 15, name: 'Research' },
{ value: 5, name: 'Other' }
]
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
}, []);
const toggleSidebar = () => {
setSidebarCollapsed(!sidebarCollapsed);
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
<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20mentor%2C%20male%2C%2040s%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20professional%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=avatar1&orientation=squarish" alt="Mentor" />
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
<a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
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
<a href="/Task" data-readdy="true" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-50 group cursor-pointer">
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
<h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
</div>
<div className="flex items-center space-x-4">
<div className="relative">
<Input
type="text"
placeholder="Search..."
className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
<Button variant="default" className="!rounded-button whitespace-nowrap" id="new-task-button">
<i className="fas fa-plus mr-2"></i>
New Task
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
{/* Dashboard Content */}
<main className="p-6">
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
</CardHeader>
<CardContent>
<div className="flex items-center">
<div className="text-3xl font-bold">42</div>
<Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">+5</Badge>
</div>
</CardContent>
</Card>
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-sm font-medium text-gray-500">Pending Tasks</CardTitle>
</CardHeader>
<CardContent>
<div className="flex items-center">
<div className="text-3xl font-bold">18</div>
<Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">4 Due Today</Badge>
</div>
</CardContent>
</Card>
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-sm font-medium text-gray-500">Upcoming Sessions</CardTitle>
</CardHeader>
<CardContent>
<div className="flex items-center">
<div className="text-3xl font-bold">7</div>
<Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">2 Today</Badge>
</div>
</CardContent>
</Card>
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-sm font-medium text-gray-500">Avg. Completion Rate</CardTitle>
</CardHeader>
<CardContent>
<div className="flex items-center">
<div className="text-3xl font-bold">87%</div>
<Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">+2%</Badge>
</div>
</CardContent>
</Card>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
<Card className="lg:col-span-2">
<CardHeader>
<CardTitle>Student Progress Overview</CardTitle>
<CardDescription>Track student performance across different activities</CardDescription>
</CardHeader>
<CardContent>
<div ref={progressChartRef} style={{ height: '300px' }}></div>
</CardContent>
</Card>
<Card>
<CardHeader>
<CardTitle>Project Distribution</CardTitle>
<CardDescription>By project type</CardDescription>
</CardHeader>
<CardContent>
<div ref={projectsChartRef} style={{ height: '300px' }}></div>
</CardContent>
</Card>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<Card className="lg:col-span-2">
<CardHeader className="flex flex-row items-center justify-between">
<div>
<CardTitle>Active Students</CardTitle>
<CardDescription>Manage and track your students</CardDescription>
</div>
<Button variant="outline" className="!rounded-button whitespace-nowrap">
View All
</Button>
</CardHeader>
<CardContent>
<ScrollArea className="h-[400px] pr-4">
<div className="space-y-4">
{[1, 2, 3, 4, 5].map((student) => (
<div key={student} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
<div className="flex items-center">
<Avatar className="h-10 w-10">
<AvatarImage src={`https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student${student}&orientation=squarish`} alt={`Student ${student}`} />
<AvatarFallback>S{student}</AvatarFallback>
</Avatar>
<div className="ml-4">
<p className="font-medium">{['Emily Johnson', 'Michael Chen', 'Sophia Rodriguez', 'David Kim', 'Olivia Williams'][student - 1]}</p>
<p className="text-sm text-gray-500">{['Web Development', 'Data Science', 'Mobile App Development', 'AI & Machine Learning', 'UI/UX Design'][student - 1]}</p>
</div>
</div>
<div className="flex flex-col items-end">
<div className="flex items-center mb-1">
<span className="text-sm font-medium mr-2">Progress</span>
<span className="text-sm font-medium">{[78, 65, 92, 45, 83][student - 1]}%</span>
</div>
<Progress value={[78, 65, 92, 45, 83][student - 1]} className="w-32 h-2" />
</div>
<div className="flex space-x-2">
<Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
<i className="fas fa-comment text-indigo-600"></i>
</Button>
<Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
<i className="fas fa-tasks text-indigo-600"></i>
</Button>
<Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button whitespace-nowrap">
<i className="fas fa-video text-indigo-600"></i>
</Button>
</div>
</div>
))}
</div>
</ScrollArea>
</CardContent>
</Card>
<div className="space-y-6">
<Card>
<CardHeader>
<CardTitle>Upcoming Schedule</CardTitle>
<CardDescription>Your sessions for today and tomorrow</CardDescription>
</CardHeader>
<CardContent>
<div className="space-y-4">
<div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
<div className="flex justify-between items-start mb-2">
<div>
<p className="font-medium">Project Review: Emily Johnson</p>
<p className="text-sm text-gray-500">Web Development</p>
</div>
<Badge className="bg-indigo-500 hover:bg-indigo-600">Today</Badge>
</div>
<div className="flex items-center text-sm text-gray-500">
<i className="fas fa-clock mr-2"></i>
<span>2:00 PM - 3:00 PM</span>
</div>
</div>
<div className="bg-white p-3 rounded-lg border border-gray-200">
<div className="flex justify-between items-start mb-2">
<div>
<p className="font-medium">Code Review: Michael Chen</p>
<p className="text-sm text-gray-500">Data Science</p>
</div>
<Badge className="bg-gray-500 hover:bg-gray-600">Tomorrow</Badge>
</div>
<div className="flex items-center text-sm text-gray-500">
<i className="fas fa-clock mr-2"></i>
<span>10:00 AM - 11:00 AM</span>
</div>
</div>
<div className="bg-white p-3 rounded-lg border border-gray-200">
<div className="flex justify-between items-start mb-2">
<div>
<p className="font-medium">Progress Check: Sophia Rodriguez</p>
<p className="text-sm text-gray-500">Mobile App Development</p>
</div>
<Badge className="bg-gray-500 hover:bg-gray-600">Tomorrow</Badge>
</div>
<div className="flex items-center text-sm text-gray-500">
<i className="fas fa-clock mr-2"></i>
<span>3:30 PM - 4:30 PM</span>
</div>
</div>
</div>
</CardContent>
<CardFooter>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
<i className="fas fa-calendar-alt mr-2"></i>
View Full Schedule
</Button>
</CardFooter>
</Card>
<Card>
<CardHeader>
<CardTitle>Recent Messages</CardTitle>
<CardDescription>Latest communications</CardDescription>
</CardHeader>
<CardContent>
<ScrollArea className="h-[220px]">
<div className="space-y-4">
<div className="flex items-start space-x-3">
<Avatar className="h-8 w-8">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student1&orientation=squarish" alt="Emily Johnson" />
<AvatarFallback>EJ</AvatarFallback>
</Avatar>
<div>
<div className="flex items-center space-x-2">
<p className="font-medium text-sm">Emily Johnson</p>
<span className="text-xs text-gray-500">10:23 AM</span>
</div>
<p className="text-sm text-gray-700">I've completed the first milestone for my project. Could you review it when you have time?</p>
</div>
</div>
<div className="flex items-start space-x-3">
<Avatar className="h-8 w-8">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student2&orientation=squarish" alt="Michael Chen" />
<AvatarFallback>MC</AvatarFallback>
</Avatar>
<div>
<div className="flex items-center space-x-2">
<p className="font-medium text-sm">Michael Chen</p>
<span className="text-xs text-gray-500">Yesterday</span>
</div>
<p className="text-sm text-gray-700">Thank you for the feedback on my data visualization project. I'll implement your suggestions.</p>
</div>
</div>
<div className="flex items-start space-x-3">
<Avatar className="h-8 w-8">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student3&orientation=squarish" alt="Sophia Rodriguez" />
<AvatarFallback>SR</AvatarFallback>
</Avatar>
<div>
<div className="flex items-center space-x-2">
<p className="font-medium text-sm">Sophia Rodriguez</p>
<span className="text-xs text-gray-500">Yesterday</span>
</div>
<p className="text-sm text-gray-700">I'm having trouble with the API integration. Could we schedule a quick call to discuss it?</p>
</div>
</div>
</div>
</ScrollArea>
</CardContent>
<CardFooter>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
<i className="fas fa-comment mr-2"></i>
Open Messages
</Button>
</CardFooter>
</Card>
</div>
</div>
<div className="mt-6">
<Card>
<CardHeader>
<CardTitle>Recent Project Submissions</CardTitle>
<CardDescription>Latest projects submitted by students</CardDescription>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead>Student</TableHead>
<TableHead>Project Name</TableHead>
<TableHead>Type</TableHead>
<TableHead>Submitted</TableHead>
<TableHead>Status</TableHead>
<TableHead className="text-right">Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
<TableRow>
<TableCell>
<div className="flex items-center">
<Avatar className="h-8 w-8 mr-2">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student1&orientation=squarish" alt="Emily Johnson" />
<AvatarFallback>EJ</AvatarFallback>
</Avatar>
<span>Emily Johnson</span>
</div>
</TableCell>
<TableCell>E-commerce Website</TableCell>
<TableCell>Web Development</TableCell>
<TableCell>Today, 10:30 AM</TableCell>
<TableCell>
<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>
</TableCell>
<TableCell className="text-right">
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="fas fa-eye mr-1"></i> View
</Button>
</TableCell>
</TableRow>
<TableRow>
<TableCell>
<div className="flex items-center">
<Avatar className="h-8 w-8 mr-2">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student2&orientation=squarish" alt="Michael Chen" />
<AvatarFallback>MC</AvatarFallback>
</Avatar>
<span>Michael Chen</span>
</div>
</TableCell>
<TableCell>Data Visualization Dashboard</TableCell>
<TableCell>Data Science</TableCell>
<TableCell>Yesterday, 3:45 PM</TableCell>
<TableCell>
<Badge className="bg-green-100 text-green-800 hover:bg-green-100">Reviewed</Badge>
</TableCell>
<TableCell className="text-right">
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="fas fa-eye mr-1"></i> View
</Button>
</TableCell>
</TableRow>
<TableRow>
<TableCell>
<div className="flex items-center">
<Avatar className="h-8 w-8 mr-2">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student3&orientation=squarish" alt="Sophia Rodriguez" />
<AvatarFallback>SR</AvatarFallback>
</Avatar>
<span>Sophia Rodriguez</span>
</div>
</TableCell>
<TableCell>Fitness Tracking App</TableCell>
<TableCell>Mobile Development</TableCell>
<TableCell>Jun 28, 2025</TableCell>
<TableCell>
<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
</TableCell>
<TableCell className="text-right">
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="fas fa-eye mr-1"></i> View
</Button>
</TableCell>
</TableRow>
<TableRow>
<TableCell>
<div className="flex items-center">
<Avatar className="h-8 w-8 mr-2">
<AvatarImage src="https://readdy.ai/api/search-image?query=portrait%20of%20a%20student%2C%20young%20adult%2C%20diverse%2C%20friendly%20face%2C%20high%20quality%20portrait%2C%20casual%20attire%2C%20neutral%20background%2C%20photorealistic&width=100&height=100&seq=student4&orientation=squarish" alt="David Kim" />
<AvatarFallback>DK</AvatarFallback>
</Avatar>
<span>David Kim</span>
</div>
</TableCell>
<TableCell>AI Image Recognition</TableCell>
<TableCell>AI & Machine Learning</TableCell>
<TableCell>Jun 27, 2025</TableCell>
<TableCell>
<Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Revision</Badge>
</TableCell>
<TableCell className="text-right">
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="fas fa-eye mr-1"></i> View
</Button>
</TableCell>
</TableRow>
</TableBody>
</Table>
</CardContent>
<CardFooter className="flex justify-between">
<Button variant="outline" className="!rounded-button whitespace-nowrap">Previous</Button>
<Button variant="outline" className="!rounded-button whitespace-nowrap">Next</Button>
</CardFooter>
</Card>
</div>
</main>
</div>
</div>
);
};
export default App
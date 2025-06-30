'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
const App: React.FC = () => {
const [progress, setProgress] = useState(68);
// Add custom animation class
const style = document.createElement('style');
style.textContent = `
@keyframes fade-in-down {
0% {
opacity: 0;
transform: translateY(-10px);
}
100% {
opacity: 1;
transform: translateY(0);
}
}
.animate-fade-in-down {
animation: fade-in-down 0.3s ease-out;
}
`;
document.head.appendChild(style);
const [selectedDomain, setSelectedDomain] = useState('coding');
const [difficultyLevel, setDifficultyLevel] = useState(2);
const [isMentorMode, setIsMentorMode] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState('active');
const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
const [newSession, setNewSession] = useState({
mentor: '',
date: '',
time: '',
duration: '30',
topic: '',
notes: ''
});
const availableMentors = [
{ id: 1, name: "Dr. Sarah Chen", title: "Senior Software Engineer", availability: ["9:00 AM", "2:00 PM", "4:00 PM"] },
{ id: 2, name: "Prof. Michael Johnson", title: "IoT Specialist", availability: ["10:00 AM", "1:00 PM", "3:00 PM"] },
{ id: 3, name: "Dr. Aisha Patel", title: "Machine Learning Expert", availability: ["11:00 AM", "2:30 PM", "5:00 PM"] }
];
const [isSubmitting, setIsSubmitting] = useState(false);
const [showSuccessToast, setShowSuccessToast] = useState(false);
const handleScheduleSession = async () => {
if (!newSession.mentor || !newSession.date || !newSession.time || !newSession.topic) {
return;
}
setIsSubmitting(true);
try {
// Simulate API call
await new Promise(resolve => setTimeout(resolve, 1000));
const newSessionData = {
id: mentorSessions.length + 1,
mentorName: availableMentors.find(m => m.id === parseInt(newSession.mentor))?.name || '',
mentorTitle: availableMentors.find(m => m.id === parseInt(newSession.mentor))?.title || '',
mentorImage: `https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%20clean%20background%20high%20quality%20professional%20photography%20with%20soft%20lighting%20minimalist%20style&width=60&height=60&seq=${mentorSessions.length + 12}&orientation=squarish`,
date: newSession.date,
duration: `${newSession.duration} minutes`,
topic: newSession.topic,
notes: newSession.notes,
projectId: 0
};
mentorSessions.unshift(newSessionData);
setIsScheduleModalOpen(false);
setNewSession({
mentor: '',
date: '',
time: '',
duration: '30',
topic: '',
notes: ''
});
setShowSuccessToast(true);
setTimeout(() => setShowSuccessToast(false), 3000);
} catch (error) {
console.error('Failed to schedule session:', error);
} finally {
setIsSubmitting(false);
}
};
const activeProjects = [
{
id: 1,
title: "React Weather Dashboard",
progress: 75,
tags: ["React", "API", "Frontend"],
difficulty: "Intermediate",
lastAccessed: "2 hours ago",
image: "https://readdy.ai/api/search-image?query=A%20modern%20weather%20dashboard%20interface%20with%20clean%20design%2C%20showing%20temperature%20graphs%2C%20weather%20icons%2C%20and%20city%20information%20on%20a%20gradient%20blue%20background%2C%20professional%20UI%20design%2C%20minimalist%20style&width=400&height=200&seq=1&orientation=landscape"
},
{
id: 2,
title: "Arduino Smart Home Controller",
progress: 45,
tags: ["Arduino", "IoT", "Hardware"],
difficulty: "Advanced",
lastAccessed: "Yesterday",
image: "https://readdy.ai/api/search-image?query=An%20Arduino%20board%20connected%20to%20various%20sensors%20and%20a%20small%20LCD%20display%20showing%20home%20automation%20controls%2C%20with%20clean%20wiring%20on%20a%20workbench%20with%20soft%20lighting%2C%20professional%20product%20photography&width=400&height=200&seq=2&orientation=landscape"
}
];
const draftProjects = [
{
id: 3,
title: "Machine Learning Image Classifier",
tags: ["Python", "ML", "Computer Vision"],
difficulty: "Advanced",
lastModified: "3 days ago",
image: "https://readdy.ai/api/search-image?query=A%20visualization%20of%20machine%20learning%20image%20classification%20with%20neural%20network%20nodes%20connecting%20to%20various%20categorized%20images%2C%20abstract%20digital%20concept%20art%20with%20blue%20and%20purple%20gradient%20background&width=400&height=200&seq=3&orientation=landscape"
},
{
id: 4,
title: "UI/UX Portfolio Website",
tags: ["Design", "HTML/CSS", "Portfolio"],
difficulty: "Intermediate",
lastModified: "1 week ago",
image: "https://readdy.ai/api/search-image?query=A%20sleek%20portfolio%20website%20mockup%20showing%20design%20projects%20in%20a%20grid%20layout%20with%20elegant%20typography%20and%20minimal%20interface%20elements%20on%20a%20light%20background%2C%20professional%20UI%20design%20showcase&width=400&height=200&seq=4&orientation=landscape"
}
];
const completedProjects = [
{
id: 5,
title: "E-commerce Shopping Cart",
tags: ["JavaScript", "React", "Redux"],
difficulty: "Intermediate",
completedDate: "May 15, 2025",
grade: "A",
image: "https://readdy.ai/api/search-image?query=A%20modern%20e-commerce%20shopping%20cart%20interface%20showing%20product%20listings%2C%20cart%20items%2C%20and%20checkout%20process%20with%20clean%20design%20and%20professional%20UI%20elements%20on%20light%20background&width=400&height=200&seq=5&orientation=landscape"
},
{
id: 6,
title: "Python Data Analysis Dashboard",
tags: ["Python", "Pandas", "Data Visualization"],
difficulty: "Advanced",
completedDate: "April 2, 2025",
grade: "A-",
image: "https://readdy.ai/api/search-image?query=A%20data%20analysis%20dashboard%20with%20multiple%20charts%2C%20graphs%20and%20statistics%20panels%20showing%20financial%20or%20business%20metrics%20with%20a%20clean%20professional%20design%20on%20light%20background&width=400&height=200&seq=6&orientation=landscape"
},
{
id: 7,
title: "Mobile Fitness App",
tags: ["React Native", "Mobile", "UX/UI"],
difficulty: "Intermediate",
completedDate: "March 10, 2025",
grade: "B+",
image: "https://readdy.ai/api/search-image?query=A%20fitness%20mobile%20app%20interface%20showing%20workout%20tracking%2C%20statistics%20and%20health%20metrics%20with%20modern%20clean%20design%20on%20smartphone%20screens%20with%20light%20background&width=400&height=200&seq=7&orientation=landscape"
}
];
const mentorSessions = [
{
id: 1,
mentorName: "Dr. Sarah Chen",
mentorTitle: "Senior Software Engineer",
mentorImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20woman%20with%20glasses%20and%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%20professional%20photography%20with%20soft%20lighting%2C%20minimalist%20style&width=60&height=60&seq=8&orientation=squarish",
date: "June 25, 2025",
duration: "45 minutes",
topic: "React Weather Dashboard Review",
notes: "Discussed API integration best practices and component optimization. Suggested improvements for error handling and responsive design.",
projectId: 1
},
{
id: 2,
mentorName: "Prof. Michael Johnson",
mentorTitle: "IoT Specialist",
mentorImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20middle-aged%20man%20with%20beard%20and%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%20professional%20photography%20with%20soft%20lighting%2C%20minimalist%20style&width=60&height=60&seq=9&orientation=squarish",
date: "June 20, 2025",
duration: "60 minutes",
topic: "Arduino Project Architecture",
notes: "Reviewed circuit design and code structure. Recommended power optimization techniques and additional sensors for enhanced functionality.",
projectId: 2
},
{
id: 3,
mentorName: "Dr. Aisha Patel",
mentorTitle: "Machine Learning Expert",
mentorImage: "https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20woman%20with%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%20professional%20photography%20with%20soft%20lighting%2C%20minimalist%20style&width=60&height=60&seq=10&orientation=squarish",
date: "June 10, 2025",
duration: "30 minutes",
topic: "ML Model Selection",
notes: "Discussed various classification algorithms and their trade-offs. Recommended starting with a simpler model before moving to CNNs.",
projectId: 3
}
];
const difficultyLabels = ["Beginner", "Intermediate", "Advanced", "Expert"];
return (
<div className="min-h-screen bg-white relative">
{showSuccessToast && (
<div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down">
<i className="fas fa-check-circle mr-2"></i>
Session scheduled successfully!
</div>
)}
{/* Header */}
<header className="border-b border-gray-200 bg-white sticky top-0 z-10">
<div className="container mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center">
<div className="text-2xl font-bold text-blue-600 flex items-center">
<i className="fas fa-lightbulb mr-2"></i>
<span>ProjectGen</span>
</div>
<nav className="hidden md:flex ml-8 space-x-6">
<a href="#" className="text-gray-600 hover:text-blue-600">Dashboard</a>
<a href="#" className="text-gray-600 hover:text-blue-600">Projects</a>
<a href="#" className="text-gray-600 hover:text-blue-600">Resources</a>
{isMentorMode && <a href="#" className="text-blue-600 font-medium">Mentor Dashboard</a>}
</nav>
</div>
<div className="flex items-center space-x-4">
<button
onClick={() => setIsMentorMode(!isMentorMode)}
className="hidden md:flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors !rounded-button whitespace-nowrap"
>
<i className={`fas fa-${isMentorMode ? 'chalkboard-teacher' : 'user-graduate'} mr-2`}></i>
{isMentorMode ? 'Mentor Mode' : 'Student Mode'}
</button>
<button className="p-2 text-gray-500 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-bell text-lg"></i>
</button>
<Avatar className="cursor-pointer">
<AvatarImage src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20clean%20background%2C%20high%20quality%20professional%20photography%20with%20soft%20lighting%2C%20minimalist%20style&width=40&height=40&seq=11&orientation=squarish" />
<AvatarFallback>JD</AvatarFallback>
</Avatar>
<button
className="md:hidden p-2 text-gray-500 hover:text-blue-600 !rounded-button whitespace-nowrap"
onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
<i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`}></i>
</button>
</div>
</div>
{isMobileMenuOpen && (
<div className="md:hidden bg-white border-t border-gray-200">
<nav className="container mx-auto px-4 py-3 space-y-3">
<a href="#" className="block text-gray-600 hover:text-blue-600">Dashboard</a>
<a href="#" className="block text-gray-600 hover:text-blue-600">Projects</a>
<a href="#" className="block text-gray-600 hover:text-blue-600">Resources</a>
{isMentorMode && <a href="#" className="block text-blue-600 font-medium">Mentor Dashboard</a>}
<button
onClick={() => setIsMentorMode(!isMentorMode)}
className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors !rounded-button whitespace-nowrap"
>
<i className={`fas fa-${isMentorMode ? 'chalkboard-teacher' : 'user-graduate'} mr-2`}></i>
{isMentorMode ? 'Mentor Mode' : 'Student Mode'}
</button>
</nav>
</div>
)}
</header>
<main className="container mx-auto px-4 py-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
{isMentorMode && (
<p className="text-gray-600 mt-1">Mentor Dashboard - View and manage student progress</p>
)}
</div>
<div className="flex gap-3">
{isMentorMode && (
<Button variant="default" className="flex items-center gap-2 !rounded-button whitespace-nowrap">
<i className="fas fa-users"></i>
<span className="hidden sm:inline">Student List</span>
</Button>
)}
<Dialog>
<DialogTrigger asChild>
<Button variant="outline" className="flex items-center gap-2 !rounded-button whitespace-nowrap">
<i className="fas fa-sliders-h"></i>
<span className="hidden sm:inline">Customize</span>
</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[500px]">
<DialogHeader>
<DialogTitle>Dashboard Preferences</DialogTitle>
<DialogDescription>
Customize your dashboard layout and display preferences.
</DialogDescription>
</DialogHeader>
<div className="grid gap-6 py-4">
<div className="space-y-4">
<h4 className="font-medium">Display Settings</h4>
<div className="flex items-center justify-between">
<Label htmlFor="theme-mode">Theme Mode</Label>
<Select defaultValue="light">
<SelectTrigger id="theme-mode" className="w-[180px]">
<SelectValue placeholder="Select theme" />
</SelectTrigger>
<SelectContent>
<SelectItem value="light">Light Mode</SelectItem>
<SelectItem value="dark">Dark Mode</SelectItem>
<SelectItem value="system">System Default</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<Separator />
<div className="space-y-4">
<h4 className="font-medium">Content Visibility</h4>
<div className="grid gap-3">
<div className="flex items-center space-x-2">
<Checkbox id="show-progress" defaultChecked />
<Label htmlFor="show-progress">Show Progress Overview</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="show-stats" defaultChecked />
<Label htmlFor="show-stats">Show Project Statistics</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="show-mentor" defaultChecked />
<Label htmlFor="show-mentor">Show Mentor Sessions</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="show-analysis" defaultChecked />
<Label htmlFor="show-analysis">Show Project Analysis</Label>
</div>
</div>
</div>
<Separator />
<div className="space-y-4">
<h4 className="font-medium">Project Display</h4>
<div className="grid gap-4">
<div className="flex items-center justify-between">
<Label htmlFor="sort-projects">Sort Projects By</Label>
<Select defaultValue="date">
<SelectTrigger id="sort-projects" className="w-[180px]">
<SelectValue placeholder="Select order" />
</SelectTrigger>
<SelectContent>
<SelectItem value="date">Last Modified</SelectItem>
<SelectItem value="difficulty">Difficulty Level</SelectItem>
<SelectItem value="progress">Progress</SelectItem>
<SelectItem value="name">Project Name</SelectItem>
</SelectContent>
</Select>
</div>
<div className="flex items-center justify-between">
<Label htmlFor="difficulty-filter">Difficulty Filter</Label>
<Select defaultValue="all">
<SelectTrigger id="difficulty-filter" className="w-[180px]">
<SelectValue placeholder="Select difficulty" />
</SelectTrigger>
<SelectContent>
<SelectItem value="all">All Levels</SelectItem>
<SelectItem value="beginner">Beginner</SelectItem>
<SelectItem value="intermediate">Intermediate</SelectItem>
<SelectItem value="advanced">Advanced</SelectItem>
</SelectContent>
</Select>
</div>
</div>
</div>
<Separator />
<div className="space-y-4">
<h4 className="font-medium">Skill Focus</h4>
<div className="grid gap-3">
<div className="flex items-center space-x-2">
<Checkbox id="frontend" defaultChecked />
<Label htmlFor="frontend">Frontend Development</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="backend" defaultChecked />
<Label htmlFor="backend">Backend Development</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="data-science" defaultChecked />
<Label htmlFor="data-science">Data Science</Label>
</div>
<div className="flex items-center space-x-2">
<Checkbox id="hardware" defaultChecked />
<Label htmlFor="hardware">Hardware & IoT</Label>
</div>
</div>
</div>
</div>
<DialogFooter>
<Button variant="outline" className="!rounded-button whitespace-nowrap">Reset to Default</Button>
<Button className="!rounded-button whitespace-nowrap">Save Preferences</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</div>
</div>
{/* Learning Progress Overview */}
<div className="mb-12">
<div className="mb-6">
<div className="flex justify-between mb-2">
<h3 className="font-medium text-gray-700">Overall Progress</h3>
<span className="text-blue-600 font-semibold">{progress}%</span>
</div>
<Progress value={progress} className="h-2" />
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
<Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
<CardContent className="pt-6">
<div className="text-center">
<div className="text-3xl font-bold text-blue-600 mb-1">12</div>
<p className="text-gray-600">Projects Completed</p>
</div>
</CardContent>
</Card>
<Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-sm">
<CardContent className="pt-6">
<div className="text-center">
<div className="text-3xl font-bold text-green-600 mb-1">7</div>
<p className="text-gray-600">Current Streak</p>
</div>
</CardContent>
</Card>
<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-sm">
<CardContent className="pt-6">
<div className="text-center">
<div className="text-3xl font-bold text-purple-600 mb-1">48</div>
<p className="text-gray-600">Learning Hours</p>
</div>
</CardContent>
</Card>
<Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none shadow-sm">
<CardContent className="pt-6">
<div className="text-center">
<div className="text-3xl font-bold text-amber-600 mb-1">15</div>
<p className="text-gray-600">Skills Acquired</p>
</div>
</CardContent>
</Card>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
<div className="lg:col-span-2">
{/* Project Tabs */}
<div className="mb-8">
<Tabs defaultValue="active" onValueChange={setSelectedTab}>
<div className="flex items-center justify-between mb-6">
<h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
<TabsList>
<TabsTrigger value="active">Active</TabsTrigger>
<TabsTrigger value="drafts">Drafts</TabsTrigger>
<TabsTrigger value="completed">Completed</TabsTrigger>
</TabsList>
</div>
<TabsContent value="active">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
{activeProjects.map(project => (
<Card key={project.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
<div className="h-48 overflow-hidden">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover object-top"
/>
</div>
<CardHeader className="pb-2">
<CardTitle className="text-xl">{project.title}</CardTitle>
<div className="flex justify-between items-center mt-1">
<Badge variant="outline" className="bg-gray-100 text-gray-800 font-normal">
{project.difficulty}
</Badge>
<span className="text-sm text-gray-500">Last active: {project.lastAccessed}</span>
</div>
</CardHeader>
<CardContent className="pb-3">
<div className="flex flex-wrap gap-2 mb-3">
{project.tags.map((tag, idx) => (
<Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
{tag}
</Badge>
))}
</div>
<div className="flex justify-between items-center mb-1">
<span className="text-sm text-gray-600">Progress</span>
<span className="text-sm font-medium">{project.progress}%</span>
</div>
<Progress value={project.progress} className="h-1.5" />
</CardContent>
<CardFooter>
<Button className="w-full !rounded-button whitespace-nowrap">
Continue <i className="fas fa-arrow-right ml-2"></i>
</Button>
</CardFooter>
</Card>
))}
</div>
</TabsContent>
<TabsContent value="drafts">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
{draftProjects.map(project => (
<Card key={project.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
<div className="h-48 overflow-hidden">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover object-top"
/>
</div>
<CardHeader className="pb-2">
<CardTitle className="text-xl">{project.title}</CardTitle>
<div className="flex justify-between items-center mt-1">
<Badge variant="outline" className="bg-gray-100 text-gray-800 font-normal">
{project.difficulty}
</Badge>
<span className="text-sm text-gray-500">Last modified: {project.lastModified}</span>
</div>
</CardHeader>
<CardContent className="pb-3">
<div className="flex flex-wrap gap-2 mb-3">
{project.tags.map((tag, idx) => (
<Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
{tag}
</Badge>
))}
</div>
<p className="text-sm text-gray-600">This project is in draft state and hasn't been started yet.</p>
</CardContent>
<CardFooter>
<Button className="w-full !rounded-button whitespace-nowrap">
Start Project <i className="fas fa-play ml-2"></i>
</Button>
</CardFooter>
</Card>
))}
</div>
</TabsContent>
<TabsContent value="completed">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
{completedProjects.map(project => (
<Card key={project.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
<div className="h-48 overflow-hidden">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover object-top"
/>
</div>
<CardHeader className="pb-2">
<CardTitle className="text-xl">{project.title}</CardTitle>
<div className="flex justify-between items-center mt-1">
<Badge variant="outline" className="bg-gray-100 text-gray-800 font-normal">
{project.difficulty}
</Badge>
<Badge className="bg-green-100 text-green-800 font-medium">
Grade: {project.grade}
</Badge>
</div>
</CardHeader>
<CardContent className="pb-3">
<div className="flex flex-wrap gap-2 mb-3">
{project.tags.map((tag, idx) => (
<Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
{tag}
</Badge>
))}
</div>
<p className="text-sm text-gray-600">Completed on: {project.completedDate}</p>
<Progress value={100} className="h-1.5 mt-2" />
</CardContent>
<CardFooter>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
View Project <i className="fas fa-external-link-alt ml-2"></i>
</Button>
</CardFooter>
</Card>
))}
</div>
</TabsContent>
</Tabs>
</div>
{/* Project Analysis */}
<Card className="mb-8 border-2 border-blue-100 shadow-md">
<CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
<CardTitle className="text-xl">Project Analysis</CardTitle>
<CardDescription>Performance insights and learning patterns</CardDescription>
</CardHeader>
<CardContent className="p-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<h4 className="font-medium text-gray-800 mb-3">Skills Distribution</h4>
<div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
<div className="text-center text-gray-500">
<i className="fas fa-chart-pie text-4xl mb-2"></i>
<p>Skills chart visualization would appear here</p>
</div>
</div>
<div className="mt-4 grid grid-cols-2 gap-2">
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
<span className="text-sm">Frontend (42%)</span>
</div>
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
<span className="text-sm">Backend (28%)</span>
</div>
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
<span className="text-sm">Data Science (18%)</span>
</div>
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
<span className="text-sm">Hardware (12%)</span>
</div>
</div>
</div>
<div>
<h4 className="font-medium text-gray-800 mb-3">Completion Trends</h4>
<div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
<div className="text-center text-gray-500">
<i className="fas fa-chart-line text-4xl mb-2"></i>
<p>Completion trend chart would appear here</p>
</div>
</div>
<div className="mt-4">
<div className="flex justify-between items-center mb-1">
<span className="text-sm text-gray-600">Average completion time</span>
<span className="text-sm font-medium">14 days</span>
</div>
<div className="flex justify-between items-center mb-1">
<span className="text-sm text-gray-600">Fastest project</span>
<span className="text-sm font-medium">Mobile Fitness App (7 days)</span>
</div>
<div className="flex justify-between items-center">
<span className="text-sm text-gray-600">Most challenging</span>
<span className="text-sm font-medium">Python Data Analysis (21 days)</span>
</div>
</div>
</div>
</div>
<Separator className="my-6" />
<div>
<h4 className="font-medium text-gray-800 mb-3">Performance Summary</h4>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-blue-50 rounded-lg p-4">
<div className="flex items-center mb-2">
<i className="fas fa-trophy text-blue-600 mr-2"></i>
<h5 className="font-medium">Strengths</h5>
</div>
<ul className="text-sm space-y-1">
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2 text-xs"></i>
Frontend development
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2 text-xs"></i>
UI/UX design principles
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2 text-xs"></i>
API integration
</li>
</ul>
</div>
<div className="bg-amber-50 rounded-lg p-4">
<div className="flex items-center mb-2">
<i className="fas fa-tools text-amber-600 mr-2"></i>
<h5 className="font-medium">Areas for Growth</h5>
</div>
<ul className="text-sm space-y-1">
<li className="flex items-center">
<i className="fas fa-arrow-right text-amber-500 mr-2 text-xs"></i>
Database optimization
</li>
<li className="flex items-center">
<i className="fas fa-arrow-right text-amber-500 mr-2 text-xs"></i>
Advanced algorithms
</li>
<li className="flex items-center">
<i className="fas fa-arrow-right text-amber-500 mr-2 text-xs"></i>
Testing methodologies
</li>
</ul>
</div>
<div className="bg-green-50 rounded-lg p-4">
<div className="flex items-center mb-2">
<i className="fas fa-lightbulb text-green-600 mr-2"></i>
<h5 className="font-medium">Recommendations</h5>
</div>
<ul className="text-sm space-y-1">
<li className="flex items-center">
<i className="fas fa-star text-blue-500 mr-2 text-xs"></i>
Try a backend-focused project
</li>
<li className="flex items-center">
<i className="fas fa-star text-blue-500 mr-2 text-xs"></i>
Explore cloud deployment
</li>
<li className="flex items-center">
<i className="fas fa-star text-blue-500 mr-2 text-xs"></i>
Join a collaborative project
</li>
</ul>
</div>
</div>
</div>
</CardContent>
</Card>
</div>
{/* Sidebar */}
<div className="lg:col-span-1">
{/* Mentor Sessions */}
<Card className="mb-6">
<CardHeader>
<CardTitle className="text-xl">Mentor Sessions</CardTitle>
<CardDescription>Past discussions and feedback</CardDescription>
</CardHeader>
<CardContent className="pb-2">
<ScrollArea className="h-[420px] pr-4">
{mentorSessions.map(session => (
<div key={session.id} className="mb-6">
<div className="flex items-start gap-3 mb-3">
<Avatar className="w-12 h-12">
<AvatarImage src={session.mentorImage} />
<AvatarFallback>{session.mentorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<div>
<h4 className="font-medium">{session.mentorName}</h4>
<p className="text-sm text-gray-600">{session.mentorTitle}</p>
</div>
</div>
<div className="bg-gray-50 rounded-lg p-4 ml-2 border-l-2 border-blue-400">
<div className="flex justify-between items-center mb-2">
<h5 className="font-medium">{session.topic}</h5>
<Badge variant="outline" className="text-xs">
{session.duration}
</Badge>
</div>
<p className="text-sm text-gray-600 mb-2">{session.notes}</p>
<div className="space-y-3 mt-4 border-t border-gray-200 pt-3">
<div className="flex gap-2">
<Avatar className="w-8 h-8">
<AvatarImage src={session.mentorImage} />
<AvatarFallback>{session.mentorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<div className="flex-1 bg-white rounded-lg p-2 text-sm">
<p className="text-gray-800">I reviewed your React Weather Dashboard code. The API integration looks good, but we should discuss some optimization techniques.</p>
<span className="text-xs text-gray-500 mt-1">2:30 PM</span>
</div>
</div>
<div className="flex gap-2 justify-end">
<div className="flex-1 bg-blue-50 rounded-lg p-2 text-sm">
<p className="text-gray-800">Thank you! I was particularly concerned about the data caching strategy. Should we implement a service worker?</p>
<span className="text-xs text-gray-500 mt-1">2:35 PM</span>
</div>
<Avatar className="w-8 h-8">
<AvatarImage src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20young%20person%20with%20neutral%20expression%20clean%20background%20high%20quality%20professional%20photography%20with%20soft%20lighting%20minimalist%20style&width=40&height=40&seq=20&orientation=squarish" />
<AvatarFallback>ST</AvatarFallback>
</Avatar>
</div>
</div>
<div className="flex justify-between items-center text-xs text-gray-500 mt-4">
<span>{session.date}</span>
<div className="flex gap-2">
<Button variant="ghost" size="sm" className="h-7 px-2 text-blue-600 !rounded-button whitespace-nowrap">
<i className="fas fa-comment-dots mr-1"></i> Continue Chat
</Button>
<Button variant="ghost" size="sm" className="h-7 px-2 text-blue-600 !rounded-button whitespace-nowrap">
View Notes
</Button>
</div>
</div>
</div>
</div>
))}
</ScrollArea>
</CardContent>
<CardFooter>
<Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
<DialogTrigger asChild>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
<i className="fas fa-calendar-plus mr-2"></i> Schedule New Session
</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[500px]">
<DialogHeader>
<DialogTitle>Schedule New Mentor Session</DialogTitle>
<DialogDescription>
Book a session with one of our expert mentors to discuss your projects and get guidance.
</DialogDescription>
</DialogHeader>
<div className="grid gap-4 py-4">
<div className="grid gap-2">
<Label htmlFor="mentor">Select Mentor</Label>
<Select
value={newSession.mentor}
onValueChange={(value) => setNewSession({...newSession, mentor: value})}
>
<SelectTrigger id="mentor">
<SelectValue placeholder="Choose a mentor" />
</SelectTrigger>
<SelectContent>
{availableMentors.map((mentor) => (
<SelectItem key={mentor.id} value={mentor.id.toString()}>
{mentor.name} - {mentor.title}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="grid gap-2">
<Label htmlFor="date">Date</Label>
<Input
id="date"
type="date"
value={newSession.date}
onChange={(e) => setNewSession({...newSession, date: e.target.value})}
min={new Date().toISOString().split('T')[0]}
/>
</div>
<div className="grid gap-2">
<Label htmlFor="time">Time</Label>
<Select
value={newSession.time}
onValueChange={(value) => setNewSession({...newSession, time: value})}
>
<SelectTrigger id="time">
<SelectValue placeholder="Select time" />
</SelectTrigger>
<SelectContent>
{newSession.mentor && availableMentors
.find(m => m.id === parseInt(newSession.mentor))
?.availability.map((time) => (
<SelectItem key={time} value={time}>
{time}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>
<div className="grid gap-2">
<Label htmlFor="duration">Duration</Label>
<Select
value={newSession.duration}
onValueChange={(value) => setNewSession({...newSession, duration: value})}
>
<SelectTrigger id="duration">
<SelectValue placeholder="Select duration" />
</SelectTrigger>
<SelectContent>
<SelectItem value="30">30 minutes</SelectItem>
<SelectItem value="45">45 minutes</SelectItem>
<SelectItem value="60">60 minutes</SelectItem>
</SelectContent>
</Select>
</div>
<div className="grid gap-2">
<Label htmlFor="topic">Topic</Label>
<Input
id="topic"
placeholder="What would you like to discuss?"
value={newSession.topic}
onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
/>
</div>
<div className="grid gap-2">
<Label htmlFor="notes">Additional Notes</Label>
<Textarea
id="notes"
placeholder="Any specific questions or areas you'd like to focus on?"
value={newSession.notes}
onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
/>
</div>
</div>
<DialogFooter>
<Button variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="!rounded-button whitespace-nowrap">
Cancel
</Button>
<Button
onClick={handleScheduleSession}
disabled={!newSession.mentor || !newSession.date || !newSession.time || !newSession.topic || isSubmitting}
className="!rounded-button whitespace-nowrap"
>
{isSubmitting ? (
<><i className="fas fa-spinner fa-spin mr-2"></i>Scheduling...</>
) : (
'Schedule Session'
)}
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
</CardFooter>
</Card>
{/* Project Stats */}
<Card>
<CardHeader>
<CardTitle className="text-xl">Project Statistics</CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-1">
<span className="text-sm text-gray-600">Completed Projects</span>
<span className="text-sm font-medium">12 / 20</span>
</div>
<Progress value={60} className="h-1.5" />
</div>
<div>
<div className="flex justify-between mb-1">
<span className="text-sm text-gray-600">Average Grade</span>
<span className="text-sm font-medium">A-</span>
</div>
<Progress value={85} className="h-1.5" />
</div>
<div>
<div className="flex justify-between mb-1">
<span className="text-sm text-gray-600">On-time Completion</span>
<span className="text-sm font-medium">92%</span>
</div>
<Progress value={92} className="h-1.5" />
</div>
<Separator className="my-4" />
<div className="grid grid-cols-2 gap-4">
<div className="bg-gray-50 p-3 rounded-lg">
<div className="text-center">
<div className="text-2xl font-bold text-blue-600">8</div>
<p className="text-xs text-gray-600">Mentor Sessions</p>
</div>
</div>
<div className="bg-gray-50 p-3 rounded-lg">
<div className="text-center">
<div className="text-2xl font-bold text-green-600">15</div>
<p className="text-xs text-gray-600">Skills Gained</p>
</div>
</div>
<div className="bg-gray-50 p-3 rounded-lg">
<div className="text-center">
<div className="text-2xl font-bold text-purple-600">3</div>
<p className="text-xs text-gray-600">Certificates</p>
</div>
</div>
<div className="bg-gray-50 p-3 rounded-lg">
<div className="text-center">
<div className="text-2xl font-bold text-amber-600">48</div>
<p className="text-xs text-gray-600">Learning Hours</p>
</div>
</div>
</div>
</div>
</CardContent>
</Card>
</div>
</div>
</main>
<footer className="bg-gray-50 border-t border-gray-200 mt-12">
<div className="container mx-auto px-4 py-8">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
<div>
<h3 className="text-lg font-bold mb-4">ProjectGen</h3>
<p className="text-gray-600 text-sm">
AI-powered project generator to help you apply what you learn through hands-on experience.
</p>
</div>
<div>
<h4 className="font-medium mb-4">Resources</h4>
<ul className="space-y-2 text-sm">
<li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Tutorials</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Community</a></li>
</ul>
</div>
<div>
<h4 className="font-medium mb-4">Company</h4>
<ul className="space-y-2 text-sm">
<li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
<li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
</ul>
</div>
<div>
<h4 className="font-medium mb-4">Connect</h4>
<div className="flex space-x-4 mb-4">
<a href="#" className="text-gray-600 hover:text-blue-600">
<i className="fab fa-twitter text-lg"></i>
</a>
<a href="#" className="text-gray-600 hover:text-blue-600">
<i className="fab fa-github text-lg"></i>
</a>
<a href="#" className="text-gray-600 hover:text-blue-600">
<i className="fab fa-linkedin text-lg"></i>
</a>
<a href="#" className="text-gray-600 hover:text-blue-600">
<i className="fab fa-youtube text-lg"></i>
</a>
</div>
<p className="text-sm text-gray-600">
Subscribe to our newsletter for updates
</p>
<div className="mt-2 flex">
<Input
type="email"
placeholder="Your email"
className="rounded-r-none"
/>
<Button className="rounded-l-none !rounded-button whitespace-nowrap">
Subscribe
</Button>
</div>
</div>
</div>
<Separator className="my-6" />
<div className="flex flex-col md:flex-row justify-between items-center">
<p className="text-sm text-gray-600">
© 2025 ProjectGen. All rights reserved.
</p>
<div className="flex items-center space-x-4 mt-4 md:mt-0">
<i className="fab fa-cc-visa text-gray-500 text-xl"></i>
<i className="fab fa-cc-mastercard text-gray-500 text-xl"></i>
<i className="fab fa-cc-paypal text-gray-500 text-xl"></i>
</div>
</div>
</div>
</footer>
</div>
);
}
export default App
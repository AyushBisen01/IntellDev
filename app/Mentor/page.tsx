'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, GraduationCap, Clock, Calendar, MessageCircle, User, Star, CheckCircle, FileText, Share, BookOpen, Users, Eye, Send, MessageSquare, Home, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
const App: React.FC = () => {
const router = useRouter();
const [searchQuery, setSearchQuery] = useState("");
const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
const [viewType, setViewType] = useState<"grid" | "list">("grid");
const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
const [isChatOpen, setIsChatOpen] = useState(false);
const handleStartChat = () => {
setSelectedMentor(selectedMentor);
setIsChatOpen(true);
const dialog = document.getElementById("mentor-profile-dialog");
if (dialog) {
const closeButton = dialog.querySelector('[aria-label="Close"]');
if (closeButton instanceof HTMLElement) {
closeButton.click();
}
}
};
const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
const [sessionDuration, setSessionDuration] = useState<string>("");
const [sessionTopic, setSessionTopic] = useState<string>("");
const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
const [expertise, setExpertise] = useState<string>("all");
const calculateTotalCost = () => {
if (!sessionDuration || !selectedMentor) return 0;
return (selectedMentor.hourlyRate * parseInt(sessionDuration) / 60).toFixed(2);
};
const handleBookSession = () => {
if (!selectedMentor || !selectedTimeSlot || !sessionDuration || !sessionTopic) return;
// Here you would typically make an API call to book the session
const bookingDetails = {
mentorId: selectedMentor.id,
date: selectedDate,
timeSlot: selectedTimeSlot,
duration: sessionDuration,
topic: sessionTopic,
totalCost: calculateTotalCost()
};
console.log("Booking session:", bookingDetails);

// Show booking confirmation popup
alert("Booking confirmed! Your session has been scheduled.");

// Open chat and send booking confirmation message
setIsChatOpen(true);

// Add the booking message to chat
const chatArea = document.querySelector('.h-60.border');
if (chatArea) {
const messageDiv = document.createElement('div');
messageDiv.className = 'flex justify-end';
messageDiv.innerHTML = `
<div class="bg-blue-100 rounded-lg p-2 max-w-[80%]">
<p class="text-sm">Hi, I've just scheduled a ${sessionDuration}-minute session for ${format(selectedDate || new Date(), 'MMM dd')} at ${selectedTimeSlot}. Topic: ${sessionTopic}</p>
<p class="text-xs text-gray-500 mt-1">${format(new Date(), 'h:mm a')}</p>
</div>
`;
chatArea.appendChild(messageDiv);

// Add mentor's response
setTimeout(() => {
const responseDiv = document.createElement('div');
responseDiv.className = 'flex justify-start';
responseDiv.innerHTML = `
<div class="bg-gray-100 rounded-lg p-2 max-w-[80%]">
<p class="text-sm">Great! I've received your booking. I look forward to our session. Please make sure to prepare any specific questions or materials you'd like to discuss.</p>
<p class="text-xs text-gray-500 mt-1">${format(new Date(), 'h:mm a')}</p>
</div>
`;
chatArea.appendChild(responseDiv);
chatArea.scrollTop = chatArea.scrollHeight;
}, 1000);
}

// Reset form
setSelectedTimeSlot("");
setSessionDuration("");
setSessionTopic("");
};
const [experienceLevel, setExperienceLevel] = useState<string>("all");
const [priceRange, setPriceRange] = useState<number[]>([20, 100]);
const [availability, setAvailability] = useState<boolean>(false);
// Mock data for mentors
const mentors: Mentor[] = [
{
id: 1,
name: "Dr. Sarah Johnson",
title: "Senior Software Engineer & AI Specialist",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20female%20software%20engineer%20with%20glasses%20and%20short%20hair%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20professional%20attire%2C%20friendly%20smile%2C%20modern%20tech%20office%20setting&width=100&height=100&seq=1&orientation=squarish",
expertise: ["Machine Learning", "Python", "Data Science"],
rating: 4.9,
reviews: 127,
hourlyRate: 85,
available: true,
bio: "With over 10 years of experience in AI and machine learning, I specialize in helping students bridge theoretical concepts with practical applications. My background includes work at Google AI and teaching at Stanford University.",
projects: ["Neural Network Implementation", "Computer Vision Systems", "NLP Models"],
timeSlots: ["Mon 2-4 PM", "Wed 1-3 PM", "Fri 9-11 AM"],
},
{
id: 2,
name: "James Wilson",
title: "Full Stack Developer & Coding Instructor",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20male%20software%20developer%20with%20dark%20hair%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20casual%20professional%20attire%2C%20confident%20expression%2C%20modern%20tech%20office%20environment&width=100&height=100&seq=2&orientation=squarish",
expertise: ["JavaScript", "React", "Node.js"],
rating: 4.7,
reviews: 98,
hourlyRate: 65,
available: true,
bio: "I'm passionate about web development and have been teaching coding for 6 years. I focus on practical, project-based learning that helps students build confidence in their coding abilities.",
projects: ["E-commerce Platform", "Social Media App", "Portfolio Websites"],
timeSlots: ["Tue 5-7 PM", "Thu 3-5 PM", "Sat 10-12 PM"],
},
{
id: 3,
name: "Emily Chen",
title: "UX/UI Designer & Creative Director",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20an%20asian%20female%20designer%20with%20long%20hair%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20stylish%20professional%20attire%2C%20creative%20and%20approachable%20expression%2C%20design%20studio%20environment&width=100&height=100&seq=3&orientation=squarish",
expertise: ["UI/UX Design", "Figma", "Design Systems"],
rating: 4.8,
reviews: 112,
hourlyRate: 75,
available: false,
bio: "Award-winning designer with expertise in creating intuitive, user-centered digital experiences. I love helping students develop their design thinking and technical skills to create meaningful products.",
projects: ["Mobile App Redesign", "Design System Creation", "Website Prototypes"],
timeSlots: ["Mon 10-12 PM", "Wed 4-6 PM", "Fri 2-4 PM"],
},
{
id: 4,
name: "Michael Rodriguez",
title: "Hardware Engineer & IoT Specialist",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20latino%20male%20hardware%20engineer%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20smart%20casual%20attire%2C%20technical%20environment%20with%20electronic%20components%20visible%20in%20background%2C%20confident%20smile&width=100&height=100&seq=4&orientation=squarish",
expertise: ["Arduino", "Raspberry Pi", "Electronics"],
rating: 4.6,
reviews: 87,
hourlyRate: 60,
available: true,
bio: "Specializing in IoT and embedded systems, I help students bring their hardware projects to life. My approach combines theoretical knowledge with hands-on experimentation and prototyping.",
projects: ["Smart Home Systems", "Wearable Tech", "Robotics Projects"],
timeSlots: ["Tue 1-3 PM", "Thu 10-12 PM", "Sun 2-4 PM"],
},
{
id: 5,
name: "Dr. Alex Thompson",
title: "Research Scientist & Academic Mentor",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20non-binary%20person%20with%20short%20hair%20and%20glasses%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20academic%20professional%20attire%2C%20thoughtful%20expression%2C%20research%20laboratory%20environment&width=100&height=100&seq=5&orientation=squarish",
expertise: ["Research Methods", "Academic Writing", "Statistics"],
rating: 4.9,
reviews: 135,
hourlyRate: 90,
available: true,
bio: "PhD in Computer Science with extensive research experience. I specialize in guiding students through complex research projects, from conception to publication, with a focus on rigor and innovation.",
projects: ["Research Paper Publication", "Thesis Development", "Data Analysis"],
timeSlots: ["Mon 3-5 PM", "Wed 9-11 AM", "Fri 4-6 PM"],
},
{
id: 6,
name: "Olivia Martinez",
title: "Game Developer & 3D Modeling Expert",
avatar: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20latina%20female%20game%20developer%20with%20medium%20length%20hair%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20casual%20tech%20attire%2C%20creative%20and%20enthusiastic%20expression%2C%20game%20development%20studio%20environment&width=100&height=100&seq=6&orientation=squarish",
expertise: ["Unity", "Blender", "Game Design"],
rating: 4.7,
reviews: 92,
hourlyRate: 70,
available: false,
bio: "Game industry veteran with experience at major studios. I love helping students understand the technical and creative aspects of game development, from coding mechanics to creating immersive worlds.",
projects: ["3D Adventure Game", "Mobile Puzzle Game", "VR Experience"],
timeSlots: ["Tue 6-8 PM", "Thu 4-6 PM", "Sat 1-3 PM"],
},
];
useEffect(() => {
let filtered = [...mentors];
// Filter by search query
if (searchQuery) {
filtered = filtered.filter(mentor =>
mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
mentor.title.toLowerCase().includes(searchQuery.toLowerCase())
);
}
// Filter by expertise
if (expertise !== "all") {
filtered = filtered.filter(mentor =>
mentor.expertise.some(skill => skill.toLowerCase().includes(expertise.toLowerCase()))
);
}
// Filter by experience level (using hourly rate as a proxy for experience)
if (experienceLevel !== "all") {
if (experienceLevel === "beginner") {
filtered = filtered.filter(mentor => mentor.hourlyRate < 70);
} else if (experienceLevel === "intermediate") {
filtered = filtered.filter(mentor => mentor.hourlyRate >= 70 && mentor.hourlyRate < 85);
} else if (experienceLevel === "expert") {
filtered = filtered.filter(mentor => mentor.hourlyRate >= 85);
}
}
// Filter by price range
filtered = filtered.filter(mentor =>
mentor.hourlyRate >= priceRange[0] && mentor.hourlyRate <= priceRange[1]
);
// Filter by availability
if (availability) {
filtered = filtered.filter(mentor => mentor.available);
}
setFilteredMentors(filtered);
}, [searchQuery, expertise, experienceLevel, priceRange, availability]);
const handleMentorSelect = (mentor: Mentor) => {
setSelectedMentor(mentor);
};
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
<div className="container mx-auto px-4 py-4 flex justify-between items-center">
<div className="flex items-center space-x-2">
<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
<GraduationCap className="w-6 h-6 text-white" />
</div>
<h1 className="text-xl font-bold">Connect Mentor</h1>
</div>

<div className="flex items-center space-x-4">
<Button variant="ghost" className="!rounded-button whitespace-nowrap" onClick={() => router.push('/auth')}>
<Home className="w-4 h-4 mr-2" />
Home
</Button>
<Button variant="ghost" className="!rounded-button whitespace-nowrap" onClick={() => router.push('/projects')}>
<Briefcase className="w-4 h-4 mr-2" />
Projects
</Button>
<Button variant="ghost" className="!rounded-button whitespace-nowrap">
<Bell className="w-4 h-4 mr-2" />
Notifications
</Button>
<Button variant="ghost" className="!rounded-button whitespace-nowrap">
<Settings className="w-4 h-4 mr-2" />
Settings
</Button>
<Avatar className="cursor-pointer">
<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20student%20with%20casual%20attire%2C%20high%20quality%20professional%20headshot%2C%20neutral%20background%2C%20friendly%20expression%2C%20university%20campus%20environment&width=40&height=40&seq=7&orientation=squarish" />
<AvatarFallback>ST</AvatarFallback>
</Avatar>
</div>
</div>
</header>
{/* Hero Section */}
<div className="relative overflow-hidden">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=modern%20educational%20technology%20environment%20with%20soft%20gradient%20blue%20background%2C%20showing%20abstract%20digital%20connections%20and%20learning%20concepts%2C%20minimalist%20design%20with%20subtle%20tech%20elements%2C%20perfect%20for%20text%20overlay%2C%20professional%20and%20clean%20aesthetic&width=1440&height=300&seq=8&orientation=landscape"
alt="Hero background"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="container mx-auto px-4 py-16 relative z-1">
<div className="max-w-2xl text-white">
<h1 className="text-4xl font-bold mb-4">Find the Perfect Mentor for Your Project</h1>
<p className="text-lg mb-8">Connect with experienced professionals who can guide you through your learning journey and help bring your ideas to life.</p>
<div className="bg-white p-1 rounded-lg shadow-lg flex items-center">
<div className="flex-1 flex items-center px-3">
<Search className="h-5 w-5 text-gray-400 mr-2" />
<Input
type="text"
placeholder="Search mentors by name, expertise, or project type..."
className="border-none text-sm flex-1"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
<Button className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap">
Find Mentors
</Button>
</div>
</div>
</div>
</div>
{/* Main Content */}
<main className="container mx-auto px-4 py-8">
<div className="flex flex-col md:flex-row gap-6">
{/* Filters Sidebar */}
<div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
<h2 className="text-lg font-semibold mb-4">Filters</h2>
<div className="space-y-6">
<div>
<h3 className="text-sm font-medium mb-2">Expertise</h3>
<Select value={expertise} onValueChange={setExpertise}>
<SelectTrigger className="w-full !rounded-button">
<SelectValue placeholder="Select expertise" />
</SelectTrigger>
<SelectContent>
<SelectItem value="all">All Expertise</SelectItem>
<SelectItem value="machine learning">Machine Learning</SelectItem>
<SelectItem value="javascript">JavaScript</SelectItem>
<SelectItem value="python">Python</SelectItem>
<SelectItem value="design">UI/UX Design</SelectItem>
<SelectItem value="hardware">Hardware</SelectItem>
<SelectItem value="research">Research</SelectItem>
<SelectItem value="game">Game Development</SelectItem>
</SelectContent>
</Select>
</div>
<div>
<h3 className="text-sm font-medium mb-2">Experience Level</h3>
<Select value={experienceLevel} onValueChange={setExperienceLevel}>
<SelectTrigger className="w-full !rounded-button">
<SelectValue placeholder="Select level" />
</SelectTrigger>
<SelectContent>
<SelectItem value="all">All Levels</SelectItem>
<SelectItem value="beginner">Beginner Friendly</SelectItem>
<SelectItem value="intermediate">Intermediate</SelectItem>
<SelectItem value="expert">Expert</SelectItem>
</SelectContent>
</Select>
</div>
<div>
<h3 className="text-sm font-medium mb-2">Price Range ($/hr)</h3>
<div className="px-2">
<Slider
defaultValue={[20, 100]}
max={150}
min={20}
step={5}
value={priceRange}
onValueChange={setPriceRange}
className="my-6"
/>
<div className="flex justify-between text-sm text-gray-500">
<span>${priceRange[0]}</span>
<span>${priceRange[1]}</span>
</div>
</div>
</div>
<div className="flex items-center space-x-2">
<Switch
id="available-now"
checked={availability}
onCheckedChange={setAvailability}
/>
<Label htmlFor="available-now">Available Now</Label>
</div>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap" onClick={() => {
setSearchQuery("");
setExpertise("all");
setExperienceLevel("all");
setPriceRange([20, 100]);
setAvailability(false);
}}>
Reset Filters
</Button>
</div>
</div>
{/* Mentors List */}
<div className="flex-1">
<div id="mentors-section" className="bg-white rounded-lg shadow-sm p-6 mb-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-semibold">Available Mentors</h2>
<div className="flex items-center space-x-2">
<Button
variant={viewType === "grid" ? "default" : "outline"}
size="sm"
onClick={() => setViewType("grid")}
className="!rounded-button whitespace-nowrap"
>
<BookOpen className="w-4 h-4 mr-2" />
Grid
</Button>
<Button
variant={viewType === "list" ? "default" : "outline"}
size="sm"
onClick={() => setViewType("list")}
className="!rounded-button whitespace-nowrap"
>
<FileText className="w-4 h-4 mr-2" />
List
</Button>
</div>
</div>
{filteredMentors.length === 0 ? (
<div className="text-center py-12">
<div className="text-5xl mb-4">
<Search className="w-16 h-16 text-gray-300 mx-auto" />
</div>
<h3 className="text-lg font-medium text-gray-700 mb-2">No mentors found</h3>
<p className="text-gray-500">Try adjusting your search filters</p>
</div>
) : (
<div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
{filteredMentors.map((mentor) => (
viewType === "grid" ? (
<MentorCard
key={mentor.id}
mentor={mentor}
onSelect={handleMentorSelect}
/>
) : (
<MentorListItem
key={mentor.id}
mentor={mentor}
onSelect={handleMentorSelect}
/>
)
))}
</div>
)}
</div>
</div>
</div>
</main>
{/* Mentor Profile Dialog */}
{selectedMentor && (
<Dialog open={!!selectedMentor} onOpenChange={(open) => !open && setSelectedMentor(null)}>
<DialogContent className="max-w-4xl overflow-auto max-h-[90vh]">
<DialogHeader>
<DialogTitle>Mentor Profile</DialogTitle>
<DialogDescription>
Connect with {selectedMentor.name} to get help with your projects
</DialogDescription>
</DialogHeader>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
<div className="md:col-span-1">
<div className="flex flex-col items-center text-center">
<Avatar className="w-32 h-32">
<AvatarImage src={selectedMentor.avatar} />
<AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<h3 className="text-xl font-semibold mt-4">{selectedMentor.name}</h3>
<p className="text-gray-500">{selectedMentor.title}</p>
<div className="flex items-center mt-2">
<div className="flex text-yellow-400">
{[...Array(5)].map((_, i) => (
<Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedMentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
))}
</div>
<span className="ml-2 text-gray-600">{selectedMentor.rating} ({selectedMentor.reviews} reviews)</span>
</div>
<div className="mt-4 flex flex-wrap justify-center gap-2">
{selectedMentor.expertise.map((skill, index) => (
<Badge key={index} variant="secondary">{skill}</Badge>
))}
</div>
<p className="mt-4 text-sm text-gray-600">${selectedMentor.hourlyRate}/hour</p>
<div className="mt-4 w-full space-y-2">
<Button className="w-full !rounded-button whitespace-nowrap" onClick={handleStartChat}>
<MessageCircle className="w-4 h-4 mr-2" />
Start Chat
</Button>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
<Calendar className="w-4 h-4 mr-2" />
Schedule Session
</Button>
<Dialog>
<DialogTrigger asChild>
<Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
<i className="fas fa-folder-open mr-2"></i>
Share Project
</Button>
</DialogTrigger>
<DialogContent className="w-[600px] h-[600px] max-w-full max-h-[90vh] aspect-square overflow-auto p-6">
<DialogHeader>
<DialogTitle>Share Project with {selectedMentor?.name}</DialogTitle>
<DialogDescription>
Choose an existing project or upload a new one to share with your mentor
</DialogDescription>
</DialogHeader>
<div className="space-y-6 py-4">
<div className="space-y-2">
<Label>Select Project</Label>
<Select>
<SelectTrigger className="w-full !rounded-button">
<SelectValue placeholder="Choose from existing projects" />
</SelectTrigger>
<SelectContent>
<SelectItem value="project1">Personal Portfolio Website</SelectItem>
<SelectItem value="project2">E-commerce App</SelectItem>
<SelectItem value="project3">Machine Learning Model</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label>Or Upload New Project</Label>
<div className="border-2 border-dashed rounded-lg p-6 text-center">
<i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
<p className="text-sm text-gray-500 mb-2">Drag and drop your project files here, or click to browse</p>
<Input type="file" className="hidden" id="project-files" multiple />
<div>
<Button variant="outline" className="!rounded-button whitespace-nowrap" onClick={() => document.getElementById('project-files')?.click()}>
<i className="fas fa-folder-open mr-2"></i>
Browse Files
</Button>
<input
type="file"
className="hidden"
id="project-files"
multiple
onChange={(e) => {
const files = Array.from(e.target.files || []);
const fileList = document.getElementById('selected-files');
if (fileList) {
fileList.innerHTML = '';
files.forEach(file => {
const fileSize = (file.size / 1024).toFixed(2);
const fileItem = document.createElement('div');
fileItem.className = 'flex items-center justify-between p-2 border rounded mt-2';
fileItem.innerHTML = `
<div class="flex items-center gap-2">
<i class="fas fa-file text-blue-500"></i>
<div>
<div class="text-sm font-medium">${file.name}</div>
<div class="text-xs text-gray-500">${fileSize} KB • ${file.type || 'Unknown type'}</div>
</div>
</div>
<Button variant="ghost" size="sm" class="!rounded-button whitespace-nowrap text-red-500 hover:text-red-700" onclick="this.parentElement.remove()">
<i class="fas fa-times"></i>
</Button>
`;
fileList.appendChild(fileItem);
});
}
}}
/>
<div id="selected-files" className="mt-2 space-y-2"></div>
</div>
</div>
</div>
<div className="space-y-2">
<Label>Project Description</Label>
<Textarea
placeholder="Describe your project and what you need help with..."
className="resize-none"
/>
</div>
<div className="space-y-2">
<Label>Visibility Settings</Label>
<div className="space-y-2">
<div className="flex items-center space-x-2">
<Switch id="private-access" />
<Label htmlFor="private-access">Private (Only visible to this mentor)</Label>
</div>
<div className="flex items-center space-x-2">
<Switch id="allow-comments" />
<Label htmlFor="allow-comments">Allow comments and feedback</Label>
</div>
</div>
</div>
<div className="flex justify-end space-x-2 pt-4">
<Button variant="outline" className="!rounded-button whitespace-nowrap">
Cancel
</Button>
<Button className="!rounded-button whitespace-nowrap" onClick={() => {
// Here you would handle the project sharing logic
console.log('Sharing project with mentor...');
}}>
<i className="fas fa-share mr-2"></i>
Share Project
</Button>
</div>
</div>
</DialogContent>
</Dialog>
</div>
</div>
</div>
<div className="md:col-span-2">
<Tabs defaultValue="about">
<TabsList className="w-full">
<TabsTrigger value="about" className="flex-1">About</TabsTrigger>
<TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
<TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
<TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
</TabsList>
<TabsContent value="about" className="mt-4">
<h4 className="text-lg font-medium mb-2">Bio</h4>
<p className="text-gray-700">{selectedMentor.bio}</p>
<h4 className="text-lg font-medium mt-6 mb-2">Expertise</h4>
<div className="grid grid-cols-2 gap-2">
{selectedMentor.expertise.map((skill, index) => (
<div key={index} className="flex items-center">
<CheckCircle className="w-4 h-4 text-green-500 mr-2" />
<span>{skill}</span>
</div>
))}
</div>
</TabsContent>
<TabsContent value="projects" className="mt-4">
<h4 className="text-lg font-medium mb-4">Recent Projects</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{selectedMentor.projects.map((project, index) => (
<Card key={index}>
<CardHeader className="pb-2">
<CardTitle className="text-base">{project}</CardTitle>
</CardHeader>
<CardContent>
<p className="text-sm text-gray-500">
Guided students through the development process from concept to implementation.
</p>
</CardContent>
</Card>
))}
</div>
</TabsContent>
<TabsContent value="schedule" className="mt-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="min-w-0">
<h4 className="text-lg font-medium mb-4">Available Time Slots</h4>
<div className="space-y-2">
{selectedMentor.timeSlots.map((slot, index) => (
<div key={index} className="flex items-center justify-between p-3 border rounded-lg">
<div className="flex items-center">
<Clock className="w-4 h-4 text-blue-500 mr-2" />
<span>{slot}</span>
</div>
<Button size="sm" className="!rounded-button whitespace-nowrap">Book</Button>
</div>
))}
</div>
</div>
<div className="min-w-0 overflow-x-auto">
<h4 className="text-lg font-medium mb-4">Schedule a Session</h4>
<div className="border rounded-lg p-4">
<div className="space-y-2 overflow-x-auto min-w-0">
<Label>Select Date</Label>
<div className="w-full max-w-xs mx-auto">
<CalendarComponent
mode="single"
selected={selectedDate}
onSelect={setSelectedDate}
className="rounded-md border w-full max-w-full"
initialFocus
/>
</div>
</div>
<Select defaultValue="30">
<SelectTrigger className="w-full mt-4 !rounded-button">
<SelectValue placeholder="Session Duration" />
</SelectTrigger>
<SelectContent>
<SelectItem value="30">30 minutes</SelectItem>
<SelectItem value="60">60 minutes</SelectItem>
<SelectItem value="90">90 minutes</SelectItem>
</SelectContent>
</Select>
<Dialog>
<DialogTrigger asChild>
<Dialog>
<DialogTrigger asChild>
<Button className="w-full mt-4 !rounded-button whitespace-nowrap">
<Calendar className="w-4 h-4 mr-2" />
Schedule Session
</Button>
</DialogTrigger>
<DialogContent className="w-[640px] h-[640px] max-w-full max-h-[90vh] aspect-square overflow-auto p-6">
<DialogHeader>
<DialogTitle>Schedule Mentoring Session</DialogTitle>
<DialogDescription>
Select your preferred time slot and session details
</DialogDescription>
</DialogHeader>
<div className="space-y-6 py-4">
<div className="space-y-2">
<Label>Select Date</Label>
<CalendarComponent
mode="single"
selected={selectedDate}
onSelect={setSelectedDate}
className="rounded-md border mx-auto"
initialFocus
/>
</div>
<div className="space-y-2">
<Label>Available Time Slots</Label>
<div className="grid grid-cols-2 gap-2">
{selectedMentor?.timeSlots.map((slot, index) => (
<Button
key={index}
variant="outline"
className={`!rounded-button whitespace-nowrap ${selectedTimeSlot === slot ? 'bg-blue-50 border-blue-500' : ''}`}
onClick={() => setSelectedTimeSlot(slot)}
>
<Clock className="w-4 h-4 mr-2" />
{slot}
</Button>
))}
</div>
</div>
<div className="space-y-2">
<Label>Session Duration</Label>
<Select value={sessionDuration} onValueChange={setSessionDuration}>
<SelectTrigger className="w-full !rounded-button">
<SelectValue placeholder="Select duration" />
</SelectTrigger>
<SelectContent>
<SelectItem value="30">30 minutes (${(selectedMentor?.hourlyRate || 0) * 0.5})</SelectItem>
<SelectItem value="60">60 minutes (${selectedMentor?.hourlyRate})</SelectItem>
<SelectItem value="90">90 minutes (${(selectedMentor?.hourlyRate || 0) * 1.5})</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label>Session Topic/Goal</Label>
<Textarea
placeholder="Briefly describe what you'd like to discuss or achieve in this session..."
value={sessionTopic}
onChange={(e) => setSessionTopic(e.target.value)}
className="resize-none"
/>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center mb-2">
<span className="text-sm text-gray-600">Session Duration:</span>
<span className="font-medium">{sessionDuration} minutes</span>
</div>
<div className="flex justify-between items-center mb-4">
<span className="text-sm text-gray-600">Total Cost:</span>
<span className="font-medium">${calculateTotalCost()}</span>
</div>
<Button
className="w-full !rounded-button whitespace-nowrap"
onClick={handleBookSession}
disabled={!selectedTimeSlot || !sessionDuration || !sessionTopic}
>
<CheckCircle className="w-4 h-4 mr-2" />
Confirm Booking
</Button>
</div>
</div>
</DialogContent>
</Dialog>
</DialogTrigger>
<DialogContent className="sm:max-w-[500px]">
<DialogHeader>
<DialogTitle>Schedule Mentoring Session</DialogTitle>
<DialogDescription>
Select your preferred time slot and session details
</DialogDescription>
</DialogHeader>
<div className="space-y-6 py-4">
<div className="space-y-2">
<Label>Select Date</Label>
<CalendarComponent
mode="single"
selected={selectedDate}
onSelect={setSelectedDate}
className="rounded-md border mx-auto"
initialFocus
/>
</div>
<div className="space-y-2">
<Label>Available Time Slots</Label>
<div className="grid grid-cols-2 gap-2">
{selectedMentor?.timeSlots.map((slot, index) => (
<Button
key={index}
variant="outline"
className={`!rounded-button whitespace-nowrap ${selectedTimeSlot === slot ? 'bg-blue-50 border-blue-500' : ''}`}
onClick={() => setSelectedTimeSlot(slot)}
>
<Clock className="w-4 h-4 mr-2" />
{slot}
</Button>
))}
</div>
</div>
<div className="space-y-2">
<Label>Session Duration</Label>
<Select value={sessionDuration} onValueChange={setSessionDuration}>
<SelectTrigger className="w-full !rounded-button">
<SelectValue placeholder="Select duration" />
</SelectTrigger>
<SelectContent>
<SelectItem value="30">30 minutes (${(selectedMentor?.hourlyRate || 0) * 0.5})</SelectItem>
<SelectItem value="60">60 minutes (${selectedMentor?.hourlyRate})</SelectItem>
<SelectItem value="90">90 minutes (${(selectedMentor?.hourlyRate || 0) * 1.5})</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label>Session Topic/Goal</Label>
<Textarea
placeholder="Briefly describe what you'd like to discuss or achieve in this session..."
value={sessionTopic}
onChange={(e) => setSessionTopic(e.target.value)}
className="resize-none"
/>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center mb-2">
<span className="text-sm text-gray-600">Session Duration:</span>
<span className="font-medium">{sessionDuration} minutes</span>
</div>
<div className="flex justify-between items-center mb-4">
<span className="text-sm text-gray-600">Total Cost:</span>
<span className="font-medium">${calculateTotalCost()}</span>
</div>
<Button
className="w-full !rounded-button whitespace-nowrap"
onClick={handleBookSession}
disabled={!selectedTimeSlot || !sessionDuration || !sessionTopic}
>
<CheckCircle className="w-4 h-4 mr-2" />
Confirm Booking
</Button>
</div>
</div>
</DialogContent>
</Dialog>
</div>
</div>
</div>
</TabsContent>
<TabsContent value="reviews" className="mt-4">
<h4 className="text-lg font-medium mb-4">Student Reviews</h4>
<ScrollArea className="h-[300px]">
<div className="space-y-4">
{[...Array(5)].map((_, i) => (
<div key={i} className="border-b pb-4 last:border-0">
<div className="flex justify-between items-start">
<div className="flex items-center">
<Avatar className="w-8 h-8 mr-2">
<AvatarFallback>
{["JD", "TS", "AK", "MR", "LC"][i]}
</AvatarFallback>
</Avatar>
<div>
<p className="font-medium">
{["John D.", "Taylor S.", "Aisha K.", "Mike R.", "Lucy C."][i]}
</p>
<p className="text-xs text-gray-500">
{["2 weeks ago", "1 month ago", "3 months ago", "4 months ago", "6 months ago"][i]}
</p>
</div>
</div>
<div className="flex text-yellow-400">
{[...Array(5)].map((_, j) => (
<Star key={j} className={`w-4 h-4 ${j < 5 - i % 2 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
))}
</div>
</div>
<p className="mt-2 text-sm text-gray-700">
{[
"Excellent mentor! Helped me understand complex concepts and guided me through my project with patience and expertise.",
"Very knowledgeable and supportive. Always available to answer questions and provide feedback.",
"Great at explaining difficult topics in a way that's easy to understand. Highly recommend!",
"Helped me debug my project and taught me best practices along the way. A fantastic learning experience.",
"Patient, thorough, and encouraging. Made learning enjoyable and helped me build confidence in my skills."
][i]}
</p>
</div>
))}
</div>
</ScrollArea>
</TabsContent>
</Tabs>
</div>
</div>
</DialogContent>
</Dialog>
)}
{/* Chat Widget */}
<div className="fixed bottom-6 right-6 z-10">
<Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
<PopoverTrigger asChild>
<Button className="w-14 h-14 rounded-full shadow-lg !rounded-button whitespace-nowrap">
<MessageSquare className="w-6 h-6" />
</Button>
</PopoverTrigger>
<PopoverContent className="w-80 p-0" align="end">
<div className="bg-blue-600 text-white p-3 rounded-t-lg">
<h3 className="font-medium">Messages</h3>
</div>
<div className="p-4">
{selectedMentor ? (
<div className="space-y-4">
<div className="flex items-center">
<Avatar className="w-10 h-10 mr-3">
<AvatarImage src={selectedMentor.avatar} />
<AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<div>
<p className="font-medium">{selectedMentor.name}</p>
<p className="text-xs text-gray-500">Online now</p>
</div>
</div>
<ScrollArea className="h-60 border rounded-lg p-3">
<div className="space-y-3">
<div className="flex justify-start">
<div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
<p className="text-sm">Hi there! How can I help with your project today?</p>
<p className="text-xs text-gray-500 mt-1">10:30 AM</p>
</div>
</div>
<div className="flex justify-end">
<div className="bg-blue-100 rounded-lg p-2 max-w-[80%]">
<p className="text-sm">I'm having trouble with my machine learning project. Can you help me understand how to implement a neural network?</p>
<p className="text-xs text-gray-500 mt-1">10:32 AM</p>
</div>
</div>
<div className="flex justify-start">
<div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
<p className="text-sm">Absolutely! Let's start by discussing the architecture you're trying to build. Do you have a specific use case in mind?</p>
<p className="text-xs text-gray-500 mt-1">10:35 AM</p>
</div>
</div>
</div>
</ScrollArea>
<div className="flex items-center">
<Textarea placeholder="Type your message..." className="resize-none" />
<Button size="icon" className="ml-2 !rounded-button whitespace-nowrap">
<Send className="w-4 h-4" />
</Button>
</div>
</div>
) : (
<div className="text-center py-6">
<div className="text-4xl text-gray-300 mb-2">
<MessageSquare className="w-16 h-16 mx-auto" />
</div>
<p className="text-gray-500 mb-4">Select a mentor to start chatting</p>
<Button
variant="outline"
className="!rounded-button whitespace-nowrap"
onClick={() => {
setIsChatOpen(false);
const mentorsSection = document.getElementById('mentors-section');
if (mentorsSection) {
mentorsSection.scrollIntoView({ behavior: 'smooth' });
}
}}
>
Browse Mentors
</Button>
</div>
)}
</div>
</PopoverContent>
</Popover>
</div>
</div>
);
};
// Component for mentor card in grid view
const MentorCard: React.FC<{ mentor: Mentor; onSelect: (mentor: Mentor) => void }> = ({ mentor, onSelect }) => {
return (
<Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(mentor)}>
<div className="p-4 flex flex-col items-center">
<Avatar className="w-20 h-20">
<AvatarImage src={mentor.avatar} />
<AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<h3 className="font-semibold text-lg mt-3">{mentor.name}</h3>
<p className="text-gray-500 text-sm text-center">{mentor.title}</p>
<div className="flex items-center mt-2">
<div className="flex text-yellow-400">
{[...Array(5)].map((_, i) => (
<Star key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
))}
</div>
<span className="ml-1 text-xs text-gray-600">{mentor.rating} ({mentor.reviews})</span>
</div>
<div className="mt-3 flex flex-wrap justify-center gap-1">
{mentor.expertise.map((skill, index) => (
<Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
))}
</div>
</div>
<CardFooter className="bg-gray-50 flex justify-between p-4">
<span className="font-medium">${mentor.hourlyRate}/hr</span>
<div className="flex items-center">
<Badge variant={mentor.available ? "default" : "secondary"} className="mr-2">
{mentor.available ? "Available" : "Busy"}
</Badge>
<Button size="sm" className="!rounded-button whitespace-nowrap flex items-center justify-center">
<Eye className="w-4 h-4 mr-1" />
View
</Button>
</div>
</CardFooter>
</Card>
);
};
// Component for mentor in list view
const MentorListItem: React.FC<{ mentor: Mentor; onSelect: (mentor: Mentor) => void }> = ({ mentor, onSelect }) => {
return (
<div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(mentor)}>
<Avatar className="w-16 h-16 mr-4">
<AvatarImage src={mentor.avatar} />
<AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start">
<div>
<h3 className="font-semibold">{mentor.name}</h3>
<p className="text-gray-500 text-sm">{mentor.title}</p>
</div>
<Badge variant={mentor.available ? "default" : "secondary"}>
{mentor.available ? "Available" : "Busy"}
</Badge>
</div>
<div className="flex items-center mt-1">
<div className="flex text-yellow-400">
{[...Array(5)].map((_, i) => (
<Star key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
))}
</div>
<span className="ml-1 text-xs text-gray-600">{mentor.rating} ({mentor.reviews})</span>
<span className="mx-2 text-gray-300">|</span>
<span className="font-medium">${mentor.hourlyRate}/hr</span>
</div>
<div className="mt-2 flex flex-wrap gap-1">
{mentor.expertise.map((skill, index) => (
<Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
))}
</div>
</div>
<div className="ml-4 flex space-x-2">
<Button size="sm" variant="outline" className="!rounded-button whitespace-nowrap">
<MessageCircle className="w-4 h-4 mr-1" />
Chat
</Button>
<Button size="sm" className="!rounded-button whitespace-nowrap">
<Calendar className="w-4 h-4 mr-1" />
Book
</Button>
</div>
</div>
);
};
// Type definitions
interface Mentor {
id: number;
name: string;
title: string;
avatar: string;
expertise: string[];
rating: number;
reviews: number;
hourlyRate: number;
available: boolean;
bio: string;
projects: string[];
timeSlots: string[];
}
export default App
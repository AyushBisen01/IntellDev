'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Bell,
  Rocket,
  User,
  Settings,
  BookOpen,
  Users,
  Share,
  Bookmark,
  ExternalLink,
  Check,
  Clock,
  Code,
  Cpu,
  Palette,
  FlaskRoundIcon as Flask,
  Lightbulb,
  CheckCircle,
  CuboidIcon as Cube,
  UserPlus,
  GraduationCap,
  Folder,
  LoaderPinwheelIcon as Spinner,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Moon,
  Sun,
  X,
  Search,
  Filter,
  GitBranch,
  Calendar,
  Eye,
  Plus,
  UserCheck,
  Signal,
  FileCode,
  Puzzle,
  GraduationCap as ChalkboardTeacher,
  Download,
  Play,
  Save,
  Flame,
  Trophy,
  Star,
} from "lucide-react"
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  useEffect(() => {
    const handleProfileClick = () => {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };
    const handleNotificationClick = () => {
      setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    };
    const handleClickOutside = (event: MouseEvent) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      const avatar = document.getElementById("profile-avatar");
      const notificationDropdown = document.getElementById(
        "notification-dropdown",
      );
      const notificationButton = document.getElementById("notification-button");
      if (
        profileDropdown &&
        avatar &&
        !avatar.contains(event.target as Node) &&
        !profileDropdown.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationDropdown &&
        notificationButton &&
        !notificationButton.contains(event.target as Node)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };
    const avatar = document.getElementById("profile-avatar");
    const notificationButton = document.getElementById("notification-button");
    avatar?.addEventListener("click", handleProfileClick);
    notificationButton?.addEventListener("click", handleNotificationClick);
    document.addEventListener("click", handleClickOutside);
    return () => {
      avatar?.removeEventListener("click", handleProfileClick);
      notificationButton?.removeEventListener("click", handleNotificationClick);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);
  useEffect(() => {
    const profileDropdown = document.getElementById("profile-dropdown");
    const notificationDropdown = document.getElementById(
      "notification-dropdown",
    );
    if (profileDropdown) {
      profileDropdown.style.display = isProfileDropdownOpen ? "block" : "none";
    }
    if (notificationDropdown) {
      notificationDropdown.style.display = isNotificationDropdownOpen
        ? "block"
        : "none";
    }
  }, [isProfileDropdownOpen, isNotificationDropdownOpen]);
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [timeCommitment, setTimeCommitment] = useState("Medium");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const swiperModules = [Pagination, Autoplay];
  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing]);
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsProcessing(true);
    }
  };
  const projects = [
    {
      id: 1,
      title: "Interactive Data Visualization Dashboard",
      difficulty: "Intermediate",
      time: "3-4 hours",
      domain: "coding",
      description:
        "Build a responsive dashboard that visualizes complex datasets using D3.js or Chart.js libraries.",
      objectives: [
        "Learn data visualization principles",
        "Practice JavaScript DOM manipulation",
        "Implement responsive design",
      ],
      materials: ["Code editor", "D3.js or Chart.js library", "Sample dataset"],
      steps: [
        "Set up project structure and dependencies",
        "Import and format your dataset",
        "Create basic chart components",
        "Add interactivity and filters",
        "Implement responsive layout",
      ],
      tips: "Start with a simple chart type before adding complexity. Consider using a CSS framework for layout.",
    },
    {
      id: 2,
      title: "Arduino Weather Station",
      difficulty: "Advanced",
      time: "8-10 hours",
      domain: "hardware",
      description:
        "Create a DIY weather station that measures temperature, humidity, and pressure with real-time data display.",
      objectives: [
        "Learn sensor integration",
        "Practice Arduino programming",
        "Build a physical project enclosure",
      ],
      materials: [
        "Arduino board",
        "Temperature/humidity sensors",
        "LCD display",
        "Project enclosure",
      ],
      steps: [
        "Connect sensors to Arduino",
        "Write code to read sensor data",
        "Program LCD display output",
        "Design and build enclosure",
        "Calibrate and test system",
      ],
      tips: "Test each sensor individually before combining them. Consider adding data logging capabilities.",
    },
    {
      id: 3,
      title: "Mobile App Prototype",
      difficulty: "Beginner",
      time: "2-3 hours",
      domain: "design",
      description:
        "Design a clickable prototype for a mobile app focused on habit tracking using Figma or Adobe XD.",
      objectives: [
        "Apply UI/UX principles",
        "Create user flows",
        "Design consistent interface elements",
      ],
      materials: ["Figma or Adobe XD", "UI kit (optional)", "User personas"],
      steps: [
        "Define app features and user stories",
        "Create wireframes for key screens",
        "Design high-fidelity mockups",
        "Add interactive elements",
        "Test with potential users",
      ],
      tips: "Focus on solving one specific problem well. Use established design patterns for familiar interactions.",
    },
    {
      id: 4,
      title: "Machine Learning Image Classifier",
      difficulty: "Intermediate",
      time: "5-6 hours",
      domain: "coding",
      description:
        "Build an ML model that can identify and classify images using TensorFlow or PyTorch.",
      objectives: [
        "Understand ML fundamentals",
        "Work with image data",
        "Train and evaluate models",
      ],
      materials: [
        "Python environment",
        "TensorFlow or PyTorch",
        "Image dataset",
      ],
      steps: [
        "Set up development environment",
        "Prepare and preprocess image dataset",
        "Build classification model",
        "Train and tune hyperparameters",
        "Evaluate model performance",
      ],
      tips: "Start with a pre-trained model and fine-tune it for your specific use case to save time.",
    },
    {
      id: 5,
      title: "Research Literature Review",
      difficulty: "Advanced",
      time: "10-12 hours",
      domain: "research",
      description:
        "Conduct a comprehensive literature review on an emerging technology or scientific concept.",
      objectives: [
        "Develop research methodology",
        "Synthesize information",
        "Create structured knowledge summary",
      ],
      materials: [
        "Access to academic databases",
        "Reference management software",
        "Note-taking system",
      ],
      steps: [
        "Define research question and scope",
        "Search for relevant literature",
        "Evaluate source credibility",
        "Organize findings by themes",
        "Write structured review document",
      ],
      tips: "Use a systematic approach to track sources and findings. Consider creating a concept map to visualize relationships.",
    },
    {
      id: 6,
      title: "Personal Finance Tracker",
      difficulty: "Beginner",
      time: "4-5 hours",
      domain: "coding",
      description:
        "Create a web app that helps track expenses, categorize spending, and visualize financial habits.",
      objectives: [
        "Practice CRUD operations",
        "Implement data visualization",
        "Build practical utility app",
      ],
      materials: [
        "Web development stack",
        "Chart library",
        "Local storage or database",
      ],
      steps: [
        "Design data structure for finances",
        "Create input forms for transactions",
        "Implement category system",
        "Add reporting and visualization",
        "Set up data persistence",
      ],
      tips: "Focus on privacy and data security. Consider using localStorage for a simple implementation before adding backend.",
    },
  ];
  const resources = [
    {
      title: "Video Tutorial: Building Interactive Dashboards",
      type: "video",
      image:
        "https://readdy.ai/api/search-image?query=professional%20video%20tutorial%20showing%20hands%20typing%20on%20keyboard%20with%20code%20editor%20open%2C%20screen%20showing%20data%20visualization%20dashboard%2C%20high%20quality%20educational%20content%2C%20clean%20modern%20desk%20setup%2C%20soft%20lighting&width=300&height=200&seq=1&orientation=landscape",
    },
    {
      title: "Getting Started with Arduino Sensors",
      type: "documentation",
      image:
        "https://readdy.ai/api/search-image?query=detailed%20technical%20documentation%20for%20arduino%20sensors%20with%20circuit%20diagrams%2C%20component%20closeups%2C%20professional%20photography%20of%20electronic%20components%2C%20clean%20white%20background%2C%20educational%20material%20for%20hardware%20projects&width=300&height=200&seq=2&orientation=landscape",
    },
    {
      title: "UI/UX Design Principles Guide",
      type: "ebook",
      image:
        "https://readdy.ai/api/search-image?query=professional%20ebook%20cover%20about%20UI%20UX%20design%20principles%2C%20modern%20minimal%20design%2C%20colorful%20geometric%20elements%2C%20clean%20typography%2C%20digital%20design%20education%20material%20on%20neutral%20background%2C%20high%20quality%20professional%20look&width=300&height=200&seq=3&orientation=landscape",
    },
    {
      title: "Machine Learning Fundamentals",
      type: "course",
      image:
        "https://readdy.ai/api/search-image?query=professional%20educational%20content%20showing%20machine%20learning%20concepts%2C%20neural%20network%20visualization%2C%20code%20samples%20and%20data%20graphs%2C%20clean%20modern%20educational%20aesthetic%2C%20high%20quality%20course%20material%20with%20subtle%20tech%20background&width=300&height=200&seq=4&orientation=landscape",
    },
    {
      title: "Research Methodology Workshop",
      type: "workshop",
      image:
        "https://readdy.ai/api/search-image?query=professional%20workshop%20setting%20with%20people%20collaborating%20on%20research%20methodology%2C%20academic%20environment%2C%20bookshelves%2C%20digital%20screens%20with%20data%2C%20clean%20modern%20educational%20space%2C%20soft%20natural%20lighting&width=300&height=200&seq=5&orientation=landscape",
    },
  ];
  const communityMembers = [
    {
      name: "Alex Chen",
      project: "Interactive Dashboard",
      progress: 75,
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20young%20asian%20male%20with%20glasses%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20professional%20photo%2C%20clean%20lighting%2C%20business%20casual%20attire&width=100&height=100&seq=6&orientation=squarish",
    },
    {
      name: "Maya Johnson",
      project: "Weather Station",
      progress: 40,
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20young%20black%20female%20with%20natural%20hair%20and%20confident%20smile%2C%20neutral%20background%2C%20high%20quality%20professional%20photo%2C%20clean%20lighting%2C%20business%20casual%20attire&width=100&height=100&seq=7&orientation=squarish",
    },
    {
      name: "David Park",
      project: "ML Image Classifier",
      progress: 90,
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20middle%20aged%20asian%20male%20with%20short%20hair%20and%20friendly%20expression%2C%20neutral%20background%2C%20high%20quality%20professional%20photo%2C%20clean%20lighting%2C%20business%20casual%20attire&width=100&height=100&seq=8&orientation=squarish",
    },
  ];
  // Filter projects based on selected filter
  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "all") return true;
    return project.domain === selectedFilter;
  });
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-rocket text-white"></i>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IntellDev
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="/projects"
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Projects
            </a>
            <a
              href="/My_learn"
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              My Learning
            </a>
            <a
              href="Mentor"
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Mentor Access
            </a>
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Community
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                id="notification-button"
                className="relative text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div
                id="notification-dropdown"
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 hidden"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    Notifications (3)
                  </p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      {
                        title: "New Project Template Available",
                      description:
                        "Check out our latest Arduino Weather Station template",
                        time: "5 minutes ago",
                      icon: "fas fa-file-code",
                      },
                      {
                        title: "Community Milestone",
                      description:
                        "Your Machine Learning project inspired 5 other learners",
                        time: "2 hours ago",
                      icon: "fas fa-users",
                      },
                      {
                        title: "Achievement Unlocked",
                      description:
                        "You've completed your first project milestone!",
                        time: "1 day ago",
                      icon: "fas fa-trophy",
                      },
                    ].map((notification, index) => (
                      <div
                        key={index}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-indigo-600" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {notification.description}
                          </p>
                            <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                            <span className="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                Mark as read
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                <div className="px-4 py-2 border-t border-gray-100">
                    <a
                      href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View all notifications
                    </a>
                  </div>
                </div>
            </div>
            <div className="relative">
              <Avatar id="profile-avatar" className="cursor-pointer">
                <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20young%20professional%20with%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20professional%20photo%2C%20clean%20lighting%2C%20business%20casual%20attire&width=100&height=100&seq=9&orientation=squarish" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div
                id="profile-dropdown"
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                  <a
                    href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                  <i className="fas fa-user mr-2"></i> My Profile
                  </a>
                  <a
                    href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                  <i className="fas fa-cog mr-2"></i> Account Settings
                  </a>
                  <a
                    href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                  <i className="fas fa-folder-open mr-2"></i> My Projects
                  </a>
                  <a
                    href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                  <i className="fas fa-bookmark mr-2"></i> Saved Resources
                  </a>
                    <a
                      href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <i className="fas fa-bell mr-2"></i> Notifications
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <i className="fas fa-question-circle mr-2"></i> Help & Support
                </a>
                <div className="border-t border-gray-100 mt-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Hero/Input Section */}
        <section className="relative mb-16">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl"></div>
<div
className="relative rounded-3xl overflow-hidden"
style={{
backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20abstract%20space%20themed%20background%20with%20stars%20and%20nebulas%20in%20purple%20and%20blue%20colors%2C%20gradient%20from%20dark%20blue%20to%20light%20purple%20on%20left%20side%20for%20text%20readability%2C%20cosmic%20exploration%20theme%2C%20high%20quality%20digital%20art&width=1400&height=500&seq=10&orientation=landscape')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
}}
>
<div className="flex flex-col md:flex-row items-center p-8 md:p-16">
<div className="md:w-1/2 text-left mb-8 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Transform Learning into Building
                </h2>
                <p className="text-lg md:text-xl text-indigo-100 mb-6">
                  Generate personalized projects based on what you've just
                  learned. Turn concepts into hands-on experience.
                </p>
<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
<div className="relative">
<Input
type="text"
placeholder="Enter a concept, paste lecture notes, or describe what you learned"
className="w-full pl-4 pr-12 py-4 text-white bg-white/20 border-none focus:ring-2 focus:ring-indigo-500 rounded-xl placeholder:text-indigo-200"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
/>
<button
className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-indigo-200 transition-colors cursor-pointer"
onClick={handleSearch}
>
{isProcessing ? (
<i className="fas fa-spinner fa-spin text-xl"></i>
) : (
<i className="fas fa-wand-magic-sparkles text-xl"></i>
)}
</button>
</div>
<div className="mt-4 flex flex-col sm:flex-row gap-6">
<div className="flex items-center space-x-4">
<Label className="text-white">Experience:</Label>
<div className="flex bg-white/10 rounded-full p-1">
                        {["Beginner", "Intermediate", "Advanced"].map(
                          (level) => (
<button
key={level}
onClick={() => setExperienceLevel(level)}
className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
experienceLevel === level
                                  ? "bg-indigo-600 text-white"
                                  : "text-indigo-100 hover:bg-white/10"
}`}
>
{level}
</button>
                          ),
                        )}
</div>
</div>
<div className="flex items-center space-x-4">
<Label className="text-white">Time:</Label>
<div className="flex bg-white/10 rounded-full p-1">
                        {["Quick", "Medium", "Extended"].map((time) => (
<button
key={time}
onClick={() => setTimeCommitment(time)}
className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
timeCommitment === time
                                ? "bg-indigo-600 text-white"
                                : "text-indigo-100 hover:bg-white/10"
}`}
>
{time}
</button>
))}
</div>
</div>
</div>
</div>
</div>
<div className="md:w-1/2 flex justify-center">
<img
src="https://readdy.ai/api/search-image?query=modern%20illustration%20of%20diverse%20students%20working%20on%20creative%20projects%2C%20space%20themed%20elements%2C%20planets%20and%20stars%2C%20digital%20devices%2C%20futuristic%20educational%20technology%2C%20vibrant%20colors%2C%20high%20quality%20digital%20art%2C%20clean%20background&width=600&height=500&seq=11&orientation=portrait"
alt="Students exploring creative projects"
className="max-w-full h-auto rounded-xl shadow-2xl"
/>
</div>
</div>
</div>
</section>
        {/* Project Suggestions Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended Projects
            </h2>
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-auto">
              <TabsList>
                <TabsTrigger value="all" className="!rounded-button">
                  All
                </TabsTrigger>
                <TabsTrigger value="coding" className="!rounded-button">
                  Coding
                </TabsTrigger>
                <TabsTrigger value="hardware" className="!rounded-button">
                  Hardware
                </TabsTrigger>
                <TabsTrigger value="design" className="!rounded-button">
                  Design
                </TabsTrigger>
                <TabsTrigger value="research" className="!rounded-button">
                  Research
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col ${
                  selectedProject === project.id ? "ring-2 ring-indigo-500" : ""
                }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <CardHeader className="pb-2 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge
                        variant={
                          project.difficulty === "Beginner"
                            ? "outline"
                            : project.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {project.difficulty}
                      </Badge>
                      <Badge variant="outline" className="ml-2">
                        <Clock className="w-3 h-3 mr-1" /> {project.time}
                      </Badge>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        project.domain === "coding"
                          ? "bg-blue-100"
                          : project.domain === "hardware"
                            ? "bg-green-100"
                            : project.domain === "design"
                              ? "bg-purple-100"
                              : "bg-amber-100"
                      }`}
                    >
                      {project.domain === "coding" ? (
                        <Code className="w-5 h-5 text-blue-600" />
                      ) : project.domain === "hardware" ? (
                        <Cpu className="w-5 h-5 text-green-600" />
                      ) : project.domain === "design" ? (
                        <Palette className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Flask className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 mt-auto">
                  <Button
                    variant="default"
                    className="w-full !rounded-button whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      const dialog = document.getElementById(
                        "start-project-dialog",
                      );
                      if (dialog) {
                        (dialog as HTMLDialogElement).showModal();
                      }
                    }}
                  >
                    <Rocket className="w-4 h-4 mr-2" /> Start Project
                  </Button>
                  <dialog
                    id="start-project-dialog"
                    className="w-full max-w-2xl rounded-xl shadow-lg p-0 backdrop:bg-black/50"
                  >
                    <div className="bg-white rounded-xl">
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              Start Your Project Journey
                            </h3>
                            <p className="text-gray-600 mt-1">
                              Get ready to transform your learning into
                              practical experience
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="!rounded-full"
                            onClick={() => {
                              const dialog = document.getElementById(
                                "start-project-dialog",
                              );
                              if (dialog) {
                                (dialog as HTMLDialogElement).close();
                              }
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-clock text-indigo-600"></i>
                            </div>
                            <div>
                              <h4 className="font-semibold text-indigo-900">
                                Estimated Time
                              </h4>
                              <p className="text-indigo-700">
                                3-4 hours to complete
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Required Materials
                          </h4>
                          <ul className="space-y-2">
                            {[
                              "Code editor",
                              "Web browser",
                              "Sample dataset",
                              "Basic JavaScript knowledge",
                            ].map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-gray-700"
                              >
                                <i className="fas fa-check-circle text-green-500"></i>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Setup Guidance
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Button
                              id="download-template-btn"
                              variant="outline"
                              className="w-full !rounded-button whitespace-nowrap"
                              onClick={() => {
                                const btn = document.getElementById(
                                  "download-template-btn",
                                );
                                if (btn) {
                                  const originalContent = btn.innerHTML;
                                  btn.innerHTML =
                                    '<div class="flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Downloading...</div>';
                                  btn.setAttribute("disabled", "true");
                                  // Simulate file download
                                  setTimeout(() => {
                                    // Create a temporary link element
                                    const link = document.createElement("a");
                                    link.href =
                                      "https://readdy.ai/api/download/template.zip";
                                    link.download = "project-template.zip";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    // Update button state
                                    setTimeout(() => {
                                      btn.innerHTML =
                                        '<div class="flex items-center"><Check className="w-4 h-4 mr-2" /> Downloaded</div>';
                                      btn.removeAttribute("disabled");
                                      // Reset button after 2 seconds
                                      setTimeout(() => {
                                        btn.innerHTML = originalContent;
                                      }, 2000);
                                    }, 1000);
                                  }, 1500);
                                }
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" /> Download
                              Template
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full !rounded-button whitespace-nowrap"
                            >
                              <BookOpen className="w-4 h-4 mr-2" /> View
                              Prerequisites
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            variant="default"
                            className="flex-1 !rounded-button whitespace-nowrap"
                            onClick={() => {
                              const dialog = document.getElementById(
                                "start-project-dialog",
                              );
                              if (dialog) {
                                (dialog as HTMLDialogElement).close();
                                // Mark project as "In Progress"
                                const firstStep = document.querySelector(
                                  ".bg-gray-50.p-4.rounded-lg",
                                );
                                if (firstStep) {
                                  firstStep.classList.remove("bg-gray-50");
                                  firstStep.classList.add(
                                    "bg-indigo-50",
                                    "border",
                                    "border-indigo-100",
                                  );
                                }
                              }
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" /> Begin Now
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 !rounded-button whitespace-nowrap"
                            onClick={() => {
                              const dialog = document.getElementById(
                                "start-project-dialog",
                              );
                              if (dialog) {
                                (dialog as HTMLDialogElement).close();
                              }
                            }}
                          >
                            <Bookmark className="w-4 h-4 mr-2" /> Save for
                            Later
                          </Button>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          You can pause and resume your project at any time
                        </p>
                      </div>
                    </div>
                  </dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        {/* Project Details Panel */}
        {selectedProject && (
          <section className="mb-16 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {projects[selectedProject - 1].title}
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="far fa-bookmark mr-2"></i> Save for Later
                </Button>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-share-alt mr-2"></i> Share
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {projects[selectedProject - 1].objectives.map(
                      (objective, index) => (
                      <li key={index} className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                          <span>{objective}</span>
                      </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Required Materials
                  </h3>
                  <ul className="space-y-2">
                    {projects[selectedProject - 1].materials.map(
                      (material, index) => (
                      <li key={index} className="flex items-start">
                          <i className="fas fa-cube text-indigo-500 mt-1 mr-2"></i>
                          <span>{material}</span>
                      </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Step-by-Step Guidance
                </h3>
                <div className="space-y-4">
                  {projects[selectedProject - 1].steps.map((step, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{step}</h4>
                      </div>
                      <div className="pl-8">
                        <p className="text-gray-600 text-sm">
                          Additional guidance for this step will appear here as
                          you progress.
                        </p>
                        <Button
                          variant="link"
                          className="text-indigo-600 p-0 h-auto !rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-lightbulb mr-1"></i> Get AI hint
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-3 text-xl"></i>
                    <div>
                      <h4 className="font-medium text-indigo-900 mb-1">
                        Pro Tips
                      </h4>
                      <p className="text-indigo-700">
                        {projects[selectedProject - 1].tips}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Related Concepts
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Visualization",
                  "JavaScript",
                  "Web Development",
                  "Responsive Design",
                  "User Experience",
                ].map((concept, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                    className="cursor-pointer"
                    >
                      {concept}
                    </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* Learning Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Learning Resources
          </h2>
          <Swiper
            modules={swiperModules}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-10"
          >
            {resources.map((resource, index) => (
              <SwiperSlide key={index}>
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.image}
                    alt={resource.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {resource.type === "video" && (
                        <i className="fas fa-play mr-1"></i>
                      )}
                      {resource.type === "documentation" && (
                        <i className="fas fa-file-alt mr-1"></i>
                      )}
                      {resource.type === "ebook" && (
                        <i className="fas fa-book mr-1"></i>
                      )}
                      {resource.type === "course" && (
                        <i className="fas fa-graduation-cap mr-1"></i>
                      )}
                      {resource.type === "workshop" && (
                        <i className="fas fa-users mr-1"></i>
                      )}
                    {resource.type}
                  </div>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {resource.title}
                    </h3>
                  <div className="flex justify-between items-center">
                      <Badge variant="outline">Recommended</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                        className="!rounded-button whitespace-nowrap"
                    >
                        <i className="fas fa-external-link-alt mr-1"></i> Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
            >
              <FileCode className="w-4 h-4 mr-2" /> Start with Code Template
            </Button>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => {
                const dialog = document.getElementById("boilerplate-dialog");
                if (dialog) {
                  (dialog as HTMLDialogElement).showModal();
                }
              }}
            >
              <Puzzle className="w-4 h-4 mr-2" /> Use Project
              Boilerplate
            </Button>
            <dialog
              id="boilerplate-dialog"
              className="w-full max-w-4xl rounded-xl shadow-lg p-0 backdrop:bg-black/50"
            >
              <div className="bg-white rounded-xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Project Boilerplates
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Choose a starting point for your project
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="!rounded-full"
                      onClick={() => {
                        const dialog =
                          document.getElementById("boilerplate-dialog");
                        if (dialog) {
                          (dialog as HTMLDialogElement).close();
                        }
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search boilerplates..."
                          className="pl-10"
                        />
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex gap-2">
            <Button
              variant="outline"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <Filter className="w-4 h-4 mr-2" /> Difficulty
                      </Button>
                      <Button
                        variant="outline"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <GitBranch className="w-4 h-4 mr-2" /> Type
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Basic Web App",
                        type: "Frontend",
                        difficulty: "Beginner",
                        image:
                          "https://readdy.ai/api/search-image?query=modern%20web%20application%20interface%20mockup%20with%20clean%20design%2C%20showing%20dashboard%20layout%2C%20neutral%20background%2C%20professional%20UI%20design%20preview&width=300&height=200&seq=12&orientation=landscape",
                        components: ["React", "TailwindCSS", "Basic Routing"],
                        description:
                          "A minimal setup for building modern web applications",
                      },
                      {
                        title: "Full Stack Starter",
                        type: "Full Stack",
                        difficulty: "Intermediate",
                        image:
                          "https://readdy.ai/api/search-image?query=full%20stack%20application%20architecture%20diagram%2C%20modern%20tech%20stack%20visualization%2C%20clean%20professional%20design%2C%20development%20workflow%20illustration&width=300&height=200&seq=13&orientation=landscape",
                        components: ["Next.js", "Prisma", "Authentication"],
                        description:
                          "Complete setup for full-stack web development",
                      },
                      {
                        title: "E-commerce Template",
                        type: "Frontend",
                        difficulty: "Advanced",
                        image:
                          "https://readdy.ai/api/search-image?query=modern%20ecommerce%20website%20template%20preview%2C%20product%20grid%20layout%2C%20shopping%20cart%20interface%2C%20clean%20professional%20design&width=300&height=200&seq=14&orientation=landscape",
                        components: ["Product Grid", "Cart", "Checkout Flow"],
                        description: "Ready-to-use e-commerce foundation",
                      },
                      {
                        title: "API Backend",
                        type: "Backend",
                        difficulty: "Intermediate",
                        image:
                          "https://readdy.ai/api/search-image?query=backend%20API%20architecture%20diagram%2C%20database%20schema%20visualization%2C%20server%20infrastructure%20illustration%2C%20professional%20technical%20design&width=300&height=200&seq=15&orientation=landscape",
                        components: ["Express.js", "MongoDB", "JWT Auth"],
                        description: "Structured backend API starter kit",
                      },
                      {
                        title: "Mobile App Template",
                        type: "Mobile",
                        difficulty: "Advanced",
                        image:
                          "https://readdy.ai/api/search-image?query=mobile%20app%20UI%20template%20preview%2C%20app%20screens%20layout%2C%20navigation%20flow%2C%20modern%20mobile%20interface%20design&width=300&height=200&seq=16&orientation=landscape",
                        components: [
                          "React Native",
                          "Navigation",
                          "State Management",
                        ],
                        description: "Mobile app development foundation",
                      },
                      {
                        title: "Landing Page",
                        type: "Frontend",
                        difficulty: "Beginner",
                        image:
                          "https://readdy.ai/api/search-image?query=modern%20landing%20page%20template%20preview%2C%20hero%20section%20layout%2C%20features%20grid%2C%20clean%20marketing%20website%20design&width=300&height=200&seq=17&orientation=landscape",
                        components: [
                          "Hero Section",
                          "Features Grid",
                          "Contact Form",
                        ],
                        description: "Professional landing page starter",
                      },
                    ].map((boilerplate, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative h-40">
                          <img
                            src={boilerplate.image}
                            alt={boilerplate.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge
                            variant={
                              boilerplate.difficulty === "Beginner"
                                ? "outline"
                                : boilerplate.difficulty === "Intermediate"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="absolute top-2 right-2"
                          >
                            {boilerplate.difficulty}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">
                              {boilerplate.title}
                            </h4>
                            <Badge variant="outline">{boilerplate.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {boilerplate.description}
                          </p>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {boilerplate.components.map((component, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {component}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              variant="default"
                              className="w-full !rounded-button whitespace-nowrap"
                              onClick={() => {
                                const btn = document.getElementById(
                                  `download-btn-${index}`,
                                );
                                if (btn) {
                                  const originalContent = btn.innerHTML;
                                  btn.innerHTML =
                                    '<div class="flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Downloading...</div>';
                                  btn.setAttribute("disabled", "true");
                                  setTimeout(() => {
                                    const link = document.createElement("a");
                                    link.href = `https://readdy.ai/api/download/boilerplate-${index}.zip`;
                                    link.download = `${boilerplate.title.toLowerCase().replace(/\s+/g, "-")}-boilerplate.zip`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    setTimeout(() => {
                                      btn.innerHTML =
                                        '<div class="flex items-center"><Check className="w-4 h-4 mr-2" /> Downloaded</div>';
                                      btn.removeAttribute("disabled");
                                      setTimeout(() => {
                                        btn.innerHTML = originalContent;
                                      }, 2000);
                                    }, 1000);
                                  }, 1500);
                                }
                              }}
                              id={`download-btn-${index}`}
                            >
                              <Download className="w-4 h-4 mr-2" /> Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </dialog>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4 mr-2" /> Find a Tutorial
            </Button>
          </div>
        </section>
        {/* Community Integration & Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Track Your Progress
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Overall Completion</h3>
                  <span className="text-sm font-medium text-gray-500">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Milestones</h3>
                  <ul className="space-y-3">
                    {[
                      "Project Setup",
                      "Core Functionality",
                      "Testing & Debugging",
                      "Final Touches",
                    ].map((milestone, index) => (
                        <li key={index} className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                            index < 2
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                            }`}
                          >
                          {index < 2 && (
                            <i className="fas fa-check text-xs"></i>
                          )}
                          </div>
                          <span
                          className={
                            index < 2 ? "line-through text-gray-500" : ""
                          }
                          >
                            {milestone}
                          </span>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Achievements</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: Rocket,
                        label: "First Project",
                        earned: true,
                      },
                      { icon: Flame, label: "3-Day Streak", earned: true },
                      {
                        icon: Lightbulb,
                        label: "Creative Solution",
                        earned: true,
                      },
                      { icon: UserPlus, label: "Team Player", earned: false },
                      {
                        icon: GitBranch,
                        label: "Code Master",
                        earned: false,
                      },
                      { icon: Trophy, label: "Expert", earned: false },
                    ].map((badge, index) => {
                      const IconComponent = badge.icon;
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                              badge.earned
                                ? "bg-indigo-100 text-indigo-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <span className="text-xs text-center">
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Recommended Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="default"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <GitBranch className="w-4 h-4 mr-2" /> Add Advanced
                    Features
                  </Button>
                  <Button
                    variant="default"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <Share className="w-4 h-4 mr-2" /> Share Your Project
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> Explore Related
                    Concepts
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                    onClick={() => {
                      const dialog =
                        document.getElementById("study-group-dialog");
                      if (dialog) {
                        (dialog as HTMLDialogElement).showModal();
                      }
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" /> Join a Study Group
                  </Button>
                  <dialog
                    id="study-group-dialog"
                    className="w-full max-w-4xl rounded-xl shadow-lg p-0 backdrop:bg-black/50"
                  >
                    <div className="bg-white rounded-xl">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              Study Groups
                            </h3>
                            <p className="text-gray-600 mt-1">
                              Find the perfect group to learn and grow together
                            </p>
                </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="!rounded-full"
                            onClick={() => {
                              const dialog =
                                document.getElementById("study-group-dialog");
                              if (dialog) {
                                (dialog as HTMLDialogElement).close();
                              }
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex gap-4 mb-6">
                          <div className="flex-1">
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="Search study groups..."
                                className="pl-10"
                              />
                              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <Signal className="w-4 h-4 mr-2" /> Skill Level
                            </Button>
                            <Button
                              variant="outline"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <Folder className="w-4 h-4 mr-2" /> Project
                              Type
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          {[
                            {
                              name: "Interactive Dashboard Builders",
                              members: 8,
                              maxMembers: 10,
                              schedule: "Tuesdays & Thursdays, 7PM EST",
                              skillLevel: "Intermediate",
                              focus: "Data Visualization",
                              description:
                                "Working together on building interactive dashboards using modern web technologies.",
                              nextMeeting: "2025-06-16",
                            },
                            {
                              name: "Full Stack Development Circle",
                              members: 6,
                              maxMembers: 8,
                              schedule: "Mondays & Wednesdays, 6PM EST",
                              skillLevel: "Advanced",
                              focus: "Web Development",
                              description:
                                "Deep diving into full stack development with React and Node.js.",
                              nextMeeting: "2025-06-15",
                            },
                            {
                              name: "UI/UX Design Workshop",
                              members: 5,
                              maxMembers: 8,
                              schedule: "Fridays, 5PM EST",
                              skillLevel: "Beginner",
                              focus: "Design",
                              description:
                                "Learning and applying UI/UX principles in real projects.",
                              nextMeeting: "2025-06-20",
                            },
                          ].map((group, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-6 rounded-xl"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {group.name}
                                  </h4>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-gray-500">
                                      <i className="fas fa-users mr-1"></i>{" "}
                                      {group.members}/{group.maxMembers} members
                                    </span>
                                    <Badge variant="outline">
                                      {group.skillLevel}
                                    </Badge>
                                    <Badge variant="secondary">
                                      {group.focus}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  variant="default"
                                  className="!rounded-button whitespace-nowrap"
                                >
                                  Join Group
                                </Button>
                              </div>
                              <p className="text-gray-600 mb-4">
                                {group.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-500">
                                    <i className="far fa-calendar mr-1"></i>{" "}
                                    {group.schedule}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    <i className="far fa-clock mr-1"></i> Next:{" "}
                                    {group.nextMeeting}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap"
                                >
                                  <Eye className="w-4 h-4 mr-1" /> View
                                  Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-xl text-center">
                          <h4 className="font-semibold text-indigo-900 mb-2">
                            Don't see a group that matches your interests?
                          </h4>
                          <p className="text-indigo-700 mb-4">
                            Create your own study group and connect with
                            learners who share your goals.
                          </p>
                          <Button
                            variant="default"
                            className="!rounded-button whitespace-nowrap"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Create New
                            Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Others Working on This</h3>
                <ScrollArea className="h-[200px] pr-4">
                  {communityMembers.map((member, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <Avatar className="mr-3">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{member.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-user-plus text-xs"></i>
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                          {member.project}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${member.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Questions & Help</h3>
                  <Button
                    variant="link"
                    className="p-0 h-auto !rounded-button whitespace-nowrap"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    "How do I connect the temperature sensor to Arduino?",
                    "Best practices for responsive dashboard design?",
                    "Trouble with image classification accuracy",
                  ].map((question, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm">{question}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">2 answers</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs !rounded-button whitespace-nowrap"
                        >
                          Answer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-3">Connect with Mentors</h3>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-700 mb-3">
                    Get personalized guidance from experts in your field of
                    interest.
                  </p>
                  <a
                    href="Mentor"
                    data-readdy="true"
                  >
                  <Button
                    variant="default"
                      className="w-full !rounded-button whitespace-nowrap"
                  >
                      <UserCheck className="w-4 h-4 mr-2" /> Find a
                      Mentor
                  </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-rocket text-white text-sm"></i>
                </div>
                <h3 className="text-xl font-bold">IntellDev</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your learning journey with personalized, hands-on
                projects that reinforce concepts and build real skills.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Get weekly updates on new projects and learning resources.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white rounded-l-lg rounded-r-none border-r-0"
                />
                <Button
                  variant="default"
                  className="rounded-l-none !rounded-button whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <div className="mt-4 flex space-x-3">
                <i className="fab fa-cc-visa text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-paypal text-gray-400 text-2xl"></i>
            </div>
          </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-500 text-sm">
            <p>
              © 2025 IntellDev. All rights reserved. | Last updated: June
              14, 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;

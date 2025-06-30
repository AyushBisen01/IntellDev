# IntellDev - Learning Project Platform

A modern, interactive platform that transforms learning into hands-on building experiences. IntellDev helps learners create personalized projects based on their learning journey, turning concepts into practical applications.

## 🚀 Features

### Core Functionality
- **AI-Powered Project Generation**: Generate personalized projects based on learning concepts
- **Multi-Step Project Creation**: Comprehensive form with 6 steps for detailed project creation
- **Project Discovery**: Browse and filter projects by category, difficulty, and domain
- **Progress Tracking**: Monitor learning milestones and achievements
- **Community Integration**: Connect with other learners and mentors
- **Mentor Dashboard**: Comprehensive dashboard for mentors to manage students and track progress
- **Mentor Connection System**: Connect with expert mentors for personalized guidance and support
- **Task Management**: Create, assign, and track tasks for students
- **Student Management**: Complete student profile management and progress monitoring

### Project Categories
- **Coding**: Web development, mobile apps, data visualization
- **Hardware**: Arduino projects, IoT devices, robotics
- **Design**: UI/UX prototypes, graphic design projects
- **Research**: Literature reviews, scientific investigations

### Mentor Features
- **Mentor Dashboard**: Analytics and insights for student progress tracking
- **Student Management**: View and manage student profiles, progress, and performance
- **Session Scheduling**: Book and manage mentoring sessions with students
- **Task Assignment**: Create and assign tasks to students with deadlines and priorities
- **Progress Monitoring**: Real-time tracking of student achievements and learning milestones
- **Communication Tools**: Built-in messaging and feedback system
- **Performance Analytics**: Detailed reports on student performance and project completion rates

### User Experience
- **Dark/Light Theme Toggle**: Personalized viewing experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Validation**: Form validation with helpful error messages
- **Interactive Previews**: Preview projects before publishing

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **Charts**: ECharts
- **Carousel**: Swiper.js
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/smeet96/HRX-13.git
   cd HRX-13
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
IntellDev/
├── app/                           # Next.js app directory
│   ├── page.tsx                  # Home page with project discovery
│   ├── layout.tsx                # Root layout component
│   ├── loading.tsx               # Loading component
│   ├── globals.css               # Global styles
│   ├── create_project/           # Project creation page
│   │   └── page.tsx              # Multi-step project form
│   ├── projects/                 # Projects listing page
│   │   └── page.tsx              # Browse and filter projects
│   ├── Mentor/                   # Mentor page
│   │   └── page.tsx              # Mentor profiles and scheduling
│   ├── Mentor_dashboard/         # Mentor dashboard
│   │   └── page.tsx              # Mentor analytics and student management
│   ├── Student/                  # Student management page
│   │   └── page.tsx              # Student profiles and progress tracking
│   ├── Task/                     # Task management page
│   │   └── page.tsx              # Task creation and assignment
│   └── My_learn/                 # Learning dashboard
│       └── page.tsx              # Personal learning progress and projects
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── ... (other UI components)
│   └── theme-provider.tsx        # Theme management
├── lib/                         # Utility functions
│   ├── gpt.ts                   # AI integration with OpenRouter
│   └── utils.ts                 # Helper utilities
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
├── public/                      # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   └── ... (other static files)
├── styles/                      # Global styles
│   └── globals.css              # Additional global styles
├── package.json                 # Project dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
└── README.md                    # Project documentation
```

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with AI-powered project generation
- Recommended projects grid with filtering
- Learning resources and community features
- Progress tracking and achievements

### Project Creation (`/create_project`)
- 6-step form process:
  1. **Basics**: Title, description, category, domain
  2. **Difficulty**: Level selection and time estimation
  3. **Steps**: Step-by-step instructions
  4. **Materials**: Required materials and learning objectives
  5. **Images**: Project images and gallery
  6. **Preview**: Final review and submission

### Projects Listing (`/projects`)
- Browse all available projects
- Filter by category, difficulty, and domain
- Search functionality
- Project cards with key information

### Mentor Dashboard (`/Mentor_dashboard`)
- Comprehensive analytics dashboard for mentors
- Student progress overview with charts and statistics
- Recent project submissions and reviews
- Upcoming mentoring sessions
- Quick actions for student management

### Student Management (`/Student`)
- Complete student roster management
- Student profiles with progress tracking
- Performance analytics and achievements
- Communication tools and messaging
- Task assignment and monitoring

### Task Management (`/Task`)
- Create and assign tasks to students
- Task filtering by status, priority, and type
- Progress tracking and completion monitoring
- Bulk task operations and management
- Detailed task analytics and reporting

### Mentor Connection (`/Mentor`)
- Browse available mentors and their expertise
- Schedule mentoring sessions
- View mentor profiles and availability
- Session history and feedback system
- Direct communication with mentors

### Learning Dashboard (`/My_learn`)
- Personal learning progress tracking
- Active and completed projects
- Mentor session history
- Performance analytics and achievements
- Skill development tracking

## 🎨 UI Components

The project uses shadcn/ui components for a consistent and modern design:

- **Navigation**: Header with theme toggle and user menu
- **Forms**: Input fields, textareas, selects, and validation
- **Cards**: Project displays and information panels
- **Modals**: Dialogs for filters and confirmations
- **Progress**: Progress bars and step indicators
- **Charts**: Data visualization with ECharts

## 🔧 Configuration

### Environment Setup
- Node.js 18+ required
- npm or yarn package manager
- Modern browser with ES6+ support

### Dependencies
Key dependencies include:
- `next`: 14.x
- `react`: 18.x
- `typescript`: 5.x
- `tailwindcss`: 3.x
- `@radix-ui/*`: UI primitives
- `lucide-react`: Icons
- `echarts`: Charts
- `swiper`: Carousel

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




## 🔄 Recent Updates

- ✅ Fixed navigation links between pages
- ✅ Resolved dependency conflicts with `--legacy-peer-deps`
- ✅ Added proper TypeScript types
- ✅ Implemented responsive design
- ✅ Added dark/light theme toggle
- ✅ Created comprehensive project creation form
- ✅ Added project filtering and search functionality

---

**IntellDev** - Transforming learning into building, one project at a time. 🚀
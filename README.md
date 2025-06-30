# IntellDev - Learning Project Platform

A modern, interactive platform that transforms learning into hands-on building experiences. IntellDev helps learners create personalized projects based on their learning journey, turning concepts into practical applications.

## 🚀 Features

### Core Functionality
- **AI-Powered Project Generation**: Generate personalized projects based on learning concepts
- **Multi-Step Project Creation**: Comprehensive form with 6 steps for detailed project creation
- **Project Discovery**: Browse and filter projects by category, difficulty, and domain
- **Progress Tracking**: Monitor learning milestones and achievements
- **Community Integration**: Connect with other learners and mentors

### Project Categories
- **Coding**: Web development, mobile apps, data visualization
- **Hardware**: Arduino projects, IoT devices, robotics
- **Design**: UI/UX prototypes, graphic design projects
- **Research**: Literature reviews, scientific investigations

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
HRX-13/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with project discovery
│   ├── project/           # Project creation page
│   │   └── page.tsx       # Multi-step project form
│   └── projects/          # Projects listing page
│       └── page.tsx       # Browse and filter projects
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme management
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with AI-powered project generation
- Recommended projects grid with filtering
- Learning resources and community features
- Progress tracking and achievements

### Project Creation (`/project`)
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
# ML Explorer - Online Course Platform UI Prototype

A modern, interactive web application prototype for an online course platform focused on Machine Learning education. This is a static website built with React, designed to demonstrate UI/UX concepts and HCI principles.

## Features

- **User Authentication**: Login and registration pages with form validation
- **Course Dashboard**: Browse courses with progress tracking
- **Interactive Learning**: Rich content pages with code snippets, charts, diagrams, and tables
- **Assessments & Quizzes**: Interactive quiz system with scoring and feedback
- **Progress Tracking**: Real-time progress tracking for individual courses and overall completion
- **Achievement System**: Badges and trophies for various accomplishments
- **Certificates**: Downloadable certificates for completed courses
- **Interactive Labs**: Hands-on coding exercises and demos
- **Contact Page**: Contact form with validation

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Recharts** - Chart library for interactive visualizations
- **Prism.js** - Syntax highlighting for code blocks
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Project Structure

```
mlexplorer/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Common UI components
│   │   ├── course/      # Course-related components
│   │   ├── learning/    # Learning content components
│   │   ├── assessment/  # Quiz/assessment components
│   │   ├── labs/        # Lab components
│   │   └── achievements/# Badge/achievement components
│   ├── pages/           # Page components
│   ├── data/            # Mock data and configurations
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## Key Features

### Progress Tracking
- Individual course progress (percentage complete)
- Overall progress across all courses
- Lesson completion tracking
- Progress persistence using localStorage

### Achievement System
- Multiple badge categories (course completion, quiz mastery, milestones, streaks, etc.)
- Badge unlocking based on progress and accomplishments
- Visual distinction between earned and locked badges
- Achievement notifications

### Interactive Content
- Syntax-highlighted code snippets
- Interactive charts and graphs
- Sortable data tables
- Responsive design for all screen sizes

## Deployment

This is a static website that can be deployed to:

- **Netlify**: Connect your repository or drag and drop the `dist` folder
- **Vercel**: Connect your repository or use the Vercel CLI
- **GitHub Pages**: Use GitHub Actions or deploy the `dist` folder
- **Any static hosting service**: Upload the contents of the `dist` folder

## Notes

- This is a prototype with no backend functionality
- All data is stored in localStorage (browser storage)
- Form submissions are simulated (no actual API calls)
- Progress and achievements persist in the browser

## License

This project is created for educational purposes as part of an HCI course.


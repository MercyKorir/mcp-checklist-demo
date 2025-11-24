# Modern Classrooms Printables Demo

Standalone demonstration of the Modern Classrooms Project's printables feature. This application showcases how educators can create customized, printable educational materials for their students based on curriculum content.

## Overview

### Checklist

Create customizable student progress tracker checklists. For reference, you can find an exemplar [student progress tracker checklist in Google Docs here](https://docs.google.com/document/d/1xsjG1L4HaFEswjLuS95hRO0QTCXRaofH3rLUplb47dk/edit?usp=sharing).

**Features**:
- **Section Selection**: Choose from different curriculum sections
- **Lesson Filtering**: Select specific lessons to include
- **Border Styles**: Choose from 4 decorative border designs
- **Color Options**: Full color or black & white printing
- **Customization Options**:
  - Include/exclude class name
  - Include/exclude video hyperlinks
  - Add teacher sign-off section
- **Export Options**:
  - Print directly
  - Export to Google Docs

### Game Board

Design engaging game board-style printouts to visualize learning paths. For reference, you can find an example game boards below:
- [Game Board Example with Multi-Page](https://docs.google.com/document/d/1HBBNKLMYgg9cN2mxjyduqjrH2ocrhy_TVAcV9jn6hXw/edit?usp=sharing)
- [Game Board Example with Editable Table](https://docs.google.com/document/d/1mIzgRt9MJPUpvW8yZiR8H2ivsvnxZR8xPXI6lkL1x_M/edit?usp=sharing)

**Features**:
- **Section Selection**: Choose from different curriculum sections
- **Lesson Divider Styles**: 4 different lesson display options
  - Lesson Name
  - Lesson Number
  - Lesson Name + Graphic
  - Lesson Number + Graphic
- **Graphic Themes**: Nature, School, or Sports themed graphics
- **Color Options**: Full color or black & white printing
- **Landscape Orientation**: Optimized for game board layout
- **Export Options**:
  - Print directly
  - Export to Google Docs (_coming soon_)

## Roadmap

- **Export Game Board to Google Docs**:
  - Export editable Game Boards to a Google Docs
  - Preserve the game board styles and features
  - Faithful, pixel-perfect recreation in Google Docs

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Clone or download this directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Google Drive integration:
   - Copy `.env.example` to `.env`
   - Add your Google Client ID to enable Google Docs export:
     ```
     VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5174](http://localhost:5174)

**Routes**:
- `/` - Home page
- `/demo/checklist` - Checklist printout demo
- `/demo/gameboard` - Game Board printout demo

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Development

### Type Checking

Run TypeScript type checker:

```bash
npm run typecheck
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Technology Stack

- **Framework**: React 19 with Vite
- **Routing**: React Router v7
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives
- **PDF Generation**: @react-pdf/renderer
- **PDF Viewing**: @mikecousins/react-pdf with pdfjs-dist
- **State Management**: React hooks with URL search params
- **Type Safety**: TypeScript with strict mode

## Project Structure

```
standalone/
├── public/                # Static assets (border SVG files)
├── src/
│   ├── pages/             # Route components
│   │   ├── HomePage.tsx   # Landing page with demo navigation
│   │   ├── ChecklistDemo.tsx  # Checklist demo page
│   │   └── GameBoardDemo.tsx  # Game Board demo page
│   ├── components/
│   │   ├── demo/          # Demo-specific components
│   │   ├── printables/    # Printable components (checklist, gameboard)
│   │   └── ui/            # Reusable UI components
│   ├── const/             # Constants and enums
│   ├── data/              # Mock data for demos
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Router setup
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── tailwind.config.ts     # TailwindCSS configuration
```

## Demo Data

The application uses mock data representing a sample Illustrative Mathematics Grade 6 curriculum:
- **Course**: Illustrative Mathematics - Grade 6
- **Unit**: Unit 1: Area & Surface Area
- **Section**: Section A: Reasoning to Find Area
- **Lessons**: 3 sample lessons with various activities

## Live Preview

Working demos are deployed at:
- [Checklist Demo](http://app.staging.modernclassrooms.org/demo/checklist)
- [Game Board Demo](http://app.staging.modernclassrooms.org/demo/gameboard)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© Modern Classrooms Project
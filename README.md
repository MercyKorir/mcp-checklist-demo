# Checklist Demo

A standalone demonstration of the Modern Classrooms Project checklist printable feature. This application showcases how educators can create customized, printable checklists for their students based on curriculum content.

For reference, you can find an exemplar [student progress tracker checklist in Google Docs here](https://docs.google.com/document/d/1xsjG1L4HaFEswjLuS95hRO0QTCXRaofH3rLUplb47dk/edit?usp=sharing).

## Features

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
  - Export to Google Docs (_coming soon_)

## Roadmap

- **Export to Google Docs**:
  - Export student Lessons to a Google Doc with editable tables
  - Preserve the checklist styles and features
  - Faithful, pixel-perfect recreation in Google Docs
  - Here is a [screencast explanation](https://us06web.zoom.us/clips/share/dAsqRIJVS4WKHX_8Cy5LPw)

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

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives
- **PDF Generation**: @react-pdf/renderer
- **PDF Viewing**: @mikecousins/react-pdf with pdfjs-dist
- **State Management**: React hooks
- **Type Safety**: TypeScript with strict mode

## Project Structure

```
standalone/
├── public/                 # Static assets (border SVG files)
├── src/
│   ├── components/
│   │   ├── demo/          # Demo-specific components
│   │   ├── printables/    # Checklist and PDF components
│   │   └── ui/            # Reusable UI components
│   ├── const/             # Constants and enums
│   ├── data/              # Mock data for demo
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
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

Here's a working demo of this app is deployed [here](http://app.staging.modernclassrooms.org/demo/checklist).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© Modern Classrooms Project
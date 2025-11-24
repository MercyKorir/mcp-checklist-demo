import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Modern Classrooms Printable Demos</h1>
            <p className="text-lg text-muted-foreground">
              Explore interactive demos of Modern Classrooms printable features. Customize and preview educational materials in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Checklist Demo Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-primary mb-3">Checklist Printout</h2>
              <p className="text-muted-foreground mb-6">
                Create customizable checklists for students to track their progress through lessons and activities. Features include
                borders, colors, video links, and teacher sign-off options.
              </p>
              <Link to="/demo/checklist">
                <Button className="w-full">View Checklist Demo</Button>
              </Link>
            </div>

            {/* Game Board Demo Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-primary mb-3">Game Board Printout</h2>
              <p className="text-muted-foreground mb-6">
                Design engaging game board-style printouts to visualize learning paths. Customize lesson dividers, graphic themes, and
                more to create unique educational experiences.
              </p>
              <Link to="/demo/gameboard">
                <Button className="w-full">View Game Board Demo</Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              These demos use mock data and run entirely in your browser. No backend connection required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface JsonDisplayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseSection: Record<string, unknown>
  lessons: unknown[]
  settings: Record<string, unknown>
}

export function JsonDisplayModal({ open, onOpenChange, courseSection, lessons, settings }: JsonDisplayModalProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['section', 'lessons', 'settings']))

  // Circular reference handler for JSON.stringify
  const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (_key: string, value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]'
        }
        seen.add(value)
      }
      return value
    }
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`)
    } catch (error) {
      console.error('Failed to copy:', error)
      toast.error('Failed to copy to clipboard')
    }
  }

  const copyAll = async () => {
    const allData = {
      courseSection,
      lessons,
      settings,
    }
    await copyToClipboard(JSON.stringify(allData, getCircularReplacer(), 2), 'All data')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Display JSON</DialogTitle>
          <DialogDescription>View and copy the raw data used to generate this checklist</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Course/Section Data */}
          <div className="border rounded-lg">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection('section')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleSection('section')
                }
              }}
              role="button"
              tabIndex={0}
            >
              <h3 className="font-semibold">Course/Section</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(JSON.stringify(courseSection, getCircularReplacer(), 2), 'Course/Section')
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <span className="text-sm text-muted-foreground">{expandedSections.has('section') ? '▼' : '▶'}</span>
              </div>
            </div>
            {expandedSections.has('section') && (
              <pre className="p-4 text-xs font-mono overflow-x-auto bg-background">{JSON.stringify(courseSection, getCircularReplacer(), 2)}</pre>
            )}
          </div>

          {/* Lessons Data */}
          <div className="border rounded-lg">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection('lessons')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleSection('lessons')
                }
              }}
              role="button"
              tabIndex={0}
            >
              <h3 className="font-semibold">Lessons ({Array.isArray(lessons) ? lessons.length : 0})</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(JSON.stringify(lessons, getCircularReplacer(), 2), 'Lessons')
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <span className="text-sm text-muted-foreground">{expandedSections.has('lessons') ? '▼' : '▶'}</span>
              </div>
            </div>
            {expandedSections.has('lessons') && (
              <pre className="p-4 text-xs font-mono overflow-x-auto bg-background">{JSON.stringify(lessons, getCircularReplacer(), 2)}</pre>
            )}
          </div>

          {/* Settings Data */}
          <div className="border rounded-lg">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection('settings')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleSection('settings')
                }
              }}
              role="button"
              tabIndex={0}
            >
              <h3 className="font-semibold">Settings</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(JSON.stringify(settings, getCircularReplacer(), 2), 'Settings')
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <span className="text-sm text-muted-foreground">{expandedSections.has('settings') ? '▼' : '▶'}</span>
              </div>
            </div>
            {expandedSections.has('settings') && (
              <pre className="p-4 text-xs font-mono overflow-x-auto bg-background">{JSON.stringify(settings, getCircularReplacer(), 2)}</pre>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={copyAll}>
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

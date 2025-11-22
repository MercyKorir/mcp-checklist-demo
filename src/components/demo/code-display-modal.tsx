import { Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

interface SourceFile {
  path: string
  name: string
  content: string
}

interface CodeDisplayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sourceFiles: SourceFile[]
}

export function CodeDisplayModal({ open, onOpenChange, sourceFiles }: CodeDisplayModalProps) {
  const [activeTab, setActiveTab] = useState(sourceFiles[0]?.name || '')

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`)
    } catch (error) {
      console.error('Failed to copy:', error)
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Source Code</DialogTitle>
          <DialogDescription>View and copy the source code used to generate this checklist</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            {/* First row - files 0-4 */}
            <TabsList className="grid grid-cols-5 gap-1 w-full flex-shrink-0">
              {sourceFiles.slice(0, 5).map((file) => (
                <TabsTrigger key={file.name} value={file.name} className="text-xs truncate">
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Second row - files 5-9 */}
            <TabsList className="grid grid-cols-5 gap-1 w-full flex-shrink-0">
              {sourceFiles.slice(5, 10).map((file) => (
                <TabsTrigger key={file.name} value={file.name} className="text-xs truncate">
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Third row - files 10-14 */}
            <TabsList className="grid grid-cols-5 gap-1 w-full flex-shrink-0">
              {sourceFiles.slice(10, 15).map((file) => (
                <TabsTrigger key={file.name} value={file.name} className="text-xs truncate">
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {sourceFiles.map((file) => (
                <TabsContent key={file.name} value={file.name} className="h-full mt-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-mono">{file.path}</span>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(file.content, file.name)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto overflow-y-auto max-h-[60vh] bg-muted rounded border">
                    {file.content}
                  </pre>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

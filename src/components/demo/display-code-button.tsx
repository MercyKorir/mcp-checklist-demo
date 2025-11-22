import { useState } from 'react'
import { Button } from '../ui/button'
import { CodeDisplayModal } from './code-display-modal'

interface SourceFile {
  path: string
  name: string
  content: string
}

interface DisplayCodeButtonProps {
  sourceFiles: SourceFile[]
}

export function DisplayCodeButton({ sourceFiles }: DisplayCodeButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Display Code</Button>
      <CodeDisplayModal open={isOpen} onOpenChange={setIsOpen} sourceFiles={sourceFiles} />
    </>
  )
}

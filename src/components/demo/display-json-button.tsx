import { useState } from 'react'
import { Button } from '../ui/button'
import { JsonDisplayModal } from './json-display-modal'

interface DisplayJsonButtonProps {
  courseSection: Record<string, unknown>
  lessons: unknown[]
  settings: Record<string, unknown>
}

export function DisplayJsonButton({ courseSection, lessons, settings }: DisplayJsonButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Display JSON</Button>
      <JsonDisplayModal open={isOpen} onOpenChange={setIsOpen} courseSection={courseSection} lessons={lessons} settings={settings} />
    </>
  )
}

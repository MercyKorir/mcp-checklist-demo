import { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { cn } from '../../../lib/utils'

export enum GraphicTheme {
  NATURE = 'nature',
  SCHOOL = 'school',
  SPORTS = 'sports',
}

interface SelectGraphicThemeProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export const SelectGraphicTheme: FC<SelectGraphicThemeProps> = ({ value, onValueChange, disabled = false }) => {
  const graphicThemes = [
    { label: 'Nature', value: GraphicTheme.NATURE },
    { label: 'School', value: GraphicTheme.SCHOOL },
    { label: 'Sports', value: GraphicTheme.SPORTS },
  ]
  return (
    <div className="flex flex-col gap-2">
      <span className={cn('text-sm font-medium text-nowrap', disabled && 'text-gray-500')}>Graphic Theme</span>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="w-full tablet:w-[280px]">
          <SelectValue placeholder="Select graphic theme" />
        </SelectTrigger>
        <SelectContent>
          {graphicThemes.map((theme) => (
            <SelectItem key={theme.value} value={theme.value}>
              {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

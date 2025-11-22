import { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

export enum Color {
  FULL_COLOR = 'full_color',
  BLACK_AND_WHITE = 'black_and_white',
}

interface SelectColorProps {
  value: string
  onValueChange: (value: string) => void
}

export const SelectColor: FC<SelectColorProps> = ({ value, onValueChange }) => {
  const colors = [
    { label: 'Full color', value: Color.FULL_COLOR },
    { label: 'Black and white', value: Color.BLACK_AND_WHITE },
  ]
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-nowrap">Color</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full tablet:w-[280px]">
          <SelectValue placeholder="Select color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color.value} value={color.value}>
              {color.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

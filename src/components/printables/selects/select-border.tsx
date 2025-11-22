import { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

export enum Border {
  BORDER_1 = 'border_1',
  BORDER_2 = 'border_2',
  BORDER_3 = 'border_3',
  BORDER_4 = 'border_4',
}

interface SelectBorderProps {
  value: string
  onValueChange: (value: string) => void
}

export const SelectBorder: FC<SelectBorderProps> = ({ value, onValueChange }) => {
  const borders = [
    { label: '/border-1.svg', value: Border.BORDER_1 },
    { label: '/border-2.svg', value: Border.BORDER_2 },
    { label: '/border-3.svg', value: Border.BORDER_3 },
    { label: '/border-4.svg', value: Border.BORDER_4 },
  ]
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-nowrap">Border</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full tablet:w-[280px]">
          <SelectValue placeholder="Select border" />
        </SelectTrigger>
        <SelectContent>
          {borders.map((border) => (
            <SelectItem key={border.value} value={border.value}>
              <img src={border.label} alt={border.label} className="w-[300px] h-[20px]" />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

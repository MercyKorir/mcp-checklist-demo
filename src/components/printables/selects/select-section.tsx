import { FC } from 'react'
import { UnitEntity } from '../../../types/api-types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select'

interface SelectSectionProps {
  units: UnitEntity[]
  value?: string
  onValueChange: (value: string | undefined) => void
}

export const SelectSection: FC<SelectSectionProps> = ({ units, value, onValueChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-nowrap">Section</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select section" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectGroup key={unit.id}>
              <SelectLabel>{unit.name}</SelectLabel>
              {unit.sections.map((section) => (
                <SelectItem key={section.id} value={section.id}>
                  {section.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

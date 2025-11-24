import { FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

export enum LessonDivider {
  LESSON_NAME = 'lesson_name',
  LESSON_NUMBER = 'lesson_number',
  LESSON_NAME_AND_GRAPHIC = 'lesson_name_and_graphic',
  LESSON_NUMBER_AND_GRAPHIC = 'lesson_number_and_graphic',
}

interface SelectLessonDividerProps {
  value: string
  onValueChange: (value: string) => void
}

export const SelectLessonDivider: FC<SelectLessonDividerProps> = ({ value, onValueChange }) => {
  const lessonDividers = [
    { label: 'Lesson Name', value: LessonDivider.LESSON_NAME },
    { label: 'Lesson Number', value: LessonDivider.LESSON_NUMBER },
    { label: 'Lesson Name + Graphic', value: LessonDivider.LESSON_NAME_AND_GRAPHIC },
    { label: 'Lesson Number + Graphic', value: LessonDivider.LESSON_NUMBER_AND_GRAPHIC },
  ]
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-nowrap">Lesson Divider</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full tablet:w-[280px]">
          <SelectValue placeholder="Select lesson divider" />
        </SelectTrigger>
        <SelectContent>
          {lessonDividers.map((divider) => (
            <SelectItem key={divider.value} value={divider.value}>
              {divider.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

import { useCallback, useState } from 'react'
import { Border } from '../components/printables/selects/select-border'
import { Color } from '../components/printables/selects/select-color'

export enum YesNo {
  YES = 'YES',
  NO = 'NO',
}

export interface DefaultChecklistOptions {
  defaultSectionId?: string | null
  defaultBorder?: Border
  defaultColor?: Color
  defaultTeacherSignOff?: YesNo
  defaultIncludeVideoHyperlinks?: YesNo
  defaultIncludeClassName?: YesNo
  defaultSelectedLessonIds?: string[]
}

export interface ChecklistOptions {
  sectionId: string | null
  border: Border
  color: Color
  teacherSignOff: YesNo
  includeVideoHyperlinks: YesNo
  includeClassName: YesNo
  selectedLessonIds: string[]
}

export const useChecklistOptions = ({
  defaultSectionId = null,
  defaultBorder = Border.BORDER_1,
  defaultColor = Color.FULL_COLOR,
  defaultTeacherSignOff = YesNo.YES,
  defaultIncludeVideoHyperlinks = YesNo.YES,
  defaultIncludeClassName = YesNo.YES,
  defaultSelectedLessonIds = [],
}: DefaultChecklistOptions = {}) => {
  const [options, setOptions] = useState<ChecklistOptions>({
    sectionId: defaultSectionId,
    border: defaultBorder || Border.BORDER_1,
    color: defaultColor || Color.FULL_COLOR,
    teacherSignOff: defaultTeacherSignOff || YesNo.YES,
    includeVideoHyperlinks: defaultIncludeVideoHyperlinks || YesNo.YES,
    includeClassName: defaultIncludeClassName || YesNo.YES,
    selectedLessonIds: defaultSelectedLessonIds,
  })

  const setSectionId = useCallback(
    (value: string) => {
      setOptions((prevOptions) => {
        if (prevOptions.sectionId === value) return prevOptions
        return { ...prevOptions, sectionId: value }
      })
    },
    [],
  )

  const setBorder = useCallback(
    (value: Border) => {
      setOptions((prevOptions) => {
        if (prevOptions.border === value) return prevOptions
        return { ...prevOptions, border: value }
      })
    },
    [],
  )

  const setColor = useCallback(
    (value: Color) => {
      setOptions((prevOptions) => {
        if (prevOptions.color === value) return prevOptions
        return { ...prevOptions, color: value }
      })
    },
    [],
  )

  const setTeacherSignOff = useCallback(
    (value: YesNo) => {
      setOptions((prevOptions) => {
        if (prevOptions.teacherSignOff === value) return prevOptions
        return { ...prevOptions, teacherSignOff: value }
      })
    },
    [],
  )

  const setIncludeVideoHyperlinks = useCallback(
    (value: YesNo) => {
      setOptions((prevOptions) => {
        if (prevOptions.includeVideoHyperlinks === value) return prevOptions
        return { ...prevOptions, includeVideoHyperlinks: value }
      })
    },
    [],
  )

  const setIncludeClassName = useCallback(
    (value: YesNo) => {
      setOptions((prevOptions) => {
        if (prevOptions.includeClassName === value) return prevOptions
        return { ...prevOptions, includeClassName: value }
      })
    },
    [],
  )

  const setSelectedLessonIds = useCallback((value: string[]) => {
    setOptions((prevOptions) => ({ ...prevOptions, selectedLessonIds: value }))
  }, [])

  return {
    ...options,
    setSectionId,
    setBorder,
    setColor,
    setTeacherSignOff,
    setIncludeVideoHyperlinks,
    setIncludeClassName,
    setSelectedLessonIds,
  }
}

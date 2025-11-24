import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Color } from '../components/printables/selects/select-color'
import { GraphicTheme } from '../components/printables/selects/select-graphic-theme'
import { LessonDivider } from '../components/printables/selects/select-lesson-divider'
import { YesNo } from './use-checklist-options'

export interface DefaultGameBoardOptions {
  defaultSectionId?: string | null
  defaultLessonDivider?: LessonDivider
  defaultGraphicTheme?: GraphicTheme
  defaultColor?: Color
  defaultIncludeClassName?: YesNo
}

export interface GameBoardOptions {
  sectionId: string | null
  lessonDivider: LessonDivider
  graphicTheme: GraphicTheme
  color: Color
  includeClassName: YesNo
}

export const useGameBoardOptions = ({
  defaultSectionId = null,
  defaultLessonDivider = LessonDivider.LESSON_NUMBER,
  defaultGraphicTheme = GraphicTheme.NATURE,
  defaultColor = Color.FULL_COLOR,
  defaultIncludeClassName = YesNo.YES,
}: DefaultGameBoardOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [options, setOptions] = useState<GameBoardOptions>({
    sectionId: searchParams.get('section') || defaultSectionId,
    lessonDivider: (searchParams.get('lessonDivider') as LessonDivider) || defaultLessonDivider || LessonDivider.LESSON_NUMBER,
    graphicTheme: (searchParams.get('graphicTheme') as GraphicTheme) || defaultGraphicTheme || GraphicTheme.NATURE,
    color: (searchParams.get('color') as Color) || defaultColor || Color.FULL_COLOR,
    includeClassName: (searchParams.get('includeClassName') as YesNo) || defaultIncludeClassName || YesNo.YES,
  })

  const setSectionId = (value: string) => {
    if (options.sectionId === value) return
    setOptions({ ...options, sectionId: value })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('section', value)
    setSearchParams(newSearchParams, { replace: true })
  }

  const setLessonDivider = (value: LessonDivider) => {
    if (options.lessonDivider === value) return
    setOptions({ ...options, lessonDivider: value })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('lessonDivider', value)
    setSearchParams(newSearchParams, { replace: true })
  }

  const setGraphicTheme = (value: GraphicTheme) => {
    if (options.graphicTheme === value) return
    setOptions({ ...options, graphicTheme: value })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('graphicTheme', value)
    setSearchParams(newSearchParams, { replace: true })
  }

  const setColor = (value: Color) => {
    if (options.color === value) return
    setOptions({ ...options, color: value })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('color', value)
    setSearchParams(newSearchParams, { replace: true })
  }

  const setIncludeClassName = (value: YesNo) => {
    setOptions({ ...options, includeClassName: value })
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('includeClassName', value)
    setSearchParams(newSearchParams, { replace: true })
  }

  return {
    ...options,
    setSectionId,
    setLessonDivider,
    setGraphicTheme,
    setColor,
    setIncludeClassName,
  }
}

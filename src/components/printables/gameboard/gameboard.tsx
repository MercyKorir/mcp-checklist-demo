import { Document, Font, Page, StyleSheet, Text, View, ViewProps } from '@react-pdf/renderer'
import dayjs from 'dayjs'
import chunk from 'lodash/chunk'
import { FC } from 'react'
import { ActivityClassification } from '../../../const/activity-classification'
import { WorkstyleIconType } from '../../../const/workstyle-icons-list'
import { YesNo } from '../../../hooks/use-checklist-options'
import { UserSetting } from '../../../types/user-settings'
import { ActivityEntity, LessonEntity } from '../../../types/api-types'
import { getTextColorByLuminance, WorkStyle } from '../../../lib/utils'
import { customHyphenationCallback } from '../hyphenation-callback'
import { GraphicTheme } from '../selects/select-graphic-theme'
import { LessonDivider } from '../selects/select-lesson-divider'
import { ArrowSvg } from './arrow'
import * as Graphics from './graphic'
import { WorkstyleIcon } from './workstyle-icon'

Font.register({
  family: 'Belanosima',
  src: 'https://fonts.cdnfonts.com/s/107312/Belanosima-Regular.woff',
})

Font.register({
  family: 'Inter',
  src: 'https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff',
})

Font.registerHyphenationCallback(customHyphenationCallback)

const getLessonColors = (lessonNumber: string, lessonDivider: LessonDivider) => {
  if (lessonDivider === LessonDivider.LESSON_NAME_AND_GRAPHIC || lessonDivider === LessonDivider.LESSON_NUMBER_AND_GRAPHIC) {
    return {
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
    }
  }

  const num = parseInt(lessonNumber) || 1
  const colorIndex = ((num - 1) % 4) + 1 // 1, 2, 3, 4, 1, 2, 3, 4...

  switch (colorIndex) {
    case 1: // Lesson 1, 5, 9, 13...
      return {
        backgroundColor: '#F5FFD9', // Light green
        textColor: '#8CBD0C', // Dark green
      }
    case 2: // Lesson 2, 6, 10, 14...
      return {
        backgroundColor: '#FFEEE6', // Light peach/salmon
        textColor: '#EE5938', // Red-orange
      }
    case 3: // Lesson 3, 7, 11, 15...
      return {
        backgroundColor: '#EEFEFF', // Light blue
        textColor: '#1E97A0', // Blue-teal
      }
    case 4: // Lesson 4, 8, 12, 16...
      return {
        backgroundColor: '#FFF2E2', // Cream/pale orange
        textColor: '#FBA538', // Orange
      }
    default:
      return {
        backgroundColor: '#F5FFD9',
        textColor: '#8CBD0C',
      }
  }
}

const getGraphicComponent = (lessonNumber: string, graphicTheme: GraphicTheme) => {
  const num = parseInt(lessonNumber) || 1
  const graphicIndex = ((num - 1) % 8) + 1 // 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4...

  if (graphicTheme === GraphicTheme.SCHOOL) {
    switch (graphicIndex) {
      case 1:
        return Graphics.School1
      case 2:
        return Graphics.School2
      case 3:
        return Graphics.School3
      case 4:
        return Graphics.School4
      case 5:
        return Graphics.School5
      case 6:
        return Graphics.School6
      case 7:
        return Graphics.School7
      case 8:
        return Graphics.School8
      default:
        return Graphics.School1
    }
  } else if (graphicTheme === GraphicTheme.SPORTS) {
    switch (graphicIndex) {
      case 1:
        return Graphics.Sports1
      case 2:
        return Graphics.Sports2
      case 3:
        return Graphics.Sports3
      case 4:
        return Graphics.Sports4
      case 5:
        return Graphics.Sports5
      case 6:
        return Graphics.Sports6
      case 7:
        return Graphics.Sports7
      case 8:
        return Graphics.Sports8
      default:
        return Graphics.Sports1
    }
  } else if (graphicTheme === GraphicTheme.NATURE) {
    switch (graphicIndex) {
      case 1:
        return Graphics.Nature1
      case 2:
        return Graphics.Nature2
      case 3:
        return Graphics.Nature3
      case 4:
        return Graphics.Nature4
      case 5:
        return Graphics.Nature5
      case 6:
        return Graphics.Nature6
      case 7:
        return Graphics.Nature7
      case 8:
        return Graphics.Nature8
      default:
        return Graphics.Nature1
    }
  }

  return Graphics.School1
}

const lessonConditionalRender = (
  lessonDivider: LessonDivider,
  graphicTheme: GraphicTheme,
  lessonNumber: string,
  lessonName: string,
  styles: ReturnType<typeof createStyles>,
  lessonColors: { backgroundColor: string; textColor: string },
) => {
  const GraphicComponent = getGraphicComponent(lessonNumber, graphicTheme)

  switch (lessonDivider) {
    case LessonDivider.LESSON_NAME:
      return <Text style={[styles.lessonName, { color: lessonColors.textColor }]}>{lessonName}</Text>
    case LessonDivider.LESSON_NUMBER:
      return <Text style={[styles.lessonNumber, { color: lessonColors.textColor }]}>{lessonNumber}</Text>
    case LessonDivider.LESSON_NAME_AND_GRAPHIC:
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <Text style={styles.lessonNameAndGraphic}>Lesson {lessonNumber}</Text>
          <GraphicComponent />
        </View>
      )
    case LessonDivider.LESSON_NUMBER_AND_GRAPHIC:
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            paddingRight: 6,
          }}
        >
          <GraphicComponent />
          <Text style={styles.lessonNumberAndGraphic}>{lessonNumber}</Text>
        </View>
      )
  }
}

// Letter size: 11 x 8.5 inches = 792 x 612 points
const createStyles = () =>
  StyleSheet.create({
    page: { flexDirection: 'row', padding: 20 },
    container: {
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 12,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    // header related styles
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0A5395',
      marginBottom: 5,
      fontFamily: 'Inter',
      maxWidth: '65%',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#0A5395',
      fontFamily: 'Inter',
    },
    formFields: { flexDirection: 'column', alignItems: 'flex-end' },
    formRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    formLabel: {
      fontSize: 10,
      fontWeight: '500',
      color: '#020617',
      marginRight: 5,
      fontFamily: 'Inter',
    },
    formLine: { width: 80, height: 1, borderBottom: '1px solid #020617' },

    // board related styles
    gameBoard: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
    row: { flexDirection: 'row' },
    square: {
      width: 96,
      height: 96,
      backgroundColor: 'white',
      borderColor: '#020617',
      borderStyle: 'solid',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lessonSquare: {
      width: 96,
      height: 96,
      backgroundColor: '#F8FFE6',
      borderColor: '#020617',
      borderStyle: 'solid',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    lessonNumber: {
      fontSize: 70,
      fontFamily: 'Belanosima',
    },
    lessonName: {
      fontSize: 10,
      fontFamily: 'Belanosima',
      textAlign: 'center',
    },
    lessonNameAndGraphic: {
      color: '#000000',
      fontSize: 16,
      fontFamily: 'Belanosima',
      textAlign: 'center',
      fontWeight: 'bold',
      height: '30px',
    },
    lessonNumberAndGraphic: {
      color: '#000000',
      fontSize: 32,
      fontFamily: 'Belanosima',
      textAlign: 'right',
      fontWeight: 'bold',
    },
    startAndEndSquare: {
      width: 96,
      height: 96,
      backgroundColor: '#fbbf24', // Gold
      borderColor: '#020617',
      borderStyle: 'solid',
      borderLeftWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    startEndText: { fontSize: 24, fontFamily: 'Inter', color: '#020617', textAlign: 'center', marginBottom: 8 },
    continueText: { fontSize: 18, fontFamily: 'Inter', color: '#020617', textAlign: 'center', marginBottom: 6 },
    topBottomBorders: { borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 0 },

    // activity card styles
    activitySquare: {
      position: 'relative',
      width: 96,
      height: 96,
      backgroundColor: 'white',
      borderColor: '#020617',
      borderStyle: 'solid',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    cardFooter: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateText: { fontSize: 10, fontFamily: 'Inter', color: '#64748B', fontWeight: '500' },
    cardTitle: {
      fontSize: 10,
      fontFamily: 'Inter',
      color: '#020617',
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 5,
      alignSelf: 'center',
    },
    badge: { paddingHorizontal: 4, paddingVertical: 2, borderRadius: 8 },
    badgeText: { fontSize: 8, paddingHorizontal: 2, fontFamily: 'Inter', fontWeight: '500' },
    groupText: { fontSize: 11, fontFamily: 'Inter' },
    workstyle: { flexDirection: 'row' },
  })

const ActivityCard = ({
  settings,
  title = 'Activity: Video & Notes',
  date,
  type = ActivityClassification.MUST_DO,
  workstyle = WorkStyle.COLLABORATIVE,
  style = {},
}: {
  settings: UserSetting
  title?: string
  date?: string | null
  type?: ActivityClassification
  workstyle?: WorkStyle
  style?: ViewProps['style']
}) => {
  const styles = createStyles()

  return (
    <View style={[styles.activitySquare, ...(style instanceof Array ? style : [style])]}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{date ? dayjs(date).format('MMM D') : ''}</Text>
        <View style={{ width: 14, height: 15, border: '1px solid #64748b' }} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardFooter}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: settings.CLASSIFICATION_LABELS[type].color,
              color: getTextColorByLuminance(settings.CLASSIFICATION_LABELS[type].color),
            },
          ]}
        >
          <Text style={styles.badgeText}>{settings.CLASSIFICATION_LABELS[type].label}</Text>
        </View>
        <WorkstyleIcon type={settings.WORKSTYLE_ICONS as WorkstyleIconType} workstyle={workstyle} />
      </View>
    </View>
  )
}

interface GameBoardContentProps {
  courseName: string
  sectionName: string
  unitName: string
  activities: Array<Partial<ActivityEntity> & { _type?: string; number?: string }>
  pageIndex: number
  totalPages: number
  lessonDivider: LessonDivider
  graphicTheme: GraphicTheme
  settings: UserSetting
  courseClassName: string
  includeClassName: YesNo
}

const GameBoardContent: FC<GameBoardContentProps> = ({
  courseName,
  sectionName,
  unitName,
  activities,
  pageIndex,
  totalPages,
  lessonDivider,
  graphicTheme,
  settings,
  courseClassName,
  includeClassName,
}) => {
  const styles = createStyles()

  const itemGroups = []
  let remainingItems = [{ _type: 'start' }, ...activities, { _type: 'end' }]
  let groupIndex = 0

  while (remainingItems.length > 0) {
    const chunkSize = groupIndex % 2 === 1 ? 1 : 7
    const group = remainingItems.slice(0, chunkSize)
    itemGroups.push(group)
    remainingItems = remainingItems.slice(chunkSize)
    groupIndex += 1
  }
  const rowItemSize = Math.min(7, activities.length + 2)
  return (
    <View style={styles.container}>
      {/* Header */}
      {pageIndex === 0 ? (
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{sectionName}</Text>
            <Text style={styles.subtitle}>
              {courseName} / {unitName}
            </Text>
          </View>
          <View style={styles.formFields}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Name:</Text>
              <View style={[styles.formLine, { width: 196 }]} />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Date:</Text>
              <View style={styles.formLine} />
              <Text style={[styles.formLabel, { marginLeft: 20 }]}>Class:</Text>
              {includeClassName === YesNo.YES ? (
                <Text style={[styles.formLabel, { color: '#0A5395' }]}>{courseClassName}</Text>
              ) : (
                <View style={[styles.formLine, { width: 64 }]} />
              )}
            </View>
          </View>
        </View>
      ) : null}

      {/* Game Board */}
      <View style={styles.gameBoard}>
        {itemGroups.map((group, groupIndex) => (
          <View
            key={`row-${groupIndex}`}
            style={[styles.row, { width: rowItemSize * 96, flexDirection: [0, 3].includes(groupIndex % 4) ? 'row' : 'row-reverse' }]}
          >
            {group.map((activity, itemIndex) => {
              switch (activity?._type) {
                case 'start':
                  return (
                    <View
                      key={`item-${groupIndex}-${itemIndex}`}
                      style={[styles.startAndEndSquare, { borderTopWidth: 1, borderBottomWidth: 1 }]}
                    >
                      {pageIndex === 0 ? <Text style={styles.startEndText}>Start!</Text> : null}
                      <ArrowSvg />
                    </View>
                  )
                case 'end':
                  return (
                    <View
                      key={`item-${groupIndex}-${itemIndex}`}
                      style={[
                        styles.startAndEndSquare,
                        [0, 2].includes(groupIndex % 4) ? styles.topBottomBorders : {},
                        pageIndex === totalPages - 1
                          ? { borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1 }
                          : (groupIndex % 4 === 0 && itemIndex <= 6) || (groupIndex % 4 === 2 && itemIndex === 0)
                            ? { borderRightWidth: 1 }
                            : {},
                      ]}
                    >
                      {pageIndex === totalPages - 1 ? (
                        <Text style={styles.startEndText}>Finish!</Text>
                      ) : (
                        <>
                          <Text style={styles.continueText}>Continue to Page {pageIndex + 2}</Text>
                          <ArrowSvg />
                        </>
                      )}
                    </View>
                  )
                case 'lesson': {
                  const lessonNumber = activity.number ?? '1'
                  const lessonColors = getLessonColors(lessonNumber, lessonDivider)

                  return (
                    <View
                      key={`item-${groupIndex}-${itemIndex}`}
                      style={[
                        styles.lessonSquare,
                        [0, 2].includes(groupIndex % 4) ? styles.topBottomBorders : {},
                        (groupIndex % 4 === 0 && itemIndex === 6) || (groupIndex % 4 === 2 && itemIndex === 0)
                          ? { borderRightWidth: 1 }
                          : {},
                        { backgroundColor: lessonColors.backgroundColor },
                      ]}
                    >
                      {lessonConditionalRender(lessonDivider, graphicTheme, lessonNumber, activity.name || '', styles, lessonColors)}
                    </View>
                  )
                }
                default:
                  return (
                    <ActivityCard
                      key={`item-${groupIndex}-${itemIndex}`}
                      style={[
                        [0, 2].includes(groupIndex % 4) ? styles.topBottomBorders : {},
                        (groupIndex % 4 === 0 && itemIndex === 6) || (groupIndex % 4 === 2 && itemIndex === 0)
                          ? { borderRightWidth: 1 }
                          : {},
                      ]}
                      title={activity.name}
                      date={activity.classActivities?.at(0)?.dueDate}
                      type={activity.classification as ActivityClassification}
                      workstyle={activity.workstyle as WorkStyle}
                      settings={settings}
                    />
                  )
              }
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

export interface GameBoardPrintableProps {
  sectionName: string
  courseName: string
  unitName: string
  lessons: LessonEntity[]
  lessonDivider: LessonDivider
  graphicTheme: GraphicTheme
  settings: UserSetting
  courseClassName: string
  includeClassName: YesNo
}

export const GameBoardPrintable: FC<GameBoardPrintableProps> = ({
  sectionName,
  courseName,
  unitName,
  lessons,
  lessonDivider,
  graphicTheme,
  settings,
  courseClassName,
  includeClassName,
}) => {
  const activities = lessons.reduce<Array<Partial<ActivityEntity> & { _type?: string; number?: string }>>(
    (result, lesson) => result.concat({ _type: 'lesson', name: lesson.name, number: lesson.lessonNumber }, ...lesson.activities),
    [],
  )
  const activityPages = chunk(activities, 21)
  return (
    <Document key={`${sectionName}-${courseName}-${unitName}`}>
      {activityPages.map((pageActivities, pageIndex) => (
        <Page key={`page-${pageIndex}`} style={[createStyles().page]} orientation="landscape" size="LETTER">
          <GameBoardContent
            sectionName={sectionName}
            courseName={courseName}
            unitName={unitName}
            pageIndex={pageIndex}
            totalPages={activityPages.length}
            activities={pageActivities}
            lessonDivider={lessonDivider}
            graphicTheme={graphicTheme}
            settings={settings}
            courseClassName={courseClassName}
            includeClassName={includeClassName}
          />
          <Text style={createStyles().pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      ))}
    </Document>
  )
}

import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import dayjs from 'dayjs'
import { FC } from 'react'
import { ActivityClassification } from '../../../const/activity-classification'
import { YesNo } from '../../../hooks/use-checklist-options'
import { UserSetting } from '../../../types/user-settings'
import { LessonEntity, ResourceEntity } from '../../../types/api-types'
import { customHyphenationCallback } from '../hyphenation-callback'
import { Border } from '../selects/select-border'
import { Color } from '../selects/select-color'
import { Border1, Border2, Border3, Border4, CheckIcon, DueDateIcon, StarIcon } from './graphic'

Font.register({
  family: 'Belanosima',
  src: 'https://fonts.cdnfonts.com/s/107312/Belanosima-Regular.woff',
})

Font.register({
  family: 'Inter',
  src: 'https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff',
})

Font.register({
  family: 'Inter-Bold',
  src: 'https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff',
})

Font.registerHyphenationCallback(customHyphenationCallback)

const getBorderComponent = (border: Border, color: Color) => {
  switch (border) {
    case Border.BORDER_1:
      return <Border1 color={color} />
    case Border.BORDER_2:
      return <Border2 color={color} />
    case Border.BORDER_3:
      return <Border3 color={color} />
    case Border.BORDER_4:
      return <Border4 color={color} />
    default:
      return <Border1 color={color} />
  }
}

const createStyles = (color: Color) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: 20,
      paddingBottom: 0,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    header: { flexDirection: 'column', gap: 2, marginBottom: 20 },
    title: {
      fontSize: 18,
      color: color === Color.BLACK_AND_WHITE ? '#000000' : '#0A5395',
      marginBottom: 5,
      fontFamily: 'Inter',
    },
    subtitle: {
      fontSize: 14,
      color: color === Color.BLACK_AND_WHITE ? '#000000' : '#0A5395',
      fontFamily: 'Inter',
    },
    formRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 5, marginTop: 20 },
    formLabel: {
      fontSize: 12,
      color: '#020617',
      marginRight: 5,
      fontFamily: 'Inter',
    },
    formLine: { width: 120, height: 1, borderBottom: '1px solid #020617' },
    lesson: { border: '1px solid #000000', borderBottom: 'none' },
    lessonTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: 'semibold',
      fontSize: 13,
      padding: 5,
      borderBottom: '1px solid #000000',
      backgroundColor: color === Color.BLACK_AND_WHITE ? '#E5E5E5' : '#F1F5F9',
    },
    dueDateCollumn: {
      fontSize: 10,
      fontFamily: 'Inter',
      padding: 5,
      borderBottom: '1px solid #000000',
      borderRight: '1px solid #000000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      width: 90,
    },
    dueDateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 10,
      fontFamily: 'Inter',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: 105,
      height: '100%',
      padding: 5,
      borderRight: '1px solid #000000',
    },
    lessonGoal: {
      fontSize: 10,
      fontFamily: 'Inter',
      padding: 5,
      borderBottom: '1px solid #000000',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      height: 25,
    },
    lessonContent: {
      flexDirection: 'row',
    },
    dueDate: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      padding: 5,
      paddingBottom: 0,
      gap: 4,
      fontSize: 10,
      fontFamily: 'Inter',
      width: 140,
      height: '100%',
      borderRight: '1px solid #000000',
      borderBottom: '1px solid #000000',
    },
    activityList: { display: 'flex', flexDirection: 'column' },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'baseline',
      fontSize: 10,
      borderBottom: '1px solid #000000',
    },
    activityName: {
      flexDirection: 'row',
      alignItems: 'baseline',
      fontFamily: 'Inter',
      width: '100%',
      height: '100%',
      padding: 5,
    },
    checkbox: {
      width: 12,
      height: 12,
      border: '1px solid #000000',
      marginRight: 5,
    },
    priorityBadge: {
      borderLeft: '1px solid #000000',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter-Bold',
      width: 100,
    },
    priorityText: {
      fontSize: 10,
      width: 100,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    teacherSignOff: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      gap: 4,
      borderBottom: '1px solid #000000',
    },
    signOffText: {
      fontSize: 12,
      color: '#020617',
      fontFamily: 'Inter',
      marginRight: 10,
    },
    footerBorder: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  })

const ActivityItem = ({
  name = 'Activity',
  type = ActivityClassification.MUST_DO,
  activityType,
  lessonActivitiesCount,
  resources,
  color,
  includeVideoHyperlinks,
  settings,
  dueDate,
}: {
  name?: string
  type?: ActivityClassification
  activityType?: string
  lessonActivitiesCount: number
  resources: ResourceEntity[]
  color: Color
  settings: UserSetting
  includeVideoHyperlinks: YesNo
  dueDate?: string | null
}) => {
  const styles = createStyles(color)

  // Only hyperlink Video & Notes activities and only use EXEMPLAR_VIDEO_LINK resources
  const shouldHyperlink = includeVideoHyperlinks === YesNo.YES && activityType === 'VIDEO_AND_NOTES'
  const exemplarVideoResource = resources.find((resource) => resource.type === 'EXEMPLAR_VIDEO_LINK')

  const formattedDueDate = dueDate ? dayjs(dueDate).format('MMM D') : null

  return (
    <View style={[styles.activityItem, lessonActivitiesCount === 1 ? { height: 40 } : {}]}>
      <View style={styles.dueDateRow}>
        {formattedDueDate ? <DueDateIcon style={{ width: 20 }} color={color} /> : null}
        <Text>{formattedDueDate ? formattedDueDate : '   '}</Text>
      </View>
      <View style={styles.activityName}>
        <View style={styles.checkbox} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {shouldHyperlink && exemplarVideoResource && exemplarVideoResource.url ? (
            <Link style={{ color: color === Color.BLACK_AND_WHITE ? '#000000' : '#0A5395' }} src={exemplarVideoResource.url}>
              {name}
            </Link>
          ) : (
            <Text>{name}</Text>
          )}
          {type === 'ASPIRE_TO_DO' ? <StarIcon style={{ marginLeft: 4 }} color={color} /> : null}
        </View>
      </View>
      <View
        style={[styles.priorityBadge, { color: color === Color.BLACK_AND_WHITE ? '#000000' : settings.CLASSIFICATION_LABELS[type].color }]}
      >
        <Text style={styles.priorityText}>{settings.CLASSIFICATION_LABELS[type].label}</Text>
      </View>
    </View>
  )
}

interface ChecklistContentProps {
  courseName: string
  sectionName: string
  courseClassName: string
  unitName: string
  lessons: LessonEntity[]
  pageIndex: number
  totalPages: number
  border: Border
  color: Color
  settings: UserSetting
  teacherSignOff: YesNo
  includeVideoHyperlinks: YesNo
  includeClassName: YesNo
}

const ChecklistContent: FC<ChecklistContentProps> = ({
  courseName,
  sectionName,
  courseClassName,
  unitName,
  lessons,
  pageIndex,
  teacherSignOff,
  color,
  includeVideoHyperlinks,
  includeClassName,
  settings,
}) => {
  const styles = createStyles(color)

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
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Name:</Text>
            <View style={[styles.formLine, { width: 196, marginRight: 20 }]} />
            <Text style={styles.formLabel}>Date:</Text>
            <View style={styles.formLine} />
            <Text style={[styles.formLabel, { marginLeft: 20 }]}>Class:</Text>
            {includeClassName === YesNo.YES ? (
              <Text style={[styles.formLabel, { color: color === Color.BLACK_AND_WHITE ? '#000000' : '#0A5395' }]}>{courseClassName}</Text>
            ) : (
              <View style={styles.formLine} />
            )}
          </View>
        </View>
      ) : null}

      {/* Lessons */}
      <View style={{ flexDirection: 'column', gap: 15 }}>
        {lessons.map((lesson, lessonIndex) =>
          lesson.activities.length > 0 ? (
            <View key={`lesson-${lessonIndex}`} style={styles.lesson}>
              <View style={styles.lessonTitle}>
                <Text>{lesson.name}</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={styles.dueDateCollumn}>
                  <Text>Due Date</Text>
                </View>
                <View style={styles.lessonGoal}>
                  <Text>Learning Goal: {lesson.learningTarget ? lesson.learningTarget : ''}</Text>
                </View>
              </View>
              <View style={styles.lessonContent}>
                <View style={styles.activityList}>
                  {lesson.activities.map((activity, activityIndex) => (
                    <ActivityItem
                      key={`activity-${lessonIndex}-${activityIndex}`}
                      name={activity.name}
                      resources={activity.resources}
                      type={activity.classification as ActivityClassification}
                      activityType={activity.type}
                      color={color}
                      lessonActivitiesCount={lesson.activities.length}
                      includeVideoHyperlinks={includeVideoHyperlinks}
                      settings={settings}
                      dueDate={activity.classActivities?.[0]?.dueDate || null}
                    />
                  ))}
                </View>
              </View>
              {teacherSignOff === YesNo.YES ? (
                <View style={styles.teacherSignOff}>
                  <CheckIcon color={color} />
                  <Text style={styles.signOffText}>Teacher Sign Off:</Text>
                </View>
              ) : null}
            </View>
          ) : null,
        )}
      </View>
    </View>
  )
}

export interface ChecklistPrintableProps {
  sectionName: string
  courseName: string
  courseClassName: string
  unitName: string
  lessons: LessonEntity[]
  border: Border
  color: Color
  settings: UserSetting
  teacherSignOff: YesNo
  includeVideoHyperlinks: YesNo
  includeClassName: YesNo
}

export const ChecklistPrintable: FC<ChecklistPrintableProps> = ({
  sectionName,
  courseName,
  courseClassName,
  unitName,
  lessons,
  border,
  color,
  teacherSignOff,
  includeVideoHyperlinks,
  includeClassName,
  settings,
}) => {
  const firstPageActivities = teacherSignOff === YesNo.YES ? 13 : 14
  const subsequentPageActivities = teacherSignOff === YesNo.YES ? 15 : 16
  const maxLessonsPerPage = teacherSignOff === YesNo.YES ? 3 : 4

  const lessonPages: LessonEntity[][] = []
  let currentPage: LessonEntity[] = []
  let currentPageActivityCount = 0
  let currentPageIndex = 0

  lessons.forEach((lesson) => {
    const lessonActivityCount = lesson.activities.length
    const maxActivitiesForCurrentPage = currentPageIndex === 0 ? firstPageActivities : subsequentPageActivities

    const wouldExceedActivityLimit = currentPageActivityCount + lessonActivityCount > maxActivitiesForCurrentPage
    const wouldExceedLessonLimit = currentPage.length >= maxLessonsPerPage

    if ((wouldExceedActivityLimit || wouldExceedLessonLimit) && currentPage.length > 0) {
      lessonPages.push(currentPage)
      currentPage = [lesson]
      currentPageActivityCount = lessonActivityCount
      currentPageIndex++
    } else {
      currentPage.push(lesson)
      currentPageActivityCount += lessonActivityCount
    }
  })

  if (currentPage.length > 0) {
    lessonPages.push(currentPage)
  }

  const borderComponent = getBorderComponent(border, color)
  const styles = createStyles(color)

  return (
    <Document key={`${sectionName}-${courseName}-${unitName}`}>
      {lessonPages.map((pageLessons, pageIndex) => (
        <Page key={`page-${pageIndex}`} orientation="portrait" size="LETTER">
          <ChecklistContent
            sectionName={sectionName}
            courseName={courseName}
            courseClassName={courseClassName}
            unitName={unitName}
            pageIndex={pageIndex}
            totalPages={lessonPages.length}
            lessons={pageLessons}
            border={border}
            color={color}
            teacherSignOff={teacherSignOff}
            includeVideoHyperlinks={includeVideoHyperlinks}
            includeClassName={includeClassName}
            settings={settings}
          />
          <View style={styles.footerBorder}>{borderComponent}</View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      ))}
    </Document>
  )
}

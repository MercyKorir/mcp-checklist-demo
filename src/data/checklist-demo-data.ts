import { ActivityClassification } from '../const/activity-classification'
import { UserSetting } from '../types/user-settings'
import { ActivityEntity, ClassEntity, CourseEntity, LessonEntity, SectionEntity, UnitEntity } from '../types/api-types'

// Mock user settings for demo
export const mockUserSettings: UserSetting = {
  REQUIRE_STUDENT_REVISION: true,
  STUDENT_NAME_DISPLAY: 'FIRST_NAME_LAST_INITIAL',
  TRACK_ACTIVITIES: true,
  CLASSIFICATION_LABELS: {
    MUST_DO: { label: 'Must Do', color: '#0A5395' },
    SHOULD_DO: { label: 'Should Do', color: '#FF8C00' },
    ASPIRE_TO_DO: { label: 'Aspire To Do', color: '#FFD700' },
  },
  STATUS_LABELS: {
    NOT_STARTED: { label: 'Not Started', color: '#94A3B8' },
    IN_PROGRESS: { label: 'In Progress', color: '#3B82F6' },
    TEACHER_REVIEW: { label: 'Teacher Review', color: '#F59E0B' },
    COMPLETE: { label: 'Complete', color: '#10B981' },
  },
  WORKSTYLE_ICONS: 'default',
}

// Create mock activities with realistic Illustrative Mathematics content
const createActivity = (
  name: string,
  classification: ActivityClassification,
  type: ActivityEntity['type'],
  withDueDate = false,
): ActivityEntity => ({
  id: `activity-${Math.random().toString(36).substr(2, 9)}`,
  name,
  classification,
  type,
  workstyle: 'INDEPENDENT',
  order: 0,
  description: '',
  showInTracker: true,
  timeRequired: '10',
  externalId: '',
  lessonId: '',
  createdBy: null,
  isTemplate: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  trackedActivities: [],
  lesson: {} as LessonEntity, // Will be set when added to lesson
  resources:
    type === 'VIDEO_AND_NOTES'
      ? [
          {
            id: `resource-${Math.random().toString(36).substr(2, 9)}`,
            type: 'EXEMPLAR_VIDEO_LINK',
            url: 'https://example.com/video',
            name: 'Video Resource',
            description: null,
            externalId: null,
            content: null,
            activityId: '',
            createdBy: null,
            isTemplate: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null,
          },
        ]
      : [],
  classActivities: withDueDate
    ? [
        {
          activityId: '',
          classId: '',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          skip: false,
        },
      ]
    : [],
})

// Mock lessons for Section A
const mockLessons: LessonEntity[] = [
  {
    id: 'lesson-1',
    lessonNumber: '1',
    name: 'Lesson 1: Tiling the Plane',
    order: 1,
    description: 'Students explore how shapes can tile a plane',
    learningTarget: 'I can describe and justify how shapes tile a plane',
    externalId: 'im-grade6-unit1-lesson1',
    sectionId: 'section-a',
    createdBy: null,
    isTemplate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    section: {} as SectionEntity, // Will be set below
    activities: [
      createActivity("Warm-up: Which One Doesn't Belong?", ActivityClassification.MUST_DO, 'WARM_UP'),
      createActivity('Activity 1: Spotting Patterns', ActivityClassification.MUST_DO, 'INQUIRY_ACTIVITY', true),
      createActivity('Video & Notes: Tiling Basics', ActivityClassification.MUST_DO, 'VIDEO_AND_NOTES'),
      createActivity('Activity 2: Creating Tilings', ActivityClassification.SHOULD_DO, 'INQUIRY_ACTIVITY'),
      createActivity('Activity 3: Design Your Own Tiling', ActivityClassification.ASPIRE_TO_DO, 'EXTENSION'),
    ],
  },
  {
    id: 'lesson-2',
    lessonNumber: '2',
    name: 'Lesson 2: Finding Area by Decomposing and Rearranging',
    order: 2,
    description: 'Students decompose and rearrange shapes to find their areas',
    learningTarget: 'I can find the area of shapes by decomposing and rearranging them into rectangles',
    externalId: 'im-grade6-unit1-lesson2',
    sectionId: 'section-a',
    createdBy: null,
    isTemplate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    section: {} as SectionEntity, // Will be set below
    activities: [
      createActivity('Warm-up: Estimating Area', ActivityClassification.MUST_DO, 'WARM_UP', true),
      createActivity('Activity 1: Decompose This!', ActivityClassification.MUST_DO, 'INQUIRY_ACTIVITY'),
      createActivity('Video & Notes: Area Strategies', ActivityClassification.MUST_DO, 'VIDEO_AND_NOTES'),
      createActivity('Activity 2: Rearranging Shapes', ActivityClassification.SHOULD_DO, 'PRACTICE_PROBLEMS'),
    ],
  },
  {
    id: 'lesson-3',
    lessonNumber: '3',
    name: 'Lesson 3: Reasoning to Find Area',
    order: 3,
    description: 'Students use different reasoning strategies to find the area of shapes',
    learningTarget: 'I can use different reasoning strategies to find the area of shapes',
    externalId: 'im-grade6-unit1-lesson3',
    sectionId: 'section-a',
    createdBy: null,
    isTemplate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    section: {} as SectionEntity, // Will be set below
    activities: [
      createActivity('Video & Notes', ActivityClassification.MUST_DO, 'VIDEO_AND_NOTES'),
      createActivity('Practice Problems', ActivityClassification.MUST_DO, 'PRACTICE_PROBLEMS'),
      createActivity('Inquiry Activity 4.3', ActivityClassification.ASPIRE_TO_DO, 'INQUIRY_ACTIVITY'),
      createActivity('Additional Practice', ActivityClassification.ASPIRE_TO_DO, 'PRACTICE_PROBLEMS'),
      createActivity('Mastery Check', ActivityClassification.MUST_DO, 'MASTERY_CHECK'),
    ],
  },
]

// Mock Section A
const mockSectionA: SectionEntity = {
  id: 'section-a',
  name: 'Section A: Reasoning to Find Area',
  sectionLetter: 'A',
  order: 1,
  description: 'Students develop strategies for finding area through reasoning and decomposition',
  externalId: 'im-grade6-unit1-section-a',
  unitId: 'unit-1',
  createdBy: null,
  isTemplate: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lessons: mockLessons,
  unit: {} as UnitEntity, // Will be set below
}

// Set section reference in lessons
mockLessons[0].section = mockSectionA
mockLessons[1].section = mockSectionA
mockLessons[2].section = mockSectionA

// Set lesson reference in activities
mockLessons[0].activities.forEach((activity) => {
  activity.lesson = mockLessons[0]
})
mockLessons[1].activities.forEach((activity) => {
  activity.lesson = mockLessons[1]
})
mockLessons[2].activities.forEach((activity) => {
  activity.lesson = mockLessons[2]
})

// Mock Unit 1
const mockUnit1: UnitEntity = {
  id: 'unit-1',
  name: 'Unit 1: Area & Surface Area',
  unitNumber: '1',
  order: 1,
  description: 'Students explore area and surface area concepts',
  externalId: 'im-grade6-unit1',
  courseId: 'course-im-grade6',
  classCourseId: '',
  createdBy: null,
  isTemplate: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sections: [mockSectionA],
  course: {} as CourseEntity, // Will be set below
}

// Set circular references
mockSectionA.unit = mockUnit1

// Mock Course
export const mockCourse: CourseEntity = {
  id: 'course-im-grade6',
  name: 'Illustrative Mathematics - Grade 6',
  order: 1,
  description: 'Illustrative Mathematics Grade 6 curriculum',
  externalId: 'im-grade6',
  createdBy: null,
  isTemplate: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  classes: [],
  units: [mockUnit1],
}

// Set course reference in unit
mockUnit1.course = mockCourse

// Mock Class
export const mockClass: ClassEntity = {
  id: 'class-demo',
  name: 'First Period',
  schoolId: 'school-demo',
  courseId: 'course-im-grade6',
  classCourseId: 'course-im-grade6',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  school: {} as never,
  students: [],
  classUsers: [],
  activities: [],
}

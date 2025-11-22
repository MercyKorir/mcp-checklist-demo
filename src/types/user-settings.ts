export interface UserSetting {
  REQUIRE_STUDENT_REVISION: boolean
  STUDENT_NAME_DISPLAY: string
  TRACK_ACTIVITIES: boolean
  CLASSIFICATION_LABELS: Record<string, { label: string; color: string }>
  STATUS_LABELS: Record<string, { label: string; color: string }>
  WORKSTYLE_ICONS: string
}

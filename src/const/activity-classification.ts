export enum ActivityClassification {
  ASPIRE_TO_DO = 'ASPIRE_TO_DO',
  MUST_DO = 'MUST_DO',
  SHOULD_DO = 'SHOULD_DO',
}

export const activityClassifications = [
  {
    id: ActivityClassification.MUST_DO,
    name: 'Must Do',
    color: '#ef4444', // red-500
  },
  {
    id: ActivityClassification.SHOULD_DO,
    name: 'Should Do',
    color: '#f59e0b', // amber-500
  },
  {
    id: ActivityClassification.ASPIRE_TO_DO,
    name: 'Aspire To Do',
    color: '#10b981', // emerald-500
  },
]

export const activityClassificationLabels = {
  [ActivityClassification.MUST_DO]: 'Must Do',
  [ActivityClassification.SHOULD_DO]: 'Should Do',
  [ActivityClassification.ASPIRE_TO_DO]: 'Aspire To Do',
}

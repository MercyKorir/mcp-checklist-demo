import { Text, View } from '@react-pdf/renderer'
import { FC } from 'react'
import { WorkstyleIconType } from '../../../const/workstyle-icons-list'
import { WorkStyle } from '../../../lib/utils'
import { User } from './workstyle-icons/user'
import { Users } from './workstyle-icons/users'

interface WorkstyleIconProps {
  type: WorkstyleIconType
  workstyle: WorkStyle
}

export const WorkstyleIcon: FC<WorkstyleIconProps> = ({ type, workstyle }) => {
  const isIndependent = workstyle === WorkStyle.INDEPENDENT

  switch (type) {
    case WorkstyleIconType.SOLID_ICONS:
      if (isIndependent) {
        return <User width={14} height={14} fill="#020617" />
      } else {
        return (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
            <User width={12} height={12} fill="#020617" />
            <Text style={{ fontSize: 8, fontFamily: 'Inter', fontWeight: 'bold', color: '#020617' }}>2+</Text>
          </View>
        )
      }

    case WorkstyleIconType.NUMBERED_ICONS:
      return <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: 'bold', color: '#020617' }}>{isIndependent ? '1' : '2+'}</Text>

    case WorkstyleIconType.OUTLINE_ICONS:
      if (isIndependent) {
        return <User width={14} height={14} fill="#FFFFFF" />
      } else {
        return <Users width={14} height={14} fill="#FFFFFF" />
      }

    case WorkstyleIconType.OUTLINE_NUMBERED_ICONS:
      if (isIndependent) {
        return <User width={14} height={14} fill="#FFFFFF" />
      } else {
        return (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
            <User width={12} height={12} fill="#FFFFFF" />
            <Text style={{ fontSize: 8, fontFamily: 'Inter', fontWeight: 'bold', color: '#020617' }}>2+</Text>
          </View>
        )
      }

    default:
      if (isIndependent) {
        return <User width={14} height={14} fill="#020617" />
      } else {
        return (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
            <User width={12} height={12} fill="#020617" />
            <Text style={{ fontSize: 8, fontFamily: 'Inter', fontWeight: 'bold', color: '#020617' }}>2+</Text>
          </View>
        )
      }
  }
}

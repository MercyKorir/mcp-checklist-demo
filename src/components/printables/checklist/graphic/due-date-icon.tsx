import { Path, Svg, SVGProps } from '@react-pdf/renderer'
import { FC } from 'react'
import { Color } from '../../selects/select-color'

interface DueDateIconProps extends SVGProps {
  color?: Color
}

export const DueDateIcon: FC<DueDateIconProps> = ({ color = Color.FULL_COLOR, ...props }) => {
  const strokeColor = color === Color.BLACK_AND_WHITE ? '#000000' : '#0A5395'

  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M12 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V3C13 2.44772 12.5523 2 12 2Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M3 5H13" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 1V3" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11 1V3" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

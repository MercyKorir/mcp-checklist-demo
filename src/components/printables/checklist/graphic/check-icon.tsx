import { Path, Svg, SVGProps } from '@react-pdf/renderer'
import { FC } from 'react'
import { Color } from '../../selects/select-color'

interface CheckIconProps extends SVGProps {
  color?: Color
}

export const CheckIcon: FC<CheckIconProps> = ({ color = Color.FULL_COLOR, ...props }) => {
  const strokeColor = color === Color.BLACK_AND_WHITE ? '#000000' : '#23B133'

  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path d="M13.5 4.5L6 12L2.5 8.5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  )
}

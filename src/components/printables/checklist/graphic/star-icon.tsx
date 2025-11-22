import { G, Path, Svg, SVGProps } from '@react-pdf/renderer'
import { FC } from 'react'
import { Color } from '../../selects/select-color'

interface StarIconProps extends SVGProps {
  color?: Color
}

export const StarIcon: FC<StarIconProps> = ({ color = Color.FULL_COLOR, style, ...props }) => {
  const fillColor = color === Color.BLACK_AND_WHITE ? '#000000' : '#FBA538'

  return (
    <Svg width="12" height="12" viewBox="0 0 24 24" style={style} {...props}>
      <G fill={fillColor} stroke="none">
        <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </G>
    </Svg>
  )
}

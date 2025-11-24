import { Path, Svg, SVGProps } from '@react-pdf/renderer'
import { FC } from 'react'

export const ArrowSvg: FC<SVGProps> = ({ style, ...props }) => (
  <Svg width="30" height="26" viewBox="0 0 30 26" fill="none" style={style} {...props}>
    <Path
      fillRule="evenodd"
      d="M29.7644 12.9999L23.0514 18.3978L14.1502 25.2352V16.6275L0.587891 18.9443V7.05544L14.1502 9.37229V0.764648L23.0514 7.60199L29.7644 12.9999Z"
      fill="#020617"
    />
  </Svg>
)

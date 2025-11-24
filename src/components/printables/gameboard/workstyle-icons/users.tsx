import { Circle, Path, Svg, SVGProps } from '@react-pdf/renderer'
import { FC } from 'react'

export const Users: FC<SVGProps> = (props) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Path d="M16 3.128a4 4 0 0 1 0 7.744" />
    <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <Circle cx="9" cy="7" r="4" />
  </Svg>
)

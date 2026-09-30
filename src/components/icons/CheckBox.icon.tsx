import type { SVG } from '../../interfaces/SVG.interface'

function CheckBox({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="16" height="16" rx="1" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export default CheckBox

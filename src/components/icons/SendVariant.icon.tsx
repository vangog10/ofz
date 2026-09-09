import type { SVG } from '../../interfaces/SVG.interface'

function SendVariant({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20V14L11 12L3 10V4L22 12L3 20Z" fill={color} />
    </svg>
  )
}

export default SendVariant

import type { SVG } from '../../interfaces/SVG.interface'

function CheckboxesMinus({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="18" height="18" rx="2" fill={color} fillOpacity="0.9" />
      <path d="M18 25V23H30V25H18Z" fill="white" />
    </svg>
  )
}

export default CheckboxesMinus

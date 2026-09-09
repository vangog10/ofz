import type { SVG } from '../../interfaces/SVG.interface'

function FormatQuoteOpen({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 7L8 11H11V17H5V11L7 7H10ZM18 7L16 11H19V17H13V11L15 7H18Z" fill={color} />
    </svg>
  )
}

export default FormatQuoteOpen

import type { SVG } from '../../interfaces/SVG.interface'

function FormatQuoteClose({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 17H17L19 13V7H13V13H16M6 17H9L11 13V7H5V13H8L6 17Z" fill={color} />
    </svg>
  )
}

export default FormatQuoteClose

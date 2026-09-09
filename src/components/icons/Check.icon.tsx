import type { SVG } from '../../interfaces/SVG.interface'

function Check({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 6.41L8.5 18.41L3 12.91L4.41 11.5L8.5 15.58L19.09 5L20.5 6.41Z" fill={color} />
    </svg>
  )
}

export default Check

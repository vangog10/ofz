import type { SVG } from '../../interfaces/SVG.interface'

function ShevronRight({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_309_1154)">
            <path d="M11.4533 22.1067L17.56 16L11.4533 9.88L13.3333 8L21.3333 16L13.3333 24L11.4533 22.1067Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_309_1154">
            <rect width="32" height="32" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default ShevronRight
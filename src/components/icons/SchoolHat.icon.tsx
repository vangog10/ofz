import type { SVG } from '../../interfaces/SVG.interface'

function SchoolHat({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_302_1126)">
            <path d="M24 6L2 18L24 30L42 20.18V34H46V18M10 26.36V34.36L24 42L38 34.36V26.36L24 34L10 26.36Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_302_1126">
                <rect width="48" height="48" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default SchoolHat
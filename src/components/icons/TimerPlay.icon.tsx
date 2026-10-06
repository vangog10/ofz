import type { SVG } from '../../interfaces/SVG.interface'

function TimerPlay({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_302_1117)">
            <path d="M30 6H18V2H30V6ZM26 38C26 40.06 26.52 42 27.42 43.66C26.32 43.88 25.18 44 24 44C14.06 44 6 35.94 6 26C6 16.06 14.06 8 24 8C28.24 8 32.14 9.48 35.24 12L38.08 9.12C39.1 10 40 10.92 40.9 11.94L38.06 14.78C40.52 17.86 42 21.76 42 26C42 26.24 42 26.46 42 26.7C40.72 26.26 39.4 26 38 26C31.38 26 26 31.38 26 38ZM26 14H22V28H26V14ZM34 32V44L44 38L34 32Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_302_1117">
                <rect width="48" height="48" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default TimerPlay
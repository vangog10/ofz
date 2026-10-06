import type { SVG } from '../../interfaces/SVG.interface'

function Tune({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_302_1120)">
            <path d="M6 34V38H18V34H6ZM6 10V14H26V10H6ZM26 42V38H42V34H26V30H22V42H26ZM14 18V22H6V26H14V30H18V18H14ZM42 26V22H22V26H42ZM30 18H34V14H42V10H34V6H30V18Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_302_1120">
                <rect width="48" height="48" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default Tune
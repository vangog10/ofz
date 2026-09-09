import type { SVG } from '../../interfaces/SVG.interface'

function BackspaceOutline({ color = 'currentColor', size = 24 }: SVG) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59ZM22 3C22.5304 3 23.0391 3.21071 23.4142 3.58579C23.7893 3.96086 24 4.46957 24 5V19C24 19.5304 23.7893 20.0391 23.4142 20.4142C23.0391 20.7893 22.5304 21 22 21H7C6.31 21 5.77 20.64 5.41 20.11L0 12L5.41 3.88C5.77 3.35 6.31 3 7 3H22ZM22 5H7L2.28 12L7 19H22V5Z" fill={color} />
    </svg>
  )
}

export default BackspaceOutline

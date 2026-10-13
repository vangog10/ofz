import { useEffect, useId, useRef, useState } from 'react'
import { animated, useReducedMotion, useSpring } from 'react-spring'
import type { CalloutProps } from '../interfaces/callout.interface'
import ShevronRight from './icons/ShevronRight'

const panelConfig = { tension: 250, friction: 30 }

const chevronConfig = { tension: 300, friction: 22 }

function Callout({ title, children }: CalloutProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const reducedMotion = useReducedMotion() === true

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const node = contentRef.current
    if (!node) return

    const measure = () => setContentHeight(node.offsetHeight)
    measure()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [children])

  const panel = useSpring({
    height: open ? contentHeight : 0,
    opacity: open ? 1 : 0,
    config: panelConfig,
    immediate: reducedMotion,
  })

  const chevron = useSpring({
    rotate: open ? 90 : 0,
    config: chevronConfig,
    immediate: reducedMotion,
  })

  return (
    <div className="w-full self-stretch bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.07)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-3 p-6 text-left"
      >
        <span className="flex-1 text-black/80 text-2xl font-bold font-['ALS_Sirius'] leading-7">{title}</span>
        <animated.span style={{ rotate: chevron.rotate }} className="inline-flex shrink-0">
          <ShevronRight size={32} color="#28be46" />
        </animated.span>
      </button>

      <animated.div
        id={panelId}
        aria-hidden={!open}
        style={{ height: panel.height, opacity: panel.opacity }}
        className="overflow-hidden"
      >
        <div
          ref={contentRef}
          className="pt-2 pr-6 pb-6 pl-14 text-black/80 text-xl font-['ALS_Sirius'] leading-6"
        >
          {children}
        </div>
      </animated.div>
    </div>
  )
}

export default Callout

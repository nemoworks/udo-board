import { useRef, useEffect } from 'react'
import { Graph } from '@antv/g6'
import './index.less'

export default function ({ data }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<Graph | null>(null)

  useEffect(() => {
    graphRef.current = new Graph({
      container: containerRef.current!,
    })
  }, [])

  return <div className="graph" ref={containerRef}></div>
}

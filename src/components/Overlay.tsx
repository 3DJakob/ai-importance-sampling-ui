import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Glass } from './NetworkInfo'

const Container = styled.div`
  position: absolute;
  z-index: 100;
  padding: 20px;
  transform: translate(-50%, 0%);
`

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(255, 255, 255, 0.5);
  top: -10px;
  left: 50%;
  transform: translate(-50%, 0%);
`

const Overlay: React.FC<{ children?: React.ReactElement }> = ({ children }) => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 })

  useEffect(() => {
    window.onmousemove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    return () => {
      window.onmousemove = null
    }
  }, [])

  if (mouse.x === 0 && mouse.y === 0) return null

  return (
    <Container
      as={Glass}
      style={{
        top: mouse.y + 20,
        left: mouse.x
      }}
    >
      <Arrow as={Glass} />
      {children}
    </Container>
  )
}

export default Overlay

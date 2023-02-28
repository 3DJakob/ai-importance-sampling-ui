import React from 'react'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`

const Loading: React.FC = () => {
  return (
    <Center>
      <ClipLoader color='#fff' />
    </Center>
  )
}

export default Loading

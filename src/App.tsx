import React from 'react'
import Networks from './pages/Networks'
import './lib/firebase'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Networks />
    </>
  )
}

export default App

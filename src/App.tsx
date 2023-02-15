import React from 'react'
import Networks from './pages/Networks'
import './lib/firebase'
import { createGlobalStyle } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import collections from './lib/collections'
import Network from './pages/Network'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const router = createBrowserRouter([
  {
    path: '/',
    element: <Networks />
  },
  {
    path: '/hello',
    element: <h1>Hello world</h1>
  },
  {
    path: '/network/:name',
    element: <Network />,
    loader: async ({ params }) => {
      const { name } = params
      const network = await getDoc(doc(collections.networks, name))
      const data = network.data()
      if (data == null) {
        return null
      }
      return data
    }
  }
])

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      {/* <Networks /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App

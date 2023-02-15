import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useNavigate } from 'react-router-dom'
import NetworkInfo from '../components/NetworkInfo'
import collections from '../lib/collections'
import styled from 'styled-components'
import bg from '../assets/bg.webp'
import { Network } from '../lib/types'

// load bg.webp from assets folder
const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Button = styled.div`
  cursor: pointer;
  transition: 0.2s;
  margin: 20px;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const Networks: React.FC = () => {
  const [networksFirebase, loading, error] = useCollection(collections.networks)
  const networks = networksFirebase?.docs.map(doc => doc.data())
  const navigate = useNavigate()

  if (networks == null || loading) {
    return <div>Loading...</div>
  }

  if (error != null) {
    return <div>Error: {String(error)}</div>
  }

  const handlePress = (network: Network): void => {
    navigate(`/network/${network.name}`)
  }

  return (
    <Background>
      {networks.map(network => (
        <Button key={network.name} onClick={() => handlePress(network)}>
          <NetworkInfo network={network} />
        </Button>
      ))}
    </Background>
  )
}

export default Networks

import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useNavigate } from 'react-router-dom'
import NetworkInfo from '../components/NetworkInfo'
import collections from '../lib/collections'
import styled from 'styled-components'
import bg from '../assets/bg.webp'
import { Network } from '../lib/types'
import Loading from '../components/Loading'

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-color: #fef4ef;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;

  align-content: start;
`

const Button = styled.div`
  cursor: pointer;
  
  div {
    transition: 0.2s;
  }

  div:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.01);
  }
`

const Networks: React.FC = () => {
  const [networksFirebase, loading, error] = useCollection(collections.networks)
  const networks = networksFirebase?.docs.map(doc => doc.data())
  const navigate = useNavigate()

  if (error != null) {
    return <div>Error: {String(error)}</div>
  }

  const handlePress = (network: Network): void => {
    navigate(`/network/${network.name}`)
  }

  return (
    <Background>
      {(networks == null || loading) && <Loading />}
      {
        networks != null && (
          <Grid>
            {networks?.map(network => (
              <Button key={network.name} onClick={() => handlePress(network)}>
                <NetworkInfo network={network} />
              </Button>
            ))}
          </Grid>
        )
      }
    </Background>
  )
}

export default Networks

import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import collections from '../lib/collections'
import Network from './Network'

const Networks: React.FC = () => {
  const [networksFirebase, loading, error] = useCollection(collections.networks)
  const networks = networksFirebase?.docs.map(doc => doc.data())

  if (networks == null || loading) {
    return <div>Loading...</div>
  }

  if (error != null) {
    return <div>Error: {String(error)}</div>
  }

  return (
    <div>
      {networks.map(network => (
        <Network network={network} key={network.name} />
      ))}
    </div>
  )
}

export default Networks

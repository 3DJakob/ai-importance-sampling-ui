import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import NetworkInfo from '../components/NetworkInfo'
import collections from '../lib/collections'

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
        <Link key={network.name} to={'/network/' + network.name}>
          <NetworkInfo network={network} />
        </Link>
      ))}
    </div>
  )
}

export default Networks

import { collection, CollectionReference, doc, getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { Network, NetworkRun, NetworkLoss } from './types'

const collections = {
  networks: collection(getFirestore(app), 'networks') as CollectionReference<Network>
}

export const getRunCollection = (networkId: string): CollectionReference<NetworkRun> => {
  return collection(doc(collection(getFirestore(app), 'networks'), networkId), 'runs') as CollectionReference<NetworkRun>
}

export const getLossCollection = (networkId: string): CollectionReference<NetworkLoss> => {
  return collection(doc(collection(getFirestore(app), 'networks'), networkId), 'loss') as CollectionReference<NetworkLoss>
}

export default collections

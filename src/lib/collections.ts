import { collection, CollectionReference, doc, getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { Network, NetworkRun } from './types'

const collections = {
  networks: collection(getFirestore(app), 'networks') as CollectionReference<Network>
}

export const getRunCollection = (networkId: string): CollectionReference<NetworkRun> => {
  return collection(doc(collection(getFirestore(app), 'networks'), networkId), 'runs') as CollectionReference<NetworkRun>
}

export default collections

import { collection, CollectionReference, doc, DocumentReference, getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { Network, NetworkRun, NetworkLoss } from './types'

const collections = {
  networks: collection(getFirestore(app), 'networks') as CollectionReference<Network>
}

export const getRunCollection = (networkId: string): CollectionReference<NetworkRun> => {
  return collection(doc(collection(getFirestore(app), 'networks'), networkId), 'runs') as CollectionReference<NetworkRun>
}

export const getRunDocument = (networkId: string, runId: string): DocumentReference<NetworkRun> => {
  return doc(doc(collection(getFirestore(app), 'networks'), networkId), 'runs', runId) as DocumentReference<NetworkRun>
}

export const getLossCollection = (networkId: string): CollectionReference<NetworkLoss> => {
  return collection(doc(collection(getFirestore(app), 'networks'), networkId), 'loss') as CollectionReference<NetworkLoss>
}

export default collections

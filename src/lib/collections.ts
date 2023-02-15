import { collection, CollectionReference, doc, getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { Network, NetworkRun } from './types'

const collections = {
  networks: collection(getFirestore(app), 'networks') as CollectionReference<Network>,
  runs: collection(doc(collection(getFirestore(app), 'networks'), 'mnist - camyleon'), 'runs') as CollectionReference<NetworkRun>
}

export default collections

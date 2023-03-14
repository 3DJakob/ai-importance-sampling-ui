
import React, { createContext, useCallback, useContext, useState } from 'react'

const getLocalStorageState = (): boolean => {
  const showTrendlines = localStorage.getItem('avarageResults')
  if (showTrendlines !== null) {
    return showTrendlines === 'true'
  }
  return false
}

const Context = createContext<[boolean, (state: boolean) => void]>([
  getLocalStorageState(),
  () => {}
])

interface AvarageResultsProviderProps {
  children: React.ReactNode
}

export const AvarageResultsProvider: React.FC<AvarageResultsProviderProps> = ({ children }) => {
  const [averageResults, setAverageResults] = useState(getLocalStorageState())

  return (
    <Context.Provider value={[averageResults, setAverageResults]}>
      {children}
    </Context.Provider>
  )
}

const useAverageResults = (): [
  boolean,
  (show: boolean) => void
] => {
  const [averageResults, setAverageResults] = useContext(Context)

  const updateAverageResults = useCallback(
    (show: boolean) => {
      console.log('updateAverageResults', show)
      setAverageResults(show)
      localStorage.setItem('avarageResults', show.toString())
    },
    [setAverageResults]
  )

  return [averageResults, updateAverageResults]
}

export default useAverageResults

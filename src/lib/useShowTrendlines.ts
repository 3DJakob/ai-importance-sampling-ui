
import { useCallback, useState } from 'react'

const getLocalStorageState = (): boolean => {
  const showTrendlines = localStorage.getItem('showTrendlines')
  if (showTrendlines !== null) {
    return showTrendlines === 'true'
  }
  return false
}

const useShowTrendlines = (): [
  boolean,
  (show: boolean) => void
] => {
  const [show, setShow] = useState<boolean>(getLocalStorageState())

  const setShowTrendlines = useCallback(
    (show: boolean) => {
      setShow(show)
      localStorage.setItem('showTrendlines', show.toString())
    },
    [setShow]
  )

  return [show, setShowTrendlines]
}

export default useShowTrendlines

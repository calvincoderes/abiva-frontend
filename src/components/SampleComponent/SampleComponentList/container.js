import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    samples: s.samples
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSamples: a.getSamples,
    setSamples: a.setSamples
  }))

  // Side effect of queries
  useEffect(() => {
    actions.getSamples()
  }, [])

  return children({
    state
  })
}

export default Container

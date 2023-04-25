import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    meContents: s.meContents
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getMeContents: a.getMeContents,
    setMeContents: a.setMeContents
  }))

  const [contents, setContents] = useState(null)

  useEffect(() => {
    actions.getMeContents()
  }, [])

  useEffect(() => {
    const { status, payload } = state.meContents
    if (status === 2 && payload) {
      setContents(payload)
      actions.setMeContents(clearState)
    } else if (status === 3) {
      actions.setMeContents(clearState)
    }
  }, [state.meContents])

  return children({ state, contents })
}

export default Container

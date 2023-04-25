import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const { id } = useParams()
  const [viewEpub, setViewEpub] = useState(false)
  // State
  const state = useStoreState(s => ({
    contentDetails: s.contentDetails,
    meContents: s.meContents
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getContentDetails: a.getContentDetails,
    setContentDetails: a.setContentDetails,
    getMeContents: a.getMeContents,
    setMeContents: a.setMeContents
  }))

  const [contents, setContents] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    actions.getContentDetails({ id })
    actions.getMeContents()
  }, [])

  useEffect(() => {
    const { status, payload } = state.contentDetails
    if (status === 2 && payload) {
      setContent(payload)
      actions.setContentDetails(clearState)
    } else if (status === 3) {
      actions.setContentDetails(clearState)
    }
  }, [state.contentDetails])

  useEffect(() => {
    const { status, payload } = state.meContents
    if (status === 2 && payload) {
      setContents(payload)
      actions.setMeContents(clearState)
    } else if (status === 3) {
      actions.setMeContents(clearState)
    }
  }, [state.meContents])

  const handleBack = () => {
    history.push('/contents')
  }

  return children({ state, content, contents, handleBack, setViewEpub, viewEpub })
}

export default Container

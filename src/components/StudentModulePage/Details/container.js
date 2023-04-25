/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    studentMD: s.studentMD
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentMD: a.getStudentMD,
    setStudentMD: a.setStudentMD
  }))

  const history = useHistory()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [totalStep, setTotalStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)

  const handleBack = () => {
    history.push('/modules')
  }

  useEffect(() => {
    actions.getStudentMD({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.studentMD

    if (status === 2) {
      const { description, title, page_progress, pages } = payload
      const total = pages.length

      setData({ title, description, answers: (page_progress && page_progress.length > 0) ? page_progress : [], pages })
      setTotalStep(total)
      actions.setStudentMD(clearState)
    } else if (status === 3) {
      actions.setStudentMD(clearState)
    }
  }, [state.studentMD])

  return children({ data, setData, totalStep, handleBack, currentStep, setCurrentStep })
}

export default Container

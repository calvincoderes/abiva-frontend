import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    studentAD: s.studentAD
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentAD: a.getStudentAD,
    setStudentAD: a.setStudentAD
  }))

  const [testStarted, setTestStarted] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [totalStep, setTotalStep] = useState(0)

  const handleBack = () => {
    const link = sessionStorage.getItem('assessment-back-link') || '/assessments-for-checking'
    history.push(link)
  }

  const handleStartTest = () => {
    setTestStarted(true)
  }

  useEffect(() => {
    actions.getStudentAD({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.studentAD

    if (status === 2) {
      let counter = 0
      const pushedData = []
      payload && payload.questionaires.map(q => {
        const items = []
        if (q.type === 'PRACTICAL_EXAM' || q.type === 'ESSAY') {
          q.items && q.items.map(i => {
            i.step = counter
            items.push(i)
            counter++
            return i
          })
          pushedData.push({ type: q.type, items })
        }

        return q
      })

      setData({ title: payload.description, description: payload.description, answers: payload.answers.length > 0 ? payload.answers : [], manual_points: payload.manual_points.length > 0 ? payload.manual_points : [], questionaires: pushedData })
      setTotalStep(counter)
      actions.setStudentAD(clearState)
    } else if (status === 3) {
      actions.setStudentAD(clearState)
    }
  }, [state.studentAD])

  return children({ data, setData, totalStep, handleBack, handleStartTest, testStarted })
}

export default Container

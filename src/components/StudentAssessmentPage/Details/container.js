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
  // To define if assessments has manual points (Essay, Practical Exam). Teacher will not have to check it if it's for completed.
  const [isForCompleted, setIsForCompleted] = useState(true)
  const [data, setData] = useState(null)
  const [totalStep, setTotalStep] = useState(0)

  const handleBack = () => {
    history.push('/assessments')
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
        q.items && q.items.map(i => {
          i.step = counter
          items.push(i)
          counter++
          return i
        })

        if (q.type === 'PRACTICAL_EXAM' || q.type === 'ESSAY') setIsForCompleted(false)

        return pushedData.push({ type: q.type, items })
      })

      setData({ title: payload.title, description: payload.description, answers: payload.answers.length > 0 ? payload.answers : [], questionaires: pushedData })
      setTotalStep(counter)
      actions.setStudentAD(clearState)
    } else if (status === 3) {
      actions.setStudentAD(clearState)
    }
  }, [state.studentAD])

  return children({ isForCompleted, data, setData, totalStep, handleBack, handleStartTest, testStarted })
}

export default Container

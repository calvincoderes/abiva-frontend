import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams, useHistory } from 'react-router-dom'
import { message } from 'antd'

import { STATUS_ON_GOING, STATUS_FOR_CHECKING, STATUS_COMPLETED } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children, isForCompleted, data, totalStep }) => {
  const history = useHistory()
  const { id } = useParams()

  // State
  const state = useStoreState(s => ({
    updatedStudentAD: s.updatedStudentAD
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentAD: a.getStudentAD,
    updateStudentAD: a.updateStudentAD,
    setUpdatedStudentAD: a.setUpdatedStudentAD
  }))

  const [initialPercent] = useState((100 / (totalStep)).toFixed(2))
  const [step, currentStep] = useState(0)
  const [percentage, setPercentage] = useState((100 / (totalStep)).toFixed(2))

  const answerChecker = (answer, i) => {
    let noAnswer = true
    if (answer && answer[i] && Object.keys(answer[step]).length > 0) noAnswer = false

    return noAnswer
  }

  const handleBack = () => {
    const sp = (step - 1)
    currentStep(sp)
    setPercentage(percentage - initialPercent)
  }

  const handleNext = () => {
    let status = STATUS_ON_GOING
    const sp = (step + 1)
    currentStep(sp)
    if (sp > 0) setPercentage(initialPercent * (sp + 1))

    // If student is done answering the assessments
    if (sp === totalStep) {
      status = STATUS_FOR_CHECKING

      // If no manual points assessment detected
      if (isForCompleted) status = STATUS_COMPLETED
    }

    actions.updateStudentAD({ id, answers: data.answers, status })
  }

  useEffect(() => {
    const { status, payload } = state.updatedStudentAD
    if (status === 2) {
      actions.getStudentAD({ id })
      actions.setUpdatedStudentAD(clearState)
      if (payload.status === 'FOR_CHECKING' || payload.status === 'COMPLETED') {
        message.success('Successfully submitted your assessment')
        history.push('/assessments')
      }
    } else if (status === 3) {
      actions.setUpdatedStudentAD(clearState)
    }
  }, [state.updatedStudentAD])

  return children({ state, percentage, step, handleBack, handleNext, answerChecker })
}

export default Container

import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams, useHistory } from 'react-router-dom'
import { message } from 'antd'

import { STATUS_FOR_CHECKING, STATUS_COMPLETED } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children, data, totalStep }) => {
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

  const [initialPercent] = useState((100 / (totalStep)))
  const [step, currentStep] = useState(0)
  const [percentage, setPercentage] = useState((100 / (totalStep)))

  const scoreChecker = (score, i) => {
    let noScore = true
    if (score && score[i] && Object.keys(score[step]).length > 0) noScore = false

    return noScore
  }

  const handleBack = () => {
    const sp = (step - 1)
    currentStep(sp)
    setPercentage(percentage - initialPercent)
  }

  const handleNext = () => {
    let status = STATUS_FOR_CHECKING
    const sp = (step + 1)
    currentStep(sp)
    if (sp > 0) setPercentage(initialPercent * (sp + 1))

    // If student is done answering the assessments
    if (sp === totalStep) status = STATUS_COMPLETED

    actions.updateStudentAD({ id, manual_points: data.manual_points, status })
  }

  useEffect(() => {
    const { status, payload } = state.updatedStudentAD
    if (status === 2) {
      actions.getStudentAD({ id })
      actions.setUpdatedStudentAD(clearState)
      if (payload.status === STATUS_COMPLETED) {
        message.success('Successfully added score of student')
        history.push('/assessments-for-checking')
      }
    } else if (status === 3) {
      actions.setUpdatedStudentAD(clearState)
    }
  }, [state.updatedStudentAD])

  return children({ state, percentage, step, handleBack, handleNext, scoreChecker })
}

export default Container

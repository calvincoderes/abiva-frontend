/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams, useHistory } from 'react-router-dom'
import { message } from 'antd'

import { STATUS_MODULE_IN_PROGRESS, STATUS_MODULE_DONE } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children, data, totalStep, currentStep, setCurrentStep }) => {
  const history = useHistory()
  const { id } = useParams()

  // State
  const state = useStoreState(s => ({
    updatedStudentMD: s.updatedStudentMD
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentMD: a.getStudentMD,
    updateStudentMD: a.updateStudentMD,
    setUpdatedStudentMD: a.setUpdatedStudentMD
  }))

  const [initialPercent] = useState((100 / (totalStep)).toFixed(2))
  // const [step, currentStep] = useState(0)
  const [percentage, setPercentage] = useState((100 / (totalStep)).toFixed(2))

  const answerChecker = (answer, i) => {
    const a = answer.filter(x => x.page === currentStep)
    let noAnswer = true
    if (a && a[0] && Object.keys(a[0]).length > 0) noAnswer = false

    return noAnswer
  }

  const handleBack = () => {
    const sp = (currentStep - 1)
    setCurrentStep(sp)
    setPercentage(percentage - initialPercent)
  }

  const handleNext = () => {
    let status = STATUS_MODULE_IN_PROGRESS
    const sp = (currentStep + 1)

    if (sp <= totalStep) setCurrentStep(sp)
    if (sp > 0) setPercentage(initialPercent * (sp))

    // If student is done answering the assessments
    if ((sp - 1) === totalStep) {
      status = STATUS_MODULE_DONE
    }

    const page_progress = data.answers
    actions.updateStudentMD({ id, status, page_progress })
  }

  useEffect(() => {
    const { status, payload } = state.updatedStudentMD
    if (status === 2) {
      actions.getStudentMD({ id })
      actions.setUpdatedStudentMD(clearState)
      if (payload.status === STATUS_MODULE_DONE) {
        message.success('Successfully submitted your module')
        history.push('/modules')
      }
    } else if (status === 3) {
      actions.setUpdatedStudentMD(clearState)
    }
  }, [state.updatedStudentMD])

  return children({ state, percentage, handleBack, handleNext, answerChecker })
}

export default Container

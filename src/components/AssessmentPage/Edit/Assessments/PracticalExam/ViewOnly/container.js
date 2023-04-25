import { useState } from 'react'

const Container = ({ children, mainFormik }) => {
  const [editAssessment, setEditAssessment] = useState(false)
  const [step, currentStep] = useState(0)

  const handleBack = () => {
    currentStep(step - 1)
  }

  const handleNext = () => {
    currentStep((step + 1))
  }

  const handleDelete = (k) => {
    const pushedData = []
    mainFormik.values.assessment_types_data && mainFormik.values.assessment_types_data.map((v, i) => {
      if (i !== k) pushedData.push(v)
      return v
    })

    mainFormik.setFieldValue('assessment_types_data', pushedData)
  }

  const handleEdit = () => {
    setEditAssessment(true)
  }

  return children({ step, handleBack, handleNext, handleDelete, handleEdit, editAssessment, setEditAssessment })
}

export default Container

import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { message } from 'antd'

const clearState = { status: 0, payload: null }

const Container = ({ children, mainFormik, v, k }) => {
  // State
  const state = useStoreState(s => ({
    createdImage: s.createdImage
  }))

  // Actions
  const actions = useStoreActions(a => ({
    createImage: a.createImage,
    setCreatedImage: a.setCreatedImage
  }))

  const [questions, setQuestions] = useState(v)
  const [currentFileKey, setCurrentFileKey] = useState(0)

  const handleCollapse = (key) => {
    console.log(key)
  }

  const panelDelete = (e, k) => {
    // Reset Deleted Data
    questions.items.filter((_, xk) => xk === k).map(qi => {
      qi.description = ''
      qi.file = ''
      qi.points_equivalent = 1
      qi.other = null

      return qi
    })
    // End of Reseting Deleted Data

    // Update Data
    setQuestions({
      ...questions,
      items: [...questions.items.filter((_, xk) => xk !== k)]
    })
    // End of Updating Data

    e.stopPropagation()
  }

  const handleQuestion = () => {
    setQuestions({
      ...questions,
      items: [...questions.items, { description: '', file: '', points_equivalent: 1, other: null }]
    })
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleUpload = ({ file, onSuccess }) => {
    const formData = new FormData()
    formData.append('image', file)
    actions.createImage(formData)
  }

  useEffect(() => {
    const { status, payload } = state.createdImage
    if (status === 2) {
      questions.items[currentFileKey].file = payload.image
      actions.setCreatedImage(clearState)
    } else if (status === 3) {
      actions.setCreatedImage(clearState)
    }
  }, [state.createdImage])

  useEffect(() => {
    if (questions) {
      const mf = mainFormik.values
      mf.assessment_types_data[k] = questions
      mainFormik.setFieldValue('assessment_types_data', mf.assessment_types_data)
    }
  }, [questions])

  return children({
    state,
    handleCollapse,
    panelDelete,
    questions,
    handleQuestion,
    setCurrentFileKey,
    beforeUpload,
    handleUpload
  })
}

export default Container

import { useState, useEffect } from 'react'

const Container = ({ children, mainFormik, v, k }) => {
  const [questions, setQuestions] = useState(v)

  const handleCollapse = (key) => {
    console.log(key)
  }

  const panelDelete = (e, k) => {
    // Reset Deleted Data
    questions.items.filter((_, xk) => xk === k).map(qi => {
      qi.type = 'radio'
      qi.description = ''
      qi.points_equivalent = 1
      qi.other = null
      qi.answers = [
        { is_correct: 'true', title: '' }
      ]
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

  const handleDelete = (questionKey, answerKey) => {
    // Remove Data
    delete questions.items[questionKey].answers[answerKey]
    // End of Removing Data

    // Update Data
    setQuestions({ ...questions, items: [...questions.items] })
    // End of Updating Data
  }

  const handleAddAnswer = (k) => {
    questions.items[k].answers.push({ is_correct: 'false', title: '' })
    setQuestions({ ...questions, items: [...questions.items] })
  }

  const handleQuestion = () => {
    setQuestions({
      ...questions,
      items: [...questions.items, {
        type: 'radio',
        description: '',
        points_equivalent: 1,
        other: null,
        answers: [
          { is_correct: 'true', title: '' }
        ]
      }]
    })
  }

  const handleOnChange = (i, v) => {
    questions && questions.items.map((q, qk) => {
      if (qk === i) q.type = v
      return q
    })
    setQuestions({ ...questions, items: [...questions.items] })
  }

  const handleAnswers = (i, v) => {
    questions && questions.items[i].answers.map((a, ak) => {
      a.is_correct = (ak === v ? 'true' : 'false')
      return a
    })
    setQuestions({ ...questions, items: [...questions.items] })
  }

  const handleMultipleAnswers = (i, v) => {
    questions && questions.items[i].answers.map((a, ak) => {
      a.is_correct = (v.includes(ak) ? 'true' : 'false')
      return a
    })

    setQuestions({ ...questions, items: [...questions.items] })
  }

  const getDefaultValues = (data) => {
    const answers = []
    data && data.map((a, ak) => {
      if (a.is_correct === 'true') answers.push(ak)
      return a
    })

    return answers
  }

  useEffect(() => {
    if (questions) {
      const mf = mainFormik.values
      mf.assessment_types_data[k] = questions
      mainFormik.setFieldValue('assessment_types_data', mf.assessment_types_data)
    }
  }, [questions])

  return children({
    handleCollapse,
    panelDelete,
    getDefaultValues,
    questions,
    handleQuestion,
    handleOnChange,
    handleAnswers,
    handleMultipleAnswers,
    handleDelete,
    handleAddAnswer
  })
}

export default Container

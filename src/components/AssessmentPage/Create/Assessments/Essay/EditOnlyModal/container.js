import { useState, useEffect } from 'react'

const Container = ({ children, mainFormik, v, k }) => {
  const [questions, setQuestions] = useState(v)

  const handleCollapse = (key) => {
    console.log(key)
  }

  const panelDelete = (e, k) => {
    // Reset Deleted Data
    questions.items.filter((_, xk) => xk === k).map(qi => {
      qi.description = ''
      qi.answer = 'TRUE'
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

  const handleDelete = (questionKey, answerKey) => {
    // Remove Data
    delete questions.items[questionKey].answers[answerKey]
    // End of Removing Data

    // Update Data
    setQuestions({ ...questions, items: [...questions.items] })
    // End of Updating Data
  }

  const handleQuestion = () => {
    setQuestions({
      ...questions,
      items: [...questions.items, { description: '', answers: [''], points_equivalent: 1, other: null }]
    })
  }

  const handleAddAnswer = (k) => {
    questions.items[k].answers.push('')
    setQuestions({ ...questions, items: [...questions.items] })
  }

  useEffect(() => {
    if (questions) {
      const mf = mainFormik.values
      mf.assessment_types_data[k] = questions
      mainFormik.setFieldValue('assessment_types_data', mf.assessment_types_data)
    }
  }, [questions])

  return children({ handleCollapse, panelDelete, questions, handleDelete, handleQuestion, handleAddAnswer })
}

export default Container

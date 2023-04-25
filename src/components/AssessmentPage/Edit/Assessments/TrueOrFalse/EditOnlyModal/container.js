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

  const handleQuestion = () => {
    setQuestions({
      ...questions,
      items: [...questions.items, { description: '', answer: 'TRUE', points_equivalent: 1, other: null }]
    })
  }

  useEffect(() => {
    if (questions) {
      const mf = mainFormik.values
      mf.assessment_types_data[k] = questions
      mainFormik.setFieldValue('assessment_types_data', mf.assessment_types_data)
    }
  }, [questions])

  return children({ handleCollapse, panelDelete, questions, handleQuestion })
}

export default Container

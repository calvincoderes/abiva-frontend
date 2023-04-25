import { useState, useEffect } from 'react'

const Container = ({ children, setAssessment }) => {
  const [questions, setQuestions] = useState({
    type: 'TRUE_OR_FALSE',
    items: [{ description: '', answer: 'TRUE', points_equivalent: 1, other: null }]
  })

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
    setAssessment(questions)
  }, [questions])

  return children({ handleCollapse, panelDelete, questions, handleQuestion })
}

export default Container

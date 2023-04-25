import { useState, useEffect } from 'react'

const Container = ({ children, setAssessment }) => {
  const [questions, setQuestions] = useState({
    type: 'ESSAY',
    items: [{
      description: '',
      answers: [''],
      points_equivalent: 1,
      other: null
    }]
  })

  const handleCollapse = (key) => {
    console.log(key)
  }

  const panelDelete = (e, k) => {
    // Reset Deleted Data
    questions.items.filter((_, xk) => xk === k).map(qi => {
      qi.description = ''
      qi.points_equivalent = 1
      qi.other = null
      qi.answers = ['']
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
    setAssessment(questions)
  }, [questions])

  return children({ handleCollapse, panelDelete, questions, handleDelete, handleQuestion, handleAddAnswer })
}

export default Container

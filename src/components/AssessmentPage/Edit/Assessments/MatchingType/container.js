import { useState, useEffect } from 'react'

const Container = ({ children, setAssessment }) => {
  const [questions, setQuestions] = useState({
    type: 'MATCHING_TYPE',
    items: [{
      description: '',
      answers: [
        { item: '', answer: '', points_equivalent: 1 }
      ],
      additional_wrong_answers: [''],
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
      qi.answer = 'TRUE'
      qi.answers = [
        { item: 'true', answer: '', points_equivalent: 1 }
      ]
      qi.additional_wrong_answers = ['']
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
      items: [...questions.items, {
        description: '',
        answers: [
          { item: '', answer: '', points_equivalent: 1 }
        ],
        additional_wrong_answers: [''],
        other: null
      }]
    })
  }

  const handleAddAnswer = (k) => {
    questions.items[k].answers.push({ item: '', answer: '', points_equivalent: 1 })
    setQuestions({ ...questions, items: [...questions.items] })
  }

  const handleAddWrongAnswer = (k) => {
    questions.items[k].additional_wrong_answers.push('')
    setQuestions({ ...questions, items: [...questions.items] })
  }

  useEffect(() => {
    setAssessment(questions)
  }, [questions])

  return children({ handleCollapse, panelDelete, questions, handleQuestion, handleAddAnswer, handleAddWrongAnswer })
}

export default Container

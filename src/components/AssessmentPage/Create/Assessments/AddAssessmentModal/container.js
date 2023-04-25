import { useState } from 'react'

const Container = ({ children, formik, setAddAssessment }) => {
  const [selectedType, setSelectedType] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const [types] = useState([
    {
      type: 'true_or_false',
      name: 'True or False',
      image: 'true-or-false.png'
    },
    {
      type: 'multiple_choice',
      name: 'Multiple Choice',
      image: 'multiple-choice.png'
    },
    {
      type: 'matching_type',
      name: 'Matching Type',
      image: 'matching-type.png'
    },
    {
      type: 'essay',
      name: 'Essay',
      image: 'essay.png'
    },
    // {
    //   type: 'fill_the_blanks',
    //   name: 'Fill in the Blanks',
    //   image: 'fill-in-the-blanks.png'
    // },
    {
      type: 'practical_exam',
      name: 'Practical Exam',
      image: 'practical-exam.png'
    }
  ])

  const handleType = (data) => {
    setSelectedType(data)
  }

  const createAssessment = () => {
    const data = []

    // If it has a data
    if (formik.values.assessment_types_data && Object.keys(formik.values.assessment_types_data).length > 0) {
      // Set all previous data
      formik.values.assessment_types_data.map(v => { return data.push(v) })

      // Push new data
      data.push(assessment)
    } else {
      data.push(assessment)
    }
    // assessmentData.push(assessment)
    formik.setFieldValue('assessment_types_data', data)
    setAssessment(null)
    setAddAssessment(false)
    setSelectedType(null)
  }

  return children({ types, selectedType, handleType, setAssessment, createAssessment })
}

export default Container

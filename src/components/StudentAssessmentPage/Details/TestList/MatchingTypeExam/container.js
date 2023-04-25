import { useEffect, useState } from 'react'

const Container = ({ children, q }) => {
  const [availableAnswers, setAvailableAnswers] = useState(null)

  const shuffle = (array) => {
    let currentIndex = array.length; let randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }

    return array
  }

  const handleDefaultValue = (answers, ak) => {
    if (answers && answers.length > 0 && answers.filter(x => x.uuid === q.uuid).length > 0) {
      const a = answers.filter(x => x.uuid === q.uuid)[0].answers.filter(f => f.key === ak)
      if (a && a.length > 0) {
        return a[0].answer
      }

      return null
    }

    return null
  }

  useEffect(() => {
    if (q) {
      const pushedData = []
      q.additional_wrong_answers.map(awa => {
        return pushedData.push(awa)
      })

      q.answers.map(a => {
        return pushedData.push(a.answer)
      })

      setAvailableAnswers(shuffle(pushedData))
    }
  }, [q])
  return children({ shuffle, availableAnswers, handleDefaultValue })
}

export default Container

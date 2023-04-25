import { useEffect, useState } from 'react'

const Container = ({ children, items }) => {
  const [questions, setQuestions] = useState(null)

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

  const answersChecker = (answers, page, uuid) => {
    const a = answers && answers.length > 0 && answers.filter(x => x.page === page)[0].answers
    if (a && a.length > 0 && a.filter(x => x.uuid === uuid).length > 0) {
      return true
    }

    return false
  }

  const defaultAnswer = (answers, page, uuid, iak) => {
    if (answersChecker(answers, page, uuid)) {
      const data = answers.filter(x => x.page === page)[0]
      const a = data.answers.filter(x => x.uuid === uuid)[0].answers
      if (a.filter(y => y.key === iak).length > 0) {
        return a.filter(y => y.key === iak)[0].answer
      }
    }

    return null
  }

  useEffect(() => {
    if (items && items.length > 0) {
      const q = []
      items.map(i => {
        q.push({ uuid: i.uuid, items: shuffle(i.answers) })
        return i
      })
      setQuestions(q)
    }
  }, [items])

  return children({ questions, answersChecker, defaultAnswer })
}

export default Container

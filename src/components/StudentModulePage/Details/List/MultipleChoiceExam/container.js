const Container = ({ children }) => {
  const answersChecker = (answers, page, uuid) => {
    const a = answers && answers.length > 0 && answers.filter(x => x.page === page)[0].answers
    if (a && a.length > 0 && a.filter(x => x.uuid === uuid).length > 0) {
      return true
    }

    return false
  }

  const defaultAnswer = (answers, page, uuid) => {
    if (answersChecker(answers, page, uuid)) {
      const a = answers.filter(x => x.page === page)[0]
      return a.answers.filter(x => x.uuid === uuid)[0].answer
    }

    return null
  }

  return children({ answersChecker, defaultAnswer })
}

export default Container

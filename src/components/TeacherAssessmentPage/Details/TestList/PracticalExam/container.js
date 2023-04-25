const Container = ({ children }) => {
  const isValidURL = (string) => {
    // eslint-disable-next-line no-useless-escape
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    return (res !== null)
  }

  return children({ isValidURL })
}

export default Container

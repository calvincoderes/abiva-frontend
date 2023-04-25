import { useHistory } from 'react-router-dom'

const Container = ({ children }) => {
  const history = useHistory()

  const onClick = (url = '/') => {
    history.push(url)
  }

  return children({ onClick })
}

export default Container

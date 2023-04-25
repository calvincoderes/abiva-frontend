import { useHistory } from 'react-router-dom'

const Container = ({ children }) => {
  const history = useHistory()

  const onClick = () => {
    history.push('/')
  }

  return children({ onClick })
}

export default Container

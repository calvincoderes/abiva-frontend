import { useHistory } from 'react-router-dom'

const Container = ({ children }) => {
  const history = useHistory()
  const handleLink = (url) => {
    url && history.push(url)
  }
  return children({ handleLink })
}

export default Container

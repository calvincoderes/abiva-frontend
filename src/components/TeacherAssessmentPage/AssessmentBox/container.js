import { useHistory } from 'react-router-dom'

const Container = ({ children }) => {
  const history = useHistory()
  const handleLink = (url) => {
    sessionStorage.setItem('assessment-back-link', '/assessments-for-checking')
    url && history.push(url)
  }
  return children({ handleLink })
}

export default Container

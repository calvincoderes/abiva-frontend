import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Container = ({ children }) => {
  const history = useHistory()

  useEffect(() => {
    if (!sessionStorage.getItem('oauth')) {
      history.push('/')
    }
  }, [sessionStorage.getItem('oauth')])

  return children({})
}

export default Container

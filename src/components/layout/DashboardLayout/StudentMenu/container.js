import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Container = ({ children }) => {
  const location = useLocation()
  const history = useHistory()

  const [currentPath, setCurrentPath] = useState('contents')
  const [defaultKeys, setDefaultKeys] = useState(null)

  const handleMenu = ({ key }) => {
    history.push('/' + key)
  }

  useEffect(() => {
    if (location.pathname) {
      const splitPath = location.pathname.substring(1).split('/').shift()
      setDefaultKeys('contents')
      setCurrentPath(splitPath)
    }
  }, [])

  return children({ currentPath, defaultKeys, handleMenu })
}

export default Container

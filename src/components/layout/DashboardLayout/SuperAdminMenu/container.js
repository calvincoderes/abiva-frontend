import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Container = ({ children }) => {
  const location = useLocation()
  const history = useHistory()

  const [currentPath, setCurrentPath] = useState('dashboard')
  const [defaultKeys, setDefaultKeys] = useState(null)

  const handleMenu = ({ key }) => {
    history.push('/' + key)
  }

  useEffect(() => {
    if (location.pathname) {
      const splitPath = location.pathname.substring(1).split('/').shift()
      if (['school', 'subject', 'year', 'class'].includes(splitPath)) {
        setDefaultKeys('configuration')
      } else if (['school-admin', 'school-sub-admin', 'teacher', 'student'].includes(splitPath)) {
        setDefaultKeys('account-management')
      } else if (['category', 'sub-category', 'content'].includes(splitPath)) {
        setDefaultKeys('content-management')
      } else {
        setDefaultKeys('dashboard')
      }
      setCurrentPath(splitPath)
    }
  }, [])

  return children({ currentPath, defaultKeys, handleMenu })
}

export default Container

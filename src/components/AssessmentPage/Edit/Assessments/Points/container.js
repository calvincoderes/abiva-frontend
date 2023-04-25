import { useState, useEffect } from 'react'

const Container = ({ children, data }) => {
  const [isOther, setIsOther] = useState(false)

  const handleOther = (data) => {
    if (isOther === true) {
      data.other = null
    }
    setIsOther(!isOther)
  }

  useEffect(() => {
    if (data.other !== null) {
      setIsOther(true)
    }
  }, [data.other])

  return children({ handleOther, isOther })
}

export default Container

import { useState } from 'react'

const Container = ({ children }) => {
  const [location, setLocation] = useState(null)

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }

  return children({ location, locationChanged })
}

export default Container

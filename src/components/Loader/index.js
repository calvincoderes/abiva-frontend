import React from 'react'
import styled from 'styled-components'
import { Image } from 'antd'

const Styled = styled.div`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
`

const Loader = () => (
  <Styled>
    <Image src='/assets/images/loader.png' preview={false} />
  </Styled>
)

export default Loader

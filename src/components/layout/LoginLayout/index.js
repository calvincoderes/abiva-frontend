import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ViewContainer from './container'

const Styled = styled.div`
  .layout {
    padding: 0px !important;
  }
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
`

const View = ({ children, ...rest }) => (
  <ViewContainer>
    {() => (
      <Styled className='layout' {...rest}>
        {children({})}
      </Styled>
    )}
  </ViewContainer >
)

View.propTypes = {
  children: PropTypes.any
}
export default View

import React from 'react'

const IconButton = ({ children, onClick }) => (
  <a onClick={onClick}>
    {children}
  </a>
)

export default IconButton

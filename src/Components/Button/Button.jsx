import React from 'react'

const Button = ({ children, onClick, theme }) => {
  const isSmall = theme === 'small' || theme === 'secondary-small'
  const isSecondary = theme === 'secondary' || theme === 'secondary-small'
  const isDanger = theme === 'danger' || theme === 'danger-disabled'
  const isDisabled = theme === 'disabled' || theme === 'danger-disabled'

  return (
    <button onClick={onClick} className={`
      bo-button
      ${isSmall ? 'is-small' : ''}
      ${isSecondary ? 'is-secondary' : ''}
      ${isDanger ? 'is-danger' : ''}
      ${isDisabled ? 'is-disabled' : ''}
    `}>
      {children}
    </button>
  )
}

export default Button

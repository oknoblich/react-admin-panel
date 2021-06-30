import React from 'react'

const Notification = ({ text, type }) => (
  <div className={`notification is-${type}`}>
    {text}
  </div>
)

export default Notification

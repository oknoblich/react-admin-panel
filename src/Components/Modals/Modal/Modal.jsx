import React from 'react'

const Modal = ({ children, closeModal }) => (
  <div className="bo-overlay">
    <div className="bo-modal">
      <a className="bo-modal-close" onClick={closeModal}>
        <div className="icon icon-close-gray-1"></div>
      </a>
      {children}
    </div>
  </div>
)

export default Modal

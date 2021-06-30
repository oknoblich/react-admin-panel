import React, { useState } from 'react'

import { placeholderService } from 'Services'
import { Button, Modal, Notification, Table } from 'Components'

const DeleteUserModal = ({ user, closeModal }) => {
  const [postError, setPostError] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const handleDeletion = () => {
    placeholderService.deleteUser(user.id)
    .then(() => {
      setPostSuccess(true)
      setTimeout(closeModal, 2000)
    })
    .catch((error) => {
      setPostError(true)
      console.log(error)
    })
  }

  return (
    <Modal closeModal={closeModal}>
      {
        postSuccess
        ? (
          <Notification text="Fake POST successful" type="success" />
        )
        : (
          <>
            <div className="row g-2">
              <div className="col-12">
                <h2>Delete User</h2>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-12">
                <p>You selected the following user:</p>
              </div>
              <div className="col-12">
                <Table
                  rows={[
                    <>
                      <td>ID</td>
                      <td>{user.id}</td>
                    </>,
                    <>
                      <td>Name</td>
                      <td>{user.name}</td>
                    </>,
                    <>
                      <td>Username</td>
                      <td>{user.username}</td>
                    </>,
                    <>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </>
                  ]}
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-12">
                <Button onClick={handleDeletion} theme="danger">
                  Delete User
                </Button>
              </div>
              {
                postError && (
                  <div className="col-12">
                    <Notification text="Something went wrong. Please check the console for more information." type="error" />
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </Modal>
  )
}

export default DeleteUserModal

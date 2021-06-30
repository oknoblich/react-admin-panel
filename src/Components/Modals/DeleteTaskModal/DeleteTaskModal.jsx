import React, { useState } from 'react'

import { placeholderService } from 'Services'
import { Button, Modal, Notification, Table } from 'Components'

const DeleteTaskModal = ({ task, closeModal }) => {
  const [postError, setPostError] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const handleDeletion = () => {
    placeholderService.deleteTask(task.id)
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
                <h2>Delete Task</h2>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-12">
                <p>You selected the following task:</p>
              </div>
              <div className="col-12">
                <Table
                  rows={[
                    <>
                      <td>ID</td>
                      <td>{task.id}</td>
                    </>,
                    <>
                      <td>User&nbsp;ID</td>
                      <td>{task.userId}</td>
                    </>,
                    <>
                      <td>Title</td>
                      <td>{task.title.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
                    </>,
                    <>
                      <td>Status</td>
                      <td>{task.completed ? 'Completed' : 'Open'}</td>
                    </>
                  ]}
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col-12">
                <Button onClick={handleDeletion} theme="danger">
                  Delete Task
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

export default DeleteTaskModal

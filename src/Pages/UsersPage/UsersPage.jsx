import React, { useEffect, useState } from 'react'

import { DeleteUserModal, IconButton, NumberInput, Table } from 'Components'

const UsersPage = ({ users, filter, setFilter }) => {
  const [selected, setSelected] = useState(null)

  const openModal = (id) => {
    setSelected(users.find((cur) => cur.id === id))
  }

  const closeModal = () => {
    setSelected(null)
  }

  const handleChange = (name, value) => setFilter({ ...filter, [name]: value })

  useEffect(() => {
    setFilter({ _start: 0, _limit: 10 })
  }, [])

  return (
    <>
      <div className="row mb-5">
        <div className="col-12 col-md-6">
          <div className="row align-items-center">
            <div className="col">
              <NumberInput
                value={filter._start}
                onChange={(name, value) => handleChange(name, value)}
                label="Start from"
                name="_start"
              />
            </div>
            <div className="col-auto pl-0">
              <IconButton onClick={() => handleChange('_start', 0)}>
                <div className="icon icon-refresh-gray-2"></div>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row align-items-center">
            <div className="col">
              <NumberInput
                value={filter._limit}
                onChange={(name, value) => handleChange(name, value)}
                label="Show maximal"
                name="_limit"
              />
            </div>
            <div className="col-auto pl-0">
              <IconButton onClick={() => handleChange('_limit', 10)}>
                <div className="icon icon-refresh-gray-2"></div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Table
        titleRow={[
          'ID',
          'Name',
          'Username',
          'Email',
          'Address',
          'Actions'
        ]}
        rows={
          users.map((cur) => (
            <>
              <td>{cur.id}</td>
              <td>{cur.name}</td>
              <td>{cur.username}</td>
              <td>{cur.email}</td>
              <td>
                <span className="nowrap">
                  {cur.address.street} {cur.address.suite}
                </span>
                <br />
                <span className="nowrap">
                  {cur.address.zipcode} {cur.address.city}
                </span>
              </td>
              <td>
                <a onClick={() => openModal(cur.id)} className="text-danger">Delete</a>
              </td>
            </>
          ))
        }
        theme="striped"
      />
      {
        selected && <DeleteUserModal user={selected} closeModal={closeModal} />
      }
    </>
  )
}

export default UsersPage

import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import { DeleteTaskModal, IconButton, NumberInput, Table } from 'Components'

const TasksPage = ({ tasks, filter, setFilter }) => {
  const [selected, setSelected] = useState(null)

  const calcPercentages = (number) => number ? (100 / tasks.length * number).toFixed(0) + '%' : null

  const counters = {
    user: _.countBy(tasks, (cur) => cur.userId),
    under_40: _.countBy(tasks, (cur) => cur.title.length <= 40),
    completed: _.countBy(tasks, (cur) => cur.completed)
  }

  const openModal = (id) => {
    setSelected(tasks.find((cur) => cur.id === id))
  }

  const closeModal = () => {
    setSelected(null)
  }

  const handleChange = (name, value) => setFilter({ ...filter, [name]: value })

  useEffect(() => {
    setFilter({ _start: 0, _limit: 100 })
  }, [])

  return (
    <>
      <div className="row">
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
              <IconButton onClick={() => handleChange('_limit', 100)}>
                <div className="icon icon-refresh-gray-2"></div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1 mb-5">
        <div className="col-12 col-lg-4">
          <div className="bo-card">
            <div className="bo-card-body">
              <div className="row g-0 align-items-end">
                <div className="col-8">User 1</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.user['1'])}</div>
                <div className="col-2 text-right">{counters.user['1']}</div>
                <div className="col-8">User 2</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.user['2'])}</div>
                <div className="col-2 text-right">{counters.user['2']}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bo-card">
            <div className="bo-card-body">
              <div className="row g-0 align-items-end">
                <div className="col-8">&lt;= 40 characters</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.under_40['true'])}</div>
                <div className="col-2 text-right">{counters.under_40['true']}</div>
                <div className="col-8">&gt; 40 characters</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.under_40['false'])}</div>
                <div className="col-2 text-right">{counters.under_40['false']}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bo-card">
            <div className="bo-card-body">
              <div className="row g-0 align-items-end">
                <div className="col-8">Open</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.completed['false'])}</div>
                <div className="col-2 text-right">{counters.completed['false']}</div>
                <div className="col-8">Completed</div>
                <div className="col-2 text-right text-gray-2 text-small">{calcPercentages(counters.completed['true'])}</div>
                <div className="col-2 text-right">{counters.completed['true']}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table
        titleRow={[
          'ID',
          'User ID',
          'Title',
          'Status',
          'Actions'
        ]}
        rows={
          tasks.map((cur) => (
            <>
              <td>{cur.id}</td>
              <td>{cur.userId}</td>
              <td>{cur.title.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
              <td>{cur.completed ? 'Completed' : 'Open'}</td>
              <td>
                <a onClick={() => openModal(cur.id)} className="text-danger">Delete</a>
              </td>
            </>
          ))
        }
        theme="striped"
      />
      {
        selected && <DeleteTaskModal task={selected} closeModal={closeModal} />
      }
    </>
  )
}

export default TasksPage

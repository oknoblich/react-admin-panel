import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { generateSearchParams } from 'Config'
import { placeholderService } from 'Services'
import { AboutPage, TasksPage, UsersPage } from 'Pages'
import { LoadingIndicator, Notification, Tabs } from 'Components'

const App = () => {
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [fetchError, setFetchError] = useState(false)
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({ _start: 0, _limit: 10 })

  const getTasks = () => {
    placeholderService.getTasks(`?${generateSearchParams(filter)}`)
    .then((response) => {
      setTasks(response.data)
      setTimeout(() => setLoadingTasks(false), 500)
      console.log(response)
    })
    .catch((error) => {
      setFetchError(true)
      setLoadingTasks(false)
      console.log(error)
    })
  }

  const getUsers = () => {
    placeholderService.getUsers(`?${generateSearchParams(filter)}`)
    .then((response) => {
      setUsers(response.data)
      setTimeout(() => setLoadingUsers(false), 500)
      console.log(response)
    })
    .catch((error) => {
      setFetchError(true)
      setLoadingUsers(false)
      console.log(error)
    })
  }

  useEffect(() => {
    getTasks()
    getUsers()
  }, [filter])

  if (loadingTasks || loadingUsers) {
    return (
      <div className="mt-6 pt-6 text-center">
        <LoadingIndicator />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="mt-6 pt-6">
        <div style={{ width: 510, margin: 'auto' }}>
          <Notification text="Something went wrong. Please check the console for more information." type="error" />
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Tabs />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/" render={() => (
            <TasksPage
              tasks={tasks}
              filter={filter}
              setFilter={setFilter}
            />
          )} />
          <Route exact path="/users" render={() => (
            <UsersPage
              users={users}
              filter={filter}
              setFilter={setFilter}
            />
          )} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

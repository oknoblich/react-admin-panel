import React from 'react'
import { NavLink } from 'react-router-dom'

const Tabs = () => (
  <div className="bo-tabs">
    <ul>
      <li><NavLink exact to="/" activeClassName="is-active">Tasks</NavLink></li>
      <li><NavLink exact to="/users" activeClassName="is-active">Users</NavLink></li>
      <li><NavLink exact to="/about" activeClassName="is-active">About</NavLink></li>
    </ul>
  </div>
)

export default Tabs

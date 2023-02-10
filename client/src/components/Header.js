import { NavLink, Routes, Route } from 'react-router-dom'

export default function Header() {
  return (
    <div className="App-header">
      <h1>We Care Daycare</h1>
      <div classNames="nav">
        <NavLink className="inactive" to="/">Home </NavLink>
        <NavLink className="inactive" to="/children">Children </NavLink>
        <NavLink className="inactive" to="/activities">Activites </NavLink>
        <NavLink className="inactive" to="/addchild">Add Children </NavLink>
        <NavLink className="inactive" to="/addActivity">Add Activities </NavLink>
      </div>
    </div>
  )
}
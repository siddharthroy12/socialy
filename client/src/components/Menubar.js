import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function Menubar() {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home': pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
      <div className="menu-bar">
      <h1>Solialy</h1>
      <Menu pointing secondary >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
            <Menu.Item
                name='logout'
                onClick={logout}
                to='/'
            />
          </Menu.Menu>
        </Menu>
        </div>
    ) : (
      <div className="menu-bar">
      <h1>Solialy</h1>
      <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
          </Menu.Menu>
        </Menu>
        </div>
    )

    return menuBar
}

export default Menubar
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-mobile"
          />
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li>
                <Link to="/" className="nav-link">
                  <AiFillHome className="nav-bar-image" />
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="nav-link">
                  <BsFillBriefcaseFill className="nav-bar-image" />
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="nav-mobile-btn"
              onClick={onClickLogOut}
            >
              <FiLogOut className="nav-bar-image" />
            </button>
          </div>
        </div>
        <div className="nav-bar-large-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

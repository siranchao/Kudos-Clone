import React, { useState } from 'react'
import { Link } from "gatsby"
import { FaBars, FaTimes } from 'react-icons/fa'
import DropdownMenu from './DropdownMenu'

import logo from '../images/ontario-logo--desktop.svg'
import * as styles from "../styles/header.module.css"

import {HeaderSignInSignOut} from '../components/HeaderSignInSignOut';

function Header() {

  const [click, setClick] = useState(false)
  const handleClick = () => {
    return setClick(!click)
  }

  return (
    <>
      <div className="documentation-only--application">
        <div className="ontario-header__container">
          <header className="ontario-application-header ontario-header" id="ontario-header">
            <div className="ontario-row">
              <div className="ontario-columns ontario-small-6 ontario-application-header__logo">
                <a href="https://www.ontario.ca/page/government-ontario">
                  <img src={logo} alt="Government of Ontario" />
                </a>
              </div>
              <div className="ontario-columns 
                ontario-small-6 
                ontario-application-header__lang-toggle">
                  <HeaderSignInSignOut></HeaderSignInSignOut>
              </div>
            </div>
          </header>

          <div className="ontario-application-subheader-menu__container">
            <section className="ontario-application-subheader">
              <div className="ontario-row">
                <div className="ontario-columns ontario-small-12 ontario-application-subheader__container">
                  <p className="ontario-application-subheader__heading">
                    <Link to="/" onClick={() => setClick(false)}>Kudos</Link>
                  </p>

                  <div className="ontario-application-subheader__menu-container">
                    <ul className="ontario-application-subheader__menu ontario-show-for-large">
                      <li><Link to="/home">Home</Link></li>
                      <li><Link to="/giveKudos">Give Kudos</Link></li>
                      <li><Link to="/myKudos">My Kudos</Link></li>
                      <li><Link to="/about">About</Link></li>
                    </ul>

                    <div className={styles.menuIcon} onClick={handleClick}>
                      {click ? <FaTimes /> : <FaBars />}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {click && <DropdownMenu show={click} action={handleClick} />}
      </div>
    </>
  )
}

export default Header


import React from 'react'
import { Link } from "gatsby"
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as styles from "../styles/header.module.css"

function DropdownMenu({ show, action }) {

    return (
        <>
            <Offcanvas show={show} onHide={action} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Welcome to Kudos!</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <ul className={styles.dropdownNavList}>
                            <li className={styles.dropdownNavListItem}>
                                <Link className={styles.dropdownNavItem} to='/home' onClick={action}>
                                    <span className={styles.dropdownNavText}>Home</span>
                                </Link>
                            </li>
                            <li className={styles.dropdownNavListItem}>
                                <Link className={styles.dropdownNavItem} to='/giveKudos' onClick={action}>
                                    <span className={styles.dropdownNavText}>Give Kudos</span>
                                </Link>
                            </li>
                            <li className={styles.dropdownNavListItem}>
                                <Link className={styles.dropdownNavItem} to='/myKudos' onClick={action}>
                                    <span className={styles.dropdownNavText}>My Kudos</span>
                                </Link>
                            </li>
                            <li className={styles.dropdownNavListItem}>
                                <Link className={styles.dropdownNavItem} to='/about' onClick={action}>
                                    <span className={styles.dropdownNavText}>About</span>
                                </Link>
                            </li>
                            <li style={
                                {
                                    paddingTop: '1rem',
                                    border: '0',
                                    color: '#999999'
                                }
                            }>
                                <p>Version: 1.0.0.0</p>
                            </li>
                        </ul>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default DropdownMenu
import React from 'react'
import { Link } from "gatsby"
import * as styles from "../styles/header.module.css"

function DropdownNav(props) {
    return (
        <div className={styles.dropdownNav}>
            <ul className={styles.dropdownNavList}>
                <li className={styles.dropdownNavListItem}>
                    <Link className={styles.dropdownNavItem} to='/home' onClick={props.action}>
                        <span className={styles.dropdownNavText}>Home</span>
                    </Link>
                </li>
                <li className={styles.dropdownNavListItem}>
                    <Link className={styles.dropdownNavItem} to='/giveKudos' onClick={props.action}>
                        <span className={styles.dropdownNavText}>Give Kudos</span>
                    </Link>
                </li>
                <li className={styles.dropdownNavListItem}>
                    <Link className={styles.dropdownNavItem} to='/myKudos' onClick={props.action}>
                        <span className={styles.dropdownNavText}>My Kudos</span>
                    </Link>
                </li>
                <li className={styles.dropdownNavListItem}>
                    <Link className={styles.dropdownNavItem} to='/about' onClick={props.action}>
                        <span className={styles.dropdownNavText}>About</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DropdownNav;
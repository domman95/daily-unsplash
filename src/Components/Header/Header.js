import React from 'react'
import styles from './Header.module.scss'
import heartSVG from '../../assets/img/heart.svg'
import { Link } from 'react-router-dom'

const Header = ({children, icon, temp, like}) => (
    <div className={styles.wrapper}>
        <div className={styles.weatherIcon}>
            <p className={styles.temperature}>{temp}&ordm;</p>
        </div>
        <Link to="/">
            <h1 className={styles.header}>{children}</h1>
        </Link>
        <Link to='/favourite'>
            <button className={styles.button}>
                <img className={styles.img} src={heartSVG} alt="" />
                <p className={styles.favCount}>{like === 0 ? null : like}</p>
            </button>
        </Link>
    </div>
)

export default Header
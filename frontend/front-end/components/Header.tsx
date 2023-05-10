import styles from '../styles/components/header.module.css'
import Link from 'next/link'
import UserService from '@/services/UserService'
import { useState } from 'react'
import { User } from '../types'

const Header: React.FC = () => {
    const user = "admin"
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1 className={styles.h1}>Cookbook Companion</h1>
                {user == "admin" ? (
                    <ul className={styles.ul}>
                    <li><Link className={styles.link} href="/">Home</Link></li>
                    <li><Link className={styles.link} href="/posts">Posts</Link></li>
                    <li><Link className={styles.link} href="/users">Users</Link></li>
                    <li><Link className={styles.link} href="/users/search">Search User</Link></li>
                    <li><Link className={styles.link} href="/profile">My Profile</Link></li>
                    <li><Link className={styles.link} href="/logout">Logout</Link></li>
                </ul>
                ): user == "user" ?(
                    <ul className={styles.ul}>
                    <li><Link className={styles.link} href="/">Home</Link></li>
                    <li><Link className={styles.link} href="/posts">Posts</Link></li>
                    <li><Link className={styles.link} href="/users/search">Search User</Link></li>
                    <li><Link className={styles.link} href="/profile">My Profile</Link></li>
                    <li><Link className={styles.link} href="/logout">Logout</Link></li>
                </ul>
                ) : (
                    <ul className={styles.ul}>
                      <li><Link className={styles.link} href="/">Home</Link></li>
                      <li><Link className={styles.link} href="/login">Login</Link></li>
                      <li><Link className={styles.link} href="/register">Register</Link></li>
                    </ul>
                )}
            </nav>
        </header>
    )
}

export default Header

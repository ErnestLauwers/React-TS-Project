import styles from '../styles/components/header.module.css'
import Link from 'next/link'

const LoginHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <h1 className={styles.h1}>Cookbook Companion</h1>
                <ul className={styles.ul}>
                    <li><Link className={styles.link} href="/">Login</Link></li>
                    <li><Link className={styles.link} href="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default LoginHeader

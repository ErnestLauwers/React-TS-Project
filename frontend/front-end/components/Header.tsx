import Link from "next/link"

const Header: React.FC = () => {
    return (
            <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
                <a className="fs-2 d-flex justify-content-center ùb-2 mb-lg-0 text-white-50 text-decoration-none">Cookbook Companion</a>
                <nav className="nav justify-content-center">
                    <Link href="/" className="nav-link px-4 fs-5 text-white">Home</Link>
                    <Link href="/users" className="nav-link px-4 fs-5 text-white">Users</Link>
                    <Link href="/ingredients" className="nav-link px-4 fs-5 text-white">Ingredients</Link>
                </nav>
            </header>
        )
}

export default Header
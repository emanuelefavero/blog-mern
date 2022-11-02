import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Header() {
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    // getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.headerMaxWidthContainer}>
          <span className={styles.logo}>
            <Link to='/'>Blog</Link>
            {user && user.role === 'admin' ? (
              <span className={styles.adminBadge}>Admin</span>
            ) : (
              <span className={styles.userBadge}>{user?.username}</span>
            )}
          </span>

          {user?.username ? (
            <>
              <button
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <nav>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}

export default Header

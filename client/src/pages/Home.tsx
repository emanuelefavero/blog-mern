import styles from './Home.module.css'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Posts from '../components/Posts'

function Home() {
  const { user, getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.Home}>
      <section
        className={
          user?.role === 'admin' ? styles.welcomeAreaADMIN : styles.welcomeArea
        }
      >
        {user ? (
          <div className={styles.welcomeTitle}>
            <h1>Welcome back, {user.username} </h1>

            {user.role === 'admin' && (
              <Link to='/posts/create-post'>Create New Post</Link>
            )}
          </div>
        ) : null}
      </section>

      <Posts />
    </div>
  )
}

export default Home

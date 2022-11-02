import styles from './Footer.module.css'
import { useState, useEffect } from 'react'

function Footer() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setDate(new Date())
  }, [])

  return (
    <footer className={styles.Footer}>
      <span className={styles.date}>Blog &#174; {date.getFullYear()}</span>
    </footer>
  )
}

export default Footer

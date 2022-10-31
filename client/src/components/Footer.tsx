import { useState, useEffect } from 'react'

function Footer() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setDate(new Date())
  }, [])

  return <footer>Blog &#174; {date.getFullYear()}</footer>
}

export default Footer

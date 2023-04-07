import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { magic } from '../../lib/magic-client'

const NavBar = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email } = await magic.user.getMetadata()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        // console.log("Error retrieving email:", error);
      }
    }
    getUsername()
  }, [])

  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const [isShowDropDown, setIsShownDropDown] = useState(false)

  const handleOnClickShowDropDown = () => {
    setIsShownDropDown(!isShowDropDown)
    // setIsShownDropDown((isShowDropDown) => {
    //   return (isShowDropDown = !isShowDropDown)
    // })
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleSignout = async (e) => {
    e.preventDefault()
    try {
      await magic.user.logout()
      console.log(await magic.user.isLoggedIn()) // => `false`
      router.push('/login')
    } catch {
      // Handle errors if required!
      router.push('/login')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src={'/static/netflix.svg'}
              width={128}
              height={34}
              alt='Netflix Logo'
            ></Image>
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleOnClickShowDropDown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src={'/static/expand_more.svg'}
                width={24}
                height={24}
                alt='Expand More to Sign out'
              ></Image>
            </button>
            {isShowDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar

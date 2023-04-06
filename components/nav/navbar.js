import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

const NavBar = (props) => {
  const { username } = props
  const router = useRouter()

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
                  <Link href='/login' className={styles.linkName}>
                    Sign out
                  </Link>

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

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { magic } from '../lib/magic-client'

import styles from '../styles/Login.module.css'
import { useEffect, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const handleEmailInput = (e) => {
    setUserMsg('')
    const email = e.target.value
    setEmail(email)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (email) {
      if (email === 'frankie.minhvu.1002@gmail.com') {
        // log in a user by their email
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          })
          if (didToken) {
            setIsLoading(false)
            //route to dashboard
            router.push('/')
          }
        } catch {
          // Handle errors if required!
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        setUserMsg('Invalid email')
      }
    } else {
      setIsLoading(false)
      setUserMsg('Please enter your email')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href='/'>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type='text'
            placeholder='Email address'
            className={styles.emailInput}
            onChange={handleEmailInput}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login

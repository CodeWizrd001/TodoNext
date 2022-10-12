import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome User!
        </h1>

        <div className={styles.grid}>
          <Link href="/dashboard">
            <div className={styles.card}>
              <h2>Dashboard</h2>
              <p>Enter User Dashboard</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home

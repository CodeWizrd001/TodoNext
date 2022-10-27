import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
         <strong> Welcome User!</strong>
        </h1>

        <div className={styles.grid}>
          <Link href="/dashboard">
            <button >
              <h2>Dashboard</h2>
              <p>Enter the User Dashboard</p>
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home

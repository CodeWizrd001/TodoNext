import { Todo } from "../../util/types"
import Link from "next/link"

import styles from '../../styles/Home.module.css'

interface IndexProps {
  todos: Array<Todo>
}

function Index(props: IndexProps) {
  const { todos } = props

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          {todos.map((t:Todo) => (
            <div key={t._id}>
              <Link href="/dashboard">
                <div className={styles.card}>
                  <h2>{t.title}</h2>
                  <p>{t.description}</p>
                  <p>{t.completed?"Completed":"Incomplete"}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>  
  )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL+"/todo")
  const todos = await res.json()

  return {
    props: { todos },
  }
}

export default Index
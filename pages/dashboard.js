import { useEffect, useState } from 'react'

import styles from '../styles/Home.module.css'

export default function Dashboard() {
    const [data , setData ] = useState([{
        title: "Loading...",
        description: "Loading...",
        completed: false,
        createBy: "Loading..."
    }])

    useEffect(() => {
        fetch('/api/todo')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data)
            })
    }, [])

    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome User !
                </h1>

                <div className={styles.grid}>
                    {
                        data.map( (todo) => (
                            <div key={todo.id} className={styles.card}>
                                <h2>{todo.title}</h2>
                                <p>{todo.description}</p>
                                <p1> 
                                    Completed : <input type="checkbox" disabled={true} checked={todo.completed}></input>
                                </p1>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    )
}
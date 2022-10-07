import styles from '../styles/Home.module.css'

export default function Dashboard() {
    const incCard = {
        id: 1,
        title: 'Hello',
        description: 'Incomplete Todo',
        completed: false,
        createdBy: 'Admin'
    }

    const compCard = {
        id: 2,
        title: 'World',
        description: 'Completed Todo',
        completed: true,
        createdBy: 'Admin'
    }

    const data = [
        incCard,
        compCard
    ]

    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome User !
                </h1>

                <div className={styles.grid}>
                    {
                    data.map( (todo) => (
                        <div className={styles.card} key={todo.id}>
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
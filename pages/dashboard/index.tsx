import { Todo } from "../../util/types"
import Link from "next/link"

import styles from '../../styles/Home.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IndexProps {
  todos: Array<Todo>
}

function Index(props: IndexProps) {
  const { todos } = props

  const [todo,setTodo] = useState({
    title:"",
    description:"",
    completed:false,
    createdBy:0
  })

  const addTodo = function() {
    const requestOptions : RequestInit = {
      method: "POST",
      body: JSON.stringify(todo)
    }
    console.log(todo)
    fetch("/api/todo",requestOptions)
      .then((response)=>response.json()
        .then((data)=>{
          setTodo({title:"",description:"",completed:false,createdBy:0})
        }))
  }

  const changeTitle = function(e:any) {
    const updatedTodo = {...todo,title:e.target.value}
    setTodo(updatedTodo)
  }

  const changeDescription = function(e:any) {
    const updatedTodo = {...todo,description:e.target.value}
    setTodo(updatedTodo)
  }

  const changeChecked = function(e:any) {
    const updatedTodo = {...todo,completed:e.target.checked}
    setTodo(updatedTodo)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div key="new">
            <Link href="/dashboard">
              <div className={styles.card}>
                <input value={todo.title} onChange={changeTitle}></input>
                <input value={todo.description} onChange={changeDescription}></input>
                <input type="checkbox" checked={todo.completed} onChange={changeChecked}></input>
                <button onClick={addTodo}>Add</button>  
              </div>
            </Link>
          </div>
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
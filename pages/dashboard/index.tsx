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

  const deleteTodo = function(id:any) {
    const requestOptions = {
      method: "DELETE"
    }

    fetch(`/api/todo/${id}`,requestOptions)
      .then((res)=>res.json()
        .then((data)=>console.log(data)))
  }

  const toggleCompleted = function(todo:Todo) {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(todo)
    }
    fetch(`/api/todo/${todo._id}`,requestOptions)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div>
            <div className={styles.card}>
              <label htmlFor="title">Title</label>
              <br></br>
              <input type="text" name="title" id="title" value={todo.title} onChange={changeTitle}></input>
              <br></br>
              <label htmlFor="description">Description</label>
              <br></br>
              <input name="description" value={todo.description} onChange={changeDescription}></input>
              <br></br>
              <label htmlFor="completed">Completed</label>
              <input name="completed" type="checkbox" checked={todo.completed} onChange={changeChecked}></input>
              <br></br>
              <button onClick={addTodo}>Add</button>
            </div>
          </div>
          {todos.map((t:Todo) => (
            <div key={t._id}>
              <Link href="/dashboard">
                <div className={styles.card}>
                  <h2>{t.title}</h2>
                  <p>{t.description}</p>
                  <p>{t.completed?"Completed":"Incomplete"}</p>
                  <button onClick={()=>deleteTodo(t._id)}>X</button>
                  <label className="switch">
                    <input type="checkbox" checked={t.completed} onChange={()=>toggleCompleted(t)}></input>
                    <span className="slider round"></span>
                  </label>
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
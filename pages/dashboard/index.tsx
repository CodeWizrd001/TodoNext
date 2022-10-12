import { Todo } from "../../util/types"
import Link from "next/link"

import styles from '../../styles/Home.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IndexProps {
  todos: Array<Todo>
}

function Index(props: IndexProps) {
  const { todos } = props

  const newTodo = {
    title:"",
    description:"",
    completed:false,
    createdBy:0
  }

  const addTodo = function() {
    const requestOptions : RequestInit = {
      method: "POST",
      body: JSON.stringify(newTodo)
    }
    console.log(newTodo)
    fetch(process.env.API_URL+"/todo",requestOptions)
      .then((response)=>response.json()
        .then((data)=>{
          console.log(data)
        }))
  }

  const changeTitle = function(e:any) {
    newTodo.title = e.target.value
    e.target.value = newTodo.title
    console.log(newTodo)
  }

  const changeDescription = function(e:any) {
    newTodo.description = e.target.value
    e.target.value = newTodo.description
    console.log(newTodo)
  }

  const changeChecked = function(e:any) {
    newTodo.completed = e.target.checked
    e.target.checked = newTodo.completed
  }

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
          <div key="new">
            <Link href="/dashboard">
              <div className={styles.card}>
                <input value={newTodo.title} onChange={changeTitle}></input>
                <input value={newTodo.description} onChange={changeDescription}></input>
                <input type="checkbox" checked={newTodo.completed} onChange={changeChecked}></input>
                <button onClick={addTodo}>Add</button>
                <p>{newTodo.title}</p>
                <p>{newTodo.description}</p>
              </div>
            </Link>
          </div>
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
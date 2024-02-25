import { useState } from 'react'
import './App.css'

function App() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [todoList, setTodoList] = useState([])
  const addTodo = message => {
    setCurrentMessage('')
    let copyTodoList = [...todoList]
    const getId = () => {
      if (copyTodoList.length == 0)
      {
        return 0
      }
      else 
      {
        return copyTodoList[copyTodoList.length - 1].id + 1
      }
    }

    let todoItem = {
      id : getId(),
      message : message
    }
    copyTodoList.push(todoItem)
    setTodoList(copyTodoList)
  }
  const deleteTodoById = id => {
    let deletedTodoList = todoList.filter((value, index, arr) => {
      return value.id != id
    })
    setTodoList(deletedTodoList)
  }

  return (
    <>
      <h1>TodoList</h1>
      <section id="input-section">
        <input
          value={currentMessage}
          onChange={
            e => {
              setCurrentMessage(e.target.value)
            }
          }>
        </input>
        <button onClick={
          () => {
            addTodo(currentMessage)
          }
        }>추가</button>
      </section>

      {
        todoList.map((item, index) => (
          <div key={index}>
            <span>{item.message}</span>
            <button onClick={() => {
              deleteTodoById(item.id)
            }}>삭제</button>
          </div>
        ))
      }
    </>
  )
}

export default App

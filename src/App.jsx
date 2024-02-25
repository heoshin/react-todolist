import { useState } from 'react'
import './App.css'

function App() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [todoList, setTodoList] = useState([])
  const addTodoList = item => {
    setCurrentMessage('')
    let copy = [...todoList]
    copy.push(item)
    setTodoList(copy)
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
            addTodoList(currentMessage)
          }
        }>추가</button>
      </section>

      {
        todoList.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))
      }
    </>
  )
}

export default App

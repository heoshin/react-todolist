import { useState } from 'react'
import './App.css'

function App() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [todoList, setTodoList] = useState([])
  const [edittingTodoList, setEdittingTodoList] = useState([])

  const addTodo = message => {
    setCurrentMessage('')
    let copyTodoList = [...todoList]
    const getId = () => {
      if (copyTodoList.length == 0) {
        return 0
      }
      else {
        return copyTodoList[copyTodoList.length - 1].id + 1
      }
    }

    let todoItem = {
      id: getId(),
      message: message,
      date: new Date().getTime()
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
  const addEdittingTodo = (id) => {
    let copyEdittingTodoList = [...edittingTodoList]
    copyEdittingTodoList[id] = {}
    setEdittingTodoList(copyEdittingTodoList)
  }
  const setMessageEdittingTodo = (id, message) => {
    let copyEdittingTodoList = [...edittingTodoList]
    copyEdittingTodoList[id].message = message
    setEdittingTodoList(copyEdittingTodoList)
  }
  const deleteEdittingTodo = (id) => {
    let copyEdittingTodoList = [...edittingTodoList]
    copyEdittingTodoList.splice(id)
    setEdittingTodoList(copyEdittingTodoList)
  }
  const applyEdittingTodo = (id) => {
    let copyTodoList = [...todoList]
    deleteEdittingTodo(id)
    copyTodoList.map((item, index) => {
      if (item.id == id)
      {
        item.message = edittingTodoList[id].message
      }
    })
    setTodoList(copyTodoList)
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
            <span>{new Date(item.date).toString()}</span>
            <span>{item.message}</span>
            <button onClick={() => {
              addEdittingTodo(item.id)
            }}>수정</button>
            <button onClick={() => {
              deleteTodoById(item.id)
            }}>삭제</button>
            {
              edittingTodoList[item.id] != undefined
                ? <div>
                  <input onChange={
                    e => {
                      setMessageEdittingTodo(item.id, e.target.value)
                    }
                  }></input>
                  <button onClick={() => {
                    applyEdittingTodo(item.id)
                  }}>적용</button>
                  <button onClick={() => {
                    deleteEdittingTodo(item.id)
                  }}>취소</button>
                </div>
                : null
            }
          </div>
        ))
      }
    </>
  )
}

export default App

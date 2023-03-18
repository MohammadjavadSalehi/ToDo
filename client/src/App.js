import {useEffect, useState} from "react"
function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState("")

  useEffect(()=>{
    fetch("http://localhost:5000/todo").then((res)=>{return res.json()})
    .then((data)=>{
      setTodos(data)
    })
  },[])
  function handleSubmit(e){
    e.preventDefault()
    if(input){
      fetch("http://localhost:5000/todo/save",{
        body:JSON.stringify({text:input}),
        headers:{
          "Content-Type":"application/json"
        },
        method:"POST"
      }).then((res)=>{return res.json()}).then((data)=>{
        setTodos([...todos,data])
        setInput("")
      })
    }
  }
  function handleDelete(id){
    fetch(`http://localhost:5000/todo/${id}`,{
        method:"DELETE"
      }).then((res)=>{return res.json()}).then((data)=>{
        const temp = todos.filter((todo)=>{
          return todo._id !== id
        })
        setTodos(temp);
      })
  }
  function handleEdit(id){
    const newText = prompt("enter new text: ")
    if(newText){
      fetch(`http://localhost:5000/todo/${id}`,{
        method:"PUT",
        body:JSON.stringify({text:newText}),
        headers:{
          "Content-Type":"application/json"
        },
      }).then((res)=>{return res.json()}).then((data)=>{
        const temp = todos.map((todo)=>{
          if(todo._id===id){
            todo.text = data.text
          }
          return todo
        })
        setTodos(temp)
      })
    }

  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e)=>{
          setInput(e.target.value)
        }} />
        <button type="submit">Create Todo</button>
      </form>
      {
        todos?.map((todo)=>{
          return(
            <div key={todo._id}>
            <p>{todo.text}</p>
            <button onClick={()=>handleDelete(todo._id)}>Delete</button>
            <button onClick={()=>handleEdit(todo._id)}>Edit</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;

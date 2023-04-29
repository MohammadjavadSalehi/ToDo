import {useEffect, useState} from "react"
function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState("")
  // http://localhost:5000/todo
  useEffect(()=>{
    fetch("https://todo-maee.onrender.com/todo").then((res)=>{return res.json()})
    .then((data)=>{
      setTodos(data)
    })
  },[])
  function handleSubmit(e){
    e.preventDefault()
    if(input){
      fetch("https://todo-maee.onrender.com/todo/save",{
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
    fetch(`https://todo-maee.onrender.com/todo/${id}`,{
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
      fetch(`https://todo-maee.onrender.com/todo/${id}`,{
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
    <div className="flex flex-col items-center mt-8">
      <form className="flex mb-4" onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="font-bold px-4 py-2 rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="submit"
        >
          Create Todo
        </button>
      </form>
      {todos?.map((todo) => {
        return (
          <div
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm w-80 mb-2"
            key={todo._id}
          >
            <p className="text-lg">{todo.text}</p>
            <div className="flex">
              <button
                className="px-2 py-1 mr-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
              <button
                className="px-2 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => handleEdit(todo._id)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  let [input, setInput] = useState({ title: "", content: "" });
  let [posts, setPosts] = useState();

  function updateContent(event) {
    setInput((old) => {
      return { ...old, [event.target.name]: event.target.value };
    });
  }

  const getApiData = async ()=>{
    const response = await fetch('/messages').then((response)=>response.json());
    setPosts(response);
  }

  useEffect(() => {
    getApiData();    
    const interval = setInterval(() => {
      getApiData();      
    }, 10000);
  }, []);

  function postMessage(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input.title, content: input.content })
    };
    fetch('/message', requestOptions)
    setInput({ title: "", content: "" });
    getApiData();
    event.preventDefault();
  }

  return (
    <div className="App">
      <form action="../../message" method="post" className='form'>
        <h2>Message</h2>
        <input value={input.title} onChange={updateContent} name='title' placeholder='Title' /><br />
        <input value={input.content} onChange={updateContent} name='content' placeholder='Write a message...' rows='3' /><br />
        <button type='submit' onClick={postMessage}>Post</button>
      </form>
      {posts && posts.map((post) => (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

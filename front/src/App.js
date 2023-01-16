import './App.css';
import { useState } from 'react';

function App() {
  let [input, setInput] = useState({ title: "", content: "" });

  function updateContent(event) {
    setInput((old) => {
      return { ...old, [event.target.name]: event.target.value };
    });
  }

  function postMessage(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input.title, content: input.content })
    };
    fetch('/message', requestOptions)
      //.then(response => response.json())
      //.then(data => this.setState({ postId: data.id }));
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
    </div>
  );
}

export default App;

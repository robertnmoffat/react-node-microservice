import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import sdfklj from 'react-bootstrap/'

function App() {
  let [input, setInput] = useState({ title: "", content: "" });
  let [posts, setPosts] = useState();

  function updateContent(event) {
    setInput((old) => {
      return { ...old, [event.target.name]: event.target.value };
    });
  }

  const getApiData = async () => {
    const response = await fetch('/messages').then((response) => response.json());
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
      <Container className='p-3 bg-light border w-50 form-group mt-5'>      
        <form action="../../message" method="post" className='form'>
          <h2>Message</h2>
          <input className='m-1' value={input.title} onChange={updateContent} name='title' placeholder='Title' /><br />
          <input className='m-1' value={input.content} onChange={updateContent} name='content' placeholder='Write a message...' rows='3' /><br />
          <Button className='mt-2' type='submit' onClick={postMessage}>Post</Button>
        </form>       
      </Container>
      {posts && posts.map((post, index) => (
        <Container className='p-3 bg-light border w-50'>
          <h3>{post.title}</h3>
          <p className='text-break'>{post.content}</p>
        </Container>
      ))}
    </div>
  );
}

export default App;

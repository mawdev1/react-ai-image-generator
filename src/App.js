import './styles/app.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  }

  const generateImages = async () => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/images/generations';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'MyApp/1.0'
      },
      body: JSON.stringify({
        prompt: text,
        n: 1,
        size: '1024x1024',
      }),
      mode: 'cors',
      redirect: 'follow'
    });

    const data = await response.json();

    if (response.ok) {
      const img1 = document.getElementById('img1');

      img1.setAttribute('src', data.data[0].url);

      img1.style.display = 'block';
    } else {
      console.error(data);
    }
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      generateImages();
    }
  }

  return (
    <div className="app-container">
      <div className='app-header'>
        <h3>React AI Image Generator - by MawDev</h3>
      </div>
      <div className='app-images'>
        <img id='img1' alt='img1' />
      </div>
      <div className='app-input-container'>
        <input type='text' placeholder='Type something here' onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </div>

  );
}

export default App;

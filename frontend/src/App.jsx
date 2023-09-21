import { useState } from 'react';
import './app.css'
const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [error,setError] = useState()
  const [info,setInfo] = useState({})
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    let link = event.target.link.value

    const options = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: `${link}` })
    };
    
    let response = await fetch(API_URL, options)

    let data = await response.json()

    if (response.status === 200) {
      event.target.link.value= ""
      setInfo(data)

    } else {
      setError(data) 
    }
  
  }

  return (
    <>
    <main>

      <header className="header">
        <div className='container'>
          <h1>Link-Shortener</h1>
        </div>
      </header>

      <div className="container h-full center-items">
        <div className='w-full'>
          <form onSubmit={handleSubmit} >
            <input name="link" type="text" autoComplete='off' autoFocus placeholder='Insert the url you want to shorten to' required/>
            <button type='submit' className='btn'>Generar</button>
          </form>  

          <div className="container">
          {error && <p className='error'>{error.error}</p>}
          </div>            
          
        </div>

        <div className='container h-full '>
            <div className='info'>
              <h2>Service Information</h2>
              <p>Url : <span>{info?.url}</span> </p>
              <p>Short : <span> {info?.short}</span> </p>
              <p>Expiries: <span>{info?.expiry} hours </span></p>
              <p>Rate Limit : <span>{info?.rate_limit} </span></p>
            </div>
        
        </div>
      </div>

    </main>
    </>
  )
}

export default App

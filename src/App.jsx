import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import Logo from './components/logo'

function App() {
 const [cards,setCards] = useState([])

 useEffect(() => {
   fetch('http://localhost:3000/images')
   .then(resp => resp.json())
   .then(responseFromServer => setCards(responseFromServer))
  },[])


  return (

    <div className="App">
     
    <Logo />

    <section className="image-container">
      {cards.map(card => 
        <Card card = {card} />
        )}
    </section>

    </div>
  )
}

export default App

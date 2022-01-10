import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Logo from "./components/logo";

function App() {
  const [cards, setCards] = useState([]);

  const getCardsFromServer = () => {
    fetch("http://localhost:3000/images")
      .then((resp) => resp.json())
      .then((responseFromServer) => setCards(responseFromServer));
  };

  useEffect(getCardsFromServer, [cards]);

  return (
    <div className="App">
      <Logo />

      <section className="image-container">
        <form className="comment-form image-card">
          <h2 className="title">New Post</h2>
          <input
            className="comment-input"
            type="text"
            name="title"
            id="title"
            placeholder="Add a title..."
          />
          <input
            className="comment-input"
            type="url"
            name="image"
            id="image"
            placeholder="Add an image url..."
          />
          <button className="comment-button" type="submit">
            Post
          </button>
        </form>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </section>
    </div>
  );
}

export default App;

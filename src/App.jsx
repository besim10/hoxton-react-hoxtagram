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
  const createCardOnServer = (card) => {
    return fetch("http://localhost:3000/images", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(card),
    });
  };
  return (
    <div className="App">
      <Logo />

      <section className="image-container">
        <form
          onSubmit={function (event) {
            event.preventDefault();
            const titleValue = event.target.title.value;
            const urlValue = event.target.image.value;
            createCardOnServer({
              title: titleValue,
              image: urlValue,
              likes: 0,
            });
            event.target.reset();
          }}
          className="comment-form image-card"
        >
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

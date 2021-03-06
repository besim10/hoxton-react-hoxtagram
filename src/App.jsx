import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Logo from "./components/Logo";
function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState("");
  const getCardsFromServer = () => {
    fetch("http://localhost:3000/images")
      .then((resp) => resp.json())
      .then((responseFromServer) => setCards(responseFromServer));
  };

  useEffect(getCardsFromServer, []);

  const createCardOnServer = (card) => {
    return fetch("http://localhost:3000/images", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
  };

  const getCardsToDisplay = () => {
    let updatedCards = cards;
    updatedCards = updatedCards.filter((card) =>
      card.title.toUpperCase().includes(search.toUpperCase())
    );
    return updatedCards;
  };
  return (
    <div className="App">
      {showModal === "signIn" ? (
        <div
          onClick={() => {
            setShowModal("");
          }}
          className="modal-wrapper"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="modal"
          >
            <button
              onClick={() => setShowModal("")}
              className="modal__close-btn"
            >
              X
            </button>
            <h2>Sign in</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input type="text" placeholder="Username: " />
              <input type="text" placeholder="Password: " />
              <button type="submit">Sign in</button>
            </form>
            <div>
              <span>Not registred? </span>
              <button className="modal__createAccount-btn">
                Create an account!
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Logo setShowModal={setShowModal} />
      <section className="image-container">
        <label className="search-label">
          Search by Title:
          <input
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            type="text"
            placeholder="type here..."
          />
        </label>

        <form
          onSubmit={function (event) {
            event.preventDefault();
            const titleValue = event.target.title.value;
            const urlValue = event.target.image.value;
            createCardOnServer({
              title: titleValue,
              image: urlValue,
              likes: 0,
            }).then((cardFromServer) => {
              let updatedCards = JSON.parse(JSON.stringify(cards));
              updatedCards.push({
                id: cardFromServer.id,
                title: cardFromServer.title,
                likes: 0,
                comments: [],
                image: cardFromServer.image,
              });
              setCards(updatedCards);
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
        {getCardsToDisplay().map((card) => (
          <Card key={card.id} cards={cards} setCards={setCards} card={card} />
        ))}
      </section>
    </div>
  );
}

export default App;

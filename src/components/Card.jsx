const Card = (props) => {
  const updateLikesInServer = (card) => {
    return fetch(`http://localhost:3000/images/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
  };
  const updateLikesInState = () => {
    let updatedCards = JSON.parse(JSON.stringify(props.cards));
    const match = updatedCards.find((target) => target.id === props.card.id);
    match.likes++;
    props.setCards(updatedCards);
  };

  const createCommentInServer = (card) => {
    return fetch(`http://localhost:3000/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
  };

  const deleteCommentOnServer = (id) => {
    return fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  };
  const deleteCardOnServer = (id) => {
    return fetch(`http://localhost:3000/images/${id}`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  };
  const deleteCardOnState = () => {
    let updatedCards = JSON.parse(JSON.stringify(props.cards));
    const filteredCards = updatedCards.filter(
      (targetId) => targetId.id !== props.card.id
    );
    updatedCards = filteredCards;
    props.setCards(updatedCards);
  };
  return (
    <article className="image-card">
      <h2 className="title">
        {`${props.card.title}`}
        <button
          onClick={() => {
            deleteCardOnServer(props.card.id);

            deleteCardOnState();
          }}
        >
          X
        </button>
      </h2>
      <img src={`${props.card.image}`} className="image" />
      <div className="likes-section">
        <span className="likes">{`${props.card.likes} likes`}</span>
        <button
          onClick={() => {
            updateLikesInServer({
              id: props.card.id,
              likes: props.card.likes + 1,
            });

            updateLikesInState();
          }}
          className="like-button"
        >
          ♥
        </button>
      </div>
      <ul className="comments">
        {props.card.comments.map((comment) => (
          <li key={comment.id}>
            {comment.content}
            <button
              onClick={() => {
                deleteCommentOnServer(comment.id);

                let updatedCards = JSON.parse(JSON.stringify(props.cards));

                const filteredComments = props.card.comments.filter(
                  (targetComment) => targetComment.id !== comment.id
                );

                const match = updatedCards.find(
                  (oneCard) => oneCard.id === props.card.id
                );

                match.comments = filteredComments;
                props.setCards(updatedCards);
              }}
              className="comments-delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const valueOfComment = event.target.comment.value;

          createCommentInServer({
            imageId: props.card.id,
            content: valueOfComment,
          }).then((commentFromServer) => {
            let updatedCards = JSON.parse(JSON.stringify(props.cards));
            const match = updatedCards.find(
              (targetCard) => targetCard.id === props.card.id
            );
            match.comments.push(commentFromServer);
            props.setCards(updatedCards);
          });

          event.target.reset();
        }}
        className="comment-form"
      >
        <input
          className="comment-input"
          type="text"
          name="comment"
          placeholder="Add a comment..."
        />
        <button className="comment-button" type="submit">
          Post
        </button>
      </form>
    </article>
  );
};
export default Card;

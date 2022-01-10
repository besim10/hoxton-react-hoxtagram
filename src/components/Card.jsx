const Card = (props) => {
  const updateCardInServer = (card) => {
    return fetch(`http://localhost:3000/images/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
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
  return (
    <article className="image-card">
      <h2 className="title">
        {`${props.card.title}`}
        <button
          onClick={() => {
            deleteCardOnServer(props.card.id);
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
            updateCardInServer({
              id: props.card.id,
              likes: props.card.likes + 1,
            });
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

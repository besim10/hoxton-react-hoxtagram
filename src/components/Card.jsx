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
        "Content-type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((resp) => resp.json());
  };
  return (
    <article className="image-card">
      <h2 className="title">{`${props.card.title}`}</h2>
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
          <li key={comment.id}>{comment.content}</li>
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

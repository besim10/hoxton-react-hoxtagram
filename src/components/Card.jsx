const Card = (props) => (
    <article 
        key = {props.card.id} 
        className="image-card">
          <h2 className="title">{`${props.card.title}`}</h2>
          <img src={`${props.card.image}`} className="image" />
          <div className="likes-section">
            <span className="likes">{`${props.card.likes} likes`}</span>
            <button className="like-button">♥</button>
          </div>
          <ul className="comments">
            {
              props.card.comments.map(comment => 
              <li key = {comment.id}>
                {comment.content}
              </li>)
            }
          </ul>
    </article>
)
export default Card
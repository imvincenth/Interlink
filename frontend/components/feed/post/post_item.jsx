import React, { Component } from 'react'
import CommentItemContainer from './comment/comment_item_container';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.sessionId,
      reply_id: "",
      post_id: this.props.post.id,
      body: "",

      commentField: false,

      reactor_id: this.props.sessionId, // need to match
      react_type: "", // needs to inherit
      reactable_type: "Post",
      reactable_id: this.props.post.id, // need to match

      
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.react = this.react.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
    this.props.fetchPostReactions(this.props.post.id);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.setState({ body: "", commentField: false }));
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  commentForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  react(reaction) {
    this.setState({ react_type: reaction });
    this.props.createPostReaction({...this.state});
  }

  unReact() {
    this.setState({ react_type: "" });
    this.props.deletePostReaction();
  }

  reactDeck() {
    return (
      <div>
        <button onClick={() => this.react("Like")}>
          Like
        </button>

        <button onClick={() => this.react("Celebrate")}>
          Celebrate
        </button>

        <button onClick={() => this.react("Support")}>
          Support
        </button>

        <button onClick={() => this.react("Love")}>
          Love
        </button>

        <button onClick={() => this.react("Insightful")}>
          Insightful
        </button>

        <button onClick={() => this.react("Curious")}>
          Curious
        </button>
      </div>
    )
  }

  tempLikeButton() {
    return (
      <button onClick={() => this.react("Like")}>
        Like
      </button>
    )
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {this.props.currentUser.first_name} {this.props.currentUser.last_name}:post: {post.body}
        <button className="open-modal" onClick={() => this.props.openEditPostModal(post)}>
          <img src={window.vectorURL} alt="pen" />
        </button>
        <button onClick={() => this.props.deletePost(post.id)}>
          Delete
        </button>
        <button onClick={() => this.setState({ commentField: true })}>
          Comment
        </button>
        {this.state.commentField ? this.commentForm() : null}
        <div>
          REACTION: {this.state.react_type}
        </div>
        {this.state.react_type.length === 0 ? this.tempLikeButton() : null}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}

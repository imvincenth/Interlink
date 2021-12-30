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

      reactor_id: this.props.sessionId,
      react_type: "",
      reactable_type: "Post",
      reactable_id: this.props.post.id,

      currentReaction: ""
    }

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.react = this.react.bind(this);
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.sessionId && reaction.reactable_id === this.props.post.id) {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }
  
  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
    this.props.fetchPostReactions(this.props.post.id)
      .then(() => this.setCurrentReaction());
  }

  handleCommentSubmit(e) {
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
        <form onSubmit={this.handleCommentSubmit}>
          <input type="text" value={this.state.body} onChange={this.update("body")} />
        </form>
      </div>
    )
  }

  reactionForm() {
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

  reactionEditForm() {
    return (
      <div>
        <button onClick={() => this.reactEdit("Like")}>
          Like
        </button>

        <button onClick={() => this.reactEdit("Celebrate")}>
          Celebrate
        </button>

        <button onClick={() => this.reactEdit("Support")}>
          Support
        </button>

        <button onClick={() => this.reactEdit("Love")}>
          Love
        </button>

        <button onClick={() => this.reactEdit("Insightful")}>
          Insightful
        </button>

        <button onClick={() => this.reactEdit("Curious")}>
          Curious
        </button>
      </div>
    )
  }

  react(reaction) {
    this.props.createPostReaction({...this.state, react_type: reaction})
      .then(() => this.setCurrentReaction());
  }

  reactEdit(reaction) {
    this.props.updatePostReaction({...this.state.currentReaction, react_type: reaction})
      .then(() => this.setCurrentReaction());
  }

  removeReaction() {
    this.props.deletePostReaction(this.state.currentReaction.id)
      .then(() => this.setState({ react_type: "", currentReaction: "" }));
  }

  tempDislikeButton() {
    return (
      <div>
        <button onClick={() => this.removeReaction()}>
          {this.state.react_type}
        </button>
        edit: {this.reactionEditForm()}
      </div>
    )
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <div className='post-header-wrap'>
          <Link className='post-header-link'>
            {this.props.users[this.props.post.user_id].profilePictureUrl ? 
              <img className='post-header-photo' src={this.props.users[this.props.post.user_id].profilePictureUrl} /> : 
              <img className='post-header-photo' src="https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x" />
            }
            <div className='post-header-text'>
              
            </div>
          </Link>
        </div>


        {this.props.currentUser.first_name} {this.props.currentUser.last_name}:post: {post.body}
        {post.photoUrl ? <img src={post.photoUrl} /> : null}
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
          reaction: {this.state.react_type}
        {this.state.currentReaction ? this.tempDislikeButton() : this.reactionForm()}
        {this.props.comments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} comment={comment} /> : null)}
      </div>
    )
  }
}

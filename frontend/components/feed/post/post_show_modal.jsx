import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const reactionLibrary = {
  "Like": window.likeURL,
  "Celebrate": window.celebrateURL,
  "Support": window.supportURL,
  "Love": window.loveURL,
  "Insightful": window.insightfulURL,
  "Curious": window.curiousURL
};

const reactionColors = {
  "Like": "#0a66c2",
  "Celebrate": "#44712e",
  "Support": "#7a688d",
  "Love": "#b24020",
  "Insightful": "#915907",
  "Curious": "#80597e"
};

export default class PostShowModal extends Component {
  constructor(props) {
    super(props);

    const rawDiff = new Date(this.props.post.updated_at) - new Date(this.props.post.created_at);

    this.state = {
      user_id: this.props.currentUser.id,
      reply_id: "",
      post_id: this.props.post.id,
      body: "",

      reactor_id: this.props.currentUser.id,
      react_type: "",
      reactable_type: "Post",
      reactable_id: this.props.post.id,

      currentReaction: "",

      edited: rawDiff > 1000,

      reactionIcons: [],
      reactionCount: 0,
      firstReactorName: "",
      reactionDockOn: false,

      postComments: [],
      commentCount: 0,

      commentInputOn: false,
      commentSectionOn: false
    }

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.react = this.react.bind(this);
    this.reactEdit = this.reactEdit.bind(this);
  }

  componentDidMount() {
    this.commentsOrganization();
    this.props.fetchPostReactions(this.props.post.id)
      .then(() => this.reactionsOrganization())
      .then(() => this.setCurrentReaction());
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.reactions.length !== this.props.reactions.length) || (JSON.stringify(prevProps.reactions) !== JSON.stringify(this.props.reactions))) {
      this.reactionsOrganization();
    }
    if ((prevProps.comments.length !== this.props.comments.length) || (JSON.stringify(prevProps.comments) !== JSON.stringify(this.props.comments))) {
      this.commentsOrganization();
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleCommentSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.setState({ body: "" }));
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.currentUser.id && reaction.reactable_id === this.props.post.id) {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }

  react(reaction) {
    this.props.createPostReaction({...this.state, react_type: reaction})
      .then(() => this.setCurrentReaction())
      .then(() => this.setState({ commentsOn: true }));
  }

  reactEdit(reaction) {
    this.props.updatePostReaction({...this.state.currentReaction, react_type: reaction})
      .then(() => this.setCurrentReaction())
      .then(() => this.setState({ commentsOn: true }));
  }

  removeReaction() {
    this.props.deletePostReaction(this.state.currentReaction.id)
      .then(() => this.setState({ react_type: "", currentReaction: "" }));
  }

  convertDate() {
    const rawDate = Date.now() - new Date(this.props.post.created_at);

    switch(true) {
      case (rawDate < 3600000): // less than an hour
        if (`${Math.round((rawDate/(1000 * 60)))}m` === "0m") return "Just now";
        return `${Math.round((rawDate/(1000 * 60)))}m`;
      case (rawDate >= 3600000 && rawDate < 86400000): // less than a day
        return `${Math.floor(rawDate / (1000 * 60 * 60))}h`; 
      case (rawDate >= 86400000 && rawDate < 604800000): // less than a week
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24))}d`;
      case (rawDate >= 604800000 && rawDate < 2419200000): // less than a month
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7))}w`;
      case (rawDate >= 2419200000): // months
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7 * 4))}m`;
    }
  }

  reactionsOrganization() {
    if (!this.props.reactions[0]) return this.setState({ reactionIcons: [], reactionCount: 0, firstReactorName: "" });
    let tempIconStore = [];

    let tempFirstUserId = this.props.reactions[0].reactor_id;
    let tempUser;
    let tempReactCount = this.props.reactions.length;

    this.props.reactions.forEach(reaction => !tempIconStore.includes(reaction.react_type) && tempIconStore.length <= 3 ? tempIconStore.push(reaction.react_type) : null);

    this.props.usersArr.forEach(user => user.id === tempFirstUserId ? tempUser = user : null);
    let tempUserName = `${tempUser.first_name} ${tempUser.last_name}`;
    if (tempFirstUserId === this.props.currentUser.id) tempUserName = "You";

    this.setState({ reactionIcons: [...tempIconStore], reactionCount: tempReactCount, firstReactorName: tempUserName });
  }

  commentsOrganization() {
    let tempPostComments = [];
    let tempCommentCount = 0;
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id ? tempPostComments.push(comment) : null);
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id ? tempCommentCount++ : null);
    this.setState({ postComments: [...tempPostComments], commentCount: tempCommentCount });
  }

  renderReactionCard(reaction) {
    if (reaction !== "") {
      return (
        <button className='post-show-modal-action' onClick={() => this.removeReaction()}>
          <img className='post-show-modal-action-icon' src={reactionLibrary[reaction]} />
          <span className='post-show-modal-action-text' style={{color: `${reactionColors[reaction]}`}}>{reaction}</span>
        </button>
      )
    } else {
      return (
        <button className='post-show-modal-action' onClick={() => this.react("Like")}>
          <img className='post-show-modal-action-icon' src={window.nolikeURL} />
          <span className='post-show-modal-action-text'>Like</span>
        </button>
      )
    }
  }

  renderReactionDock() {
    let actionType;
    if (this.state.currentReaction === "") {
      actionType = this.react;
    } else {
      actionType = this.reactEdit;
    }

    return (
      <div className='post-reaction-dock'>
        <button className='post-reaction-dock-item' onClick={() => actionType("Like")}>
          <span className='post-reaction-dock-exp'>Like</span>
          <img className='post-reaction-dock-icon' src={window.likeURL} />
        </button>

        <button className='post-reaction-dock-item' onClick={() => actionType("Celebrate")}>
          <span className='post-reaction-dock-exp'>Celebrate</span>
          <img className='post-reaction-dock-icon' src={window.celebrateURL} />
        </button>

        <button className='post-reaction-dock-item' onClick={() => actionType("Support")}>
          <span className='post-reaction-dock-exp'>Support</span>
          <img className='post-reaction-dock-icon' src={window.supportURL} />
        </button>

        <button className='post-reaction-dock-item' onClick={() => actionType("Love")}>
          <span className='post-reaction-dock-exp'>Love</span>
          <img className='post-reaction-dock-icon' src={window.loveURL} />
        </button>

        <button className='post-reaction-dock-item' onClick={() => actionType("Insightful")}>
          <span className='post-reaction-dock-exp'>Insightful</span>
          <img className='post-reaction-dock-icon' src={window.insightfulURL} />
        </button>

        <button className='post-reaction-dock-item' onClick={() => actionType("Curious")}>
          <span className='post-reaction-dock-exp'>Curious</span>
          <img className='post-reaction-dock-icon' src={window.curiousURL} />
        </button>
      </div>
    )
  }

  renderCommentInput() {
    return (
      <form className='post-show-modal-input-wrap'>
        <img className='post-show-modal-input-pic' src={this.props.currentUser.profilePictureUrl} />
        <div className='post-show-modal-input-box'>
          <input className='post-show-modal-input' type="text" placeholder='Add a comment...' value={this.state.body} onChange={this.update("body")} />
          {this.state.body.length > 0 ? <input className='post-show-modal-comment' type="submit" value="Post" onClick={this.handleCommentSubmit} /> : null}
        </div>
      </form>
    )
  }

  renderCommentSection(comment) {
    return (
      <article className='post-show-modal-comment-card-wrap' key={`${comment.id}${comment.body}${comment.created_at}`}>
        {comment.body}
      </article>
    )
  }

  render() {
    if (!this.props.reactions) return null;

    return (
      <div className='post-show-modal-wrap'>
        <button className='post-show-modal-exit' onClick={this.props.closeModal}><img className='post-show-modal-x' src={window.xURL} /></button>

        {/* Left */}
        <div className='post-show-modal-left-section'>
          {this.props.post.photoUrl ? <img className='post-show-modal-media' src={this.props.post.photoUrl} /> : null}
          {this.props.post.videoUrl ? <video className='post-show-modal-media' src={this.props.post.videoUrl} controls autoPlay muted /> : null}
        </div>

        {/* Right */}
        <div className='post-show-modal-right-section'>
          <div className='post-show-modal-right-header'>
            <Link className='post-show-modal-namecard' to={`/users/${this.props.post.user_id}`} onClick={this.props.closeModal}>
              {this.props.users[this.props.post.user_id].profilePictureUrl ? 
                <img className='post-show-modal-propic' src={this.props.users[this.props.post.user_id].profilePictureUrl} /> : 
                <img className='post-show-modal-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />
              }
              <div className='post-show-modal-namecard-text'>
                <span className='post-show-modal-name'>{this.props.users[this.props.post.user_id].first_name} {this.props.users[this.props.post.user_id].last_name}</span>
                <span className='post-show-modal-headline'>{this.props.users[this.props.post.user_id].headline}</span>
                <div className='post-show-modal-timestamp-wrap'>
                  <span className='post-show-modal-timestamp'>{this.convertDate()}</span>
                  {this.state.edited ? <span className='post-show-modal-timestamp'>&nbsp;• Edited</span> : null}
                </div>
              </div>
            </Link>
          </div>

          <div className='post-show-modal-right-content'>
            <div className='post-show-modal-body'>
              {this.state.seeMoreActive ? <span className='post-show-modal-body-text'>{this.props.post.body}</span> : <span className='post-show-modal-body-text'>{this.props.post.body.slice(0, 200)}</span>}
              {this.state.seeMoreActive || this.props.post.body.length < 200 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })}>...see more</button>}
            </div>

            <div>
              <ul className='post-show-modal-reactbar'>
                <li className='post-show-modal-reactbar-content'>
                  {this.state.reactionIcons[0] ? <img src={reactionLibrary[this.state.reactionIcons[0]]} /> : null}
                  {this.state.reactionIcons[1] ? <img src={reactionLibrary[this.state.reactionIcons[1]]} /> : null}
                  {this.state.reactionIcons[2] ? <img src={reactionLibrary[this.state.reactionIcons[2]]} /> : null}
                  <span className='post-show-modal-social'>{this.state.firstReactorName} {this.state.reactionCount > 1 ? `and ${this.state.reactionCount - 1} other${this.state.reactionCount > 2 ? "s" :""}` : null}</span>
                </li>

                <span onClick={() => this.setState({ commentsOn: true })} className='post-show-modal-comments'>{this.state.commentCount} comment{this.state.commentCount > 1 ? "s" : ""}</span>
              </ul>

              <div className='post-show-modal-actions'>
                <div className='post-show-reaction-box'>
                {this.state.currentReaction === "" ? this.renderReactionCard("") : this.renderReactionCard(this.state.currentReaction.react_type)}
                  {this.renderReactionDock()}
                </div>

                <button className='post-show-modal-action' onClick={() => this.setState({ commentInputOn: true })}>
                  <img className='post-show-modal-action-icon' src={window.commentURL} />
                  <span className='post-show-modal-action-text'>Comment</span>
                </button>

                <button className='post-show-modal-action'>
                  <img className='post-show-modal-action-icon' src={window.linkURL} />
                  <span className='post-show-modal-action-text'>Copy link</span>
                </button>
              </div>
            </div>

            {this.state.commentInputOn ? this.renderCommentInput() : null}

            <div>
              {this.state.postComments.map(comment => this.renderCommentSection(comment))}
            </div>

          </div>
        </div>

      </div>
    )
  }
}

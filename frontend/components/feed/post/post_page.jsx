import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarContainer from '../navbar/navbar_container';
import CommentItemContainer from './comment/comment_item_container';

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

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    const rawDiff = new Date(this.props.post.updated_at) - new Date(this.props.post.created_at);

    this.state = {
      user_id: this.props.sessionId,
      reply_id: "",
      post_id: this.props.post.id,
      body: "",

      reactor_id: this.props.sessionId,
      react_type: "",
      reactable_type: "Post",
      reactable_id: this.props.post.id,

      currentReaction: "",
      editMenuActive: false,

      edited: rawDiff > 1000,

      seeMoreActive: false,
      reactionIcons: [],
      reactionCount: 0,
      firstReactorName: "",
      reactionDockOn: false,

      postComments: [],
      postReplies: [],
      commentCount: 0,

      commentSectionOn: false,

      copySuccess: false
    }

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.react = this.react.bind(this);
    this.reactEdit = this.reactEdit.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchComments(this.props.post.id);
    this.props.fetchPostReactions(this.props.post.id)
      .then(() => this.setCurrentReaction())
      .then(() => this.reactionsOrganization())
      .then(() => this.commentsOrganization())
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.reactions.length !== this.props.reactions.length) || (JSON.stringify(prevProps.reactions) !== JSON.stringify(this.props.reactions))) {
      this.reactionsOrganization();
    }
    if ((prevProps.comments.length !== this.props.comments.length) || (JSON.stringify(prevProps.comments) !== JSON.stringify(this.props.comments))) {
      this.commentsOrganization();
    }
  }

  handleCommentSubmit(e) {
    e.preventDefault();

    this.props.createComment({...this.state})
      .then(() => this.setState({ body: "" }));
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.sessionId && reaction.reactable_id === this.props.post.id) {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }

  reactionsOrganization() {
    if (!this.props.reactions[0]) return this.setState({ reactionIcons: [], reactionCount: 0, firstReactorName: "" });
    let tempIconStore = [];

    let tempFirstUserId = this.props.reactions[0].reactor_id;
    let tempUser;
    let tempReactCount = 0;

    this.props.reactions.forEach(reaction => !tempIconStore.includes(reaction.react_type) && tempIconStore.length <= 3 && reaction.reactable_type === "Post" && reaction.reactable_id === this.props.post.id ? tempIconStore.push(reaction.react_type) : null);
    this.props.reactions.forEach(reaction => reaction.reactable_type === "Post" && reaction.reactable_id === this.props.post.id ? tempReactCount++ : null);

    this.props.usersArr.forEach(user => user.id === tempFirstUserId ? tempUser = user : null);
    let tempUserName = `${tempUser.first_name} ${tempUser.last_name}`;
    if (tempFirstUserId === this.props.currentUser.id) tempUserName = "You";
    if (tempIconStore.length === 0) tempUserName = null;

    this.setState({ reactionIcons: [...tempIconStore], reactionCount: tempReactCount, firstReactorName: tempUserName });
  }

  commentsOrganization() {
    let tempPostComments = [];
    let tempPostReplies = [];
    let tempCommentCount = 0;

    this.props.comments.forEach(comment => comment.post_id === this.props.post.id && comment.reply_id === null ? tempPostComments.push(comment) : null);
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id && comment.reply_id !== null ? tempPostReplies.push(comment) : null);
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id ? tempCommentCount++ : null);
    this.setState({ postComments: [...tempPostComments], postReplies: [...tempPostReplies], commentCount: tempCommentCount });
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
        <img className='post-show-modal-input-pic' src={this.props.currentUser.profilePictureUrl ? this.props.currentUser.profilePictureUrl : "https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} />
        <div className='post-show-modal-input-box'>
          <input className='post-show-modal-input' type="text" placeholder='Add a comment...' value={this.state.body} onChange={this.update("body")} autoFocus />
          {this.state.body.length > 0 ? <input className='post-show-modal-comment' type="submit" value="Post" onClick={this.handleCommentSubmit} /> : null}
        </div>
      </form>
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

  convertDate(comment) {
    let rawDate;
    if (comment) rawDate = Date.now() - new Date(comment.created_at);
    if (!comment) rawDate = Date.now() - new Date(this.props.post.created_at);

    switch(true) {
      case (rawDate < 3600000): // less than an hour
        if (`${Math.round((rawDate/(1000 * 60)))}m` === "0m") return "now";
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

  copyToClipboard() {
    // navigator.clipboard.writeText(`localhost:3000/#/posts/${this.props.post.id}`)
    navigator.clipboard.writeText(`https://ringedin.herokuapp.com/#/posts/${this.props.post.id}`)
      .then(() => this.setState({ editMenuActive: false, copySuccess: true }));
  }

  copySuccessMessage() {

  }

  renderEditMenu() {
    if (this.props.post.user_id === this.props.currentUser.id) {
      return (
        <div className='post-edit-menu-wrap'>

          <NavbarContainer page="post page" /> 

          <ul>

            {/* <li className='post-edit-menu-item' onClick={this.copyToClipboard}>
              <div className='post-edit-menu-item-content'>
                <img src={window.linkURL} />
                <div className='post-edit-menu-item-text'>
                  <h5>Copy link to post</h5>
                  <p></p>
                </div>
              </div>
            </li> */}

            <li className='post-edit-menu-item' onClick={() => this.props.openEditPostModal(this.props.post)}>
              <div className='post-edit-menu-item-content'>
                <img src={window.quillURL} />
                <div className='post-edit-menu-item-text'>
                  <h5>Edit post</h5>
                  <p></p>
                </div>
              </div>
            </li>

            <li className='post-edit-menu-item' onClick={() => this.props.deletePost(this.props.post.id)}>
              <div className='post-edit-menu-item-content'>
                <img src={window.trashURL} />
                <div className='post-edit-menu-item-text'>
                  <h5>Delete</h5>
                  <p>Cast your post into the flames of Mount Doom</p>
                </div>
              </div>
            </li>

          </ul>
        </div>
      )
    } else {
      return (
        <div className='post-edit-menu-wrap'>
          <ul>

            {/* <li className='post-edit-menu-item' onClick={this.copyToClipboard}>
              <div className='post-edit-menu-item-content'>
                <img src={window.linkURL} />
                <div className='post-edit-menu-item-text'>
                  <h5>Copy link to post</h5>
                  <p></p>
                </div>
              </div>
            </li> */}

            <li className='post-edit-menu-item'>
              <div className='post-edit-menu-item-content'>
                <img src={window.ownerURL} />
                <div className='post-edit-menu-item-text'>
                  <h5>This is {this.props.users[this.props.post.user_id].first_name} {this.props.users[this.props.post.user_id].last_name}'s post.</h5>
                  <p>Unable to edit or delete this post.</p>
                </div>
              </div>
            </li>

          </ul>
        </div>
      )
    }
  }

  renderMedia(mediaType) {
    if (mediaType === "photo") {
      return (
        <div className='post-media-wrap' onClick={() => this.props.openPostShowModal(this.props.post)}>
          <img className='post-media' src={this.props.post.photoUrl} alt="post photo" />
        </div>
      )
    } else if (mediaType === "video") {
      return (
        <div className='post-media-wrap' onClick={() => this.props.openPostShowModal(this.props.post)}>
          <video className='post-media' src={this.props.post.videoUrl} alt="post video" controls autoPlay muted />
        </div>
      )
    }
  }

  render() {
    if (!this.props.users[this.props.post.user_id]) return null;

    const { post } = this.props;
    return (
      <div className='post-item'>

        {/* Post Header */}
        <div className='post-header-wrap'>

          <Link className='post-header-link' to={`/users/${this.props.post.user_id}`}>
            {this.props.users[this.props.post.user_id].profilePictureUrl ? 
              <img className='post-header-photo' src={this.props.users[this.props.post.user_id].profilePictureUrl} /> : 
              <img className='post-header-photo' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />
            }
            <div className='post-header-text'>
              <span className='post-header-name'>{this.props.users[this.props.post.user_id].first_name} {this.props.users[this.props.post.user_id].last_name}</span>
              <span className='post-header-headline'>{this.props.users[this.props.post.user_id].headline}</span>
              <div className='post-header-timestamp-wrap'>
                <span className='post-header-timestamp'>{this.convertDate()}</span>
                {this.state.edited ? <span className='post-header-timestamp'>&nbsp;• Edited</span> : null}
              </div>
            </div>
          </Link>

          {/* Edit Menu */}
          <button onClick={() => this.setState({ editMenuActive: !this.state.editMenuActive })} className='post-header-edit-button'><img className='post-header-edit' src={window.postEditURL} /></button>
          {this.state.editMenuActive ? this.renderEditMenu() : null}

        </div>
        
        <div className='post-content-box'>
          {/* Post Body */}
          <div className='post-body-wrap'>
            {this.state.seeMoreActive ? <span className='post-body-text'>{post.body}</span> : <span className='post-body-text'>{post.body.slice(0, 200)}</span>}
            {this.state.seeMoreActive || post.body.length < 200 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })}>...see more</button>}
          </div>

          {/* Post Media */}
          {post.photoUrl ? this.renderMedia("photo") : null}
          {post.videoUrl ? this.renderMedia("video") : null}
        </div>

        <div>
          <ul className='post-show-modal-reactbar'>
            <li className='post-show-modal-reactbar-content'>
              {this.state.reactionIcons[0] ? <img src={reactionLibrary[this.state.reactionIcons[0]]} /> : null}
              {this.state.reactionIcons[1] ? <img src={reactionLibrary[this.state.reactionIcons[1]]} /> : null}
              {this.state.reactionIcons[2] ? <img src={reactionLibrary[this.state.reactionIcons[2]]} /> : null}
              <span className='post-show-modal-social'>{this.state.firstReactorName} {this.state.reactionCount > 1 ? `and ${this.state.reactionCount - 1} other${this.state.reactionCount > 2 ? "s" :""}` : null}</span>
            </li>

            <span onClick={() => this.setState({ commentSectionOn: true })} className='post-show-modal-comments'>{this.state.commentCount} comment{this.state.commentCount > 1 ? "s" : ""}</span>
          </ul>

          <div className='post-show-modal-actions'>
            <div className='post-show-reaction-box'>
              {this.state.currentReaction === "" ? this.renderReactionCard("") : this.renderReactionCard(this.state.currentReaction.react_type)}
              {this.renderReactionDock()}
            </div>

            <button className='post-show-modal-action' onClick={() => this.setState({ commentSectionOn: true })}>
              <img className='post-show-modal-action-icon' src={window.commentURL} />
              <span className='post-show-modal-action-text'>Comment</span>
            </button>
          </div>
        </div>
        
        {this.state.commentSectionOn ? this.renderCommentInput() : null}
        
        <div style={this.state.commentSectionOn ? null : {"display": "none"}}>
          {this.state.postComments.map(comment => post.id === comment.post_id ? <CommentItemContainer key={`${comment.created_at}+${comment.body}`} replies={this.state.postReplies} comment={comment} post={post} /> : null).reverse()}
        </div>

      </div>
    )
  }
}

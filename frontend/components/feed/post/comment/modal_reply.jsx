import React, { Component } from 'react';
import { Link } from 'react-redux';

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

export default class ModalReply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.reply,

      replyBody: "",

      reactor_id: this.props.currentUser.id,
      react_type: "",
      reactable_type: "Comment",
      reactable_id: this.props.reply.id,

      currentReaction: "",

      reactionIcons: [],
      reactionCount: 0,
      firstReactorName: "",
      reactionDockOn: false,

      edited: this.props.reply.created_at !== this.props.reply.updated_at,
      seeMoreActive: false,

      postReplies: [...this.props.replies],

      editMenuActive: false,
      editCommentOn: false,

      replyFieldActive: false,
    }

    this.react = this.react.bind(this);
    this.reactEdit = this.reactEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCommentReactions(this.props.reply.id)
      .then(() => this.reactionsOrganization())
      .then(() => this.setCurrentReaction());
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.reactions.length !== this.props.reactions.length) || (JSON.stringify(prevProps.reactions) !== JSON.stringify(this.props.reactions))) {
      this.reactionsOrganization();
    }
    if ((prevProps.comments.length !== this.props.comments.length) || (JSON.stringify(prevProps.comments) !== JSON.stringify(this.props.comments))) {
      this.commentsOrganization();
      // this.repliesOrganization();
        // .then(() => this.repliesOrganization());
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  react(reaction) {
    this.props.createCommentReaction({...this.state, react_type: reaction})
      .then(() => this.setCurrentReaction())
      // .then(() => this.setState({ commentsOn: true }));
  }

  reactEdit(reaction) {
    this.props.updateCommentReaction({...this.state.currentReaction, react_type: reaction})
      .then(() => this.setCurrentReaction())
      // .then(() => this.setState({ commentsOn: true }));
  }

  removeReaction() {
    this.props.deleteCommentReaction(this.state.currentReaction.id)
      .then(() => this.setState({ react_type: "", currentReaction: "" }));
  }

  reactionsOrganization() {
    if (!this.props.reactions[0]) return this.setState({ reactionIcons: [], reactionCount: 0, firstReactorName: "" });
    let tempIconStore = [];

    let tempFirstUserId = this.props.reactions[0].reactor_id;
    let tempUser;
    let tempReactCount = 0;

    this.props.reactions.forEach(reaction => !tempIconStore.includes(reaction.react_type) && tempIconStore.length <= 3 && reaction.reactable_type === "Comment" && reaction.reactable_id === this.props.reply.id ? tempIconStore.push(reaction.react_type) : null);
    this.props.reactions.forEach(reaction => reaction.reactable_type === "Comment" && reaction.reactable_id === this.props.reply.id ? tempReactCount++ : null);

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
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id && comment.reply_id === this.props.comment.id ? tempPostReplies.push(comment) : null);
    this.props.comments.forEach(comment => comment.post_id === this.props.post.id ? tempCommentCount++ : null);
    this.setState({ postComments: [...tempPostComments], postReplies: [...tempPostReplies], commentCount: tempCommentCount });
  }

  repliesOrganization() {
    let tempPostReplies = [];

    this.state.postReplies.forEach(reply => reply.reply_id === this.props.comment.id ? tempPostReplies.push(reply) : null);
    this.setState({ postReplies: [...tempPostReplies] });
  }

  setCurrentReaction() {
    for (let reaction of this.props.reactions) {
      if (reaction.reactor_id === this.props.currentUser.id && reaction.reactable_id === this.props.reply.id && reaction.reactable_type === "Comment") {
        this.setState({ currentReaction: reaction, react_type: reaction.react_type });
      }
    }
  }

  convertDate(reply) {
    let rawDate;
    if (reply) rawDate = Date.now() - new Date(reply.created_at);
    if (!reply) rawDate = Date.now() - new Date(this.props.post.created_at);

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

  renderEditMenu() {
    if (this.props.reply.user_id === this.props.currentUser.id) {
      return (
        <div className='post-show-modal-edit-menu-wrap'>
          <ul>

            <li className='post-show-modal-edit-menu-item' onClick={() => this.setState({ editCommentOn: true, editMenuActive: false })}>
              <div className='post-show-modal-edit-menu-item-content'>
                <img src={window.quillURL} />
                <div className='post-show-modal-edit-menu-item-text'>
                  <h5>Edit</h5>
                  <p></p>
                </div>
              </div>
            </li>

            <li className='post-show-modal-edit-menu-item' onClick={() => this.props.deleteComment(this.props.reply.id)}>
              <div className='post-show-modal-edit-menu-item-content'>
                <img src={window.trashURL} />
                <div className='post-show-modal-edit-menu-item-text'>
                  <h5>Delete</h5>
                  <p></p>
                </div>
              </div>
            </li>

          </ul>
        </div>
      )
    } else {
      return (
        <div className='post-show-modal-edit-menu-wrap'>
          <ul>

            <li className='post-show-modal-edit-menu-item'>
              <div className='post-show-modal-edit-menu-item-content'>
                <img src={window.ownerURL} />
                <div className='post-show-modal-edit-menu-item-text'>
                  <h5>This is {this.props.users[this.props.reply.user_id].first_name} {this.props.users[this.props.reply.user_id].last_name}'s comment.</h5>
                  <p>Unable to edit or delete this comment.</p>
                </div>
              </div>
            </li>

          </ul>
        </div>
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
      <div className='post-show-modal-reaction-dock'>
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

  renderReactionCard(reaction) {
    if (reaction !== "") {
      return (
        <button className='post-show-modal-comment-action' onClick={() => this.removeReaction()}>
          {/* <img className='post-show-modal-action-icon' src={reactionLibrary[reaction]} /> */}
          <span className='post-show-modal-comment-action-text' style={{color: `${reactionColors[reaction]}`}}>{reaction}</span>
        </button>
      )
    } else {
      return (
        <button className='post-show-modal-comment-action' onClick={() => this.react("Like")}>
          {/* <img className='post-show-modal-action-icon' src={window.nolikeURL} /> */}
          <span className='post-show-modal-comment-action-text'>Like</span>
        </button>
      )
    }
  }

  renderReplyField() {
    return (
      <form className='post-show-modal-reply-input-wrap'>
        <img className='post-show-modal-input-pic' src={this.props.currentUser.profilePictureUrl ? this.props.currentUser.profilePictureUrl : "https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} />
        <div className='post-show-modal-input-box'>
          <input className='post-show-modal-input' type="text" placeholder='Add a reply...' value={this.state.replyBody} onChange={this.update("replyBody")} />
          {this.state.replyBody.length > 0 ? <input className='post-show-modal-comment' type="submit" value="Reply" onClick={this.handleCommentSubmit} /> : null}
        </div>
      </form>
    )
  }
  
  render() {
    let user = this.props.users[this.props.reply.user_id];

    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 1

    const { reply } = this.props;

    return (
      <div>
          <div className='post-show-modal-comment-card-inner'>
          {user.profilePictureUrl ? <img className='post-show-modal-comment-card-pic' src={user.profilePictureUrl} /> : <img className='post-show-modal-comment-card-pic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
          <div>
            <div className='post-show-modal-comment-graybox'>

              <div className='post-show-modal-comment-card-header'>
                <div className='post-show-modal-comment-card-header-left'>
                  <div className='post-show-modal-comment-card-header-left-top'>
                    <span className='post-show-modal-comment-username'>{user.first_name} {user.last_name}</span>
                    {user.id === this.props.currentUser.id ? <div className='author-tag'>Author</div> : null}
                  </div>
                  <span className='post-show-modal-comment-headline'>{user.headline}</span>
                </div>

                <div className='post-show-modal-comment-card-header-right'>
                  <span className='post-show-modal-comment-card-timestamp'>{this.convertDate(reply)}</span>
                  {this.state.edited ? <span className='post-show-modal-comment-card-timestamp'> (edited) </span> : null}
                  <button onClick={() => this.setState({ editMenuActive: !this.state.editMenuActive })} className='post-show-modal-comment-card-edit-button'><img className='post-show-modal-comment-card-edit-img' src={window.postEditURL} /></button>
                </div>
                {this.state.editMenuActive ? this.renderEditMenu() : null}
              </div>

              {/* Comment Body */}
              <div className='post-show-modal-comment-content' style={this.state.editCommentOn ? {display: "none"} : null}>
                {this.state.seeMoreActive ? <span className='post-body-text'>{reply.body}</span> : <span className='post-body-text'>{reply.body.slice(0, 150)}</span>}
                {this.state.seeMoreActive || reply.body.length < 150 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })} style={{"background-color": "#f2f2f2"}}>...see more</button>}
              </div>

              {/* Comment Editor */}
              <form className='post-show-modal-comment-form' style={this.state.editCommentOn ? null : {display: "none"}}>
                <textarea className='post-show-modal-comment-input-field' value={this.state.body} onChange={this.update("body")} rows={rows}></textarea>
                <div>
                  <input 
                    className={this.bodyFreeze !== this.state.body && this.state.body.length > 0 ? "post-show-modal-edit-comment-can" : "post-show-modal-edit-comment-cant"} 
                    type="submit" 
                    value="Save Changes" 
                    onClick={this.handleEditComment} 
                    disabled={this.bodyFreeze !== this.state.body && this.state.body.length > 0 ? null : true} 
                  />
                  &nbsp;
                  <button className='post-show-modal-edit-comment-cancel' onClick={() => this.setState({ editCommentOn: false })}>Cancel</button>
                </div>
              </form>

            </div> {/* End of the greybox */} 


              {/* Reaction Bar */}
              <div className='post-show-modal-comment-reaction-bar-wrap'>
                <div className='post-show-modal-comment-reaction-bar-left'>
                  {this.state.currentReaction === "" ? this.renderReactionCard("") : this.renderReactionCard(this.state.currentReaction.react_type)}
                  {this.renderReactionDock()}

                  {this.state.reactionCount > 0 ? <span className='post-show-modal-comment-dot'>•</span> : null}

                  {this.state.reactionCount > 0 && this.state.reactionIcons[0] ? <img src={reactionLibrary[this.state.reactionIcons[0]]} /> : null}
                  {this.state.reactionCount > 0 && this.state.reactionIcons[1] ? <img src={reactionLibrary[this.state.reactionIcons[1]]} /> : null}
                  {this.state.reactionCount > 0 && this.state.reactionIcons[2] ? <img src={reactionLibrary[this.state.reactionIcons[2]]} /> : null}
                  
                  {this.state.reactionCount > 0 ? <span className='post-show-modal-comment-count'>{this.state.reactionCount}</span> : null}
                </div>

                <div className='post-show-modal-comment-divider'></div>

                <div className='post-show-modal-comment-reation-bar-right'>
                  <button className='post-show-modal-comment-reply-button' onClick={() => this.setState({ replyFieldActive: true })}>Reply</button>
                </div>
              </div>

            </div>
          </div>

          {this.state.replyFieldActive ? this.renderReplyField() : null}
      </div>
    )
  }
}

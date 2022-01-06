import React, { Component } from 'react';
import { Link } from 'react-redux';
import ModalReplyContainer from './modal_reply_container';

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

export default class ModalComment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.comment);
    this.state = {
      ...this.props.comment,

      reactor_id: this.props.currentUser.id,
      react_type: "",
      reactable_type: "Post",
      reactable_id: this.props.post.id,

      currentReaction: "",

      reactionIcons: [],
      reactionCount: 0,
      firstReactorName: "",
      reactionDockOn: false,

      edited: this.props.comment.created_at !== this.props.comment.updated_at,
      seeMoreActive: false,

      postReplies: [...this.props.replies],

      editMenuActive: false,
      editCommentOn: false
    }

    this.bodyFreeze = this.state.body;

    this.handleEditComment = this.handleEditComment.bind(this);
    this.react = this.react.bind(this);
    this.reactEdit = this.reactEdit.bind(this);
  }

  componentDidMount() {
    this.repliesOrganization();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleEditComment(e) {
    e.preventDefault();

    this.props.updateComment({...this.state});
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
 
  convertDate(comment) {
    let rawDate;
    if (comment) rawDate = Date.now() - new Date(comment.created_at);
    if (!comment) rawDate = Date.now() - new Date(this.props.post.created_at);

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

  repliesOrganization() {
    let tempPostReplies = [];

    this.state.postReplies.forEach(reply => reply.reply_id === this.props.comment.id ? tempPostReplies.push(reply) : null);
    this.setState({ postReplies: [...tempPostReplies] });
  }

  renderEditMenu() {
    if (this.props.comment.user_id === this.props.currentUser.id) {
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

            <li className='post-show-modal-edit-menu-item' onClick={() => this.props.deleteComment(this.props.comment.id)}>
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
                  <h5>This is {this.props.users[this.props.post.user_id].first_name} {this.props.users[this.props.post.user_id].last_name}'s comment.</h5>
                  <p>Unable to edit or delete this comment.</p>
                </div>
              </div>
            </li>

          </ul>
        </div>
      )
    }
  }

  renderReactionCard(reaction) {
    if (reaction !== "") {
      return (
        <button className='post-show-modal-action' onClick={() => this.removeReaction()}>
          {/* <img className='post-show-modal-action-icon' src={reactionLibrary[reaction]} /> */}
          <span className='post-show-modal-action-text' style={{color: `${reactionColors[reaction]}`}}>{reaction}</span>
        </button>
      )
    } else {
      return (
        <button className='post-show-modal-action' onClick={() => this.react("Like")}>
          {/* <img className='post-show-modal-action-icon' src={window.nolikeURL} /> */}
          <span className='post-show-modal-action-text'>Like</span>
        </button>
      )
    }
  }
  
  render() {
    let user = this.props.users[this.props.comment.user_id];

    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 1

    const { comment } = this.props;

    return (
      <article className='post-show-modal-comment-card-outer' key={`${comment.id}${comment.body}${comment.created_at}`}>
        <div className='post-show-modal-comment-card-inner'>
          {user.profilePictureUrl ? <img className='post-show-modal-comment-card-pic' src={user.profilePictureUrl} /> : <img className='post-show-modal-comment-card-pic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
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
                <span className='post-show-modal-comment-card-timestamp'>{this.convertDate(comment)}</span>
                {this.state.edited ? <span className='post-show-modal-comment-card-timestamp'> (edited) </span> : null}
                <button onClick={() => this.setState({ editMenuActive: !this.state.editMenuActive })} className='post-show-modal-comment-card-edit-button'><img className='post-show-modal-comment-card-edit-img' src={window.postEditURL} /></button>
              </div>
              {this.state.editMenuActive ? this.renderEditMenu() : null}
            </div>

            {/* Comment Body */}
            <div className='post-show-modal-comment-content' style={this.state.editCommentOn ? {display: "none"} : null}>
              {this.state.seeMoreActive ? <span className='post-body-text'>{comment.body}</span> : <span className='post-body-text'>{comment.body.slice(0, 150)}</span>}
              {this.state.seeMoreActive || comment.body.length < 150 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })} style={{"background-color": "#f2f2f2"}}>...see more</button>}
            </div>

            {/* Comment Editor */}
            <form className='post-show-modal-comment-form' style={this.state.editCommentOn ? null : {display: "none"}}>
              {/* <input className='post-show-modal-comment-input-field' type="textarea" value={this.state.body} onChange={this.update("body")} /> */}
              <textarea className='post-show-modal-comment-input-field' value={this.state.body} onChange={this.update("body")} rows={rows}></textarea>
              <div>
                {/* <input type="submit" value="Save Changes" onClick={this.handleEditComment} style={this.bodyFreeze !== this.state.body && this.state.body.length > 0 ? null : {"cursor": "not-allowed"}} /> */}
                <input type="submit" value="Save Changes" onClick={this.handleEditComment} />
                <button className='post-show-modal-edit-comment-cancel' onClick={() => this.setState({ editCommentOn: false })}>Cancel</button>
              </div>
            </form>

          </div>

          {/* Reaction Bar */}
          <div className='post-show-modal-comment-reaction-bar-wrap'>
            <div className='post-show-modal-comment-reation-bar-left'>
              {/* {this.state.currentReaction === "" ? this.renderReactionCard("") : this.renderReactionCard(this.state.currentReaction.react_type)} */}
            </div>

            <div></div>

            <div className='post-show-modal-comment-reation-bar-right'>

            </div>
          </div>

        </div>
            <div className='post-show-modal-comment-replies'>
              {this.state.postReplies.map(reply => <ModalReplyContainer key={`${reply.id}${reply.body}${reply.created_at}`} reply={reply} />)}
            </div>

      </article>
    )
  }
}

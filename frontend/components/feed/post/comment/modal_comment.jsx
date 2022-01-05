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

  }

  componentDidMount() {
    this.repliesOrganization();
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

            <li className='post-show-modal-edit-menu-item' onClick={() => this.setState({ editCommentOn: true })}>
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
  
  render() {
    let user = this.props.users[this.props.comment.user_id];

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
                {this.state.edited ? " (edited) " : null}
                <button onClick={() => this.setState({ editMenuActive: !this.state.editMenuActive })} className='post-show-modal-comment-card-edit-button'><img className='post-show-modal-comment-card-edit-img' src={window.postEditURL} /></button>
              </div>
              {this.state.editMenuActive ? this.renderEditMenu() : null}
            </div>

            <div className='post-show-modal-comment-content'>
              {this.state.seeMoreActive ? <span className='post-body-text'>{comment.body}</span> : <span className='post-body-text'>{comment.body.slice(0, 150)}</span>}
              {this.state.seeMoreActive || comment.body.length < 150 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })}>...see more</button>}
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

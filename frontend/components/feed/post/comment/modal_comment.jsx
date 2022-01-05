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

export default class ModalComment extends Component {
  constructor(props) {
    super(props);

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

      postReplies: [],
    }

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
  
  render() {
    let user = this.props.users[this.props.post.user_id];

    const { comment } = this.props;

    return (
      <div>
        <article className='post-show-modal-comment-card-wrap' key={`${comment.id}${comment.body}${comment.created_at}`}>
          <div>
            <img className='post-show-modal-comment-card-pic' src={user.profilePictureUrl} />
            <div className='post-show-modal-comment-graybox'>

              <div className='post-show-modal-comment-card-header'>
                <div className='post-show-modal-comment-card-header-left'>
                  <span>{user.first_name} {user.last_name} {user.id === this.props.currentUser.id ? <div className='author-tag'>Author</div> : null}</span>
                  <span>{user.headline}</span>
                </div>

                <div className='post-show-modal-comment-card-header-right'>
                  <span>{this.convertDate(comment)}</span>
                  <button><img src={window.postEditURL} /></button>
                </div>
              </div>

              <div className='post-show-modal-comment-content'>
                <p>{comment.body}</p>
              </div>

            </div>
          </div>

          <div className='post-show-modal-comment-replies'>
            
          </div>
        </article>
      </div>
    )
  }
}

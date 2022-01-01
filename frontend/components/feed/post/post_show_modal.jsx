import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PostShowModal extends Component {
  constructor(props) {
    super(props);

    const rawDiff = new Date(this.props.post.updated_at) - new Date(this.props.post.created_at);

    this.state = {
      edited: rawDiff > 1000
    }
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


  render() {
    return (
      <div className='post-show-modal-wrap'>
        <button className='post-show-modal-exit' onClick={this.props.closeModal}><img className='post-show-modal-x' src={window.xURL} /></button>

        {/* Left */}
        <div className='post-show-modal-left-section'>
          {this.props.post.photoUrl ? <img className='post-show-modal-media' src={this.props.post.photoUrl} /> : null}
          {this.props.post.videoUrl ? <video className='post-show-modal-media' src={this.props.post.videoUrl} controls /> : null}
        </div>

        {/* Right */}
        <div className='post-show-modal-right-section'>
          <div className='post-show-modal-right-header'>
            <Link className='post-show-modal-namecard' to={`/users/${this.props.post.user_id}`}>
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
              {this.state.seeMoreActive ? <span className='post-body-text'>{this.props.post.body}</span> : <span className='post-body-text'>{this.props.post.body.slice(0, 200)}</span>}
              {this.state.seeMoreActive || this.props.post.body.length < 200 ? null : <button className='see-more' onClick={() => this.setState({ seeMoreActive: true })}>...see more</button>}
            </div>

            <div>
              <ul className='post-show-modal-reactbar'>
                <li className='post-show-modal-reactbar-content'>
                  <button className='post-show-reactbar-button'>

                  </button>
                </li>
              </ul>
            </div>
            
          </div>

        </div>

      </div>
    )
  }
}

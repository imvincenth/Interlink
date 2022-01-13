import React, { Component } from 'react'

export default class BannerShowModal extends Component {
  render() {
    return (
      <div>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header' style={{borderBottom: "none", position: "absolute"}}>
          <h2 className='post-modal-header-text'></h2>
        </div>

        {/* Content */}
        <div className='banner-show-modal-content'>
          {this.props.user.bannerUrl ? <img className='banner-show-banner' src={this.props.user.bannerUrl} /> : <img className='banner-show-banner' src="https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq" />}
        </div>

      </div>
    )
  }
}

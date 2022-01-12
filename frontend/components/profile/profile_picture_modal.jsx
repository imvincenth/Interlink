import React, { Component } from 'react'

export default class ProfilePictureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }
  }

  render() {
    let modalHeader;
    this.state.page === 1 ? modalHeader = "Add photo" : null;
    this.state.page === 2 ? modalHeader = "Edit photo" : null;
    this.state.page === 3 ? modalHeader = "Profile photo" : null;

    return (
      <form>
        
        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header'>
          <h2 className='post-modal-header-text'>{modalHeader}</h2>
        </div>


      </form>
    )
  }
}

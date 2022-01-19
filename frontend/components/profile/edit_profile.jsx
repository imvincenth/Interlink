import React from 'react';

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.currentUser
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.action({...this.state})
      .then(() => this.props.closeModal());
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  render() {
    return (
      <div>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header' style={{display: "flex", alignItems: "center"}}>
          <h2 className='post-modal-header-text'>Edit intro</h2>
        </div>

        {/* Edit Profile Content */}
        <div className='profile-edit-modal-wrap'>
          <p className='profile-edit-indicates-required'>* Indicates required</p>
          <div className='profile-edit-modal-name-section'>

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-first-name">First name<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-first-name' 
                value={this.state.first_name} 
                onChange={this.update("first_name")} 
              />
            </div>

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-last-name">Last name<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-last-name' 
                value={this.state.last_name} 
                onChange={this.update("last_name")} 
              />
            </div>

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-headline">Headline<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-headline' 
                value={this.state.headline} 
                onChange={this.update("headline")} 
              />
            </div>

            <h4>Location</h4>

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-country-region">Country/Region<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-country-region' 
                value={this.state.country_region} 
                onChange={this.update("country_region")} 
              />
            </div>

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-city-district">City/District<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-city-district' 
                value={this.state.city_district} 
                onChange={this.update("city_district")} 
              />
            </div>

          </div>
          <footer 
            style={{display: "flex", 
            flexDirection: "row-reverse", 
            justifyContent: "space-between", 
            padding: "16px 24px", 
            borderTop: "1px solid rgba(0, 0, 0, 0.08)"}}
          >
            <button className='profile-edit-modal-save' onClick={this.handleSubmit}>Save</button>
          </footer>
        </div>


      </div>
    )
  }
}

export default EditProfileForm;
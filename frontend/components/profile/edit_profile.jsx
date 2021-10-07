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
        <form onSubmit={this.handleSubmit}>

          <label>
            First name*
            <input 
              type="text" 
              value={this.state.first_name} 
              onChange={this.update("first_name")} 
            />
          </label>

          <label>
            Last name*
            <input 
              type="text" 
              value={this.state.first_name} 
              onChange={this.update("first_name")} 
            />
          </label>

          <label>
            Headline*
            <input 
              type="text" 
              value={this.state.headline}
              onChange={this.update("headline")}
            />
          </label>

          <h1>Location</h1>
          <label>
            Country/Region*
            <input type="text" value={this.state.country_region} onChange={this.update("country_region")} />
          </label>
          <label>
            City/District*
            <input type="text" value={this.state.city_district} onChange={this.update("city_district")} />
          </label>

          <input type="submit" onSubmit={this.handleSubmit} value="Save" />
        </form>
      </div>
    )
  }
}

export default EditProfileForm;
import React, { Component } from 'react'

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      body: ""
    }
    
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div>
        <form ></form>
      </div>
    )
  }
}

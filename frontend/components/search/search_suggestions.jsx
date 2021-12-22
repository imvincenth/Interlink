import React, { Component } from 'react'

export default class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: this.props.users
    }

    this.filterResults();
  }

  filterResults() {
    for (const userId in this.state.results) {
      if (userId === this.props.currentUser.id) delete this.state.results[userId];
      if (!this.state.results[userId].first_name.toLowerCase().includes(this.props.input) || !this.state.results[userId].last_name.toLowerCase().includes(this.props.input)) {
        delete this.state.results[userId];
      }
    }
  }

  searchResultCard(user) {
    return (
      <div>
        <img className="search-icon" src={window.searchIconURL} alt="search icon" />
        {user.first_name.toLowerCase()} {user.last_name.toLowerCase()} + {user.headline}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.results.map()}
      </div>
    )
  }
}

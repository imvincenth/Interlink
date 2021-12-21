import React, { Component } from 'react'
import NavbarContainer from '../feed/navbar/navbar_container';

export default class Search extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <NavbarContainer page="results" />
        
      </div>
    )
  }
}

import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>404 Page Not Found</h1>
        <Link to="/"></Link>
      </div>
    )
  }
}

export default PageNotFound;
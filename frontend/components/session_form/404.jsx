import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>
          Uh oh, we can't seem to find the page you're looking for. Try going<br />
          back to the previous page
        </p>
        <br />
        <Link to="/feed">Go to your feed</Link>
      </div>
    )
  }
}

export default PageNotFound;
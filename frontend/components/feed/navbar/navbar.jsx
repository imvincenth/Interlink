import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.page,

      searchInput: "",
      searchActive: false, 
      results: {}
    }

    this.toggleSearchOn = this.toggleSearchOn.bind(this);
    this.toggleSearchOff = this.toggleSearchOff.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.filterResults();
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value, searchActive: true });
  }

  toggleSearchOn() {
    this.setState({ searchActive: true });
  }

  toggleSearchOff() {
    this.setState({ searchActive: false });
  }

  filterResults() {
    let clone = {...this.props.users};
    for (const userId in clone) {
      // Removing the current user from results
      if (Number(userId) === this.props.currentUser.id) delete clone[userId];
    }
    for (const userId in clone) {
      // Removing users whose name does not include the search input
      let usersName = `${clone[userId].first_name} ${clone[userId].last_name}`.toLowerCase();
      if (!this.state.searchInput.toLowerCase().includes(usersName)) delete clone[userId];
    }
    if (this.state.searchInput.length === 0) console.log("empty drdrdrdr");
    console.log(clone);
    // this.setState({ results: clone });
  }

  searchResultCard(user) {
    return (
      <div>
        <img className="search-icon" src={window.searchIconURL} alt="search icon" />
        {user.first_name.toLowerCase()} {user.last_name.toLowerCase()} + {user.headline}
      </div>
    )
  }

  noInput() {
    return (
      <div>
        <div className='noinput-search-suggestion'>
          Try searching for
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Frodo Baggins
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Samwise Gamgee
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Gandalf the Grey
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Aragorn II Elessar
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Legolas Greenleaf
        </div>
        <div className='noinput-search-suggestion'>
          <img src={window.searchIconURL} alt="magnifying glass" />
          Gimli son of Gloin
        </div>
      </div>
    )
  }

  noResults() {
    return (
      <div>

      </div>
    )
  }

  searchResults() {
    return (
      <div className='search-modal-child' onClick={e => e.stopPropagation()}>
        {this.state.searchInput.length === 0 ? this.noInput() : null}
      </div>
    )
  }

  render() {
    if (!this.props.currentUser) return null;
  
    return (
      <div id="navbar-container" onClick={this.state.searchActive ? this.toggleSearchOff : null}>
        {this.state.searchActive ? <div className='search-modal-background'></div> : null}
        <div className="navbar-content">

          <div className="navbar-left">
            <div className="navbar-logo-box"> 
              <Link to="/">
                <img src={window.logoURL} className="navbar-logo" alt="login logo" />
              </Link>
            </div>

            <div className="navbar-search-box">
              <div className={this.state.searchActive ? "search-icon-box search-active" : "search-icon-box"}>
                <img className="search-icon" src={window.searchIconURL} alt="search icon" />
              </div>
              <div className='search-box-wmodal'>
                <input 
                  className={this.state.searchActive ? "search-bar search-active" : "search-bar"} 
                  type="text" 
                  value={this.state.searchInput} 
                  onChange={this.update("searchInput")} 
                  onClick={this.state.searchActive ? e => e.stopPropagation() : this.toggleSearchOn} 
                  placeholder="Search" 
                  />
              {this.state.searchActive ? this.searchResults() : null}
              </div>
            </div>
          </div>


          <div className="navbar-list">
            <div className="navbar-item">
              <Link className={this.props.page === "feed" ? "navbar-link active" : "navbar-link transparent"} to="/feed">
                <img className={this.props.page === "feed" ? "navbar-icon active" : "navbar-icon"} src={window.feedURL} alt="feed url" />
                <h5>Home</h5>
                <div className={this.props.page === "feed" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
              </Link>
            </div>

            <div className="navbar-item">
              <Link className={this.props.page === "network" ? "navbar-link active" : "navbar-link transparent"} to="/network">
                <img className={this.props.page === "network" ? "navbar-icon active" : "navbar-icon"} src={window.networkURL} alt="feed url" />
                <h5>Network</h5>
                <div className={this.props.page === "network" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
              </Link>
            </div>

            <div className="navbar-item">
              <a className="navbar-link transparent" href="https://github.com/imvincenth">
                <img className="navbar-icon" src={window.githubURL} alt="feed url" />
                <h5>GitHub</h5>
                <div className="navbar-item-bar"></div>
              </a>
            </div>

            <div className="navbar-item">
              <a className="navbar-link transparent" href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">
                <img className="navbar-icon" src={window.linkedinURL} alt="feed url" />
                <h5>LinkedIn</h5>
                <div className="navbar-item-bar"></div>
              </a>
            </div>

            <div className="navbar-item">
              <Link className={this.props.page === "profile" ? "navbar-link active" : "navbar-link"} to={`/users/${this.props.currentUser.id}`}>
                {this.props.currentUser.profilePictureUrl ? <img className="navbar-icon-profile" src={this.props.currentUser.profilePictureUrl} alt="feed url" /> : <img className="navbar-icon-profile" src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="default profile picture" />}
                <h5 className={this.props.page === "profile" ? "navbar-me active" : "navbar-link transparent"}>Me<img className="navbar-arrow" src={window.downarrowURL} alt="down arrow" /></h5>
                <div className={this.props.page === "profile" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  };
};

export default Navbar;
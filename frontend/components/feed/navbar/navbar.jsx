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

  update(field) {
    // Search result filtering
    let clone = Object.assign({}, this.props.users);
    for (const userId in clone) {
      // Removing the current user from results
      if (Number(userId) === this.props.currentUser.id) delete clone[userId];
    }
    for (const userId in clone) {
      // Removing users whose name does not include the search input
      let usersName = `${clone[userId].first_name} ${clone[userId].last_name}`.toLowerCase();
      if (!usersName.toLowerCase().includes(this.state.searchInput)) delete clone[userId];
    }

    return e => this.setState({ [field]: e.currentTarget.value, searchActive: true, results: clone });
  }

  toggleSearchOn() {
    this.setState({ searchActive: true });
  }

  toggleSearchOff() {
    this.setState({ searchActive: false });
  }

  noInput() {
    return (
      <div className='noinput-search-suggestion-box'>

        <div className='noinput-search-head'>
          Try searching for
        </div>

        <ul className='noinput-search-list'>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.push("/search/results/?keywords=frodo+baggins")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>frodo baggins</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.push("/search/results/?keywords=samwise+gamgee")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>samwise gamgee</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.push("/search/results/?keywords=aragorn+ii+elessar")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>aragorn ii elessar</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.push("/search/results/?keywords=legolas+greenleaf")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>legolas greenleaf</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.push("/search/results/?keywords=gimli+son+of+gloin")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>gimli son of gloin</p>
          </li>
        </ul>

      </div>
    )
  }

  yesInput() {
    if (Object.values(this.state.results).length === 0) return <div>See all results</div>;

    return (
      <div className='search-suggestion-box'>
        {Object.values(this.state.results).map((user, i) => 
          <div key={`${i}` + user.first_name} className='search-suggestion' onClick={() => this.props.history.push(`/users/${user.id}`)}>
            <div className={i === 0 ? 'search-suggestion-content-one' : 'search-suggestion-content'}>
              {user.profilePictureUrl ? <img className='suggestion-propic' src={user.profilePictureUrl} /> : <img className='suggestion-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
              <span className='suggestion-text-box'>
                {this.matchUsername(`${user.first_name} ${user.last_name}`)}
                <span className='suggestion-headline'> • {user.headline}</span>
              </span>
              <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            </div>
          </div>
        )}
        <div className='all-results-box' onClick={() => this.props.history.push(`/search/results/?keyword=${this.state.searchInput}`)}>
          <div className='all-results-content'>
            <span className='all-results-text'>See all results</span>
          </div>
        </div>
      </div>
    )
  }

  matchUsername(name) {
    let firstHalf = "";
    let secondHalf = "";

    for (let i = 0; i < name.length; i++) {
      if (this.state.searchInput[i] && name[i].toLowerCase() === this.state.searchInput[i].toLowerCase()) {
        firstHalf += name[i].toLowerCase();
      } else {
        secondHalf += name[i].toLowerCase();
      }
    }

    return (
      <span className='suggestion-name'>
        {firstHalf}<strong>{secondHalf}</strong>
      </span>
    )
  }

  searchResults() {
    return (
      <div className='search-modal-child' onClick={e => e.stopPropagation()}>
        {this.state.searchInput.length === 0 ? this.noInput() : this.yesInput()}
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
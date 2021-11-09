import React from 'react';
import { Link } from 'react-router-dom';

const positions = "Full-time,Part-time,Self-employed,Freelance,Contract,Internship,Apprenticeship,Seasonal";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // User
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      headline: "",
      country_region: "",
      city_district: "",
      visiblePage: 1,
      student: false,

      currentUser: this.props.currentUser,
      user_id: "",

      // Experience
      title: "",
      employment_type: "",
      company: "",
      location: "",
      start_date: "",
      current_role: true,
      end_date: "",
      industry: "",
      description: "",

      // Education
      school: "",
      degree: "",
      subject: "",
      start_date: "",
      end_date: "",
      grade: "",
      extracurriculars: "",

      startMon: "",
      startYr: "",
      endMon: "",
      endYr: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);

    this.pageCheck = this.pageCheck.bind(this);
    this.visibleCheck = this.visibleCheck.bind(this);

    this.changeBoxTwo = this.changeBoxTwo.bind(this);

    this.checkErrorPlus = this.checkErrorPlus.bind(this);
    this.checkErrorPlusTwo = this.checkErrorPlusTwo.bind(this);
    this.checkErrors = 0;

    this.yesStudent = this.yesStudent.bind(this);
    this.notStudent = this.notStudent.bind(this);
  }

  createOptions(str) {
    let options = str.split(",");
    return options.map((option, i) => <option key={i} value={option}>{option}</option>)
  }

  refreshPage() {
    window.location.reload(false);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demoLogin();
  }

  pageOne() {
    return (
      <div className="signup-form-container">
        <label className="signup-label">Email
          <input type="email"
            value={this.state.email}
            onChange={this.update('email')}
            className="signup-input"
            />
          {this.renderEmailError()}
        </label>
        <br />
        <br />
        <label className="signup-label">Password (6 of more characters)
          <input type="password"
            value={this.state.password}
            onChange={this.update('password')}
            className="signup-input"
            />
          {this.renderPasswordError()}
        </label>

        <br />
        <input className="signup-submit" type="submit" value={"Agree & Join"} onClick={this.pageCheck} />

        <input className="demo-signup-submit" type="submit" value={"Demo Login"} onClick={this.demoLogin} />
        
        <br />
        <p className="session-redirect">Already on RingIn? <Link className="session-redirect-link" to="/login">Sign In</Link></p>
      </div>
    )
  }

  changeBoxTwo() {
    document.getElementsByClassName("signup-form-box")[0].classList.add("box-two");
    
  }

  pageTwo() {
    return (
      <div className="signup-form-container">
        <label className="signup-label">First name
          <input type="text"
            value={this.state.first_name}
            onChange={this.update('first_name')}
            className="signup-input"
          />
        </label>
  
        <br />
        {this.checkErrors === 0 ? "" : this.renderFirstNameError()}
        <br />
  
        <label className="signup-label">Last name
          <input type="text"
            value={this.state.last_name}
            onChange={this.update('last_name')}
            className="signup-input"
          />
        </label>

        <br />
        {this.checkErrors === 0 ? "" : this.renderLastNameError()}
        <br />

        <input className="signup-submit" type="submit" value={"Continue"} onClick={this.checkErrorPlus} />
      </div>
    )
  }

  checkErrorPlus() {
    this.checkErrors = 1;
  }

  pageThree() {
    return (
      <div className="signup-form-container-three">
        <header>
          <h1 className="signup-greeting">Welcome, {this.state.first_name}!</h1>
          <p className="signup-message">Let’s start your profile, connect to people you know, and engage with them on topics you care about.</p>
        </header>

        <div className="signup-form-box-three">
          <label className="signup-label">Country/Region <span className="blue-star">*</span>
            <input type="text"
              value={this.state.country_region}
              onChange={this.update('country_region')}
              className="signup-input"
            />
          </label>
    
          <br />
          {this.checkErrors === 1 ? "" : this.renderCountryRegionError()}
          <br />
    
          <label className="signup-label">City/District <span className="blue-star">*</span>
            <input type="text"
              value={this.state.city_district}
              onChange={this.update('city_district')}
              className="signup-input"
            />
          </label>

          <br />
          {this.checkErrors === 1 ? "" : this.renderCityDistrictError()}
          <br />

          <input className="signup-submit" type="submit" value={"Next"} onClick={this.checkErrorPlusTwo} />
        </div>
      </div>
    )
  }

  checkErrorPlusTwo() {
    this.checkErrors = 2;
  }

  yesStudent() {
    this.setState({ student: true });
  }

  notStudent() {
    this.setState({ student: false, headline: this.state.headline, company: this.state.company });
  }

  cantContinue() {
    return (
      <input className="signup-submit-grey" type="submit" value={"Continue"} disabled />
    )
  }

  canContinue() {
    return (
      <input className="signup-submit" type="submit" value={"Continue"} />
    )
  }

  typeCompanyForms() {
    return (
      <div>
        <div className="signup-form-spacing">
          <label className="signup-label">Employment type
            <select value={this.state.employment_type} onChange={this.update("employment_type")} className="signup-dropdown">
              <option>Select one</option>
              {this.createOptions(positions)}
            </select>
          </label>
        </div>
        
        <div className="signup-form-spacing">
          <label className="signup-label">Most recent company <span className="blue-star">*</span>
            <input 
              type="text" 
              value={this.state.company} 
              onChange={this.update("company")} 
              className="signup-input"
            />
          </label>
          {this.companyErrors()}
        </div>
      </div>
    )
  }

  industryForms() {
    return (
      <div className="signup-form-spacing">
        <label className="signup-label">Industry <span className="blue-star">*</span>
          <input type="text" value={this.state.industry} onChange={this.update("industry")} className="signup-input" />
        </label>
        {this.industryErrors()}
      </div>
    )
  }

  companyErrors() {
    let companyErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Company")) {
          companyErrors.push(error);
        }
      })
      return (
        <span className="error">
          {companyErrors}
        </span>
      );
    }
  }

  industryErrors() {
    let industryErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Industry")) {
          industryErrors.push(error);
        }
      })
      return (
        <span className="error">
          {industryErrors}
        </span>
      );
    }
  }

  pageFour() {
    if (!this.state.student) {
      return (
        <div className="signup-form-container-four">
          <header>
            <h1 className="signup-greeting-two">Your profile helps you discover new people and opportunities</h1>
          </header>
          <div className="signup-spacing"></div>
  
          <div className="signup-form-box-four">

            <div className="signup-form-spacing">
              <label className="signup-label">Most recent job title? <span className="blue-star">*</span>
                <input type="text"
                  value={this.state.headline}
                  onChange={this.update('headline')}
                  className="signup-input"
                />
              </label>
              {this.checkErrors === 2 ? "" : this.renderHeadlineError()}
            </div>

            {this.state.headline.length > 0 ? this.typeCompanyForms() : null}
            {this.state.company.length > 0 && this.state.headline.length > 0 ? this.industryForms() : null}

            <button className="student-switch" onClick={this.yesStudent}>I’m a student</button>
            {this.state.headline.length > 0 && this.state.industry.length > 0 ? this.canContinue() : this.cantContinue()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="signup-form-container-four">
          <header>
            <h1 className="signup-greeting-two">Your profile helps you discover new people and opportunities</h1>
          </header>


          <button className="student-switch" onClick={this.notStudent}>I’m not a student</button>
        </div>
      )
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleEduSubmit(e) {
    e.preventDefault();
    const education = Object.assign({}, this.state);
    this.props.createEducation(education);
  }

  renderEmailError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Email")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <span className="error">
        {pageOneErrors}
      </span>
    );
  }

  renderPasswordError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Password")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <span className="error">
        {pageOneErrors}
      </span>
    );
  }

  renderFirstNameError() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("First")) {
          pageTwoErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageTwoErrors}
        </span>
      );
    }
  }

  renderLastNameError() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Last")) {
          pageTwoErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageTwoErrors}
        </span>
      );
    }
  }

  renderCountryRegionError() {
    let pageThreeErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Country")) {
          pageThreeErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageThreeErrors}
        </span>
      );
    }
  }

  renderCityDistrictError() {
    let pageThreeErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("City")) {
          pageThreeErrors.push(error);
        }
      })
      return(
        <span className="error">
          {pageThreeErrors}
        </span>
      );
    }
  }

  renderHeadlineError() {
    let pageFourErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Headline")) {
          pageFourErrors.push(error);
        }
      })
      return (
        <span className="error">
          {pageFourErrors}
        </span>
      );
    }
  }

  pageCheck() {
    if (this.props.errors.length === 7 || this.props.errors.length === 6 || this.props.errors.length === 0) {
      this.setState({ visiblePage: 1});
    } else if (this.props.errors.length === 5 || this.props.errors.length === 4) {
      this.setState({ visiblePage: 2 });
    } else if (this.props.errors.length === 3 || this.props.errors.length === 2) {
      this.setState({ visiblePage: 3 });
    } else if (this.props.errors.length === 1) {
      this.setState({ visiblePage: 4 });
    }
  }

  visibleCheck() {
    if (this.state.visiblePage === 1) {
      return this.pageOne();
    } else if (this.state.visiblePage === 2) {
      return this.pageTwo();
    } else if (this.state.visiblePage === 3) {
      return this.pageThree();
    } else {
      return this.pageFour();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors.length !== this.props.errors.length) {
      this.pageCheck();
    }
  }

  headerOne() {
    return (
      <header className="signup-header">
        <img className="header-logo" src={namelogoURL} alt="name logo" />
        <p className="signup-quote">Make the most of your professional life</p>
      </header>
    )
  }

  headerTwo() {
    return (
      <header className="signup-header-two">
        <img src={namelogoURL} className="signup-logo" alt="name logo" />
      </header>
    )
  }

  userForm() {
    return (
      <form onSubmit={this.handleSubmit} className={this.state.visiblePage === 2 ? "signup-form-box signup-form-box-two" : "signup-form-box"}>

        <div>
          {this.visibleCheck()}
        </div>
        
      </form>
    )
  }

  educationForm() {
    return (
      <form onSubmit={this.handleEduSubmit} className="signup-form-box signup-form-box-two">

        

      </form>
    )
  }

  render() {
    this.props.errors.forEach(error => {
      if (error.includes("You shall not pass")) {
        this.refreshPage();
      }
    })
    return (
      <div className={this.state.visiblePage === 3 || this.state.visiblePage === 4 ? "signup-form-clear" : "signup-form"}>

        {this.state.visiblePage === 1 || this.state.visiblePage === 2 ? this.headerOne() : this.headerTwo() }

        {!this.state.currentUser ? this.userForm() : null}
      </div>
    );
  }
}

export default SignupForm;
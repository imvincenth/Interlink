import React from 'react';
import { Link } from 'react-router-dom';

const positions = "Full-time,Part-time,Self-employed,Freelance,Contract,Internship,Apprenticeship,Seasonal";
const years = "2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

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

      // Password
      hidden: true,

      // Student Check
      student: false,

      currentUser: this.props.currentUser,
      user_id: null,

      // Experience
      title: "",
      employment_type: "",
      company: "",
      current_role: true,
      industry: "",
      
      // Education
      school: "",
      degree: "",
      subject: "",
      
      start_date: "invalid",
      end_date: "invalid",

      dateError: false,
      startYr: "",
      endYr: "",

      demoLogged: false
    };

    this.toggleShow = this.toggleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);

    this.pageCheck = this.pageCheck.bind(this);
    this.visibleCheck = this.visibleCheck.bind(this);

    this.checkErrorPlus = this.checkErrorPlus.bind(this);
    this.checkErrorPlusTwo = this.checkErrorPlusTwo.bind(this);
    this.checkErrors = 0;

    this.createUserHeadline = this.createUserHeadline.bind(this);
    this.createUserHeadlineTwo = this.createUserHeadlineTwo.bind(this);

    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setTimes = this.setTimes.bind(this);

    this.yesStudent = this.yesStudent.bind(this);
    this.notStudent = this.notStudent.bind(this);
    this.studentReqCheck = this.studentReqCheck.bind(this);
    this.dateCheck = this.dateCheck.bind(this);
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

    this.setState({ email: '', password: '', demoLogged: true });
    const email = "gandalf@the.grey".split("");
    let emailInput = "";
    email.forEach((input, i) => {
      setTimeout(() => {
        emailInput += input;
        this.setState({ email: emailInput });
      }, 100 * i);
    });

    const password = 'password'.split('');
    let passwordInput = "";
    password.forEach((input, i) => {
      setTimeout(() => {
        passwordInput += input;
        this.setState({ password: passwordInput });
      }, 100 * i);
    });

    setTimeout(() => this.props.demoLogin(), 1600);
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  pageOne() {
    return (
      <div className="signup-form-container">
        <label className="signup-label">Email
          <input type="email"
            value={this.state.email}
            onChange={this.update('email')}
            className={this.emailErrorFieldCheck() ? "signup-input invalid-field" : "signup-input"}
            />
        </label>
        {this.renderEmailError()}

        <br />
        <div className="password-box">
          <label className="signup-label">Password (6 of more characters)
            <input type={this.state.hidden ? "password" : "text"}
              value={this.state.password}
              onChange={this.update('password')}
              className={this.passwordErrorFieldCheck() ? "signup-input invalid-field" : "signup-input"}
              />
            <button type="button" className="btn" onClick={this.toggleShow}>{this.state.hidden ? "Show" : "Hide"}</button>
          </label>
          {this.renderPasswordError()}
        </div>

        <p className="agreement">By clicking Agree & Join, you take one more step. One more step and it'll be the furthest you've ever been from home.</p>

        <input className={!this.state.demoLogged ? "signup-submit" : "signup-cant-submit"} 
          type="submit" 
          value={!this.state.demoLogged ? "Agree & Join" : "Signing in..."} 
          onClick={this.pageCheck} 
          disabled={!this.state.demoLogged ? false : true} 
          />

        {/*  OR Spacing */}
        <div className="third-party-spacing-box">
          <div className="third-party-spacing-line"></div>
          <span>
            <span className="third-party-spacing-word">or</span>
          </span>
          <div className="third-party-spacing-line"></div>
        </div>

        <div className="demo-signup-box">
          {this.state.demoLogged ? <img className="robot-signup-icon" src={happyRobotSignupURL} alt="happy robot" /> : <img className="robot-signup-icon" src={neutralRobotSignupURL} alt="neutral robot" />}
          <input className={!this.state.demoLogged ? "demo-signup-submit" : "demo-signup-cant-submit"} 
            type="submit" 
            value={"     Demo Login"} 
            onClick={this.demoLogin} 
            disabled={!this.state.demoLogged ? false : true} 
            />
        </div>
        
        <br />
        <p className="session-redirect">Already on RingIn? <Link className="session-redirect-link" to="/login">Sign In</Link></p>
      </div>
    )
  }

  pageTwo() {
    return (
      <div className="signup-form-container">
        <label className="signup-label">First name
          <input type="text"
            value={this.state.first_name}
            onChange={this.update('first_name')}
            className={this.checkErrors !== 0 && this.firstNameFieldCheck() ? "signup-input invalid-field" : "signup-input"}
          />
        </label>
  
        <br />
        {this.checkErrors === 0 ? "" : this.renderFirstNameError()}
        <br />
  
        <label className="signup-label">Last name
          <input type="text"
            value={this.state.last_name}
            onChange={this.update('last_name')}
            className={this.checkErrors !== 0 && this.lastNameFieldCheck() ? "signup-input invalid-field" : "signup-input"}
          />
        </label>

        <br />
        {this.checkErrors === 0 ? "" : this.renderLastNameError()}
        <br />

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
          <h1 className="signup-greeting">Where are you located?</h1>
          <p className="signup-message">We'll recommend posts and people near you to help you excel.</p>
        </header>

        <div className="signup-form-box-three">
          <label className="signup-label">Country/Region <span className="blue-star">*</span>
            <input type="text"
              value={this.state.country_region}
              onChange={this.update('country_region')}
              className={this.checkErrors !== 1 && this.countryRegionFieldCheck() ? "signup-input invalid-field" : "signup-input"}
            />
          </label>
    
          <br />
          {this.checkErrors === 1 ? "" : this.renderCountryRegionError()}
          <br />
    
          <label className="signup-label">City/District <span className="blue-star">*</span>
            <input type="text"
              value={this.state.city_district}
              onChange={this.update('city_district')}
              className={this.checkErrors !== 1 && this.cityDistrictFieldCheck() ? "signup-input invalid-field" : "signup-input"}
            />
          </label>

          <br />
          {this.checkErrors === 1 ? "" : this.renderCityDistrictError()}
          <br />

          <br />
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

  canContinueEducation() {
    return (
      <input className="signup-submit" type="submit" value={"Continue"} onClick={this.createUserHeadlineTwo} onSubmit={this.handleSubmit} />
    )
  }

  canContinueExperience() {
    return (
      <input className="signup-submit" type="submit" value={"Continue"} onClick={this.createUserHeadline} onSubmit={this.handleSubmit} />
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
  
  setStartTime() {
    this.setState({ 
      start_date: `${this.state.startYr}`
    });
  }

  setEndTime() {
    if (!this.state.student) {
      this.setState({
        end_date: "Present"
      });
    } else {
      this.setState({
        end_date: `${this.state.endYr}`
      });
    }
  }
  
  setTimes() {
    if (this.state.start_date === "-" || this.state.end_date === "-") throw "Start and end dates are required";
    this.setStartTime();
    this.setEndTime();
  }

  createUserHeadline() {
    this.setState({ headline: this.state.title + " at " + this.state.company });
  }

  createUserHeadlineTwo() {
    // this.setTimes();
    this.setState({ headline: "Student at " + this.state.school });
  }

  studentReqCheck() {
    if (this.state.student) {
      if (this.state.school.length > 0 && this.state.degree.length > 0 && this.state.subject.length > 0) {
        if (this.state.startYr !== "-" && this.state.endYr !== "-" && this.state.startYr !== "" && this.state.endYr !== "" ) {
          if (Number(this.state.endYr) >= Number(this.state.startYr)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  dateCheck() {
    if (this.state.startYr !== "invalid" && this.state.endYr !== "invalid" && this.state.startYr !== "" && this.state.endYr !== "" ) {
      if (Number(this.state.endYr) >= Number(this.state.startYr)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
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
                    value={this.state.title}
                    onChange={this.update('title')}
                    className="signup-input"
                  />
                </label>
                {this.checkErrors === 2 ? "" : this.titleErrors()}
              </div>

              {this.state.title.length > 0 ? this.typeCompanyForms() : null}
              {this.state.company.length > 0 && this.state.title.length > 0 ? this.industryForms() : null}

              <button className="student-switch" onClick={this.yesStudent}>I’m a student</button>
              {this.state.title.length > 0 && this.state.industry.length > 0 ? this.canContinueExperience() : this.cantContinue()}
            </div>
  
        </div>
      )
    } else {
      return (
        <div className="signup-form-container-four">
          <header>
            <h1 className="signup-greeting-two">Your profile helps you discover new people and opportunities</h1>
          </header>

          <div className="signup-spacing"></div>

          <div className="signup-form-box-four">

            <div className="signup-student-section">
              <label className="signup-label">School or College/University <span className="blue-star">*</span>
                <input 
                  type="text" 
                  value={this.state.school} 
                  onChange={this.update("school")} 
                  className="signup-input"
                />
              </label>
              {this.schoolErrors()}
            </div>

            <div className="signup-student-section">
              <label className="signup-label">Degree <span className="blue-star">*</span>
                <input 
                  value={this.state.degree} 
                  onChange={this.update("degree")} 
                  className="signup-input"
                />
              </label>
            </div>

            <div className="signup-student-section">
              <label className="signup-label">Specialization <span className="blue-star">*</span>
                <input 
                  type="text" 
                  value={this.state.subject} 
                  onChange={this.update("subject")} 
                  className="signup-input"
                />
              </label>
            </div>

            <div className="signup-student-dates">

              <div className="signup-date-dropdown">
                <label className="signup-label">Start date <span className="blue-star">*</span>
                  <div>
                    <select onChange={this.update("startYr")} className={this.dateCheck() ? "signup-dropdown-invalid" : "signup-dropdown"}>
                      <option onClick={this.dateCheck} value="invalid"> - </option>
                      {this.createOptions(years)}
                    </select>
                  </div>
                </label>
              </div>

              <div>
                <label className="signup-label">End date (or expected) <span className="blue-star">*</span>
                  <div className="signup-date-dropdown">
                    <select onChange={this.update("endYr")} className={this.dateCheck() ? "signup-dropdown-invalid" : "signup-dropdown"}>
                      <option onClick={this.dateCheck} value="invalid"> - </option>
                      {this.createOptions(years)}
                    </select>
                  </div>
                </label>
              </div>

            </div>

            {this.dateCheck() ? <p className="error">Your end date can't be earlier than your start date.</p> : null }

            <button className="student-switch" onClick={this.notStudent}>I’m not a student</button>
            {this.studentReqCheck() ? this.canContinueEducation() : this.cantContinue()}
          </div>

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

  // User Errors
  renderEmailError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Email")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <p className="error">
        {pageOneErrors}
      </p>
    );
  }

  emailErrorFieldCheck() {
    let errors = false;
    this.props.errors.forEach(error => {
      if (error.includes("Email")) {
        errors = true;
      }
    })
    return errors;
  }

  renderPasswordError() {
    let pageOneErrors = [];
    this.props.errors.forEach(error => {
      if (error.includes("Password")) {
        pageOneErrors.push(error);
      }
    })
    return(
      <p className="error">
        {pageOneErrors}
      </p>
    );
  }

  passwordErrorFieldCheck() {
    let errors = false;
    this.props.errors.forEach(error => {
      if (error.includes("Password")) {
        errors = true;
      }
    })
    return errors;
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
        <p className="error">
          {pageTwoErrors}
        </p>
      );
    }
  }

  firstNameFieldCheck() {
    let errors = false;
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("First")) {
          errors = true;
        }
      })
    }
    return errors;
  }

  renderLastNameError() {
    let pageTwoErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Last")) {
          pageTwoErrors.push(error);
        }
      })
      return (
        <p className="error">
          {pageTwoErrors}
        </p>
      );
    }
  }

  lastNameFieldCheck() {
    let errors = false;
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Last")) {
          errors = true;
        }
      })
    }
    return errors;
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

  countryRegionFieldCheck() {
    let errors = false;
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Country")) {
          errors = true;
        }
      })
    }
    return errors;
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
        <p className="error">
          {pageThreeErrors}
        </p>
      );
    }
  }

  cityDistrictFieldCheck() {
    let errors = false;
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("City")) {
          errors = true;
        }
      })
    }
    return errors;
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
        <p className="error">
          {pageFourErrors}
        </p>
      );
    }
  }

  headlineFieldCheck() {
    let errors = false;
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Headline")) {
          errors = true;
        }
      })
    }
    return errors;
  }

  titleErrors() {
    let titleErrors = [];
    if (this.props.expErrors.length !== 0) {
      this.props.expErrors.forEach(error => {
        if (error.includes("Title")) {
          titleErrors.push(error);
        }
      })
      return (
        <p className="error">
          {titleErrors}
        </p>
      );
    }
  }

  // Experience and Education Errors
  companyErrors() {
    if (!this.props.expErrors) return null;
    let companyErrors = [];
    if (this.props.expErrors.length !== 0) {
      this.props.expErrors.forEach(error => {
        if (error.includes("Company")) {
          companyErrors.push(error);
        }
      })
      return (
        <p className="error">
          {companyErrors}
        </p>
      );
    }
  }

  industryErrors() {
    if (!this.props.expErrors) return null;
    let industryErrors = [];
    if (this.props.expErrors.length !== 0) {
      this.props.expErrors.forEach(error => {
        if (error.includes("Industry")) {
          industryErrors.push(error);
        }
      })
      return (
        <p className="error">
          {industryErrors}
        </p>
      );
    }
  }

  schoolErrors() {
    if (!this.props.eduErrors) return null;
    let schoolErrors = [];
    if (this.props.eduErrors.length !== 0) {
      this.props.eduErrors.forEach(error => {
        if (error.includes("School")) {
          schoolErrors.push(error);
        }
      })
      return (
        <p className="error">
          {schoolErrors}
        </p>
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

  render() {
    this.props.errors.forEach(error => {
      if (error.includes("You shall not pass")) {
        this.refreshPage();
      }
    });
    return (
      <div className={this.state.visiblePage === 3 || this.state.visiblePage === 4 ? "signup-form-clear" : "signup-form"}>

        {this.state.visiblePage === 1 || this.state.visiblePage === 2 ? this.headerOne() : this.headerTwo() }

        {!this.state.currentUser ? this.userForm() : null}
      </div>
    );
  }
}

export default SignupForm;
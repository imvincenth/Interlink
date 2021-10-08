import React from 'react';

const positions = "Full-time,Part-time,Self-employed,Freelance,Contract,Internship,Apprenticeship,Seasonal";
const months = "January,February,March,April,May,June,July,August,September,October,November,December";
const years = "2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

class CreateExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      title: "",
      employment_type: "",
      company: "",
      location: "",
      start_date: "",
      current_role: true,
      end_date: "",
      headline: this.props.currentUser.headline, 
      industry: this.props.experience.industry,
      description: "",

      startMon: "",
      startYr: "",
      endMon: "",
      endYr: ""
    };

    this.createOptions = this.createOptions.bind(this);
    this.flipRole = this.flipRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setTimes = this.setTimes.bind(this);
  }

  createOptions(str) {
    let options = str.split(",");
    return options.map((option, i) => <option key={i} value={option}>{option}</option>)
  }

  flipRole() {
    this.setState({ current_role: !this.state.current_role });
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.action({...this.state})
      .then(() => this.props.closeModal());
  }

  setStartTime() {
    this.setState({ 
      start_date: `${this.state.startMon} ${this.state.startYr}`
    });
  }

  setEndTime() {
    if (this.state.current_role) {
      this.setState({
        end_date: "Present"
      });
    } else {
      this.setState({
        end_date: `${this.state.endMon} ${this.state.endYr}`
      });
    }
  }

  endDate() {
    if (this.state.current_role) {
      return null;
    } else {
      return (
        <div>
          <select onChange={this.update("endMon")}>
            <option>Month</option>
            {this.createOptions(months)}
          </select>
          <select onChange={this.update("endYr")}>
            <option>Year</option>
            {this.createOptions(years)}
          </select>
        </div>
      )
    }
  }

  headline() {
    if (!this.state.current_role) {
      return null;
    } else {
      return (
        <div>
          <label>Headline
            <input type="text" value={this.state.headline} onChange={this.update("headline")} />
          </label>
        </div>
      )
    }
  }

  industry() {
    if (!this.state.current_role) {
      return null;
    } else {
      return (
        <div>
          <label>Industry*
            <input type="text" value={this.state.industry} onChange={this.update("industry")} />
          </label>
          {this.industryErrors()}
        </div>
      )
    }
  }

  handleErrors() {

  }

  setTimes() {
    if (this.state.start_date === "Month" || this.state.end_date === "Year") throw "Start and end dates are required";
    this.setStartTime();
    this.setEndTime();
  }

  titleErrors() {
    let titleErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Title")) {
          titleErrors.push(error);
        }
      })
      return (
        <span className="error">
          {titleErrors}
        </span>
      );
    }
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

  startDateErrors() {
    let startDateErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("Start")) {
          startDateErrors.push(error);
        }
      })
      return (
        <span className="error">
          {startDateErrors}
        </span>
      );
    }
  }

  endDateErrors() {
    let endDateErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("End")) {
          endDateErrors.push(error);
        }
      })
      return (
        <span className="error">
          {endDateErrors}
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

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <header>
            <h2>{this.props.formType}</h2>
          </header>

          <div>
            <label>Title*
              <input 
                type="text" 
                placeholder="Ex: Dwarven Blacksmith"
                value={this.state.title} 
                onChange={this.update("title")}
              />
            </label>
            {this.titleErrors()}
          </div>

          <div>
            <label>Employment
              <select value={this.state.employment_type} onChange={this.update("employment_type")}>
                <option>Please select</option>
                {this.createOptions(positions)}
              </select>
            </label>
          </div>

          <div>
            <label>Company name*
              <input 
                placeholder="Ex: Fellowship of the Ring"
                type="text" 
                value={this.state.company} 
                onChange={this.update("company")} 
              />
            </label>
            {this.companyErrors()}
          </div>

          <div>
            <label>Location
              <input 
                placeholder="Ex: Rivendell"
                type="text" 
                value={this.state.location} 
                onChange={this.update("location")} 
              />
            </label>
          </div>

          <div>
            <input type="checkbox" checked={this.state.current_role ? true : false} onChange={this.flipRole} />
            <label>I am currently working in this role</label>
          </div>

          <div>
            <label>Start date*
              <div>
                <select onChange={this.update("startMon")}>
                  <option>Month</option>
                  {this.createOptions(months)}
                </select>
                <select onChange={this.update("startYr")}>
                  <option>Year</option>
                  {this.createOptions(years)}
                </select>
              </div>
            </label>
            {this.startDateErrors()}
          </div>

          <div>
            <label>End date*
              {this.endDate()}
            </label>
            {this.endDateErrors()}
          </div>

          <div>
            {this.headline()}
          </div>

          <div>
            {this.industry()}
          </div>

          <div>
            <label>Description</label>
            <textarea value={this.state.description} onChange={this.update("description")}></textarea>
          </div>

          <input type="submit" onClick={this.setTimes} onSubmit={this.handleSubmit} value="Save" />
        </form>
      </div>
    )
  }
}

export default CreateExperienceForm;
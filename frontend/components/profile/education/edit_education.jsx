import React from 'react';

const months = "January,February,March,April,May,June,July,August,September,October,November,December";
const years = "2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

class EditEducationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.education,

      startMon: "",
      startYr: "",
      endMon: "",
      endYr: ""
    };

    this.oldStartMon = this.props.education.start_date.split(" ")[0];
    this.oldStartYr = this.props.education.start_date.split(" ")[1];
    this.oldEndMon = this.props.education.end_date.split(" ")[0];
    this.oldEndYr = this.props.education.end_date.split(" ")[1];

    this.createOptions = this.createOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setTimes = this.setTimes.bind(this);
  }

  createOptions(str) {
    let options = str.split(",");
    return options.map((option, i) => <option key={i} value={option}>{option}</option>)
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
    if (!this.state.startMon && !this.state.startYr) {
      return null;
    } else {
      this.setState({ start_date: `${this.state.startMon} ${this.state.startYr}` });
    }
  }

  setEndTime() {
    if (!this.state.endMon && !this.state.endYr) {
      return null;
    } else {
      this.setState({ end_date: `${this.state.endMon} ${this.state.endYr}` });
    }
  }

  setTimes() {
    this.setStartTime();
    this.setEndTime();
  }

  schoolErrors() {
    let schoolErrors = [];
    if (this.props.errors.length !== 0) {
      this.props.errors.forEach(error => {
        if (error.includes("School")) {
          schoolErrors.push(error);
        }
      })
      return (
        <span className="error">
          {schoolErrors}
        </span>
      );
    }
  }

  noChangeCheck() {
    if (!this.state.startMon) this.setState({ startMon: this.oldStartMon });
    if (!this.state.startYr) this.setState({ startYr: this.oldStartYr });
    if (!this.state.endMon) this.setState({ endMon: this.oldEndMon });
    if (!this.state.endYr) this.setState({ endYr: this.oldEndYr });
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  componentDidMount() {
    this.noChangeCheck()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <header>
            <h2>{this.props.formType}</h2>
          </header>

          <div>
            <label>School*
              <input 
                type="text" 
                placeholder="Ex: Hogwarts School of Witchcraft and Wizardry"
                value={this.state.school} 
                onChange={this.update("school")}
              />
            </label>
            {this.schoolErrors()}
          </div>

          <div>
            <label>Degree
              <input 
                value={this.state.degree} 
                onChange={this.update("degree")} 
              />
            </label>
          </div>

          <div>
            <label>Field of study
              <input 
                placeholder="Ex: Fellowship of the Ring"
                type="text" 
                value={this.state.subject} 
                onChange={this.update("subject")} 
              />
            </label>
          </div>

          <div>
            <label>Start date
              <div>
                <select onChange={this.update("startMon")} defaultValue={this.oldStartMon}>
                  <option>Month</option>
                  {this.createOptions(months)}
                </select>
                <select onChange={this.update("startYr")} defaultValue={this.oldStartYr}>
                  <option>Year</option>
                  {this.createOptions(years)}
                </select>
              </div>
            </label>
          </div>

          <div>
            <label>End date (or expected)
              <div>
                <select onChange={this.update("endMon")} defaultValue={this.oldEndMon}>
                  <option>Month</option>
                  {this.createOptions(months)}
                </select>
                <select onChange={this.update("endYr")} defaultValue={this.oldEndYr}>
                  <option>Year</option>
                  {this.createOptions(years)}
                </select>
              </div>
            </label>
          </div>

          <div>
            <label>Grade
              <input type="text" value={this.state.grade} onChange={this.update("grade")} />
            </label>
          </div>

          <div>
            <label>Activities and societies</label>
            <textarea value={this.state.extracurriculars} onChange={this.update("extracurriculars")} placeholder="Ex: "></textarea>
          </div>

          <input type="submit" onClick={this.setTimes} onSubmit={this.handleSubmit} value="Save" />
        </form>
      </div>
    )
  }
}

export default EditEducationForm;
import React from 'react';

const months = "January,February,March,April,May,June,July,August,September,October,November,December";
const years = "2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

class CreateEducationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
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

    this.createOptions = this.createOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    if (this.state.start_date === "Month" || this.state.end_date === "Year") throw "Start and end dates are required";

    let tempStart = `${this.state.startMon} ${this.state.startYr}`;
    let tempEnd = this.state.current_role ? "Present" : `${this.state.endMon} ${this.state.endYr}`;

    this.props.action({...this.state, start_date: tempStart, end_date: tempEnd})
      .then(() => this.props.closeModal());
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

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    return (
      <form>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header' style={{display: "flex", alignItems: "center"}}>
          <h2 className='post-modal-header-text'>Add education</h2>
        </div>

        {/* Add Education Content */}
        {/* <p className='profile-edit-indicates-required'>* Indicates required</p> */}
        <div className='profile-edit-modal-name-section'>

          {/* School */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
            <label className='profile-edit-modal-label' htmlFor="education-add-modal-input">School<sup>*</sup></label>
            <input 
              className='profile-edit-modal-input' 
              type="text" 
              id='education-add-modal-input' 
              value={this.state.school} 
              onChange={this.update("school")} 
              placeholder="Ex: Hogwarts School of Witchcraft and Wizardry" 
            />
            {this.schoolErrors()}
          </div>

          {/* Degree */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
            <label className='profile-edit-modal-label' htmlFor="education-degree">Degree</label>
            <input 
              className='profile-edit-modal-input' 
              type="text" 
              id='education-degree' 
              value={this.state.degree} 
              onChange={this.update("degree")} 
            />
          </div>

          {/* Field of Study */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
            <label className='profile-edit-modal-label' htmlFor="education-field-of-study">Field of study</label>
            <input 
              className='profile-edit-modal-input' 
              type="text" 
              id='education-field-of-study' 
              value={this.state.subject} 
              onChange={this.update("subject")} 
              placeholder="Ex: Fellowship of the Ring" 
            />
          </div>

          {/* Start date */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>

            <label className='profile-edit-modal-label'>Start date<sup>*</sup></label>

            <div style={{display: "flex"}}>
              <select className='profile-select-menu' onChange={this.update("startMon")} defaultValue={this.oldStartMon} style={{marginRight: "8px"}}>
                <option>Month</option>
                {this.createOptions(months)}
              </select>

              <select className='profile-select-menu' onChange={this.update("startYr")} defaultValue={this.oldStartYr}>
                <option>Year</option>
                {this.createOptions(years)}
              </select>
            </div>

          </div>

          {/* End date */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>

            <label className='profile-edit-modal-label'>End date<sup>*</sup></label>

            <div style={{display: "flex"}}>
              <select className='profile-select-menu' onChange={this.update("endMon")} defaultValue={this.oldEndMon} style={{marginRight: "8px"}}>
                <option>Month</option>
                {this.createOptions(months)}
              </select>

              <select className='profile-select-menu' onChange={this.update("endYr")} defaultValue={this.oldEndYr}>
                <option>Year</option>
                {this.createOptions(years)}
              </select>
            </div>

          </div>

          {/* Grade */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
            <label className='profile-edit-modal-label' htmlFor="education-grade">Grade</label>
            <input 
              className='profile-edit-modal-input' 
              type="text" 
              id='education-grade' 
              value={this.state.grade} 
              onChange={this.update("grade")} 
            />
          </div>

          {/* Activities and societies */}
          <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
            <label className='profile-edit-modal-label' htmlFor="education-activities-societies">Activities and societies</label>
            <textarea 
              className='profile-edit-textarea' 
              type="text" 
              id='education-activities-societies' 
              value={this.state.extracurriculars} 
              onChange={this.update("extracurriculars")} 
            />
          </div>
        </div>

        <footer 
          style={{display: "flex", 
          flexDirection: "row-reverse", 
          justifyContent: "space-between", 
          padding: "16px 24px", 
          borderTop: "1px solid rgba(0, 0, 0, 0.08)"}}
        >
          <button className='profile-edit-modal-save' onClick={this.handleSubmit}>Save</button>
        </footer>

      </form>
    )
  }
}

export default CreateEducationForm;
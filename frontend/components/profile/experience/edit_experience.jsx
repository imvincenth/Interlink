import React from 'react';

const positions = "Full-time,Part-time,Self-employed,Freelance,Contract,Internship,Apprenticeship,Seasonal";
const months = "January,February,March,April,May,June,July,August,September,October,November,December";
const years = "2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

class EditExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.experience,

      startMon: "",
      startYr: "",
      endMon: "",
      endYr: ""
    };

    if (this.props.experience.start_date) {
      this.oldStartMon = this.props.experience.start_date.split(" ")[0];
      this.oldStartYr = this.props.experience.start_date.split(" ")[1];
      this.oldEndMon = this.props.experience.end_date.split(" ")[0];
      this.oldEndYr = this.props.experience.end_date.split(" ")[1];
    }

    this.noChangeCheck = this.noChangeCheck.bind(this);

    this.createOptions = this.createOptions.bind(this);
    this.flipRole = this.flipRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    if (this.state.start_date === "Month" || this.state.end_date === "Year") throw "Start and end dates are required";
    this.noChangeCheck();

    let tempStart = `${this.state.startMon} ${this.state.startYr}`;
    let tempEnd = this.state.current_role ? "Present" : `${this.state.endMon} ${this.state.endYr}`;

    this.props.action({...this.state, start_date: tempStart, end_date: tempEnd})
      .then(() => this.props.closeModal());
  }

  endDate() {
    if (this.state.current_role) {
      return null;
    } else {
      return (
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

          {this.endDateErrors()}
        </div>
      )
    }
  }

  headline() {
    if (!this.state.current_role) {
      return null;
    } else {
      return (
        <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
          <label className='profile-edit-modal-label' htmlFor="profile-edit-headline">Headline<sup>*</sup></label>
          <input 
            className='profile-edit-modal-input' 
            type="text" 
            id='profile-edit-headline' 
            value={this.state.headline} 
            onChange={this.update("headline")} 
          />
        </div>
      )
    }
  }

  industry() {
    if (!this.state.current_role) {
      return null;
    } else {
      return (
        <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
          <label className='profile-edit-modal-label' htmlFor="profile-edit-industry">Industry<sup>*</sup></label>
          <input 
            className='profile-edit-modal-input' 
            type="text" 
            id='profile-edit-industry' 
            value={this.state.industry} 
            onChange={this.update("industry")} 
          />
        </div>
      )
    }
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
    this.noChangeCheck();
  }
  
  render() {
    return (
      <form>

        {/* Header */}
        <button className="post-modal-x-box" onClick={this.props.closeModal}><img className="post-modal-x" src={window.xURL} /></button>
        <div className='post-modal-header' style={{display: "flex", alignItems: "center"}}>
          <h2 className='post-modal-header-text'>Edit experience</h2>
        </div>

        {/* Edit Experience Content */}
        {/* <div className='profile-edit-modal-wrap'> */}
          {/* <p className='profile-edit-indicates-required'>* Indicates required</p> */}
          <div className='profile-edit-modal-name-section'>

            {/* Title */}
            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="experience-edit-title">Title<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='experience-edit-title' 
                value={this.state.title} 
                onChange={this.update("title")} 
                placeholder="Ex: Dwarven Blacksmith" 
              />
              {this.titleErrors()}
            </div>

            {/* Employment */}
            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label'>Employment type</label>
              <select className='profile-select-menu' value={this.state.employment_type} onChange={this.update("employment_type")}>
                <option>Please select</option>
                {this.createOptions(positions)}
              </select>
            </div>

            {/* Company */}
            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-company-name">Company name<sup>*</sup></label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-company-name' 
                value={this.state.company} 
                onChange={this.update("company")} 
                placeholder="Ex: Fellowship of the Ring" 
              />
              {this.companyErrors()}
            </div>

            {/* Location */}
            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-location">Location</label>
              <input 
                className='profile-edit-modal-input' 
                type="text" 
                id='profile-edit-location' 
                value={this.state.location} 
                onChange={this.update("location")} 
                placeholder="Ex: Rivendell" 
              />
            </div>

            {/* Current Role Check */}
            <div style={{display: "flex", alignItems: "center", paddingBottom: "24px"}}>
              <input type="checkbox" checked={this.state.current_role ? true : false} onChange={this.flipRole} />
              <label className='profile-current-role-check'>I am currently working in this role</label>
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

              {this.startDateErrors()}
            </div>

            {/* Toggled Fields */}
            {this.endDate()}
            {this.headline()}
            {this.industry()}

            <div style={{display: "flex", flexDirection: "column", paddingBottom: "32px"}}>
              <label className='profile-edit-modal-label' htmlFor="profile-edit-description">Description</label>
              <textarea 
                className='profile-edit-textarea' 
                type="text" 
                id='profile-edit-description' 
                value={this.state.description} 
                onChange={this.update("description")} 
              />
            </div>

          {/* </div> */}
        </div>

        <footer 
          style={{display: "flex", 
          flexDirection: "row-reverse", 
          justifyContent: "space-between", 
          padding: "16px 24px", 
          borderTop: "1px solid rgba(0, 0, 0, 0.08)"}}
        >
          <button className='profile-edit-modal-save' onClick={this.handleSubmit}>Save</button>
          <button className='profile-stat-deletion' onClick={() => this.props.deleteExperience(this.props.experience.id).then(() => this.props.closeModal())}>Delete experience</button>
        </footer>
        
      </form>
    )
  }
}

export default EditExperienceForm;
import React from 'react';

class PatientDashboard extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#F9F9F9" }}>
        <div className="row">
          <section className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-sm-1" style={{ paddingRight: "0" }}>
                <h3 style={{ marginBottom: "0", marginTop: "0" }}> <u> Jane </u> </h3>
                <p className="help-block" style={{ fontSize: "10px", marginTop: "0" }}> <em> Given </em> </p>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-1" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <h3 style={{ marginBottom: "0", marginTop: "0" }}> <u> Doe </u> </h3>
                <p className="help-block" style={{ fontSize: "10px", marginTop: "0" }}> <em> Family Name </em> </p>
              </div>
              <div
                className="col-lg-1 col-md-1 col-sm-1"
                style={{
                  marginTop: "10px", paddingLeft: "0", paddingRight: "0", fontSize: "14px",
                }}>
                <p> Female </p>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2"
                style={{
                  marginTop: "10px", paddingLeft: "0", paddingRight: "0", fontSize: "14px",
                }}>
                <p> 25 year(s) (16.Mar.1992) </p>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2"
                style={{
                  marginTop: "14px", paddingLeft: "0", paddingRight: "0", fontSize: "12px",
                }}>
                <a style={{ paddingRight: "4px" }}> Edit </a>
                <a> Show Contact Info </a>
              </div>
              <div
                className="col-lg-2 col-md-2 col-sm-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 text-right"
                style={{ marginTop: "12px", padding: "0", fontSize: "13px" }}>
                <p> <u> <em> Patient ID </em> </u> <span className="badge">0957402</span> </p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-1 col-md-1 col-sm-1">
                <a href="#">
                  <i className="fas fa-sticky-note" />
                </a>
              </div>
            </div>
          </section>
        </div>
        <br />
      </div>
    );
  }
}

export default PatientDashboard;

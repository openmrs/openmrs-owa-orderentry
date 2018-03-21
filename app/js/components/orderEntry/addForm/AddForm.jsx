import React from 'react';
import FreeText from './FreeText';
import StandardDose from './StandardDose';

class AddForm extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-11 col-sm-11 col-md-11 col-md-offset-1 col-sm-offset-1 col-lg-offset-1">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link"
                id="standard-tab"
                data-toggle="pill"
                href="#standard"
                role="tab"
                aria-controls="standard"
                aria-selected="false">Standard Dosing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"
                id="free-tab"
                data-toggle="pill"
                href="#free"
                role="tab"
                aria-controls="free"
                aria-selected="false">Free Text
              </a>
            </li>
          </ul>
          <br />

          <div className="tab-content" id="pills-tabContent">
            <FreeText />
            <StandardDose />
          </div>

        </div>
      </div>
    );
  }
}

export default AddForm;

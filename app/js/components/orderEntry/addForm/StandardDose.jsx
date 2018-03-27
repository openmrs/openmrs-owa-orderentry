import React from 'react';
import { connect } from 'react-redux';
import { getOrderEntryConfigurations } from '../../../actions/orderEntryActions';

export class StandardDose extends React.Component {
  componentDidMount() {
    this.props.getConfigurations;
  }
  render() {
    return (
      <div
        className="tab-pane fade"
        id="standard"
        role="tabpanel"
        aria-labelledby="standard-tab">
        <form>
          <div className="row">
            <div className="col-sm-1" style={{ paddingRight: "0" }}>
              <div className="form-group">
                <label htmlFor="dose">Dose</label>
                <input type="text" className="form-control" id="dose" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select className="form-control" id="unit">
                  <option>mg</option>
                  <option>ml</option>
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select className="form-control" id="frequency">
                  <option>Once a day</option>
                  <option>Twice a day</option>
                </select>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="route">Route</label>
                <select className="form-control" id="route">
                  <option>Oral</option>
                  <option>Inhalation</option>
                </select>
              </div>
            </div>
            <div className="col-sm-1" style={{ paddingRight: "0" }}>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input type="text" className="form-control" id="duration" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="days" />
                <select className="form-control" id="days">
                  <option>Days</option>
                  <option>Weeks</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5">
              <div className="form-group">
                <label htmlFor="needed">Needed for</label>
                <input type="text" className="form-control" id="needed" />
              </div>
            </div>
            <div className="col-sm-2 text-right">
              <medium className="form-text "> Dispense: </medium>
            </div>
            <div className="col-sm-1" style={{ paddingRight: "0" }}>
              <div className="form-group">
                <label htmlFor="dose">Dose</label>
                <input type="text" className="form-control" id="dose" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <select className="form-control" id="unit">
                  <option>mg</option>
                  <option>ml</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-2 text-right">
              <medium className="form-text"> Start Date: </medium>
            </div>

            <div className="col-sm-2" style={{ paddingRight: "0" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="today"
                  id="today"
                  value="option1"
                  checked />
                <label className="form-check-label text-right" htmlFor="today">
                  Today
                </label>
              </div>
            </div>
            <div className="col-sm-2" style={{ paddingLeft: "0", paddingRight: "0" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="otherDate"
                  id="otherDate"
                  value="option2" />
                <label className="form-check-label text-right" htmlFor="otherDate">
                  Other Date
                </label>
              </div>
            </div>
            <div className="col-sm-2" style={{ paddingLeft: "0" }}>
              <div className="form-group">
                <div className="input-group date" id="datetimepicker1">
                  <input type="text" className="form-control" />
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-11">
              <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea className="form-control" rows="4" id="notes" />
              </div>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-sm-3 text-left">
            <button type="button" className="btn btn-danger">Cancel</button>
          </div>
          <div className="col-sm-3 col-sm-offset-5 text-right">
            <button type="button" className="btn btn-success">Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configurations: state.orderEntryConfigurations.configurations,
});

const mapDispatchToProps = dispatch => ({
  getConfigurations: dispatch(getOrderEntryConfigurations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StandardDose);

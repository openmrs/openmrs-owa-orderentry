import React from 'react';


class FreeText extends React.Component {

  render() {
    return (
      <div className="tab-pane fade"
        id="free"
        role="tabpanel"
        aria-labelledby="free-tab">
        <form>
          <div className="row">
            <div className="col-sm-11">
              <div className="form-group">
                <label htmlFor="instructions">Completete Instructions:</label>
                <textarea className="form-control" rows="5" id="instructions" />
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

export default FreeText;

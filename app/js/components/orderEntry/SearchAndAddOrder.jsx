import React from 'react';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import AddForm from './addForm/AddForm';

class SearchAndAddOrder extends React.Component {

  render() {
    return (
      <div className="row">
        <br />
        <div className="col-lg-10 col-md-10 col-sm-10 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
          <ul className="nav nav-tabs">
            <li className="active">
              <a data-toggle="tab" href="#out-tab">Outpatient</a>
            </li>
            <li>
              <a data-toggle="tab" href="#in-tab">Inpatient</a>
            </li>
          </ul>
          <br />

          <div className="tab-content">
            <div id="in-tab" className="tab-pane fade">
              <form className="form-horizontal">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group text-left">
                      <label className="control-label col-lg-2 col-md-3 col-sm-3" htmlFor="search">
                        New order for:
                      </label>
                      <div className="col-lg-9 col-md-9 col-sm-9">
                        <input type="text" className="form-control" id="search" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <ActiveOrders />
              <PastOrders />
            </div>

            <div className="tab-pane fade in active" id="out-tab">
              <form className="form-horizontal">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="control-label col-lg-2 col-md-2 col-sm-2" htmlFor="search2">
                        New order for:
                      </label>
                      <div className="col-lg-9 col-md-9 col-sm-9">
                        <input type="text" className="form-control" id="search2" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <AddForm />
              <ActiveOrders />
              <PastOrders />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default SearchAndAddOrder;

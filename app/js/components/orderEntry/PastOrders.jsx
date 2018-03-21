import React from 'react';

class PastOrders extends React.Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h4> Past Orders </h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "18%" }}>Date</th>
                    <th className="text-center" style={{ width: "10%" }}>Status</th>
                    <th className="text-center" style={{ width: "44%" }}>Details</th>
                    <th className="text-center" style={{ width: "10%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center" style={{ fontSize: "14px" }}>
                      05/03/2018 - 12/03/2018
                    </td>
                    <td className="text-center" style={{ fontSize: "14px" }}>
                      Revised
                    </td>
                    <td style={{ paddingTop: "0" }}>
                      <table className="table" style={{ marginBottom: "0", borderTop: "0 !important" }}>
                        <tbody>
                          <tr style={{ fontSize: "14px" }}>
                            <td> Oral </td>
                            <td> 1 tablet, twice daily, for 3 days </td>
                            <td> Some additional notes </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="text-center">
                      <a href="#"> <i className="fas fa-sync-alt" /> </a>
                    </td>
                  </tr>
                </tbody>
              </table >
              <span>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <p> Showing 1 to 3 of 3 entries </p>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 text-right">
                    <p> Previous 1 Next Last</p>
                  </div>
                </div>
              </span>
            </div >
          </div >
        </div >
        <br />
      </div >
    );
  }
}

export default PastOrders;

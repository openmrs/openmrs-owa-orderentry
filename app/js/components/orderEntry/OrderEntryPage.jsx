import React from 'react';
import SearchAndAddOrder from './SearchAndAddOrder';
import PatientDashboard from './PatientDashboard';

class OrderEntryPage extends React.Component {

  render() {
    return (
      <div className="container-fluid" style={{paddingLeft: "0", paddingRight: "0"}}>
        <PatientDashboard />
        <SearchAndAddOrder />
      </div>
    );
  }
}

export default OrderEntryPage;

import React from 'react';
import PatientDashboard from '../patientDashboard';

import SearchAndAddOrder from './SearchAndAddOrder';

class OrderEntryPage extends React.Component {
  render() {
    return (
      <div>
        <PatientDashboard {...this.props} />
        <SearchAndAddOrder />
      </div>
    );
  }
}

export default OrderEntryPage;

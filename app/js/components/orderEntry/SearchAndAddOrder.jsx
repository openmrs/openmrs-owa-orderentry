import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddForm from './addForm/AddForm';
import PastOrders from '../orderEntry/PastOrders';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import SearchDrug from '../searchDrug';

export class SearchAndAddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careSetting: 'OutPatient',
    };
  }

  handleCareSettings = (careSetting) => {
    this.setState({ careSetting });
  }

  render() {
    return (
      <div className="body-wrapper">
        <Tabs careSetting={this.handleCareSettings}>
          <Tab
            tabName="OutPatient">
            <SearchDrug />
            <PastOrders
              tabName="OutPatient"
              careSetting={this.props.outpatientCareSetting}
              location={this.props.location} />
          </Tab>
          <Tab
            tabName="InPatient">
            <SearchDrug />
            <PastOrders
              tabName="InPatient"
              careSetting={this.props.inpatientCareSetting}
              location={this.props.location} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default SearchAndAddOrder;

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

  renderAddForm = () => (
    <div>
      {
        this.props.drug.uuid &&
          <AddForm
            drugName={this.props.drug.display}
            drugUuid={this.props.drug.uuid}
          />
      }
    </div>
  );

  render() {
    return (
      <div className="body-wrapper">
        <Tabs careSetting={this.handleCareSettings}>
          <Tab
            tabName="OutPatient">
            <SearchDrug />
            {this.renderAddForm()}
            <PastOrders
              tabName="OutPatient"
              careSetting={this.props.outpatientCareSetting}
              location={this.props.location} />
          </Tab>
          <Tab
            tabName="InPatient">
            <SearchDrug />
            {this.renderAddForm()}
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

const mapStateToProps = ({
  careSettingReducer:
  { inpatientCareSetting, outpatientCareSetting },
  drugSearchReducer,
}) => ({
  inpatientCareSetting,
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
});

SearchAndAddOrder.propTypes = {
  drug: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
};

SearchAndAddOrder.defaultProps = {
  drug: {},
};

export default connect(mapStateToProps)(SearchAndAddOrder);

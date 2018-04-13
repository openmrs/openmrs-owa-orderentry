import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FreeText from './FreeText';
import StandardDose from './StandardDose';
import DraftDataTable from './DraftDataTable';
import DosageTabs from '../../tabs/DosageTabs';

import { getOrderEntryConfigurations } from '../../../actions/orderEntryActions';

export class AddForm extends React.Component {
  state = {
    drugFormPopulated: false,
    action: '',
    fields: {
      completeInstructions: '',
      dose: '',
      dosingUnit: '',
      frequency: '',
      route: '',
      duration: '',
      durationUnit: '',
      dispensingUnit: '',
      dispensingQuantity: '',
      reason: '',
      note: '',
    },
  };
  componentDidMount() {
    this.props.getOrderEntryConfigurations();
  }
  handleCancel = () => {
    // Cancel a draft drug order
  }
  handleSubmitDrugForm = () => (
    this.setState({ drugFormPopulated: true, action: "NEW" })
  )
  handleChange = (e) => {
    this.setState({
      ...this.state,
      fields: { ...this.state.fields, [e.target.name]: e.target.value },
    });
  }
  addDrugOrder = (event) => {
    event.preventDefault();
    // make post request to API
  }
  renderDraftDataTable = () => (
    <div>
      <DraftDataTable
        drugName={this.props.drugName}
        fields={this.state.fields}
        status={this.state.action}
        handleCancel={this.handleCancel}
        handleSubmit={this.addDrugOrder}
      />
    </div>
  );
  renderDrugOrderForms = () => (
    <div>
      <DosageTabs
        fields={this.state.fields}
        allConfigurations={this.props.allConfigurations}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmitDrugForm}
        careSetting={this.props.careSetting} />
    </div>
  );
  render() {
    return (
      <div>
        {
          this.state.drugFormPopulated ?
            this.renderDraftDataTable() :
            this.renderDrugOrderForms()
        }
      </div>
    );
  }
}

const mapStateToProps = ({ orderEntryConfigurations }) => ({
  allConfigurations: orderEntryConfigurations.configurations,
});

AddForm.propTypes = {
  getOrderEntryConfigurations: PropTypes.func,
  allConfigurations: PropTypes.shape({}),
  drugName: PropTypes.string,
};

AddForm.defaultProps = {
  getOrderEntryConfigurations: {},
  allConfigurations: {},
  drugName: '',
};

export default connect(mapStateToProps, { getOrderEntryConfigurations })(AddForm);

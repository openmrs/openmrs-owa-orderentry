import React from 'react';
import PropTypes from 'prop-types';
import LabPanelFieldSet from './LabPanelFieldSet';
import LabTestFieldSet from './LabTestFieldSet';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import Accordion from '../accordion';
import { labCategories } from './labData';
import { activeOrders, pastOrders } from './ordersHistoryMockData';
import '../../../css/grid.scss';

export class LabEntryForm extends React.Component {
  state = {
    categoryId: 1,
    selectedTests: [],
    selectedPanel: null,
    disableSaveButton: true,
    disableCancelButton: true,
  };

  selectTests = (tests) => {
    this.activateSaveButton();
    this.activateCancelButton();
    this.setState({
      selectedTests: tests,
    });
  };

  selectTest = (testId) => {
    if (!this.state.selectedTests.includes(testId)) {
      this.setState({
        selectedTests: [...this.state.selectedTests, testId],
      });
    } else {
      const { selectedTests } = this.state;
      const newSelectedTests = selectedTests.filter(test => test !== testId);
      this.setState({ selectedTests: newSelectedTests });
    }
  };

  selectPanel = (panel) => {
    this.setState({
      selectedPanel: panel.id,
    });
  };

  showFieldSet = () => (
    <div>
      <LabPanelFieldSet
        selectTests={this.selectTests}
        selectPanel={this.selectPanel}
        selectedPanel={this.state.selectedPanel}
      />
      <LabTestFieldSet selectedTests={this.state.selectedTests} selectTest={this.selectTest} />
    </div>
  );

  changeLabForm = (id) => {
    this.setState({
      categoryId: id,
    });
  };

  activateSaveButton = () => {
    this.setState({
      disableSaveButton: false,
    });
  };

  handleSubmit = () => {
    /**
     * this should contain data to be submitted
     * * */
    this.handleCancel();
  };

  activateCancelButton = () => {
    this.setState({
      disableCancelButton: false,
    });
  };

  handleCancel = () => {
    this.setState({
      selectedTests: [],
      selectedPanel: null,
      disableSaveButton: true,
      disableCancelButton: true,
    });
  };

  renderActiveOrders = () => (
    <Accordion title="Active Lab Orders">
      <ActiveOrders orders={activeOrders} />
    </Accordion>
  );

  renderPastOrders = () => (
    <Accordion title="Past Lab Orders">
      <PastOrders orders={pastOrders} />
    </Accordion>
  );

  render() {
    const {
      handleCancel, handleSubmit, renderActiveOrders, renderPastOrders,
    } = this;
    return (
      <React.Fragment>
        <p>New Lab Order</p>
        <br />
        <div className="lab-form-wrapper">
          <div className="lab-category">
            <ul>
              {labCategories.map((category, index) => (
                <li key={`${category.name}-${category.id}`}>
                  <a
                    className={this.state.categoryId === category.id ? 'active-category' : ''}
                    href="#"
                    id="category-button"
                    onClick={() => this.changeLabForm(category.id)}>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <form className="lab-form simple-form-ui">
            {this.showFieldSet()}
            <div className="flex-row">
              <button
                type="button"
                className="cancel"
                onClick={handleCancel}
                disabled={this.state.disableCancelButton}>
                Cancel
              </button>
              <div className="-1">
                <button
                  type="button"
                  id="add-lab-order"
                  className="confirm"
                  onClick={handleSubmit}
                  disabled={this.state.disableSaveButton}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <br />
        {renderActiveOrders()}
        <br />
        {renderPastOrders()}
        <br />
      </React.Fragment>
    );
  }
}

export default LabEntryForm;

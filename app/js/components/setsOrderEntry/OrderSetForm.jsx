import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../selectBox';
import Accordion from '../orderEntry/Accordion';
import OrderHeader from '../orderEntry/OrderHeader';
import OrderSetDetails from './OrderSetDetails';
import './styles.scss';


class OrderSetForm extends PureComponent {
  state = {
    items: [{ value: 'Choose a set to add', id: 0 }, { value: 'Mineral', id: 1 }],
    selectedItem: '',
    isDisabled: false,
    displaySets: 'block',
    displayForm: 'none',
  }

  changeSelectedOrderSet = () => {
    this.setState({ displaySets: 'none', displayForm: 'block' });
  }

  render() {
    const {
      items, selectedItem, isDisabled, displaySets, displayForm,
    } = this.state;
    return (
      <React.Fragment>
        <div className="order-set-entry">
          <div>
            <h1>Order from Sets</h1>
          </div>
          <span style={{ display: displaySets }}>
            <SelectBox
              items={items}
              selectedItem={selectedItem}
              onChange={this.changeSelectedOrderSet}
            />
          </span>
          <span style={{ display: displayForm }}>
            <div className="set-header">
              <h1>DIABETES INITIAL WORKUP</h1>
            </div>
            <table>
              <tbody>
                <tr className="set-details">
                  <th className="set-details-header">Details</th>
                  <th className="set-actions-header">Actions</th>
                </tr>
                <Accordion
                  title={
                    <OrderHeader
                      handleEdit={() => {}}
                      handleDiscontinue={() => {}}
                    />
                  }
                  key={1}
                  caretText="Test Set"
                >
                  <OrderSetDetails />
                </Accordion>
              </tbody>
            </table>
            <br />
            <input
              type="button"
              id="draft-discard-all"
              onClick={() => {}}
              className="button cancel modified-btn"
              value="Cancel"
              disabled={isDisabled}
            />
            <input
              type="submit"
              onClick={() => {}}
              className="button confirm right modified-btn"
              value="Save to Drafts"
              disabled={isDisabled}
            />
          </span>
        </div>
      </React.Fragment>);
  }
}

export default OrderSetForm;

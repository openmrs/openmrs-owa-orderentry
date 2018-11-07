import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../selectBox';
import Accordion from '../orderEntry/Accordion';
import OrderSetDetails from './OrderSetDetails';
import fetchOrderSet from '../../actions/orderSet/fetchOrderSet';
import './styles.scss';
import { addDraftOrder } from '../../actions/draftTableAction';


export class OrderSetForm extends PureComponent {
  state = {
    selectedItem: { name: '', id: '' },
    isDisabled: false,
    displaySets: true,
    displayForm: false,
  }

  componentDidMount() {
    this.props.fetchOrderSet();
  }

  generateOrderSetOptions = () => {
    const { orderSets } = this.props;
    let orderSetsOptions;
    if (orderSets && orderSets.length) {
      orderSetsOptions = orderSets.map((orderSet) => {
        const { name, id } = orderSet;
        return ({ name, id });
      });
      return orderSetsOptions;
    }
    return [{ name: 'Loading', id: 0 }];
  }

  changeSelectedOrderSet = (item) => {
    this.setState({ displaySets: false, displayForm: true, selectedItem: item });
  }

  cancelOrderSet = () => {
    this.setState({ displaySets: true, displayForm: false });
  }

  fetchSelectedOrderSet = orderSetId =>
    this.props.orderSets.find(orderSet => orderSet.id === orderSetId);

  handleSubmit = () => {
    const selectedOrderSet = this.fetchSelectedOrderSet(this.state.selectedItem.id);

    selectedOrderSet.orders.forEach((eachDrug) => {
      this.props.addDraftOrder(eachDrug);
    });
    this.setState({ selectedItem: { name: '', id: '' } });
  }

  render() {
    const {
      selectedItem, isDisabled, displaySets, displayForm,
    } = this.state;
    const { name, id } = selectedItem;
    return (
      <React.Fragment>
        <div className="order-set-entry">
          <div>
            <h1>Order from Sets</h1>
          </div>
          {displaySets &&
          <span>
            <SelectBox
              items={this.generateOrderSetOptions()}
              selectedItem={selectedItem}
              onChange={this.changeSelectedOrderSet}
            />
          </span>}
          { displayForm &&
          <span>
            <div className="set-header">
              <h1>{name}</h1>
            </div>
            <table>
              <tbody>
                <tr className="set-details">
                  <th colSpan="2" className="set-details-header">Details</th>
                </tr>
                <Accordion
                  key={id}
                  caretText={name}
                >
                  <OrderSetDetails orderSet={this.fetchSelectedOrderSet(id)} />
                </Accordion>
              </tbody>
            </table>
            <br />
            <input
              type="button"
              id="draft-discard-all"
              onClick={this.cancelOrderSet}
              className="button cancel modified-btn"
              value="Cancel"
              disabled={isDisabled}
            />
            <input
              type="submit"
              onClick={this.handleSubmit}
              className="button confirm right modified-btn"
              value="Save to Drafts"
              disabled={isDisabled}
            />
          </span>}
        </div>
      </React.Fragment>);
  }
}

OrderSetForm.propTypes = {
  orderSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchOrderSet: PropTypes.func.isRequired,
  addDraftOrder: PropTypes.func.isRequired,
};

const mapStateToProps = ({ fetchOrderSetReducer }) => ({
  orderSets: fetchOrderSetReducer.orderSets,
});

export default connect(mapStateToProps, { fetchOrderSet, addDraftOrder })(OrderSetForm);

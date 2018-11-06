import React, { Component } from 'react';
import PropTypes from 'prop-types';


class OrderSetDetails extends Component {
  displayOrderSetDetails = orderSet =>
    orderSet.orders.map(order => <li key={order.drug}>{ order.drugName }</li>);

  render() {
    const { orderSet } = this.props;
    return (
      <React.Fragment>
        <ul>
          {orderSet && this.displayOrderSetDetails(orderSet)}
        </ul>
      </React.Fragment>
    );
  }
}
OrderSetDetails.propTypes = {
  orderSet: PropTypes.object,
};

OrderSetDetails.defaultProps = {
  orderSet: null,
};

export default OrderSetDetails;

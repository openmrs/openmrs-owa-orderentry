import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import * as orderTypes from './orderTypes';

const SelectOrderType = ({ switchOrderType, currentOrderType, orderType }) => {
  const orderTypesAsObject = Object.values(orderTypes);
  let displayText = (<FormattedMessage
    id="app.orders.add"
    defaultMessage="Add Orders"
    description="Add Orders" />);
  let clickHandler = () => {};
  // if "type" = "laborders" or "drugorders" restricts the app to lab or drug orders respectively
  if (orderType === 'laborders') {
    displayText =
      (<FormattedMessage
        id="app.orders.labs.add"
        defaultMessage="Add Lab Orders"
        description="Add Lab Orders" />);

    clickHandler = () => switchOrderType(orderTypesAsObject[1]);
  }

  if (orderType === "drugorders") {
    displayText = (<FormattedMessage
      id="app.orders.drugs.add"
      defaultMessage="Add Drug Orders"
      description="Add Drug Orders" />);
    clickHandler = () => switchOrderType(orderTypesAsObject[0]);
  }
  return (
    <div className="dropdown">
      <div className="add-order-nav">
        <button
          onClick={clickHandler}
        >
          {displayText}
        </button>
      </div>
      <div className="dropdown-content" style={{ display: orderType && "none" }} >
        {orderTypesAsObject.map(type => (
          <div
            key={type.id}
            value={type.text}
            role="link"
            onClick={() => switchOrderType(type)}
            tabIndex={0}
            className={`order-type-option ${currentOrderType.id === type.id ? 'active' : ''}`}>
            {type.text}
          </div>
        ))}
      </div>
    </div>
  );
};

SelectOrderType.propTypes = {
  currentOrderType: PropTypes.object.isRequired,
  switchOrderType: PropTypes.func.isRequired,
  orderType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orderType: state.contextReducer.orderType,
});

export default connect(mapStateToProps)(SelectOrderType);

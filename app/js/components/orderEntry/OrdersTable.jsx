import React from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import allOrdersMock from './allOrdersMock.json';
import OrderHeader from './OrderHeader';
import LabOrderDetails from './LabOrderDetails';
import DrugOrderDetails from './DrugOrderDetails';

const OrdersTable = () => (
  <React.Fragment>
    {allOrdersMock.orders.map(order => (
      <Accordion
        title={<OrderHeader status={order.status} orderable={order.orderable} />}
        key={order.id}>
        {order.type === 'drugorder' ? (
          <DrugOrderDetails
            dosingInstructions={order.dosingInstructions}
            dispense={order.dispense}
            activeDates={order.activeDates}
            orderer={order.orderer}
          />
        ) : (
          <LabOrderDetails urgency={order.urgency} orderer={order.orderer} />
        )}
      </Accordion>
    ))}
  </React.Fragment>
);

export default OrdersTable;

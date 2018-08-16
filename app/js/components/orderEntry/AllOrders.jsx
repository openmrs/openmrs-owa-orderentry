import React, { Component } from 'react';
import OrdersTable from './OrdersTable';

const AllOrders = () => (
  <div className="all-orders">
    <div className="orders-breadcrumb">
      <h3>Patient Orders</h3>
    </div>
    <table className="t-orders">
      <tbody>
        <tr>
          <th>Date</th>
          <th>Details</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        <OrdersTable />
      </tbody>
    </table>
  </div>
);

export default AllOrders;

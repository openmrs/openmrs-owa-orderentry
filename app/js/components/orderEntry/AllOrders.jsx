import React, { Component } from 'react';
import OrdersTable from './OrdersTable';
import SortAndFilter from './SortAndFilter';

const AllOrders = () => (
  <div className="all-orders">
    <div className="orders-breadcrumb">
      <h3>Patient Orders</h3>
    </div>
    <SortAndFilter />
    <br />
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

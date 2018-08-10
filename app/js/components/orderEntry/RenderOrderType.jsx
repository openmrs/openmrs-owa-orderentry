import React from 'react';
import PropTypes from 'prop-types';
import DrugOrderEntry from '../drugOrderEntry';
import * as orderTypes from './orderTypes';
import LabEntryForm from '../labOrderEntry/LabEntryForm';
import AllOrders from './AllOrders';

const RenderOrderType = (props) => {
  switch (props.currentOrderTypeID) {
    case orderTypes.LAB_ORDER.id: {
      return (
        <div className="body-wrapper">
          <LabEntryForm />
        </div>
      );
    }
    case orderTypes.DRUG_ORDER.id: {
      return (
        <DrugOrderEntry
          outpatientCareSetting={props.outpatientCareSetting}
          inpatientCareSetting={props.inpatientCareSetting}
          location={props.location}
        />
      );
    }
    default: {
      return (
        <div className="body-wrapper">
          <AllOrders />
        </div>
      );
    }
  }
};

export default RenderOrderType;

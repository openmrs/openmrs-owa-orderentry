import React from 'react';
import PropTypes from 'prop-types';
import DrugOrderEntry from '../drugOrderEntry';
import * as orderTypes from './orderTypes';

const RenderOrderType = (props) => {
  switch (props.currentOrderTypeID) {
    case orderTypes.LAB_ORDER.id: {
      return (<h1>The Lab Order entry should appear here</h1>);
    }
    case orderTypes.DRUG_ORDER.id: {
      return (
        <DrugOrderEntry
          outpatientCareSetting={props.outpatientCareSetting}
          inpatientCareSetting={props.inpatientCareSetting}
          location={props.location}
        />);
    }
    default: {
      return (
        <DrugOrderEntry
          outpatientCareSetting={props.outpatientCareSetting}
          inpatientCareSetting={props.inpatientCareSetting}
          location={props.location}
        />);
    }
  }
};

export default RenderOrderType;

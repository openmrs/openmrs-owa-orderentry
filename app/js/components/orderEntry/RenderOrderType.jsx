import React from 'react';
import PropTypes from 'prop-types';
import DrugOrderEntry from '../drugOrderEntry';
import * as orderTypes from './orderTypes';
import LabEntryForm from '../labOrderEntry/LabEntryForm';
import AllOrders from './AllOrders';

const RenderOrderType = ({
  backLink, currentOrderTypeID, location, inpatientCareSetting, outpatientCareSetting,
}) => {
  switch (currentOrderTypeID) {
    case orderTypes.LAB_ORDER.id: {
      return (<LabEntryForm backLink={backLink} />);
    }
    case orderTypes.DRUG_ORDER.id: {
      return (
        <DrugOrderEntry
          outpatientCareSetting={outpatientCareSetting}
          inpatientCareSetting={inpatientCareSetting}
          location={location}
          backLink={backLink}
        />
      );
    }
    default: {
      return (<AllOrders backLink={backLink} />);
    }
  }
};

export default RenderOrderType;

RenderOrderType.defaultProps = {
  outpatientCareSetting: null,
  inpatientCareSetting: {
    uuid: '',
  },
};

RenderOrderType.propTypes = {
  currentOrderTypeID: PropTypes.number,
  outpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  inpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

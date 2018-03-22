import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumb = props => (
  <ul id="breadcrumbs">
    <li>
      <a href="../../">
        <i className="icon-home small" />
      </a>
    </li>
    <li>
      <i className="icon-chevron-right link" />
      <a
        href={`../../coreapps/clinicianfacing/patient.page?patientId=${props.patientId}`}
      >
        {props.name}
      </a>
    </li>
    <li>
      <i className="icon-chevron-right link" />
      Drug Orders
    </li>
  </ul>
);

BreadCrumb.propTypes = {
  name: PropTypes.string.isRequired,
  patientId: PropTypes.number,
};

BreadCrumb.defaultProps = {
  patientId: null,
};

export default BreadCrumb;

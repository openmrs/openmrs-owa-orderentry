import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export class DraftList extends React.Component {
  render() {
    return this.props.draftOrders.map(order => (
      <li className="draft-list small-font" key={shortid.generate()}>
        <span>{order.test}</span>
        <span className="stay-right" />
      </li>
    ));
  }
}

DraftList.propTypes = {
  draftOrders: PropTypes.array.isRequired,
};

export default DraftList;

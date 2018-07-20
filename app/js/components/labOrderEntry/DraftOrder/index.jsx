import React from 'react';
import PropTypes from 'prop-types';

import DraftList from './DraftList';

export class LabDraftOrder extends React.Component {
  render() {
    const { draftLabOrders } = this.props;
    const numberOfDraftOrders = draftLabOrders.length;
    const isDisabled = !numberOfDraftOrders;
    return (
      <div className="draft-spacing draft-lab-layout">
        <h5 className="h5-draft-header">
          Unsaved Draft Orders ({numberOfDraftOrders})
        </h5>
        <div className="table-container">
          <ul className="draft-list-container">
            <DraftList
              draftOrders={draftLabOrders}
            />
          </ul>
        </div>
        <br />
        <input
          type="button"
          onClick={() => {}}
          className="button cancel modified-btn"
          value={numberOfDraftOrders > 1 ? "Discard All" : "Discard"}
          disabled={isDisabled}
        />
        <input
          type="submit"
          onClick={() => {}}
          className="button confirm right modified-btn"
          value="Sign and Save"
          disabled={isDisabled}
        />
      </div>
    );
  }
}

LabDraftOrder.propTypes = {
  draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default LabDraftOrder;

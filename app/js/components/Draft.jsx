import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

export class Draft extends PureComponent {
  renderDraftList = () => {
    const { draftOrders } = this.props;
    return draftOrders.map((order) => {
      const orderName = order.display || order.drugName;
      return (
        <li className="draft-list small-font" key={shortid.generate()}>
          <span className="draft-name">{orderName.toLowerCase()}</span>
          <div className="action-btn-wrapper">
            {/* The action are to be dynamically set */}
          </div>
        </li>);
    });
  }

  render() {
    const { draftOrders, handleDraftDiscard, handleSubmit } = this.props;
    const numberOfDraftOrders = draftOrders.length;
    const isDisabled = !numberOfDraftOrders;
    return (
      <div className="draft-spacing draft-lab-layout">
        <h5 className="h5-draft-header">
          Unsaved Draft Orders ({numberOfDraftOrders})
        </h5>
        <div className="table-container">
          <ul className="draft-list-container">
            {this.renderDraftList()}
          </ul>
        </div>
        <br />
        <input
          type="button"
          id="draft-discard-all"
          onClick={() => handleDraftDiscard()}
          className="button cancel modified-btn"
          value={numberOfDraftOrders > 1 ? "Discard All" : "Discard"}
          disabled={isDisabled}
        />
        <input
          type="submit"
          onClick={handleSubmit}
          className="button confirm right modified-btn"
          value="Sign and Save"
          disabled={isDisabled}
        />
      </div>
    );
  }
}

Draft.propTypes = {
  draftOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDraftDiscard: PropTypes.func.isRequired,
};

export default Draft;


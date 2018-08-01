import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

export class LabDraftOrder extends PureComponent {
  handleToggleDraftOrderUgency = (order) => {
    const orderId = order.id;
    let orderUrgency;
    if (order.urgency && order.urgency === 'routine') {
      orderUrgency = 'STAT';
    } else {
      orderUrgency = 'routine';
    }
    const draftOrder = {
      orderId,
      orderUrgency,
    };
    this.props.toggleDraftLabOrdersUgency(draftOrder);
  }

  renderDraftList = () => {
    const { panelTests, draftLabOrders } = this.props;
    return draftLabOrders.map((order) => {
      const isPanel = !!order.labCategory;
      const orderName = isPanel ? order.name : order.test;
      const iconClass = classNames(
        'icon-warning-sign',
        {
          iGray: order.urgency === 'routine',
          iRed: order.urgency === 'STAT',
        },
      );
      return (
        <li className="draft-list small-font" key={shortid.generate()}>
          <span>{orderName}</span>
          <span className="stay-right">
            <a className="action-btn" id="draft-toggle-btn" href="#" onClick={() => this.handleToggleDraftOrderUgency(order)}>
              <i className={iconClass} title="Urgency" />
            </a>
          </span>
        </li>);
    });
  }
  render() {
    const { draftLabOrders, handleSubmit } = this.props;
    const numberOfDraftOrders = draftLabOrders.length;
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
          onClick={() => {}}
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

LabDraftOrder.propTypes = {
  draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleDraftLabOrdersUgency: PropTypes.func.isRequired,
  panelTests: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LabDraftOrder;

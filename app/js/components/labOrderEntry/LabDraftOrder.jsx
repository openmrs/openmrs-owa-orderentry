import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

export class LabDraftOrder extends PureComponent {
  handleToggleDraftOrderUgency = (event, order) => {
    event.preventDefault();
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

  handleDraftItemDiscard = (event, order, draftType) => {
    event.preventDefault();
    this.props.handleDraftDiscard(order, draftType);
  }

  renderDraftList = () => {
    const { draftLabOrders } = this.props;
    return draftLabOrders.map((order) => {
      const isPanel = !!order.labCategory;
      const draftType = !isPanel ? 'single' : 'panel';
      const orderName = isPanel ? order.name : order.test;
      const iconClass = classNames(
        'icon-warning-sign',
        {
          'i-gray': order.urgency === 'routine',
          'i-black': order.urgency === 'STAT',
        },
      );
      return (
        <li className="draft-list small-font" key={shortid.generate()}>
          <span className="draft-name">{orderName}</span>
          <div className="action-btn-wrapper">
            <span className="action-btn">
              <a
                id="draft-toggle-btn" href="#" onClick={event => this.handleToggleDraftOrderUgency(event, order)}
              >
                <i className={iconClass} title="Urgency" />
              </a>
            </span>
            <span className="action-btn right">
              <a
                id="draft-discard-btn" href="#" onClick={event => this.handleDraftItemDiscard(event, order, draftType)}
              >
                <i className="icon-remove scale" title="Discard" />
              </a>
            </span>
          </div>
        </li>);
    });
  }
  render() {
    const { draftLabOrders, handleDraftDiscard, handleSubmit } = this.props;
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

LabDraftOrder.propTypes = {
  draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleDraftLabOrdersUgency: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDraftDiscard: PropTypes.func.isRequired,
};

export default LabDraftOrder;

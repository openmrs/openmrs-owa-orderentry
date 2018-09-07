import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import constants from '../utils/constants';
import IconButton from './button/IconButton';

export class Draft extends PureComponent {
  renderDraftList = () => {
    let draftType;
    const { draftOrders, handleDraftDiscard } = this.props;
    return draftOrders.map((order) => {
      const isPanel = !!order.set;
      const isOtherOrderType = !!order.type;

      if (isPanel) {
        draftType = 'panel';
      } else {
        draftType = 'single';
      }
      if (isOtherOrderType) {
        draftType = order.type;
      }

      const orderName = order.display || order.drugName;
      const iconClass = classNames(
        'scale',
        {
          'i-gray': order.urgency === constants.ROUTINE || typeof order.urgency === 'undefined',
          'i-red': order.urgency === constants.STAT,
        },
      );

      return (
        <li className="draft-list small-font" key={shortid.generate()}>
          <span className="order-status">{!order.action ? 'NEW' : order.action}</span>
          <span className="draft-name">{orderName.toLowerCase()}</span>
          <div className="action-btn-wrapper">
            <span className="action-btn">
              { order.type !== 'drugorder' ?
                <IconButton
                  iconClass={iconClass}
                  iconTitle="Urgency"
                  dataContext={order}
                  onClick={this.props.toggleDraftLabOrderUrgency}
                  icon="&#x25B2;"
                  id="draft-toggle-btn icon-btn-anchor"
                /> :
                <IconButton
                  iconClass="icon-pencil"
                  iconTitle="EDIT"
                  dataContext={order}
                  onClick={this.props.editDraftDrugOrder}
                  id="draft-toggle-btn icon-btn-anchor"
                />
              }
            </span>
            <span className="action-btn right">
              <IconButton
                iconClass="icon-remove"
                iconTitle="Discard"
                id="draft-discard-btn"
                dataContext={{ order, draftType }}
                onClick={handleDraftDiscard}
              />
            </span>
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
  editDraftDrugOrder: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDraftDiscard: PropTypes.func.isRequired,
  toggleDraftLabOrderUrgency: PropTypes.func.isRequired,
};

export default Draft;


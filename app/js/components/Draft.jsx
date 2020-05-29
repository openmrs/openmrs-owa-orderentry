import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import constants from '../utils/constants';
import IconButton from './button/IconButton';
import { getConceptShortName } from '../utils/helpers';

export class Draft extends PureComponent {
  renderDraftList = () => {
    let draftType;
    const { draftOrders, handleDraftDiscard, locale } = this.props;
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

      const orderName = getConceptShortName(order, locale) || order.drugName;
      const iconClass = classNames(
        'scale',
        {
          'i-gray': order.urgency === constants.ROUTINE || typeof order.urgency === 'undefined',
          'i-red': order.urgency === constants.STAT,
        },
      );

      return (
        <li className="draft-list small-font" key={`draft-order-${order.id}`}>
          <span className="order-status">{!order.action ? 'NEW' : order.action}</span>
          <span className="draft-name">{ orderName }</span>
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
    const {
      draftOrders, handleDraftDiscard, handleSubmit, intl, isLoading,
    } = this.props;
    const isDisabled = draftOrders.length === 0 || isLoading;
    const signAndSave = intl.formatMessage({ id: "app.orders.signandsave", defaultMessage: "Sign and Save" });
    const discard = intl.formatMessage({ id: "app.orders.discard", defaultMessage: "Discard" });
    const discardAll = intl.formatMessage({ id: "app.orders.discardall", defaultMessage: "Discard All" });
    return (
      <div>
        <h5 className="h5-draft-header">
          <FormattedMessage
            id="app.orders.unsaved.draft"
            defaultMessage="Unsaved Draft Orders"
            description="Unsaved Draft Orders" /> ({draftOrders.length})
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
          value={draftOrders.length > 1 ? discardAll : discard}
          disabled={isDisabled}
        />
        <input
          type="submit"
          onClick={() => handleSubmit()}
          className="button confirm right modified-btn"
          value={signAndSave}
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

const mapStateToProps = state => ({
  isLoading: state.createOrderReducer.status.loading,
});

export default connect(mapStateToProps)(injectIntl(Draft));


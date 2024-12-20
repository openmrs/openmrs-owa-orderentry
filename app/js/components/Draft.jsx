import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import constants from '../utils/constants';
import IconButton from './button/IconButton';
import { getConceptShortName } from '../utils/helpers';
import fetchOrderReasonsGlobalProperty from "../actions/fetchOrderReasonsGlobalProperty";

export class Draft extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchOrderReasonsGlobalProperty());
  }

  renderDraftList = () => {
    let draftType;
    const {
      draftOrders,
      handleDraftDiscard,
      locale,
      orderReasonsMap,
    } = this.props;
    return draftOrders.map((order) => {
      const isPanel = !!order.set;
      const isOtherOrderType = !!order.type;
      const orderReasons =
        orderReasonsMap && orderReasonsMap[order.uuid] ? orderReasonsMap[order.uuid] : null;

      // set default order reason if not set
      if (orderReasons && orderReasons.answers && orderReasons.answers.length > 0
        && order.orderReason === undefined) {
        this.props.setLabOrderReason({ orderReason: orderReasons.answers[0].uuid, order });
      }

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
        <span>
          <li className="draft-list small-font" key={`draft-order-${order.id}`}>
            <span className="order-status">{!order.action ? 'NEW' : order.action}</span>
            <span className="draft-name">{ orderName }</span>
            <div className="action-btn-wrapper">
              <span className="action-btn">
                { order.type !== 'drugorder' ?
                  <div>
                    <IconButton
                    iconClass={iconClass}
                    iconTitle="Urgency"
                    dataContext={order}
                    onClick={this.props.toggleDraftLabOrderUrgency}
                    icon="&#x25B2;"
                    id="draft-toggle-btn icon-btn-anchor"
                  />
                  </div> :
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
          </li>

          { order.type !== 'drugorder' && orderReasons && orderReasons.answers && orderReasons.answers.length > 0 &&
            <li key={`draft-order-reason-${order.id}`}>
              <FormattedMessage
               id="app.orders.reason"
               defaultMessage="Order Reason"
               description="Reason for order" />:
              <select
                id="orderReason"
                name="orderReason"
                value={order.orderReason}
                onChange={event =>
                  this.props.setLabOrderReason({ orderReason: event.target.value, order })}>
                {orderReasons.answers.map(reason => (
                  <option value={reason.uuid}>{reason.display}</option>
                ))}
              </select>
            </li>
          }
        </span>
      );
    });
  }

  renderAddResultsButton = () => {
    const {
      draftOrders, handleSubmit, intl, isLoading,
    } = this.props;
    const isDisabled = draftOrders.length === 0 || isLoading;
    const addResults = intl.formatMessage({ id: "app.orders.addResults", defaultMessage: "Add Results" });
    return (
      <input
        type="submit"
        onClick={() => handleSubmit({ redirectToAddResults: true })}
        className="button confirm right modified-btn"
        value={addResults}
        disabled={isDisabled}
      />);
  }


  renderCancelButton = () => {
    const {
      draftOrders, handleDraftDiscard, intl, isLoading, showAddResultsButton,
    } = this.props;
    const isDisabled = draftOrders.length === 0 || isLoading;
    const discard = intl.formatMessage({ id: "app.orders.discard", defaultMessage: "Discard" });
    const discardAll = intl.formatMessage({ id: "app.orders.discardall", defaultMessage: "Discard All" });
    return (
      <input
        type="button"
        id="draft-discard-all"
        onClick={() => handleDraftDiscard()}
        className={`button ${showAddResultsButton ? 'right' : ''} cancel modified-btn`}
        value={draftOrders.length > 1 ? discardAll : discard}
        disabled={isDisabled}
      />);
  }
  renderSubmitButton = () => {
    const {
      draftOrders, handleSubmit, intl, showAddResultsButton, isLoading,
    } = this.props;
    const isDisabled = draftOrders.length === 0 || isLoading;
    const save = intl.formatMessage({ id: "app.orders.save", defaultMessage: "Save" });

    return (
      <input
        type="submit"
        onClick={() => handleSubmit()}
        className={`button confirm ${!showAddResultsButton ? 'right' : ''} modified-btn`}
        value={save}
        disabled={isDisabled}
      />);
  }

  render() {
    const {
      draftOrders, showAddResultsButton,
    } = this.props;

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
        { !showAddResultsButton && this.renderCancelButton() }
        { this.renderSubmitButton() }
        { showAddResultsButton && this.renderAddResultsButton()}
        <br />
        <br />
        { showAddResultsButton && this.renderCancelButton()}
      </div>
    );
  }
}

Draft.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  orderReasonsMap: PropTypes.object.isRequired,
  draftOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  editDraftDrugOrder: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDraftDiscard: PropTypes.func.isRequired,
  setLabOrderReason: PropTypes.func.isRequired,
  toggleDraftLabOrderUrgency: PropTypes.func.isRequired,
  showAddResultsButton: PropTypes.bool,
};

Draft.defaultProps = {
  showAddResultsButton: false,
};

const mapStateToProps = state => ({
  isLoading: state.createOrderReducer.status.loading,
  orderReasonsMap: state.orderReasonsReducer.orderReasonsMap,
});

export default connect(mapStateToProps)(injectIntl(Draft));


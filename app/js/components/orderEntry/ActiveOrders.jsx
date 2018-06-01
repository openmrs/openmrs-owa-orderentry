import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { activeOrderAction } from '../../actions/activeOrderAction';
import { addDraftOrder } from '../../actions/draftTableAction';
import { setOrderAction } from '../../actions/orderAction';
import imageLoader from '../../../img/loading.gif';


export class ActiveOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftOrder: {},
      pageCount: 0,
      limit: 10,
      startIndex: 0,
      pageNumber: 0,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentDidMount() {
    this.fetchActiveOrders(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabName !== this.props.tabName) {
      this.fetchActiveOrders(nextProps);
    }
    this.setState({ pageCount: nextProps.pageCount });
  }

  onClickDiscontinue = (order) => {
    const {
      uuid,
      drug,
      dose,
      doseUnits,
      frequency,
      route,
      duration,
      careSetting,
      durationUnits,
      asNeededCondition,
      orderer,
      dosingInstructions,
      dosingType,
      type,
      quantity,
      quantityUnits,
      orderNumber,
    } = order;

    this.setState({
      draftOrder: {
        uuid,
        careSetting: careSetting.uuid,
        drugName: drug.display,
        action: 'DISCONTINUE',
        dose,
        drug: drug.uuid,
        dosingUnit: (doseUnits && doseUnits.display) || doseUnits,
        frequency: (frequency && frequency.display) || frequency,
        route: (route && route.display) || route,
        duration,
        type,
        orderer: orderer.uuid,
        durationUnit: (durationUnits && durationUnits.display) || durationUnits,
        dosingType,
        reason: asNeededCondition,
        drugInstructions: dosingInstructions,
        dispensingQuantity: quantity,
        dispensingUnit: (quantityUnits && quantityUnits.display) || quantityUnits,
        orderNumber,
      },
    }, () => {
      this.props.setOrderAction('DISCONTINUE', orderNumber);
      this.props.addDraftOrder(this.state.draftOrder);
    });
  }

  onPageChange({ selected }) {
    let { startIndex, pageNumber } = this.state;
    const { limit } = this.state;
    startIndex = Math.ceil(selected * limit);
    pageNumber = startIndex / limit;
    this.setState(() => ({ startIndex, pageNumber }));
    this.fetchActiveOrders(this.props, { limit, startIndex });
  }

  fetchActiveOrders(props, newState) {
    const { limit, startIndex = 0 } = newState || this.state;
    this.setState(() => ({ startIndex: 0 }));
    const { location, careSetting } = props;
    const query = new URLSearchParams(location.search);
    const patientUuid = query.get('patient');
    const caresettingUuid = careSetting.uuid;
    this.props.activeOrderAction(limit, startIndex, patientUuid, caresettingUuid);
  }

  showOrders = activeOrders => activeOrders
    .map((order) => {
      const {
        uuid,
        action,
        careSetting,
        dateActivated,
        autoExpireDate,
        drug,
        dose,
        doseUnits,
        frequency,
        route,
        duration,
        durationUnits,
        dosingInstructions,
        quantity,
        quantityUnits,
        dosingType,
        orderer,
        orderNumber,
        status,
      } = order;

      let editClass;
      if (status === 'EDIT' || status === 'DRAFT_EDIT') editClass = 'current-order-color';

      let details;
      if (dosingType === 'org.openmrs.SimpleDosingInstructions') {
        details = (
          <td>

            {drug.display}:
            {` ${dose}`}
            {` ${doseUnits.display}`}
            {`, ${frequency.display}`}
            {`, ${route.display}`}
            {duration && `, for ${duration}`}
            {durationUnits && ` ${durationUnits.display} total`}
            {dosingInstructions && `, (${dosingInstructions})`}
            {(quantity && quantityUnits) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      } else {
        details = (
          <td className={editClass}>

            {drug.display}:
            {dosingInstructions && ` ${dosingInstructions}`}
            {(quantity && quantityUnits) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      }

      let showStatus;

      if (status === 'EDIT' || status === 'DRAFT_EDIT') {
        showStatus = (
          <p> will REVISE </p>
        );
      } else if (status === 'DISCONTINUE') {
        showStatus = (
          <p> will DISCONTINUE </p>
        );
      } else {
        showStatus = (
          <div>
            <a
              id="edit-drug-orders"
              href="#"
              onClick={() => this.props.handleEditActiveDrugOrder(order, details)}
            > <i className="icon-edit" title="Edit" />
            </a>
            <a > <i
              className="icon-remove icon-color"
              title="Discontinue"
              id="delete"
              role="button"
              tabIndex="0"
              onKeyPress={this.handleKeyPress}
              onClick={() => this.onClickDiscontinue(order)} />
            </a>
          </div>
        );
      }

      const { dateFormat } = this.props;

      return (
        <tr key={uuid} >
          <td id="table-font" className={editClass}>
            {format(dateActivated, dateFormat)}
            {autoExpireDate && (`- ${format(autoExpireDate, dateFormat)}`)}
          </td>
          {details}
          <td className="text-center action-padding" >
            {showStatus}
          </td>
        </tr>
      );
    })


  render() {
    const { activeOrders, loading } = this.props.drugOrder;

    if (!activeOrders || loading) {
      return (
        <div className="text-align-center">
          <img src={imageLoader} alt="loader" />
        </div>
      );
    } else if (activeOrders.length === 0) {
      return (
        <div>
          <p>No Active Orders</p>
        </div>
      );
    }
    return (
      <div>
        <table className="table bordered mw-958-px">
          <thead>
            <tr>
              <th className="w-145-px">Date</th>
              <th>Details</th>
              <th className="w-81-px">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.showOrders(activeOrders)}
          </tbody>
        </table>
        {
          this.props.pageCount !== 1 &&
            <div className="clear">
              <div className="float-left-padding">
                {this.props.showResultCount}
              </div>
              <div className="dataTables_paginate">
                <ReactPaginate
                  pageCount={this.state.pageCount}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={3}
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakClassName="text-align-center"
                  initialPage={0}
                  containerClassName="react-paginate-container"
                  pageLinkClassName="page-link"
                  activeClassName="active-link"
                  disabledClassName="active-link"
                  nextLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  onPageChange={this.onPageChange}
                  forcePage={this.state.pageNumber}
                  disableInitialCallback
                />
              </div>
            </div>
        }
      </div>
    );
  }
}

ActiveOrders.defaultProps = {
  showResultCount: 'Showing 1 to 10 of 55 entries',
  pageCount: 0,

};


const mapStateToProps = ({ activeOrderReducer }) => ({
  drugOrder: activeOrderReducer,
  pageCount: activeOrderReducer.pageCount,
  showResultCount: activeOrderReducer.showResultCount,
});

const actionCreators = {
  activeOrderAction,
  addDraftOrder,
  setOrderAction,
};

ActiveOrders.propTypes = {
  handleEditActiveDrugOrder: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  activeOrderAction: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  addDraftOrder: PropTypes.func.isRequired,
  setOrderAction: PropTypes.func.isRequired,
  drugOrder: PropTypes.shape({
    loading: PropTypes.bool,
    activeOrders: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  activeOrders: PropTypes.shape({}).isRequired,
  showResultCount: PropTypes.string,
  pageCount: PropTypes.number,
};

ActiveOrders.defaultProps = {
  drugOrder: {
    loading: false,
    activeOrders: [],
  },
};

export default connect(mapStateToProps, actionCreators)(ActiveOrders);

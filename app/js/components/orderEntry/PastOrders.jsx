import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getPastOrders } from '../../actions/pastOrders';
import PastOrder from './PastOrder';
import imageLoder from '../../../img/loading.gif';

export class PastOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      limit: 10,
      startIndex: 0,
      pageNumber: 0,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.getAllPastOrders(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabName !== this.props.tabName) {
      this.getAllPastOrders(nextProps);
    }
    this.setState({ pageCount: nextProps.pageCount });
  }

  onPageChange({ selected }) {
    let { startIndex, pageNumber } = this.state;
    const { limit } = this.state;

    startIndex = Math.ceil(selected * limit);
    pageNumber = startIndex / limit;

    this.setState(() => ({ startIndex, pageNumber }));
    this.getAllPastOrders(this.props, { limit, startIndex });
  }

  getAllPastOrders=(props, newState) => {
    const { limit, startIndex = 0 } = newState || this.state;

    this.setState(() => ({ startIndex: 0 }));

    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = query.get('patient');
    this.props.getPastOrders(limit, startIndex, patientUuid, props.careSetting.uuid);
  }

  render() {
    const { loading, pastOrders } = this.props.pastOrders;

    if (!pastOrders || loading) {
      return (
        <div className="text-align-center">
          <img src={imageLoder} alt="loader" />
        </div>
      );
    }

    return (
      <div>
        {pastOrders.length > 0 ?
          <div>
            <table className="table bordered mw-958-px">
              <thead>
                <tr>
                  <th className="w-145-px">Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {pastOrders.map(pastOrder =>
                  (<PastOrder
                    dateFormat={this.props.dateFormat}
                    key={pastOrder.uuid}
                    {...pastOrder}
                  />))}
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
                  disableInitialCallback={true} // eslint-disable-line
                    />
                  </div>
                </div>
            }
          </div>
          : <p id="no_past_orders">No Past Orders</p>}
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ pastOrdersReducer }) => ({
  pastOrders: pastOrdersReducer,
  pageCount: pastOrdersReducer.pageCount,
  showResultCount: pastOrdersReducer.pastOrdersResultCount,
});

PastOrders.defaultProps = {
  showResultCount: 'Showing 1 to 10 of 55 entries',
  pageCount: 0,
};

PastOrders.propTypes = {
  getPastOrders: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  dateFormat: PropTypes.string.isRequired,
  showResultCount: PropTypes.string,
  tabName: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  pastOrders: PropTypes.shape({
    loading: PropTypes.bool,
    pastOrders: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default connect(mapStateToProps, { getPastOrders })(PastOrders);

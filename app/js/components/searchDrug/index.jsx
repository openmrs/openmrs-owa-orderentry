import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchDrug } from '../../actions/drug';
import View from './View';

export class SearchDrug extends React.Component {
  search = debounce((text) => {
    this.props.searchDrug(text);
  }, 500);

  searchDrug = (text) => {
    if (text && text.trim().length > 2) {
      this.search(text);
    }
  }

  render() {
    return (
      <View
        searchDrug={this.searchDrug}
        results={this.props.drugSearch.drugs}
        loading={this.props.drugSearch.loading}
        error={this.props.drugSearch.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  drugSearch: state.drugSearchReducer,
});

const actionCreators = {
  searchDrug,
};

SearchDrug.propTypes = {
  drugSearch: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actionCreators)(SearchDrug);

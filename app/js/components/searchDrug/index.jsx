import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchDrug, selectDrug } from '../../actions/drug';
import View from './View';

export class SearchDrug extends React.Component {
  state = {
    focused: false,
    value: "",
  }

  onOptionSelected = (drugUuid, drugName) => {
    this.props.selectDrug(drugUuid);
    this.setState(() => ({
      value: drugName,
      focused: false,
    }));
  }

  onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    this.searchDrug(value);
    this.setState(() => ({
      value,
      focused: true,
    }));
  }

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
        focused={this.state.focused}
        onChange={this.onChange}
        onOptionSelected={this.onOptionSelected}
        results={this.props.drugSearch.drugs}
        loading={this.props.drugSearch.loading}
        error={this.props.drugSearch.error}
        value={this.state.value}
      />
    );
  }
}

const mapStateToProps = state => ({
  drugSearch: state.drugSearchReducer,
});

const actionCreators = {
  searchDrug,
  selectDrug,
};

SearchDrug.propTypes = {
  drugSearch: PropTypes.object.isRequired,
  searchDrug: PropTypes.func.isRequired,
  selectDrug: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(SearchDrug);

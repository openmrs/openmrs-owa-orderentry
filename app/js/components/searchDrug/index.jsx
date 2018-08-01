import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchDrug, selectDrug } from '../../actions/drug';
import View from './View';
import './styles.scss';

export class SearchDrug extends React.Component {
  onOptionSelected = (drugUuid, drugName) => {
    this.props.selectDrug(drugUuid);
    this.props.onSelectDrug(drugName);
  }

  onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    this.searchDrug(value);
    this.props.onChange(value);
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
        focused={this.props.focused}
        onChange={this.onChange}
        onOptionSelected={this.onOptionSelected}
        results={this.props.drugSearch.drugs}
        loading={this.props.drugSearch.loading}
        error={this.props.drugSearch.error}
        value={this.props.drugSearch.selected.display || this.props.value}
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
  onSelectDrug: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired,
  value: PropTypes.string,
};

SearchDrug.defaultProps = {
  value: '',
};

export default connect(mapStateToProps, actionCreators)(SearchDrug);

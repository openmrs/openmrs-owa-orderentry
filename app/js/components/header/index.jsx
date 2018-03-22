import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import View from './View';

import { fetchCurrentSession, fetchLocations, setCurrentLocation } from '../../actions/header';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  componentWillMount() {
    this.props.fetchCurrentSession();
    this.props.fetchLocations();
  }

  toggleState = (key, value) => {
    this.setState(() => ({
      [key]: value || !this.state[key],
    }));
  }

  render() {
    return (
      <div>
        <View
          currentUser={this.props.currentUser}
          locations={this.props.locations}
          currentLocation={this.props.currentLocation}
          setCurrentLocation={this.props.setCurrentLocation}
          toggleState={this.toggleState}
          userDropdown={this.state.userDropdown}
          locationDropdown={this.state.locationDropdown}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentLocation, currentUser } = state.sessionReducer;
  const { locationTags } = state.locationReducer;
  return {
    currentLocation,
    currentUser,
    locations: locationTags,
  };
};

const actionCreators = {
  fetchCurrentSession,
  fetchLocations,
  setCurrentLocation,
};

Header.propTypes = {
  currentUser: PropTypes.string,
  currentLocation: PropTypes.shape().isRequired,
  fetchCurrentSession: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentUser: '',
};

export default connect(mapStateToProps, actionCreators)(Header);

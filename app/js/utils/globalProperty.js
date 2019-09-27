import { globalPropertyActions, selectors } from '@openmrs/react-components';

export const APP_GLOBAL_PROPERTIES = {
  autoExpireTime: "orderentryowa.labOrderAutoExpireTimeInDays",
};

export const loadGlobalProperties = (dispatch) => {
  const properties = Object.values(APP_GLOBAL_PROPERTIES);
  properties.forEach((property) => {
    dispatch(globalPropertyActions.fetchGlobalProperty(property));
  });
};

export const selectProperty = (state, property) => selectors.getGlobalProperty(
  state,
  APP_GLOBAL_PROPERTIES[property],
);

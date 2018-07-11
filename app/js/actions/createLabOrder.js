import 'babel-polyfill';
import randomString, { generate } from 'randomstring';

import loading from './loading';
import axiosInstance from '../config';

import {
  CREATE_LAB_ORDER,
  CREATE_LAB_ORDER_SUCCESS,
  CREATE_LAB_ORDER_FAILURE,
} from './actionTypes';

const createLabOrderFailure = error => ({
  type: CREATE_LAB_ORDER_FAILURE,
  error,
});

const createLabOrderSuccess = data => ({
  type: CREATE_LAB_ORDER_SUCCESS,
  data,
});

const createLabOrder = labOrderData => async (dispatch) => {
  try {
    dispatch(loading(CREATE_LAB_ORDER, true));
    const requestPayload = {
      encounterProviders: [
        {
          encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          provider: 'f9badd80-ab76-11e2-9e96-0800200c9a66',
        },
      ],
      encounterType: '7b68d557-85ef-4fc8-b767-4fa4f5eb5c23',
      location: {
        uuid: 'b1a8b05e-3542-4037-bbd3-998ee9c40574',
        display: 'Inpatient Ward',
        name: 'Inpatient Ward',
        description: null,
        address1: null,
        address2: null,
        cityVillage: null,
        stateProvince: null,
        country: null,
        postalCode: null,
        latitude: null,
        longitude: null,
        countyDistrict: null,
        address3: null,
        address4: null,
        address5: null,
        address6: null,
        tags: [
          {
            uuid: '8d4626ca-7abd-42ad-be48-56767bbcf272',
            display: 'Transfer Location',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8081/openmrs-standalone/ws/rest/v1/locationtag/8d4626ca-7abd-42ad-be48-56767bbcf272',
              },
            ],
          },
          {
            uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
            display: 'Login Location',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8081/openmrs-standalone/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
              },
            ],
          },
          {
            uuid: '1c783dca-fd54-4ea8-a0fc-2875374e9cb6',
            display: 'Admission Location',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8081/openmrs-standalone/ws/rest/v1/locationtag/1c783dca-fd54-4ea8-a0fc-2875374e9cb6',
              },
            ],
          },
        ],
        parentLocation: {
          uuid: 'aff27d58-a15c-49a6-9beb-d30dcfc0c66e',
          display: 'Amani Hospital',
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8081/openmrs-standalone/ws/rest/v1/location/aff27d58-a15c-49a6-9beb-d30dcfc0c66e',
            },
          ],
        },
        childLocations: [],
        retired: false,
        attributes: [],
        address7: null,
        address8: null,
        address9: null,
        address10: null,
        address11: null,
        address12: null,
        address13: null,
        address14: null,
        address15: null,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8081/openmrs-standalone/ws/rest/v1/location/b1a8b05e-3542-4037-bbd3-998ee9c40574',
          },
          {
            rel: 'full',
            uri:
              'http://localhost:8081/openmrs-standalone/ws/rest/v1/location/b1a8b05e-3542-4037-bbd3-998ee9c40574?v=full',
          },
        ],
        resourceVersion: '2.0',
      },
      orders: [
        {
          action: 'NEW',
          asNeeded: true,
          asNeededCondition: 'headache',
          autoExpireDate: null,
          orderReasonNonCoded: null,
          careSetting: '6f0c9a92-6f24-11e3-af88-005056821db0',
          commentToFulfiller: '',
          dose: '1',
          doseUnits: '162371AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          dosingInstructions: null,
          dosingType: 'org.openmrs.SimpleDosingInstructions',
          drug: 'c0efd8b3-491e-4e7f-ac8a-700616b8c540',
          duration: '2',
          durationUnits: '1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          frequency: '160858OFAAAAAAAAAAAAAAA',
          numRefills: 0,
          orderer: 'f9badd80-ab76-11e2-9e96-0800200c9a66',
          previousOrder: null,
          quantity: '1',
          quantityUnits: '162365AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          route: '160240AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          type: 'drugorder',
        },
        {
          action: 'NEW',
          asNeeded: true,
          asNeededCondition: 'headache',
          autoExpireDate: null,
          orderReasonNonCoded: null,
          careSetting: '6f0c9a92-6f24-11e3-af88-005056821db0',
          commentToFulfiller: '',
          dose: '1',
          doseUnits: '162371AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          dosingInstructions: null,
          drug: 'c0efd8b3-491e-4e7f-ac8a-700616b8c540',
          duration: '2',
          durationUnits: '1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          frequency: '160858OFAAAAAAAAAAAAAAA',
          numRefills: 0,
          orderer: 'f9badd80-ab76-11e2-9e96-0800200c9a66',
          previousOrder: null,
          quantity: '1',
          quantityUnits: '162365AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          route: '160240AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          type: 'testorder',
        },
      ],
      patient: '90a2f2cb-588e-49f0-983a-ac46275cb654',
    };
    const response = await axiosInstance.post(`encounter`, requestPayload);
    const { data } = response;
    dispatch(createLabOrderSuccess(data));
    dispatch(loading(CREATE_LAB_ORDER, false));
  } catch (error) {
    dispatch(loading(CREATE_LAB_ORDER, false));
    dispatch(createLabOrderFailure(error.response.data.error.message));
  }
};

export default createLabOrder;

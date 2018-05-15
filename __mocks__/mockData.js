export default {
  defaultLocations: {
    results: {
      locationTags: [],
    },
  },
  defaultNote: {
    results: {
      note: [],
    },
  },
  defaultSession: {
    currentLocation: {
      display: '',
    },
  },
  currentSession: {
    sessionLocation: {
      display: '',
    },
  },
  defaultPatient: {
    patient: {
      person: {
        personName: {
          givenName: '',
          familyName: '',
        },
        preferredAddress: {},
      },
      patientIdentifier: {
        identifier: '',
      },
    },
  },
  defaultCareSetting: {
    patientCareSetting: [],
  },
  defaultDrugs: {
    results: [],
  },
  pastOrders: {},

  encounterTypeValid: {
    results: [
      {
        uuid: '',
        display: '',
      },
    ],
  },
  encounterTypeInvalid: {
    results: [],
  },
  encounterRole: {
    results: [
      {
        uuid: '',
        display: 'Order Signer',
      },
    ],
  },
  defaultpatientActiveOrder: {
    activeOrders: [],
    results: {
      dateActivated: '',
    },
    pageCount: 1,
    showResultCount: 'Showing 1 to 1 of 1 entries',
    totalCount: 1,
  },
  defaultSettingEncounterType: {
    settingEncounterType: '',
    isLoading: false,
    error: '',
  },
  defaultSettingEncounterRole: {
    settingEncounterRole: '',
    isLoading: false,
    roleError: '',
  },
  draftOrder: {},
  editOrder: {},
  draftOrders: [
    {
      action: '',
      drugName: '',
      orderNumber: 3,
    },
  ],
  addedOrder: {
    data: {},
  },
  addedOrderError: {
    data: {},
  },
  allConfigurations: {
    drugDispensingUnits: {},
    drugDosingUnits: {},
    drugRoutes: {},
    durationUnits: {},
    orderFrequencies: {},
  },
  sessionReducer: {
    currentProvider: {
      uuid: '',
    },
    currentLocation: {},
  },
  encounterType: {
    uuid: '',
  },
  orders: [],
  patient: {
    uuid: '',
  },
  careSetting: {
    uuid: '',
  },
};

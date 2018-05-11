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
  encounterTypeInValid: {
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

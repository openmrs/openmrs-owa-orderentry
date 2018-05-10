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
    data: {
      results: [
        {
          uuid: '',
          display: '',
        },
      ],
    },
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
  discontinueOrderReducer: {
    defaultpatientActiveOrder: {
      activeOrders: [],
    },
    pastOrders: {},
    loading: false,
  },
  draftTableReducer: {
    draftOrders: [],
  },
  drugSearchReducer: {
    drugs: [],
    selected: {},
    error: null,
    loading: false,
  },
  encounterReducer: {
    isLoading: false,
    encounterType: {},
    error: null,
  },
  encounterRoleReducer: {
    isLoading: false,
    encounterRole: {},
    error: null,
  },
};

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
  pastOrders: {
    loading: false,
  },

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
    draftDrugOrders: [],
  },
  draftLabOrderReducer: {
    draftLabOrders: [],
    selectedLabPanels: [],
    defaultTests: [],
    selectedTests: [],
    singleTests: [],
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
    errorMessage: '',
  },
  dateFormatReducer: {
    dateFormat: '',
    error: null,
  },
  labOrderables: {
    error: false,
    loading: false,
    orderables: [{}],
  },
  labConcepts: {
    error: null,
    loading: false,
    concepts: [],
    conceptsAsTests: [],
    conceptsAsPanels: [],
  },
  defaultLabOrderable: {
    getLabOrderables: '',
    isLoading: false,
    error: '',
  },
};

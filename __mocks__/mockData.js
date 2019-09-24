export default {
  openmrs: {
    session: {
      locale: 'en',
    },
  },
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
    results: {
      uuid: '',
      display: 'Order Signer',
    },
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
  session: {
    currentProvider: {
      uuid: '',
    },
  },
  draftOrder: {},
  editOrder: {},
  draftOrders: [
    {
      action: '',
      drugName: '',
      orderNumber: 3,
      type: 'drugorder',
    },
    {
      concept: '',
      drugName: '',
      orderNumber: 3,
    },
  ],
  draftDrugOrders: [
    {
      action: 'NEW',
      careSetting: 'aaa1234',
      dosingType: 'org.openmrs.SimpleDosingInstructions',
      drug: 'AJJJKW7378JHJ',
      drugName: 'Paracentamol',
      orderNumber: 1,
      type: 'drugorder',
      orderer: '',
      previousOrder: null,
      dispensingQuantity: '',
      dispensingUnit: 'display',
      dose: '',
      dosingUnit: 'display',
      drugInstructions: '',
      duration: '',
      frequency: 'display',
      reason: '',
      route: 'display',
      durationUnit: 'display',
    },
  ],
  draftLabOrders: {
    orders: [
      {
        concept: '',
        drugName: '',
        orderNumber: 3,
      },
    ],
  },
  freeTextOrder: {
    action: 'NEW',
    drugInstructions: 'After a meal',
    drugName: 'syrup',
    orderNumber: 3,
  },
  standardDoseOrder: {
    action: 'NEW',
    dose: 8,
    dosingUnit: 'kg',
    frequency: 'daily',
    route: 'oral',
    drugInstructions: 'After a meal',
    drugName: 'syrup',
    orderNumber: 4,
  },
  addedOrder: {
    data: {},
  },
  addedOrderError: {
    data: {},
  },
  allConfigurations: {
    drugDispensingUnits: [],
    drugDosingUnits: [],
    drugRoutes: [],
    durationUnits: [],
    orderFrequencies: [],
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
  orders: [
    {
      uuid: '',
      drugName: { drug: { display: '' } },
      action: '',
      dose: '',
      dosingUnit: '',
      frequency: '',
      route: '',
      duration: '',
      durationUnit: '',
      reason: '',
      drugInstructions: '',
      dispensingQuantity: '',
      dispensingUnit: '',
      orderNumber: '',
    },
  ],
  patient: {
    uuid: '',
  },
  careSetting: {
    uuid: '',
  },
  drug: {},
  auditInfo: {},
  dateActivated: '',
  order: {
    uuid: '',
    drugName: { drug: { display: '' } },
    action: '',
    dose: '',
    dosingUnit: '',
    frequency: '',
    route: '',
    duration: '',
    durationUnit: '',
    reason: '',
    drugInstructions: '',
    dispensingQuantity: '',
    dispensingUnit: '',
    orderNumber: '',
    drug: {
      uuid: '',
      display: '',
    },
    careSetting: {
      uuid: '',
    },
    orderer: {
      uuid: '',
    },
    dosingType: 'org.openmrs.SimpleDosingInstructions',
    status: '',
  },
  data: {
    selected: {},
  },
  formType: 'Free Text',
  items: [{ display: 'Procold' }],
  itemName: 'Procold',
  attributes: [],
};

/**
 * This is a data point for the panel and test form field sets,
 * When an API endpoint is provided, it should be replaced with these.
 * * */
export const panelData = [
  {
    id: 1,
    name: 'Hemogram',
    labCategory: 1,
    tests: [
      { id: 1, test: 'Hemoglobin' },
      { id: 3, test: 'blood' },
      { id: 6, test: 'prothrombin' },
    ],
  },
  {
    id: 2,
    name: 'DLC',
    labCategory: 1,
    tests: [
      { id: 2, test: 'Hematocrit' },
      { id: 4, test: 'liver' },
      { id: 5, test: 'sickling' },
    ],
  },
];
export const testsData = [
  { id: 1, test: 'Hemoglobin' },
  { id: 2, test: 'Hematocrit' },
  { id: 3, test: 'blood' },
  { id: 4, test: 'liver' },
  { id: 5, test: 'sickling' },
  { id: 6, test: 'prothrombin' },
  { id: 7, test: 'Electrophore' },
  { id: 8, test: 'HbA1c' },
];
export const labCategories = [
  { id: 1, name: 'blood' },
  { id: 2, name: 'serum' },
  { id: 3, name: 'urine' },
  { id: 4, name: 'semen' },
  { id: 5, name: 'stool' },
  { id: 6, name: 'tissue' },
];

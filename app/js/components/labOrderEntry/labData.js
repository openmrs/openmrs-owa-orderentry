/**
 * This is a data point for the panel and test form field sets,
 * When an API endpoint is provided, it should be replaced with these.
 * * */
export const panelData = [
  {
    id: 1,
    name: 'Hemogram',
    labCategory: 1,
    urgency: 'routine',
    tests: [
      { id: 1, test: 'Hemoglobin', urgency: 'routine' },
      { id: 3, test: 'blood', urgency: 'routine' },
      { id: 6, test: 'prothrombin', urgency: 'routine' },
    ],
  },
  {
    id: 2,
    name: 'DLC',
    labCategory: 1,
    urgency: 'routine',
    tests: [
      { id: 2, test: 'Hematocrit', urgency: 'routine' },
      { id: 4, test: 'liver', urgency: 'routine' },
      { id: 5, test: 'sickling', urgency: 'routine' },
    ],
  },
];
export const testsData = [
  { id: 1, test: 'Hemoglobin', urgency: 'routine' },
  { id: 2, test: 'Hematocrit', urgency: 'routine' },
  { id: 3, test: 'blood', urgency: 'routine' },
  { id: 4, test: 'liver', urgency: 'routine' },
  { id: 5, test: 'sickling', urgency: 'routine' },
  { id: 6, test: 'prothrombin', urgency: 'routine' },
  { id: 7, test: 'Electrophore', urgency: 'routine' },
  { id: 8, test: 'HbA1c', urgency: 'routine' },
];
export const labCategories = [
  { id: 1, name: 'blood' },
  { id: 2, name: 'serum' },
  { id: 3, name: 'urine' },
  { id: 4, name: 'semen' },
  { id: 5, name: 'stool' },
  { id: 6, name: 'tissue' },
];

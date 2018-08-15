module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/templates/',
    '/tests/mocks',
    '/tests/setup.js',
    'app/js/openmrs-owa-orderentry.jsx'
  ],
  testURL: 'http://localhost',
  collectCoverage: true,
  collectCoverageFrom: [
    'app/js/**/*.{js,jsx}'
  ],
  testEnvironment: "jsdom",
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/tests/setup.js',
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

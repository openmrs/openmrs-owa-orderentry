module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/templates/',
    '/tests/mocks',
    '/tests/setup.js',
    '/app/js/openmrs-owa-orderemtry.jsx'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/js/**/*.{js,jsx}'
  ],
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/tests/setup2.js'
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

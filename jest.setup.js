import '@testing-library/jest-dom';

global.console = {
  error: jest.fn(),
  log: console.log, // eslint-disable-line
  warn: console.warn, // eslint-disable-line
};

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Mock scrollIntoView which is not available in jsdom
Element.prototype.scrollIntoView = () => {};

// Cleanup after each test
afterEach(() => {
  cleanup();
});

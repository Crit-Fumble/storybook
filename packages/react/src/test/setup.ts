import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Mock scrollIntoView which is not available in jsdom
Element.prototype.scrollIntoView = () => {};

// Cleanup after each test
afterEach(() => {
  cleanup();
});

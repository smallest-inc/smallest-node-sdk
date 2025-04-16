import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      include: ['./src/tests/**/*.ts'], 
    },
    testTimeout: 100000,
    include: ['./src/tests/waves/**/*.test.ts']
  },
});

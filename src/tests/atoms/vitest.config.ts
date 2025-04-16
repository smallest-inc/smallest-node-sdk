import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      include: ['./src/tests/**/*.ts'], 
    },
    include: ['./src/tests/atoms/**/*.test.ts']
  },
});

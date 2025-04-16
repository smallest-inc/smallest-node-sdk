import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      include: ['./tests/**/*.ts'], 
    },
    include: ['./tests/atoms/**/*.test.ts']
  },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        typecheck: {
            include: ['./tests/**/*.ts'],
        },
        include: ['./tests/atoms/**/*.test.ts']
    },
});

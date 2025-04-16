"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var AtomsClient_1 = require("../../src/atoms/AtomsClient");
var configuration_1 = require("../../src/atoms/configuration");
var ajv_1 = __importDefault(require("ajv"));
(0, vitest_1.describe)('Atoms', function () {
    var configuration = new configuration_1.Configuration({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VlNmQxMzQzMDE4OGYwNGZmNDExNjEiLCJpYXQiOjE3NDM2Nzg3Mzl9.8rZGqx14jWbUMBj2usxSLLEzk75j_zX8xIqDh62C83A',
        basePath: 'https://atoms-api.dev.smallest.ai/api/v1'
    });
    var atomsClient = new AtomsClient_1.AtomsClient(configuration);
    var ajv = new ajv_1.default();
    var agentResponseSchema = {
        type: 'object',
        properties: {
            status: { type: 'boolean', nullable: true },
            data: {
                type: 'object',
                properties: {
                    agents: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                name: { type: 'string' },
                                description: { type: 'string', nullable: true },
                                organization: { type: 'string', nullable: true },
                                workflowId: { type: 'string', nullable: true },
                                createdBy: { type: 'string', nullable: true },
                                globalKnowledgeBaseId: { type: 'string', nullable: true },
                                language: {
                                    type: 'object',
                                    properties: {
                                        enabled: { type: 'string', nullable: true },
                                        switching: { type: 'boolean', nullable: true },
                                        supported: {
                                            type: 'array',
                                            items: { type: 'string' },
                                            nullable: true
                                        }
                                    },
                                    nullable: true
                                },
                                synthesizer: {
                                    type: 'object',
                                    properties: {
                                        voiceConfig: {
                                            type: 'object',
                                            properties: {
                                                model: { type: 'string', nullable: true },
                                                voiceId: { type: 'string', nullable: true },
                                                gender: { type: 'string', nullable: true }
                                            },
                                            nullable: true
                                        },
                                        speed: { type: 'number', nullable: true },
                                        consistency: { type: 'number', nullable: true },
                                        similarity: { type: 'number', nullable: true },
                                        enhancement: { type: 'number', nullable: true }
                                    },
                                    nullable: true
                                },
                                slmModel: { type: 'string', nullable: true },
                                defaultVariables: { type: 'object', nullable: true },
                                createdAt: { type: 'string', nullable: true },
                                updatedAt: { type: 'string', nullable: true }
                            },
                            required: ['_id', 'name']
                        },
                        nullable: true
                    },
                    totalCount: { type: 'number', nullable: true },
                    hasMore: { type: 'boolean', nullable: true },
                    isSearchResults: { type: 'boolean', nullable: true }
                },
                nullable: true
            }
        }
    };
    var currentUserResponseSchema = {
        type: 'object',
        properties: {
            status: { type: 'boolean', nullable: true },
            data: {
                type: 'object',
                properties: {
                    _id: { type: 'string', nullable: true },
                    firstName: { type: 'string', nullable: true },
                    lastName: { type: 'string', nullable: true },
                    userEmail: { type: 'string', nullable: true },
                    authProvider: { type: 'string', nullable: true },
                    isEmailVerified: { type: 'boolean', nullable: true },
                    organizationId: { type: 'string', nullable: true }
                },
                nullable: true
            }
        }
    };
    var validateAgents = ajv.compile(agentResponseSchema);
    var validateCurrentUser = ajv.compile(currentUserResponseSchema);
    (0, vitest_1.it)('should list agents and validate response structure', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, isValid, errorDetails, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, atomsClient.getAgents()];
                case 1:
                    response = _a.sent();
                    isValid = validateAgents(response.data);
                    if (!isValid && validateAgents.errors) {
                        errorDetails = validateAgents.errors.map(function (error) { return ({
                            path: error.instancePath,
                            message: error.message,
                            params: error.params,
                            schemaPath: error.schemaPath
                        }); });
                        console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
                    }
                    (0, vitest_1.expect)(isValid).toBe(true);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error occurred:', error_1);
                    if (error_1 instanceof Error) {
                        console.error('Error message:', error_1.message);
                        console.error('Error stack:', error_1.stack);
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should get current user and validate response structure', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, isValid, errorDetails, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, atomsClient.getCurrentUser()];
                case 1:
                    response = _a.sent();
                    isValid = validateCurrentUser(response.data);
                    if (!isValid && validateCurrentUser.errors) {
                        errorDetails = validateCurrentUser.errors.map(function (error) { return ({
                            path: error.instancePath,
                            message: error.message,
                            params: error.params,
                            schemaPath: error.schemaPath
                        }); });
                        console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
                    }
                    (0, vitest_1.expect)(isValid).toBe(true);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error occurred:', error_2);
                    if (error_2 instanceof Error) {
                        console.error('Error message:', error_2.message);
                        console.error('Error stack:', error_2.stack);
                    }
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); });
});

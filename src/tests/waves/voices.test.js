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
var WavesClient_1 = require("../../src/waves/WavesClient");
var configuration_1 = require("../../src/waves/configuration");
var api_1 = require("../../src/waves/api");
var ajv_1 = __importDefault(require("ajv"));
(0, vitest_1.describe)('Voices', function () {
    var configuration = new configuration_1.Configuration({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyNmI5NjAxYTRlNTMxOWU5OTJjYWMiLCJpYXQiOjE3NDI4OTE5MjZ9.tu78sI2Pg3e7_-ylG78jggjjWrJGA2iI94C_7JG_dUc',
        basePath: 'https://waves-api.smallest.ai'
    });
    var wavesClient = new WavesClient_1.WavesClient(configuration);
    var ajv = new ajv_1.default();
    var voiceResponseSchema = {
        type: 'object',
        properties: {
            voices: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        voiceId: { type: 'string' },
                        displayName: { type: 'string' },
                        tags: {
                            type: 'object',
                            properties: {
                                language: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    nullable: true
                                },
                                accent: { type: 'string', nullable: true },
                                gender: { type: 'string', nullable: true }
                            },
                            nullable: true
                        }
                    },
                    required: ['voiceId', 'displayName']
                },
                nullable: true
            }
        }
    };
    var validate = ajv.compile(voiceResponseSchema);
    (0, vitest_1.it)('should list voices for a model and validate response structure', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, isValid, errorDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wavesClient.getWavesVoices(api_1.GetWavesVoicesModelEnum.Lightning)];
                case 1:
                    response = _a.sent();
                    isValid = validate(response.data);
                    if (!isValid && validate.errors) {
                        errorDetails = validate.errors.map(function (error) { return ({
                            path: error.instancePath,
                            message: error.message,
                            params: error.params,
                            schemaPath: error.schemaPath
                        }); });
                        console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
                    }
                    (0, vitest_1.expect)(isValid).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});

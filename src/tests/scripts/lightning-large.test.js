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
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var WavesClient_1 = require("../../src/waves/WavesClient");
var configuration_1 = require("../../src/waves/configuration");
var fs = require('fs');
var wavefile_1 = require("wavefile");
var eventsource_parser_1 = require("eventsource-parser");
function save(response) {
    return __awaiter(this, void 0, void 0, function () {
        var outputPath;
        return __generator(this, function (_a) {
            outputPath = './test-output-stream.wav';
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var chunks = [];
                    var parser = (0, eventsource_parser_1.createParser)({
                        onEvent: function (event) {
                            if (event.event === 'chunk') {
                                var data = JSON.parse(event.data);
                                console.log('evnt data', data);
                                chunks.push(Buffer.from(data.audio, 'base64'));
                            }
                        }
                    });
                    response.data.on('data', function (chunk) { return parser.feed(chunk.toString()); });
                    response.data.on('end', function () {
                        var concat = Buffer.concat(chunks);
                        console.log('chunks', concat);
                        var wav = new wavefile_1.WaveFile();
                        wav.fromScratch(1, 24000, '16', new Int16Array(concat.buffer));
                        fs.writeFileSync(outputPath, wav.toBuffer());
                        resolve(true);
                    });
                    response.data.on('error', function (error) {
                        console.error('Error processing stream:', error);
                        reject(error);
                    });
                })];
        });
    });
}
vitest_1.describe.only('LightningLarge', function () {
    var configuration = new configuration_1.Configuration({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyNmI5NjAxYTRlNTMxOWU5OTJjYWMiLCJpYXQiOjE3NDI4OTE5MjZ9.tu78sI2Pg3e7_-ylG78jggjjWrJGA2iI94C_7JG_dUc',
        basePath: 'https://waves-api.smallest.ai'
    });
    var wavesClient = new WavesClient_1.WavesClient(configuration);
    // it('should synthesize speech and return audio file', async () => {
    //   try {
    //     const request: LightningLargeRequest = {
    //       text: 'Hello, this is a test',
    //       voice_id: 'roma',
    //       add_wav_header: true,
    //       sample_rate: 24000,
    //       speed: 1.0,
    //       language: 'en',
    //       consistency: 0.5,
    //       similarity: 0.5,
    //       enhancement: 1
    //     };
    //     const response = await wavesClient.synthesizeLightningLargeSpeech(request);
    //     const blob = response.data;
    //     // expect(blob).toBeInstanceOf(Blob);
    //     // expect(blob.type).toBe('audio/wav');
    //   } catch (error) {
    //     console.error('Error in synthesizeLightningLargeSpeech test:', error);
    //     throw error;
    //   }
    // });
    (0, vitest_1.it)('should stream speech synthesis', function () { return __awaiter(void 0, void 0, void 0, function () {
        var request, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    request = {
                        text: 'Hello, I am Roma. How are you doing today? I will be happy to assist you in planning your day, go through your schedule, and help you with any other tasks you need. Let\'s get started! I can help you organize your meetings, set reminders for important deadlines, and make sure you stay on top of your priorities. I\'m also here to answer any questions you might have about time management and productivity. Would you like me to walk you through your calendar for today?',
                        voice_id: 'roma',
                        add_wav_header: true,
                        sample_rate: 24000,
                        speed: 1.0,
                        language: 'en',
                        consistency: 0.5,
                        similarity: 0.5,
                        enhancement: 1
                    };
                    return [4 /*yield*/, wavesClient.streamLightningLargeSpeech(request, { responseType: 'stream' })];
                case 1:
                    response = _a.sent();
                    (0, vitest_1.expect)(response.status).toBe(200);
                    (0, vitest_1.expect)(response.headers['content-type']).toBe('text/event-stream');
                    return [4 /*yield*/, save(response)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error in streamLightningLargeSpeech test:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    }); });
});

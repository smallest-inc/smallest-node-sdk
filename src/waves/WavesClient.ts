import { Configuration } from '../util/configuration';
import { LightningApi } from './api';
import { LightningLargeApi } from './api';
import { VoiceCloningApi } from './api';
import { VoicesApi } from './api';
import { GetWavesVoicesModelEnum } from './api';
import { LightningRequest } from './api';
import { LightningLargeRequest } from './api';
import { DeleteVoiceCloneRequest } from './api';
import { AxiosPromise, RawAxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseAPI } from './base';
import { WaveFile } from 'wavefile';

/**
 * WavesClient - object-oriented interface
 * @export
 * @class WavesClient
 * @extends {BaseAPI}
 */
export class WavesClient extends BaseAPI {
    private lightningApi: LightningApi;
    private lightningLargeApi: LightningLargeApi;
    private voiceCloningApi: VoiceCloningApi;
    private voicesApi: VoicesApi;

    constructor(configuration?: Configuration) {
        super(configuration);
        this.lightningApi = new LightningApi(configuration);
        this.lightningLargeApi = new LightningLargeApi(configuration);
        this.voiceCloningApi = new VoiceCloningApi(configuration);
        this.voicesApi = new VoicesApi(configuration);
    }

    public synthesizeLightningSpeechRaw(lightningRequest: LightningRequest, options?: RawAxiosRequestConfig): AxiosPromise<File> {
        return this.lightningApi.synthesizeLightningSpeech(lightningRequest, options);
    }

    public streamLightningLargeSpeech(lightningLargeRequest: LightningLargeRequest, options?: RawAxiosRequestConfig): AxiosPromise<void> {
        return this.lightningLargeApi.streamLightningLargeSpeech(lightningLargeRequest, options);
    }  

    private synthesizeLightningLargeSpeechRaw(lightningLargeRequest: LightningLargeRequest, options?: RawAxiosRequestConfig): AxiosPromise<File> {
        return this.lightningLargeApi.synthesizeLightningLargeSpeech(lightningLargeRequest, options);
    }

    public addVoiceToModel(displayName: string, file: File, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.voiceCloningApi.addVoiceToModel(displayName, file, options);
    }

    public deleteVoiceClone(deleteVoiceCloneRequest: DeleteVoiceCloneRequest, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.voiceCloningApi.deleteVoiceClone(deleteVoiceCloneRequest, options);
    }

    public getClonedVoices(options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.voiceCloningApi.getClonedVoices(options);
    }

    public getWavesVoices(model: GetWavesVoicesModelEnum, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.voicesApi.getWavesVoices(model, options);
    }

    /**
     * Splits text into chunks based on sentence boundaries and maximum chunk size
     * @private
     */
    private chunkText(text: string, maxChunkSize: number = 250): string[] {
        const SENTENCE_END_REGEX = /.*[-.—!?,;:…।|]$/;
        const chunks: string[] = [];
        
        while (text) {
            if (text.length <= maxChunkSize) {
                chunks.push(text.trim());
                break;
            }

            let chunkText = text.substring(0, maxChunkSize);
            let lastBreakIndex = -1;

            for (let i = chunkText.length - 1; i >= 0; i--) {
                if (SENTENCE_END_REGEX.test(chunkText.substring(0, i + 1))) {
                    lastBreakIndex = i;
                    break;
                }
            }

            if (lastBreakIndex === -1) {
                const lastSpace = chunkText.lastIndexOf(' ');
                if (lastSpace !== -1) {
                    lastBreakIndex = lastSpace;
                } else {
                    lastBreakIndex = maxChunkSize - 1;
                }
            }

            chunks.push(text.substring(0, lastBreakIndex + 1).trim());
            text = text.substring(lastBreakIndex + 1).trim();
        }
        return chunks;
    }

    /**
     * Combines multiple audio buffers into a single ArrayBuffer
     * @private
     */
    private combineAudioBuffers(audioBuffers: ArrayBuffer[], addWavHeader: boolean = false, sampleRate: number = 24000): Promise<ArrayBuffer> {
        const concatenated = Buffer.concat(
            audioBuffers.map(buf => Buffer.from(buf))
        );
        
        if (!addWavHeader) {
            return Promise.resolve(concatenated.buffer);
        }

        const samples = new Int16Array(concatenated.buffer);
        const wav = new WaveFile();
        wav.fromScratch(1, sampleRate, '16', samples);
        return Promise.resolve(wav.toBuffer());
    }

    /**
     * Synthesizes speech from text using Lightning API, handling long text by chunking
     * @public
     */
    public synthesizeLightningSpeech(
        request: LightningRequest,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<ArrayBuffer> {
        const chunks = this.chunkText(request.text);
        const audioBuffers: ArrayBuffer[] = [];

        return Promise.all(chunks.map(chunk => {
            const chunkRequest = { ...request, text: chunk, add_wav_header: false };
            const refinedOptions = { ...options, responseType: 'arraybuffer' as const };
            return this.synthesizeLightningSpeechRaw(chunkRequest, refinedOptions);
        })).then(responses => {
            responses.forEach(response => audioBuffers.push(response.data as unknown as ArrayBuffer));
            return this.combineAudioBuffers(audioBuffers, request.add_wav_header, request.sample_rate);
        }).then(finalBuffer => {
            return Promise.resolve({ data: finalBuffer } as AxiosResponse<ArrayBuffer>);
        });
    }

    /**
     * Synthesizes speech from text using LightningLarge API, handling long text by chunking
     * @public
     */
    public synthesizeLightningLargeSpeech(
        request: LightningLargeRequest,
        options?: RawAxiosRequestConfig
    ): AxiosPromise<ArrayBuffer> {
        const chunks = this.chunkText(request.text);
        const audioBuffers: ArrayBuffer[] = [];

        return Promise.all(chunks.map(chunk => {
            const chunkRequest = { ...request, text: chunk, add_wav_header: false };
            const refinedOptions = { ...options, responseType: 'arraybuffer' as const };
            return this.synthesizeLightningLargeSpeechRaw(chunkRequest, refinedOptions);
        })).then(responses => {
            responses.forEach(response => audioBuffers.push(response.data as unknown as ArrayBuffer));
            return this.combineAudioBuffers(audioBuffers, request.add_wav_header, request.sample_rate);
        }).then(finalBuffer => {
            return Promise.resolve({ data: finalBuffer } as AxiosResponse<ArrayBuffer>);
        });
    }
}

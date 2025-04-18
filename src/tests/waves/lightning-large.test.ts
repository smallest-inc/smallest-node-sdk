import { describe, it, expect } from 'vitest';
import { WavesClient } from '../../waves/WavesClient';
import { Configuration } from '../../util/configuration';
import { LightningLargeRequest } from '../../waves/api';
const fs = require('fs');
import { AxiosResponse } from 'axios';
import { WaveFile } from 'wavefile';
import { createParser, EventSourceMessage } from 'eventsource-parser';

async function save(response: AxiosResponse) {
  const outputPath = './test-output-stream.wav';

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const parser = createParser({
      onEvent: async (event: EventSourceMessage) => {
        if (event.event === 'chunk') {
          const data = JSON.parse(event.data);
          const chunk = Buffer.from(data.audio, 'base64');
          chunks.push(chunk);
        }
      }
    });

    response.data.on('data', (chunk: Buffer) => parser.feed(chunk.toString()));

    response.data.on('end', () => {
      const concat = Buffer.concat(chunks);
      console.log('chunks', concat)
      const wav = new WaveFile();
      wav.fromScratch(1, 24000, '16', new Int16Array(concat.buffer));
      fs.writeFileSync(outputPath, wav.toBuffer());
      resolve(true);
    });

    response.data.on('error', (error: Error) => {
      console.error('Error processing stream:', error);
      reject(error);
    });
  });
}

describe.only('LightningLarge', () => {
  const configuration = new Configuration({
    basePath: 'https://waves-api.smallest.ai'
  });

  const wavesClient = new WavesClient(configuration);

  it('should synthesize speech and return audio file', async () => {
    try {
      const request: LightningLargeRequest = {
        text: 'Hello, this is a test',
        voice_id: 'roma',
        add_wav_header: true,
        sample_rate: 24000,
        speed: 1.0,
        language: 'en',
        consistency: 0.5,
        similarity: 0.5,
        enhancement: 1
      };

      const response = await wavesClient.synthesize("lightning-large", request);

      const blob = response.data;
      // expect(blob).toBeInstanceOf(Blob);
      // expect(blob.type).toBe('audio/wav');
    } catch (error) {
      console.error('Error in synthesizeLightningLargeSpeech test:', error);
      throw error;
    }
  });

  it('should stream speech synthesis', async () => {
    try {
      const request: LightningLargeRequest = {
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

      const response = await wavesClient.synthesizeStream(request);
      
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('text/event-stream');
      // sanity check: test the saved audio file manually
      await save(response);
    } catch (error) {
      console.error('Error in streamLightningLargeSpeech test:', error);
      throw error;
    }
  });
}); 
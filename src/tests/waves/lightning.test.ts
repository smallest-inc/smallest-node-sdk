import { describe, it, expect } from 'vitest';
import { WavesClient } from '../../waves/WavesClient';
import { Configuration } from '../../util/configuration';
import { LightningRequest } from '../../waves/api';
import { WaveFile } from 'wavefile';

describe('Lightning', () => {
  const configuration = new Configuration({
    accessToken: process.env.SMALLEST_API_KEY,
    basePath: 'https://waves-api.smallest.ai'
  });

  const wavesClient = new WavesClient(configuration);

  it('should synthesize speech and return audio file', async () => {
    try {
      const request: LightningRequest = {
        text: 'Hello, I am Rebecca. How are you doing today? I will be happy to assist you in planning your day, go through your schedule, and help you with any other tasks you need. Let\'s get started! I can help you organize your meetings, set reminders for important deadlines, and make sure you stay on top of your priorities. I\'m also here to answer any questions you might have about time management and productivity. Would you like me to walk you through your calendar for today?',
        voice_id: 'rebecca',
        add_wav_header: true,
        sample_rate: 24000,
        speed: 1.0,
        language: 'en'
      };

      const response = await wavesClient.synthesizeLightningSpeech(request);
      expect(response.data).toBeDefined();

      // sanity check: test the saved audio file manually
      const fs = require('fs');
      const outputPath = './test-output.wav';
      fs.writeFileSync(outputPath, response.data);
      console.log(`Audio saved to ${outputPath}`);
    } catch (error) {
      console.error('Error in synthesizeLightningSpeech test:', error);
      throw error;
    }
  });

  it('should synthesize speech and return audio file without wav header', async () => {
    try {
      const request: LightningRequest = {
        text: 'Hello, I am Rebecca. How are you doing today? I will be happy to assist you in planning your day, go through your schedule, and help you with any other tasks you need. Let\'s get started! I can help you organize your meetings, set reminders for important deadlines, and make sure you stay on top of your priorities. I\'m also here to answer any questions you might have about time management and productivity. Would you like me to walk you through your calendar for today?',
        voice_id: 'rebecca',
        sample_rate: 24000,
        speed: 1.0,
        language: 'en'
      };

      const response = await wavesClient.synthesizeLightningSpeech(request);
      expect(response.data).toBeDefined();

      // sanity check: test the saved audio file manually
      const fs = require('fs');
      const outputPath = './test-output-no-wav-header.wav';

      const wav = new WaveFile();
      wav.fromScratch(1, 24000, '16', new Int16Array(response.data));
      fs.writeFileSync(outputPath, wav.toBuffer());
      console.log(`Audio saved to ${outputPath}`);
    } catch (error) {
      console.error('Error in synthesizeLightningSpeech test:', error);
      throw error;
    }
  });
});
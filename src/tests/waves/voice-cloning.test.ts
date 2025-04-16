import { describe, it, expect } from 'vitest';
import { WavesClient } from '../../waves/WavesClient';
import { Configuration } from '../../util/configuration';
import * as fs from 'fs';
import { Readable } from 'stream';
import Ajv from 'ajv';
import type { JSONSchemaType } from 'ajv';
import axios from 'axios';
const FormData = require('form-data');

import { AddVoiceToModel200Response, DeleteVoiceClone200Response, GetClonedVoices200Response, GetClonedVoices200ResponseVoicesInner } from '../../waves/api';

declare global {
  var tempVoiceId: string;
}

describe('Voice Cloning', () => {
  const configuration =  new Configuration({
    accessToken: process.env.SMALLEST_API_KEY,
    basePath: 'https://waves-api.smallest.ai'
  });

  const wavesClient = new WavesClient(configuration);
  const ajv = new Ajv();

  const addVoiceResponseSchema: JSONSchemaType<AddVoiceToModel200Response> = {
    type: 'object',
    properties: {
      message: { type: 'string', nullable: true },
      data: {
        type: 'object',
        properties: {
          voiceId: { type: 'string' },
          model: { type: 'string' },
          status: { type: 'string' }
        },
        required: ['voiceId', 'model', 'status'],
        nullable: true
      }
    }
  };

  const getVoicesResponseSchema: JSONSchemaType<GetClonedVoices200Response> = {
    type: 'object',
    properties: {
      voices: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            voiceId: { type: 'string' },
            displayName: { type: 'string' },
            accent: { type: 'string', nullable: true },
            tags: { 
              type: 'array',
              items: { type: 'string' },
              nullable: true
            },
            model: { type: 'string', nullable: true },
            status: { type: 'string', nullable: true },
            createdAt: { type: 'string', nullable: true }
          },
          required: ['voiceId', 'displayName']
        },
        nullable: true
      }
    }
  };

  const deleteVoiceResponseSchema: JSONSchemaType<DeleteVoiceClone200Response> = {
    type: 'object',
    properties: {
      success: { type: 'boolean', nullable: true },
      voiceId: { type: 'string' }
    },
    required: ['voiceId']
  };

  const validateAddVoice = ajv.compile(addVoiceResponseSchema);
  const validateGetVoices = ajv.compile(getVoicesResponseSchema);
  const validateDeleteVoice = ajv.compile(deleteVoiceResponseSchema);

  it('should add a new voice and validate response structure', async () => {
    try {
      const filePath = './tests/waves/voice-for-cloning.wav';
      const fileContent = fs.readFileSync(filePath);
      const file = new File([fileContent], './tests/waves/voice-for-cloning.wav', { type: 'audio/wav' });

      const response = await wavesClient.addVoiceToModel('Test Voice', file, {});
      
      const isValid = validateAddVoice(response.data);
      if (!isValid && validateAddVoice.errors) {
        console.error('Validation errors:', validateAddVoice.errors);
      }
      expect(isValid).toBe(true);
    } catch (error) {
      console.error('Error in addVoiceToModel test:', error);
      throw error;
    }
  });

  it('should list voices and validate response structure', async () => {
    try {
      const response = await wavesClient.getClonedVoices();
      
      const isValid = validateGetVoices(response.data);
      if (!isValid && validateGetVoices.errors) {
        console.error('Validation errors:', validateGetVoices.errors);
      }
      expect(isValid).toBe(true);
    } catch (error) {
      console.error('Error in getClonedVoices test:', error);
      throw error;
    }
  });

  it('should delete a voice and validate response structure', async () => {
    try {
      // Create a FormData object for adding test voice
      const formData = new FormData();
      formData.append('displayName', 'Test Voice');
      const fileStream = fs.createReadStream('./tests/waves/voice-for-cloning.wav');
      formData.append('file', fileStream);

      // Add a new voice first that we'll then delete
      const addResponse = await axios.post(
        'https://waves-api.smallest.ai/api/v1/lightning-large/add_voice',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${process.env.SMALLEST_API_KEY}`,
            ...formData.getHeaders()
          },
          timeout: 50000
        }
      );

      const voiceIdToDelete = addResponse.data.data.voiceId;

      // Now proceed with delete test using the created voice ID
      const response = await wavesClient.deleteVoiceClone({ voiceId: voiceIdToDelete });
      
      const isValid = validateDeleteVoice(response.data);
      if (!isValid && validateDeleteVoice.errors) {
        console.error('Validation errors:', validateDeleteVoice.errors);
      }
      expect(isValid).toBe(true);
    } catch (error) {
      console.error('Error in deleteVoiceClone test:', error);
      throw error;
    }
  });
});

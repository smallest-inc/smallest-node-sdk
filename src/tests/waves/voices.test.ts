import { describe, it, expect } from 'vitest';
import { WavesClient } from '../../waves/WavesClient';
import { Configuration } from '../../waves/configuration';
import { GetWavesVoices200Response, GetWavesVoicesModelEnum } from '../../waves/api';
import Ajv from 'ajv';
import type { JSONSchemaType } from 'ajv';

describe('Voices', () => {
  const configuration = new Configuration({
    accessToken: process.env.SMALLEST_API_KEY,
    basePath: 'https://waves-api.smallest.ai'
  });

  const wavesClient = new WavesClient(configuration);
  const ajv = new Ajv();

  const voiceResponseSchema: JSONSchemaType<GetWavesVoices200Response> = {
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

  const validate = ajv.compile(voiceResponseSchema);

  it('should list voices for a model and validate response structure', async () => {
    const response = await wavesClient.getWavesVoices(GetWavesVoicesModelEnum.Lightning);
    
    const isValid = validate(response.data);
    
    if (!isValid && validate.errors) {
      const errorDetails = validate.errors.map(error => ({
        path: error.instancePath,
        message: error.message,
        params: error.params,
        schemaPath: error.schemaPath
      }));
      console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
    }
    
    expect(isValid).toBe(true);
  });
});

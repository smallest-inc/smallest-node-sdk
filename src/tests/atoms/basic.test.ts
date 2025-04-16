import { describe, it, expect } from 'vitest';
import { AtomsClient } from '../../atoms/AtomsClient';
import { Configuration } from '../../util/configuration';
import { AgentDTO, GetAgents200Response, GetCurrentUser200Response } from '../../atoms/api';
import Ajv from 'ajv';
import type { JSONSchemaType } from 'ajv';

describe('Atoms', () => {
  const configuration = new Configuration({
    basePath: 'https://atoms-api.dev.smallest.ai/api/v1'
  });

  const atomsClient = new AtomsClient(configuration);
  const ajv = new Ajv();

  const agentResponseSchema: JSONSchemaType<GetAgents200Response> = {
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

  const currentUserResponseSchema: JSONSchemaType<GetCurrentUser200Response> = {
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

  const validateAgents = ajv.compile(agentResponseSchema);
  const validateCurrentUser = ajv.compile(currentUserResponseSchema);

  it('should list agents and validate response structure', async () => {
    try {
      const response = await atomsClient.getAgents();
      const isValid = validateAgents(response.data);
      
      if (!isValid && validateAgents.errors) {
        const errorDetails = validateAgents.errors.map(error => ({
          path: error.instancePath,
          message: error.message,
          params: error.params,
          schemaPath: error.schemaPath
        }));
        console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
      }
      
      expect(isValid).toBe(true);
    } catch (error) {
      console.error('Error occurred:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  });

  it('should get current user and validate response structure', async () => {
    try {
      const response = await atomsClient.getCurrentUser();
      const isValid = validateCurrentUser(response.data);
      
      if (!isValid && validateCurrentUser.errors) {
        const errorDetails = validateCurrentUser.errors.map(error => ({
          path: error.instancePath,
          message: error.message,
          params: error.params,
          schemaPath: error.schemaPath
        }));
        console.error('Validation errors:', JSON.stringify(errorDetails, null, 2));
      }
      
      expect(isValid).toBe(true);
    } catch (error) {
      console.error('Error occurred:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  });
});

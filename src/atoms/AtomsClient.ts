import { Configuration } from './configuration';
import { AgentTemplatesApi } from './api';
import { AgentsApi } from './api';
import { CallsApi } from './api';
import { CampaignsApi } from './api';
import { KnowledgeBaseApi } from './api';
import { LogsApi } from './api';
import { OrganizationApi } from './api';
import { UserApi } from './api';
import { AxiosPromise, RawAxiosRequestConfig } from 'axios';
import { BaseAPI } from './base';

/**
 * AtomsClient - object-oriented interface
 * @export
 * @class AtomsClient
 * @extends {BaseAPI}
 */
export class AtomsClient extends BaseAPI {
    private agentTemplatesApi: AgentTemplatesApi;
    private agentsApi: AgentsApi;
    private callsApi: CallsApi;
    private campaignsApi: CampaignsApi;
    private knowledgeBaseApi: KnowledgeBaseApi;
    private logsApi: LogsApi;
    private organizationApi: OrganizationApi;
    private userApi: UserApi;

    constructor(configuration?: Configuration) {
        super(configuration);
        this.agentTemplatesApi = new AgentTemplatesApi(configuration);
        this.agentsApi = new AgentsApi(configuration);
        this.callsApi = new CallsApi(configuration);
        this.campaignsApi = new CampaignsApi(configuration);
        this.knowledgeBaseApi = new KnowledgeBaseApi(configuration);
        this.logsApi = new LogsApi(configuration);
        this.organizationApi = new OrganizationApi(configuration);
        this.userApi = new UserApi(configuration);
    }

    // Agent Templates API methods
    public createAgentFromTemplate(createAgentFromTemplateRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentTemplatesApi.createAgentFromTemplate(createAgentFromTemplateRequest, options);
    }

    public getAgentTemplates(options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentTemplatesApi.getAgentTemplates(options);
    }

    // Agents API methods
    public createAgent(createAgentRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentsApi.createAgent(createAgentRequest, options);
    }

    public deleteAgent(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentsApi.deleteAgent(id, options);
    }

    public getAgentById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentsApi.getAgentById(id, options);
    }

    public getAgents(page?: number, offset?: number, search?: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentsApi.getAgents(page, offset, search, options);
    }

    public updateAgent(id: string, updateAgentRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.agentsApi.updateAgent(id, updateAgentRequest, options);
    }

    // Calls API methods
    public startOutboundCall(startOutboundCallRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.callsApi.startOutboundCall(startOutboundCallRequest, options);
    }

    // Campaigns API methods
    public createCampaign(createCampaignRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.createCampaign(createCampaignRequest, options);
    }

    public deleteCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.deleteCampaign(id, options);
    }

    public getCampaignById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.getCampaignById(id, options);
    }

    public getCampaigns(getCampaignsRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.getCampaigns(getCampaignsRequest, options);
    }

    public pauseCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.pauseCampaign(id, options);
    }

    public startCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.campaignsApi.startCampaign(id, options);
    }

    // Knowledge Base API methods
    public createKnowledgeBase(createKnowledgeBaseRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.createKnowledgeBase(createKnowledgeBaseRequest, options);
    }

    public deleteKnowledgeBase(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.deleteKnowledgeBase(id, options);
    }

    public deleteKnowledgeBaseItem(knowledgeBaseId: string, knowledgeBaseItemId: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.deleteKnowledgeBaseItem(knowledgeBaseId, knowledgeBaseItemId, options);
    }

    public getKnowledgeBaseById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.getKnowledgeBaseById(id, options);
    }

    public getKnowledgeBaseItems(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.getKnowledgeBaseItems(id, options);
    }

    public getKnowledgeBases(options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.getKnowledgeBases(options);
    }

    public uploadMediaToKnowledgeBase(id: string, media: File, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.uploadMediaToKnowledgeBase(id, media, options);
    }

    public uploadTextToKnowledgeBase(id: string, uploadTextToKnowledgeBaseRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.knowledgeBaseApi.uploadTextToKnowledgeBase(id, uploadTextToKnowledgeBaseRequest, options);
    }

    // Logs API methods
    public getConversationLogs(id: string, options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.logsApi.getConversationLogs(id, options);
    }

    // Organization API methods
    public getOrganization(options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.organizationApi.getOrganization(options);
    }

    // User API methods
    public getCurrentUser(options?: RawAxiosRequestConfig): AxiosPromise<any> {
        return this.userApi.getCurrentUser(options);
    }
}

import { Configuration } from '../util/configuration';
import { 
    AgentTemplatesApi, 
    GetCurrentUser200ResponseData,
    GetOrganization200ResponseData,
    GetConversationLogs200ResponseData,
    StartOutboundCall200ResponseData,
    CreateCampaign201ResponseData,
    GetCampaignById200ResponseData,
    GetCampaigns200ResponseDataInner,
    GetKnowledgeBaseById200Response,
    GetKnowledgeBases200Response,
    GetKnowledgeBaseItems200Response,
    GetAgentTemplates200ResponseDataInner,
    AgentDTO
} from './api';
import { AgentsApi } from './api';
import { CallsApi } from './api';
import { CampaignsApi } from './api';
import { KnowledgeBaseApi } from './api';
import { LogsApi } from './api';
import { OrganizationApi } from './api';
import { UserApi } from './api';
import { AxiosPromise, AxiosResponse, RawAxiosRequestConfig } from 'axios';
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
    public createAgentFromTemplate(createAgentFromTemplateRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<string> {
        return this.agentTemplatesApi.createAgentFromTemplate(createAgentFromTemplateRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<string>);
        });
    }

    public getAgentTemplates(options?: RawAxiosRequestConfig): AxiosPromise<Array<GetAgentTemplates200ResponseDataInner>> {
        return this.agentTemplatesApi.getAgentTemplates(options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<Array<GetAgentTemplates200ResponseDataInner>>);
        });
    }

    // Agents API methods
    public createAgent(createAgentRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<string> {
        return this.agentsApi.createAgent(createAgentRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<string>);
        });
    }

    public deleteAgent(id: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.agentsApi.deleteAgent(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public getAgentById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<AgentDTO> {
        return this.agentsApi.getAgentById(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<AgentDTO>);
        });
    }

    public getAgents(page?: number, offset?: number, search?: string, options?: RawAxiosRequestConfig): AxiosPromise<Array<AgentDTO>> {
        return this.agentsApi.getAgents(page, offset, search, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<Array<AgentDTO>>);
        });
    }

    public updateAgent(id: string, updateAgentRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<string> {
        return this.agentsApi.updateAgent(id, updateAgentRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<string>);
        });
    }

    // Calls API methods
    public startOutboundCall(startOutboundCallRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<StartOutboundCall200ResponseData> {
        return this.callsApi.startOutboundCall(startOutboundCallRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<StartOutboundCall200ResponseData>);
        });
    }

    // Campaigns API methods
    public createCampaign(createCampaignRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<CreateCampaign201ResponseData> {
        return this.campaignsApi.createCampaign(createCampaignRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<CreateCampaign201ResponseData>);
        });
    }

    public deleteCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.campaignsApi.deleteCampaign(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public getCampaignById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<GetCampaignById200ResponseData> {
        return this.campaignsApi.getCampaignById(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetCampaignById200ResponseData>);
        });
    }

    public getCampaigns(getCampaignsRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<Array<GetCampaigns200ResponseDataInner>> {
        return this.campaignsApi.getCampaigns(getCampaignsRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<Array<GetCampaigns200ResponseDataInner>>);
        });
    }

    public pauseCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.campaignsApi.pauseCampaign(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public startCampaign(id: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.campaignsApi.startCampaign(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    // Knowledge Base API methods
    public createKnowledgeBase(createKnowledgeBaseRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<string> {
        return this.knowledgeBaseApi.createKnowledgeBase(createKnowledgeBaseRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<string>);
        });
    }

    public deleteKnowledgeBase(id: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.knowledgeBaseApi.deleteKnowledgeBase(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public deleteKnowledgeBaseItem(knowledgeBaseId: string, knowledgeBaseItemId: string, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.knowledgeBaseApi.deleteKnowledgeBaseItem(knowledgeBaseId, knowledgeBaseItemId, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public getKnowledgeBaseById(id: string, options?: RawAxiosRequestConfig): AxiosPromise<GetKnowledgeBaseById200Response> {
        return this.knowledgeBaseApi.getKnowledgeBaseById(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetKnowledgeBaseById200Response>);
        });
    }

    public getKnowledgeBases(options?: RawAxiosRequestConfig): AxiosPromise<GetKnowledgeBases200Response> {
        return this.knowledgeBaseApi.getKnowledgeBases(options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetKnowledgeBases200Response>);
        });
    }

    public getKnowledgeBaseItems(id: string, options?: RawAxiosRequestConfig): AxiosPromise<GetKnowledgeBaseItems200Response> {
        return this.knowledgeBaseApi.getKnowledgeBaseItems(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetKnowledgeBaseItems200Response>);
        });
    }

    public uploadMediaToKnowledgeBase(id: string, media: File, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.knowledgeBaseApi.uploadMediaToKnowledgeBase(id, media, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    public uploadTextToKnowledgeBase(id: string, uploadTextToKnowledgeBaseRequest: any, options?: RawAxiosRequestConfig): AxiosPromise<boolean> {
        return this.knowledgeBaseApi.uploadTextToKnowledgeBase(id, uploadTextToKnowledgeBaseRequest, options).then((response) => {
            return Promise.resolve({
                data: response.data.status,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<boolean>);
        });
    }

    // Logs API methods
    public getConversationLogs(id: string, options?: RawAxiosRequestConfig): AxiosPromise<GetConversationLogs200ResponseData> {
        return this.logsApi.getConversationLogs(id, options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetConversationLogs200ResponseData>);
        });
    }

    // Organization API methods
    public getOrganization(options?: RawAxiosRequestConfig): AxiosPromise<GetOrganization200ResponseData> {
        return this.organizationApi.getOrganization(options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetOrganization200ResponseData>);
        });
    }

    // User API methods
    public getCurrentUser(options?: RawAxiosRequestConfig): AxiosPromise<GetCurrentUser200ResponseData> {
        return this.userApi.getCurrentUser(options).then((response) => {
            return Promise.resolve({
                data: response.data.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: response.config
            } as AxiosResponse<GetCurrentUser200ResponseData>);
        });
    }
}

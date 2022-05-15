import { TokenInfo } from './token';

export interface AuthenticateGatewayDto {
    secret: string;
}

export interface CreateGatewayDto {
    name: string;
}

export interface GatewayInfo extends TokenInfo {
    id: string;
    workspaceId: string;
}

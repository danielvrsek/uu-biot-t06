import { Gateway } from 'dataLayer/entities/gateway.entity';
import { TokenInfo } from './token';

export interface AuthenticateGatewayDto {
    secret: string;
}

export interface CreateGatewayDto {
    name: string;
}

export interface CreateGatewayResult {
    gateway: Gateway;
    secret: string;
}

export interface GatewayInfo extends TokenInfo {
    id: string;
    workspaceId: string;
}

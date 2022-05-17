import { WorkspaceRepository } from 'dataLayer/repositories/workspace.repository';
import { Cookies } from '../common/cookies';

export class CookieHelper {
    constructor(private readonly workspaceRepository: WorkspaceRepository) {}

    async getCurrentUserWorkspaceIdAsync(request) {
        const workspaceId = request.cookies[Cookies.CurrentWorkspace];
        if (!workspaceId) {
            return undefined;
        }

        return workspaceId;
    }
}

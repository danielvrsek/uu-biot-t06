import { Cookies } from '../common/cookies';

export class CookieHelper {
    getCurrentUserWorkspaceId(request) {
        return request.cookies[Cookies.CurrentWorkspace];
    }
}

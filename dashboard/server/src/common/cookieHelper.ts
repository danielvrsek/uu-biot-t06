import { Cookies } from './cookies';

export class CookieHelper {
    getCurrentUserWorkspaceId(request) {
        return request.cookies[Cookies.CurrentWorkspace];
    }
}

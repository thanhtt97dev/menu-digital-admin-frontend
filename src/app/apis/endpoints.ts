import { environment } from "src/environments/environment"

enum API_VERSION {
    VERSION_1 = "v1"
};

const SLASH = "/"

const url = `${environment.baseUrl}${SLASH}api${SLASH}${API_VERSION.VERSION_1}${SLASH}`

export const enpoints = {
    AUTH: url + "auth" + SLASH,
    USER: url + "user" + SLASH,
}
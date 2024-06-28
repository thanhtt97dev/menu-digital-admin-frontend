import { environment } from "src/environments/environment"

const SLASH = "/"

const url = `${environment.api}${SLASH}api${SLASH}${environment.apiVersion}${SLASH}`

export const enpoints = {
    AUTH: url + "auth",
    USER: url + "user"
}
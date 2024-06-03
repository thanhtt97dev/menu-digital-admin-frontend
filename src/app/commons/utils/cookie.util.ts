import { getCookie, setCookie } from 'typescript-cookie'

export function getAccssetToken() : string | undefined{
    return getCookie('_token')
}
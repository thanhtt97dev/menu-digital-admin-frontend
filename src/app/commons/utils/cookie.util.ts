import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { COOKIE } from '../constants/application.constant'

export function getAccessToken() : string | undefined{
    return getCookie(COOKIE.ACCESS_TOKEN)
}

export function setAccessToken(token : string):void{
    setCookie(COOKIE.ACCESS_TOKEN, token, {expires: 1})
}

export function getRefreshToken() : string | undefined{
    return getCookie(COOKIE.REFRESH_TOKEN)
}

export function setRefreshToken(token : string):void{
    setCookie(COOKIE.REFRESH_TOKEN, token, {expires: 1})
}

export function getUserId(){
    getCookie(COOKIE.USER_ID)
}

export function setUserId(userId: string){
    setCookie(COOKIE.USER_ID, userId, {expires: 1})
}

export function removeAuthentication():void{
    removeCookie(COOKIE.ACCESS_TOKEN)
    removeCookie(COOKIE.REFRESH_TOKEN)
    removeCookie(COOKIE.USER_ID)
}

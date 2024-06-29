import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { COOKIE } from '../constants/application.constant'
import { UserSession } from '@/models/user/user-session-model'

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

export function getUserInCookie(){
    return getCookie(COOKIE.USER)
}

export function setUserInCookie(user: UserSession):void{
    setCookie(COOKIE.USER, JSON.stringify(user))
}

export function removeUserInCookie():void{
    removeCookie(COOKIE.USER)
}

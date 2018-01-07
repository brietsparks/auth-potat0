import decode from 'jwt-decode'

import { TokenPayload } from './types'

export const LOGIN_DESTINATION_KEY = 'login_destination'
export const ACCESS_TOKEN_KEY = 'access_token'
export const ACCESS_TOKEN_EXPIRY_KEY = 'access_token_expires_at'

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY)

export const getAccessTokenExpiry = (): number | null => {
  const token = getAccessToken()

  if (!token) {
    return null
  }

  const decoded: TokenPayload = decode(token)

  return decoded.exp
}

export const getAccessTokenTTL = (): number | null => {
  const expiresAt = getAccessTokenExpiry()

  if (getAccessToken() && expiresAt) {
    return expiresAt - Date.now()
  }

  return null
}

export const accessTokenIsFresh = (): Boolean => {
  return !!getAccessToken() && !!getAccessTokenTTL() && (getAccessTokenTTL() as number) > 0
}

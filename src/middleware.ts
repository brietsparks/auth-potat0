import { addTimeout } from 'redux-timeout'
import decode from 'jwt-decode'

import { Action, TokenPayload } from './types'
import { logout, setUserId, authenticationAttempted, types as actionTypes } from './actions'
import { accessTokenIsFresh, getAccessTokenTTL, getAccessToken } from './storage'

export const onAttemptAuthentication = () => (store: any) => (next: any) => (
  action: Partial<Action>
) => {
  if (action.type === actionTypes.ATTEMPT_AUTHENTICATION) {
    const { dispatch } = store

    if (accessTokenIsFresh()) {
      dispatch(
        addTimeout(() => getAccessTokenTTL(), actionTypes.AUTHENTICATION_ATTEMPTED, () =>
          dispatch(logout())
        )
      )

      const decoded: TokenPayload = decode(getAccessToken() as string)

      dispatch(setUserId(decoded.sub))
    } else {
      dispatch(logout())
    }

    dispatch(authenticationAttempted())
  }

  next(action)
}

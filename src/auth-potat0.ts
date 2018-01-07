import * as rt from 'redux-timeout'
const { reduxTimeout } = rt

export { default as reducer } from './reducer'

import { onAttemptAuthentication } from './middleware'
export const middleware = {
  onAttemptAuthentication,
  reduxTimeout
}

import * as actions from './actions'
export { actions }

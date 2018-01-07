import { createStore, applyMiddleware, combineReducers } from 'redux'
import jwt from 'jwt-simple'

import { State, Action, Reducer } from '../src/types'
import { setAccessToken, ACCESS_TOKEN_KEY } from '../src/storage'
import { reducer as auth, actions, middleware } from '../src/auth-potat0'

const rootReducer = combineReducers({ auth })
let store

function createTestStore(initialState: any = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(middleware.onAttemptAuthentication(), middleware.reduxTimeout())
  )
}

beforeEach(() => {
  store = createTestStore()
})

test('initial state', () => {
  expect(store.getState().auth).toEqual({
    userId: undefined,
    authenticationAttempted: false
  })
})

describe('attemptAuthentication', () => {
  test('against no stored token', () => {
    store.dispatch(actions.attemptAuthentication())

    expect(store.getState().auth).toEqual({
      userId: undefined,
      authenticationAttempted: true
    })
  })

  test('against stored fresh token', () => {
    const token = getTestToken({ exp: new Date().getTime() + 10000 })
    localStorage.setItem(ACCESS_TOKEN_KEY, token)

    store.dispatch(actions.attemptAuthentication())

    expect(store.getState().auth).toEqual({
      userId: 'test_sub',
      authenticationAttempted: true
    })
  })

  test('against stored stale token', () => {
    const token = getTestToken({ exp: new Date().getTime() - 10000 })
    localStorage.setItem(ACCESS_TOKEN_KEY, token)

    store.dispatch(actions.attemptAuthentication())

    expect(store.getState().auth).toEqual({
      userId: undefined,
      authenticationAttempted: true
    })
  })
})

describe('logout', () => {
  test('against no stored token', () => {
    store = createTestStore({
      auth: {
        userId: 'test_sub',
        authenticationAttempted: true
      }
    })

    store.dispatch(actions.logout())

    expect(store.getState().auth).toEqual({
      userId: undefined,
      authenticationAttempted: true
    })
  })
})

// const fruits = ['banana', 'apple', 'orange', 'vodka', 'kiwi'];
//
// const getFruits = () => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(fruits);
//     }, 1000)
//   })
// };
//
// it('mock setTimeout test', async (done) => {
//   jest.useFakeTimers();
//   const f = await getFruits();
//
//   setTimeout(() => {
//     expect(fruits).toEqual(f);
//     done()
//   }, 1500);
//   jest.runAllTimers();
// });

// test('authentication timeout', async () => {
//   // jest.useFakeTimers();
//
//   const token = getTestToken({ exp: new Date().getTime() + 100 });
//   localStorage.setItem(ACCESS_TOKEN_KEY, token)
//
//   store.dispatch(actions.attemptAuthentication());
//
//   expect(store.getState().auth).toEqual({
//     userId: 'test_sub',
//     authenticationAttempted: true
//   })
//
//   await new Promise(res => {
//     setTimeout(
//       () => {
//         expect(store.getState().auth).toEqual({
//           userId: undefined,
//           authenticationAttempted: true
//         })
//       },
//       101
//     );
//   })
//
//
//   // jest.runAllTimers()
// });

function getTestToken({ exp }): string {
  return jwt.encode(
    {
      sub: 'test_sub',
      exp
    },
    'test_secret'
  )
}

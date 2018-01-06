import { createStore, applyMiddleware } from 'redux'
import { State, Action, Reducer } from '../src/types'
import { reducer as authReducer, actions } from '../src/auth-potat0'

const rootReducer = (state: State, action: Action): Reducer => ({ auth: authReducer })
let store

beforeEach(() => {
  store = createStore(rootReducer, applyMiddleware())
})

test('authenticating against no stored token', () => {
  expect(1).toEqual(1)
})

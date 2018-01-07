export type Action = { type: string; payload: any }
export type Map<T> = { [key: string]: any }
export type State<T> = Map<T>
export type Reducer<T> = (state: State<T>, action: Action) => State<T>

export interface AuthState {
  userId: string | undefined
  authenticationAttempted: boolean
}

export type AuthReducer = (state: AuthState, action: Action) => AuthState

export interface TokenPayload {
  sub: string
  exp: number
}

export type Action = { type: string; payload: any }
export type Map<T> = { [key: string]: any }
export type State<T> = Map<T>
export type Reducer<T> = (state: State<T>, action: Action) => State<T>

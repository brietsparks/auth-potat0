export type State<T> = Map<T>
export type Reducer<T> = (state: State<T>, action: Action) => State<T>

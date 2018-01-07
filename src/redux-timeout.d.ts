declare module 'redux-timeout' {
  export function addTimeout(
    // todo: figure out signature (also see mw)
    timeout: () => number | null,
    action: string,
    toCall: (...args: any[]) => any
  ): {
    type: string
    payload: {
      timeout: number
      action: string
      toCall: (...args: any[]) => any
    }
  }

  export function reduxTimeout(): ((store: any) => (next: any) => any)
}

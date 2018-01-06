declare module 'redux-timeout' {
  function addTimeout(
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
}

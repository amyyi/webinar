export type Api<Params, Resp> = (payload: Params) => Promise<Resp>

export interface WebError extends Error {
  code: string
  message: string
}

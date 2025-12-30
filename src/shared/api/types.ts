export interface ResponseType<T = unknown> {
  code: string
  message: string
  data: T
}

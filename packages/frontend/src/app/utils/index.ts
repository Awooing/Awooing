import { Ref } from 'vue'

export const promisedBoolRefTrue = <
  TPromise extends Promise<unknown> = Promise<unknown>
>(
  promise: TPromise,
  ref: Ref<boolean>
): TPromise => {
  ref.value = false
  promise.then(() => (ref.value = true))
  return promise
}

export const promisedBoolRefFalse = <
  TPromise extends Promise<unknown> = Promise<unknown>
>(
  promise: TPromise,
  ref: Ref<boolean>
): TPromise => {
  ref.value = true
  promise.then(() => (ref.value = false))
  return promise
}

export const admin = (...str: string[]) => ['[Admin]', ...str].join(' ')

import { Ref } from "vue"

export const promisedBoolRefTrue = (
  promise: Promise<unknown>,
  ref: Ref<boolean>
) => {
  ref.value = false
  promise.then(() => (ref.value = true))
  return promise
}

export const promisedBoolRefFalse = (
  promise: Promise<unknown>,
  ref: Ref<boolean>
) => {
  ref.value = true
  promise.then(() => (ref.value = false))
  return promise
}

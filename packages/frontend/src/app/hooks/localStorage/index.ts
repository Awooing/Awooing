import { STORAGE_PREFIX } from '@/app/utils/constants'

/**
 * Prefix the LocalStorage item name with STORAGE_PREFIX
 *
 * @param {string} name Item Name
 */
export const prefix = (name: string): string => `${STORAGE_PREFIX}${name}`

/**
 * Retrieve LocalStorage item
 *
 * @param {string} name Item Name
 * @param {unknown} defaultValue Default value if not exists
 */
export const retrieve = <T = unknown>(
  name: string,
  defaultValue?: T
): T | string | null => {
  const item = localStorage.getItem(prefix(name))

  try {
    return item ? (JSON.parse(item) as T) : defaultValue ?? null
  } catch (error) {
    return item
  }
}

/**
 * Checks whether the item exists in LocalStorage
 *
 * @param name Item Name
 */
export const exists = (name: string): boolean => retrieve(name) !== null

/**
 * Alias of exists()
 */
export const has = (
  ...args: Parameters<typeof exists>
): ReturnType<typeof exists> => exists(...args)

/**
 * Create/Update LocalStorage item
 *
 * @param {string} name Item Name
 * @param {unknown} defaultValue Default value if not exists
 */
export const set = <T = unknown>(name: string, value: T): T => {
  localStorage.setItem(
    prefix(name),
    typeof value === 'string' ? value : JSON.stringify(value)
  )
  return value
}

/**
 * Removes LocalStorage item
 *
 * @param {string} name Item Name
 */
export const remove = (
  name: string
): ReturnType<typeof localStorage.removeItem> =>
  localStorage.removeItem(prefix(name))

/**
 * Alias of remove()
 */
export const del = (
  ...args: Parameters<typeof remove>
): ReturnType<typeof remove> => remove(...args)
